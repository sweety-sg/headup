from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.response import Response
from django.urls import reverse
from django.http import HttpResponse, Http404, HttpResponseRedirect , HttpResponseNotAllowed,HttpResponseBadRequest ,HttpResponseForbidden
from django.template import context, loader
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, permissions, generics, status
from rest_framework.views import APIView
from .serializers import *
from .permissions import *
from rest_framework.renderers import JSONRenderer
from .models import Project,TeamMembers,Lists,Cards,Comment, question
from .param_settings.oauth2_params import auth_params
import requests
from .utils.auth_utils import  if_loggedin , login_ok
from . import models
from rest_framework.decorators import action,api_view, permission_classes
from django.contrib.auth import authenticate, login,logout,get_user_model
from django.contrib.auth.decorators import login_required, permission_required
from django.conf import settings
from rest_framework.authtoken.models import Token
from slugify import slugify
from datetime import datetime


User = get_user_model()
# from headup.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
     Allows users to be viewed or updated.
    """
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = None


    @action(methods=['GET'], detail = False, url_path='projects',url_name='user-projects')
    def user_projects(self,request):
        if(request.user.is_authenticated and not (request.user.disabled)):
            serializer = ProjectSerializer(request.user.projects.all(), many = True)
            return Response(serializer.data)
        else:
            return HttpResponseForbidden()
    
    @action(methods=['GET'], detail = False, url_path='cards',url_name='user-cards')
    def user_cards(self,request):
        if(request.user.is_authenticated and not (request.user.disabled)):
            serializer = CardSerializer(request.user.cards.all(), many = True)
            # res= Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            # res['Access-Control-Allow-Origin']='http://127.0.0.1:3000'
            # res['Access-Control-Allow-Credentials']='true'

            return Response(serializer.data)
            # return res
        else:
            return HttpResponseForbidden()
    
    @action(methods=['GET'], detail = False, url_path='comments',url_name='user-comments')
    def user_comments(self,request):
        if(request.user.is_authenticated):
            user_comments = CommentSerializer(request.user.commentor.all(), many = True)
            return Response(user_comments.data)
        else:
            return HttpResponseForbidden()
    
    @action(methods=['GET'], detail = False, url_path='data',url_name='user-data')
    def user_data(self,request):
        if(request.user.is_authenticated):
            user_data = UserSerializer(request.user)
            return Response(user_data.data)
        else:
            return HttpResponseForbidden()
    
    @action(methods=['GET'], detail = False, url_path='info',url_name='user-info')
    def user_self_info(self,request):
        if(request.user.is_authenticated):
            info = UserSerializer(request.user)
            return Response(info.data)
        else:
            return HttpResponseForbidden()

    @action(methods=['GET'], detail = False, url_path='logout',url_name='logout')
    def user_logout(self,request):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'status': 'Logged out'})
        else:
            return HttpResponseForbidden()

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH':
            self.permission_classes = [isSelforAdmin,NotDisabled]
            # self.permission_classes = [NotDisabled]
        elif self.request.method == 'POST' or self.request.method == 'DELETE':
            self.permission_classes = [permissions.IsAuthenticated, NotDisabled]

        return super(UserViewSet, self).get_permissions()

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated,NotDisabled]
    pagination_class = None
    
    def project_create(self, request, *args, **kwargs):
    #    serializer.save(creator = self.request.user)
       if self.request.method == 'POST' :
            data = request.POST
            name = data.get('name')
            if ((name is not None) & (len(name) != 0)):
                slug_name = slugify(name)
                print(slug_name)
                slugs = []
                for p in Project.objects.all():
                    slugs.append(slugify(p.name))
                if slug_name in slugs:
                    print("uff same name")
                    return Response(
                        {"message": "Project name should be unique."},
                        status=status.HTTP_400_BAD_REQUEST
                        
                    )
                else:
                    print("unique name")
                    wiki = data.get('wiki')
                    project_status = data.get('status')
                    when = data.get('when')
                    project = Project.objects.create(
                        name=name,
                        wiki=wiki,
                        status=project_status,
                        start_date=datetime.now(),
                        creator=request.user,
                        when = when,
                    )
                    project_admins = data.get('project_admins')
                    members = data.get('members')
                    if ((members is not None) & (len(members) != 0)):
                        memberIDs = members.split(',')
                        members_list = list(
                            User.objects.filter(id=memberIDs)
                        )
                        project.members.set(members_list)

                    if ((project_admins is not None) & (len(project_admins) != 0)):
                        adminIDs = project_admins.split(',')
                        project_admins_list = list(
                            User.objects.filter(id=adminIDs)
                        )
                        project.project_admins.set(project_admins_list)
                    return Response(
                        {"message": 'Project has been created.'},
                        status=status.HTTP_201_CREATED
                    )
            return Response('Please enter a name', status=status.HTTP_400_BAD_REQUEST)

    # @action(methods=['GET'], detail = False, url_path='lists',url_name='project-lists')
    # def project_lists(self,request,pk ,format=None):
    #     proj = Project.objects.get(id=pk)
    #     if(request.user.is_authenticated and not (request.user.disabled)):
    #         serializer = ListSerializer(proj.project_l.all(), many = True)
    #         return Response(serializer.data)
    #     else:
    #         return HttpResponseForbidden()

    # def proj_update(self, serializer):
    #     user_obj = self.request.user
    #     if user_obj.is_admin:
    #         serializer.save()
        
    #     else:
    #         member_list = serializer.validated_data['members']
    #         member_list.append(self.request.user)
    #         serializer.save(members = member_list)


    def proj_delete(self, request, *args, **kwargs):
        if self.request.method == 'DELETE' :
            proj = request.POST
            id = proj.id
            Project.objects.delete(id = id)
            return Response('Deleted')
        return Response('Could not delete')
    
    def get_permissions(self):
        if self.request.method == 'GET' :
            self.permission_classes = [permissions.IsAuthenticated,NotDisabled]
            # self.permission_classes = [noPerm]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
                self.permission_classes = [permissions.IsAuthenticated,NotDisabled,IsAdminOrTeamMember]
        return super(ProjectViewSet, self).get_permissions()

class ListViewSet(viewsets.ModelViewSet):
    queryset = Lists.objects.all()
    serializer_class = ListSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated,NotDisabled]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,IsAdminOrMemberbyList,NotDisabled]

        return super(ListViewSet, self).get_permissions()

class CardViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated, NotDisabled]
            # self.permission_classes =[permissions.AllowAny,]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,IsAdminOrMemberbyCard,NotDisabled]
        return super(CardViewSet, self).get_permissions()

    

def index(req):
    return HttpResponse("Hello! login page")


@login_required(redirect_field_name='headup:index')
# @login_ok('headup:index')
def home(request) :
    # permission_classes =(permissions.IsAuthenticatedOrReadOnly,)
    return HttpResponse("hello")

def UserDetail(request , pk):

    user = User.objects.get(id= pk)
    serializer = UserSerializer(user)
    # json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type = 'application/json')
    return JsonResponse(serializer.data)

class Projects_v(APIView):
    def get(self,request):
        try:
            project = Project.objects.all()
        except Project.DoesNotExist:
            raise Http404("No projects exist")
        serializer = ProjectSerializer(project, many= True)
        return JsonResponse(serializer.data , safe=False)
        
        
       

class Lists_v(APIView):
    def get(self,request,pk):
        pro = Project.objects.get(id=pk)
        lists = Lists.objects.filter(project = pro)
        serializer = ListSerializer(lists, many= True)
        return JsonResponse(serializer.data , safe=False)

class Cards_v(APIView):
    def get(self,request,pk,lk):
        list = Lists.objects.get(id=lk)
        cards = Cards.objects.filter(list = list)
        serializer = CardSerializer(cards, many= True)
        return JsonResponse(serializer.data , safe=False)

class MembersofProject_v(APIView):
    def get(self, request, pk):
        pro = Project.objects.get(id=pk)
        members = pro.members
        serializer = UserSerializer(members, many= True)
        return JsonResponse(serializer.data, safe=False)

class ListOfProjects(APIView):
    '''list all the lists of a given project'''
    # permission_classes = {"get": [permissions.IsAuthenticated,NotDisabled], "post": [permissions.IsAuthenticated, IsAdminOrMemberbyList,NotDisabled]}
    permission_classes= [permissions.IsAuthenticated,NotDisabled]

    def get(self, request, pk ,format=None):
        proj = Project.objects.get(id=pk)
        serializer = ListProjectSerializer(proj.project_l.all(), many = True)
        return Response(serializer.data)

        
    def post(self,request,obj):
        # if self.request.method == 'GET':
        #     self.permission_classes = [permissions.IsAuthenticated,NotDisabled]
        # elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
        #     self.permission_classes = [permissions.IsAuthenticated,IsAdminOrMemberbyList,NotDisabled]

        # return super(ListViewSet, self).get_permissions()
        serializer = ListProjectSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            data = serializer.data
            data["id"] = obj.id
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
   
class CardsOfLists(APIView):
    '''list all the cards of a given project'''
    permission_classes = [NotDisabled]

    def get(self, request, pk ,format=None):
        list = Lists.objects.get(id=pk)
        serializer = CardProjectSerializer(list.list.all(), many = True)
        return Response(serializer.data)

class CommentsOfCard(APIView):
    '''comments of a particular card'''
    permission_classes = [NotDisabled]

    def get(self, request, pk ,format=None):
        card = Cards.objects.get(id=pk)
        serializer = CommentUserSerializer(card.comments_c.all(), many = True)
        return Response(serializer.data)

class QuestionViewSet(viewsets.ModelViewSet):
    '''create/list/update/delete/retrieve comments on a particular project with needed permissions for each type of method'''
    queryset = question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self,serializer):
        serializer.save( sender=self.request.user, time=datetime.now )

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST':
            self.permission_classes = [NotDisabled]
        # elif self.request.method == 'DELETE' :
        #     self.permission_classes = [QuestionDelete,NotDisabled]
        return super(QuestionViewSet, self).get_permissions()

class CommentViewSet(viewsets.ModelViewSet):
    '''create/list/update/delete/retrieve comments on a particular project with needed permissions for each type of method'''
    queryset = Comment.objects.all()

    serializer_class = CommentUserSerializer

    def perform_create(self,serializer):
        serializer.save( sender=self.request.user, time=datetime.now )

    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST':
            self.permission_classes = [NotDisabled]
        # elif self.request.method == 'DELETE' :
        #     self.permission_classes = [CommentDelete,NotDisabled]
        return super(CommentViewSet, self).get_permissions()


@if_loggedin('headup:home')
def oauth_redirect(req):
    """ 
    authorise the user
    """
    url = f"https://channeli.in/oauth/authorise/?client_id={auth_params['CLIENT_ID']}&redirect_uri={auth_params['REDIRECT_URI']}&state={auth_params['STATE_STRING']}"
    return HttpResponseRedirect(url)


@api_view(['GET'])
def authcode(req):
    print("entered")
    params = {
        'client_id' : auth_params['CLIENT_ID'],
        'client_secret' : auth_params['CLIENT_SECRET'],
        'grant_type' : 'authorization_code',
        'redirect_uri' : auth_params['REDIRECT_URI'],
        'code' : req.GET.get('code', None),
    }
    # response= HttpResponseRedirect('http://localhost:3000/')
    # response.set_cookie('code', req.GET.get('code', None))
    print(params)
    res = requests.post(
        "https://channeli.in/open_auth/token/", data=params)
    print("hiee")
    if(res.status_code == 200):
        print("hie")
        data = res.json()
        header = {
            "Authorization": "Bearer " + data['access_token']
        }

        response_data = requests.get(
            "https://channeli.in/open_auth/get_user_data/", headers=header)
        user_data = response_data.json()

        if user_data['person']['roles'][1]['role'] == 'Maintainer':
            try:
                user_object = User.objects.get(username = user_data['student']['enrolmentNumber'])
                login(req, user_object)
            except:
                user_object = User.objects.create(username = user_data['student']['enrolmentNumber'],enrolment = user_data['student']['enrolmentNumber'],full_name = user_data['person']['fullName'],image = user_data['person']['displayPicture'], id = user_data['userId'], email= user_data['contactInformation']['instituteWebmailAddress'])
                login(req, user_object)
            
            print(user_data)
            print("hi")
            # response.set_cookie('access_token', data['access_token'])
            info={
                'data':'Done!', 
                'isAdmin':user_object.is_admin , 
                'NotDisabled' : user_object.disabled,
            }
            print("notokay")
            res= Response(info, status=status.HTTP_202_ACCEPTED)
            res['Access-Control-Allow-Origin']='http://127.0.0.1:3000'
            res['Access-Control-Allow-Credentials']='true'

            # return res
            # return HttpResponseRedirect(('http://localhost:3000/login'))
            login(req, user_object)
            return res
             
        else:
            return HttpResponseNotAllowed('Sorry! This site is only accessible to IMG maintainers.')
    else:
        return HttpResponse("Some error occured, try again later")

    
def logout_view(request):
    if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'status': 'successful'})
    else:
        return HttpResponseForbidden()

    # Redirect to a success page.
    
