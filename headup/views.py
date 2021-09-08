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
from .models import Project,TeamMembers,Lists,Cards,Comment
from .param_settings.oauth2_params import auth_params
import requests
from .utils.auth_utils import  if_loggedin , login_ok
from . import models
from rest_framework.decorators import action,api_view, permission_classes
from django.contrib.auth import authenticate, login,logout,get_user_model
from django.contrib.auth.decorators import login_required, permission_required
from django.conf import settings

User = get_user_model()
# from headup.serializers import UserSerializer, GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
     Allows users to be viewed or updated.
    """
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


    @action(methods=['GET'], detail = False, url_path='projects',url_name='user-projects')
    def user_projects(self,request):
        if(request.user.is_authenticated and not (request.user.disabled)):
            serializer = ProjectSerializer(request.user.Project.all(), many = True)
            return Response(serializer.data)
        else:
            return HttpResponseForbidden()
    
    @action(methods=['GET'], detail = False, url_path='cards',url_name='user-cards')
    def user_cards(self,request):
        if(request.user.is_authenticated):
            serializer = CardSerializer(request.user.cards.all(), many = True)
            return Response(serializer.data)
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

    @action(methods=['GET'], detail = False, url_path='logout',url_name='logout')
    def user_logout(self,request):
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'status': 'Logged out'})
        else:
            return HttpResponseForbidden()

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [NotDisabled]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH':
            self.permission_classes = [permissions.IsAdminUser,NotDisabled]
        elif self.request.method == 'POST' or self.request.method == 'DELETE':
            self.permission_classes = [isSelforAdmin]

        return super(UserViewSet, self).get_permissions()

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def project_create(self,serializer):
       serializer.save(creator = self.request.user)
    
    def get_permissions(self):
        if self.request.method == 'GET' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,NotDisabled]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE':
                self.permission_classes = [permissions.IsAuthenticated,IsAdminOrTeamMember,NotDisabled]
        return super(ProjectViewSet, self).get_permissions()

class ListViewSet(viewsets.ModelViewSet):
    queryset = Lists.objects.all()
    serializer_class = ListSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated,NotDisabled]
        elif self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE' or self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated,IsAdminOrTeamMember,NotDisabled]

        return super(ListViewSet, self).get_permissions()

class CardViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated, NotDisabled]
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
    def card(self,request,pk,lk):
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

@if_loggedin('headup:home')
def oauth_redirect(req):
    """ 
    authorise the user
    """
    url = f"https://channeli.in/oauth/authorise/?client_id={auth_params['CLIENT_ID']}&redirect_uri={auth_params['REDIRECT_URI']}&state={auth_params['STATE_STRING']}"
    return HttpResponseRedirect(url)


# @if_loggedin('headup:home')
def authcode(req):
    params = {
        'client_id' : auth_params['CLIENT_ID'],
        'client_secret' : auth_params['CLIENT_SECRET'],
        'grant_type' : 'authorization_code',
        'redirect_uri' : auth_params['REDIRECT_URI'],
        'code' : req.GET.get('code', None),
    }
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
            # user_object, created = User.objects.update_or_create(
            #     username = user_data['student']['enrolmentNumber'],
            #     defaults = {
            #         'id' : user_data['userId'],
            #         'full_name' : user_data['person']['fullName'],
            #         'username': user_data['student']['enrolmentNumber'],
            #         'image' : user_data['person']['displayPicture'],
            #         'enrolment' : user_data['student']['enrolmentNumber'],
            #     },
                
            # )
            try:
                user_object = User.objects.get(username = user_data['student']['enrolmentNumber'])
                login(req, user_object)
            except:
                user_object = User.objects.create(username = user_data['student']['enrolmentNumber'],enrolment = user_data['student']['enrolmentNumber'],full_name = user_data['person']['fullName'],image = user_data['person']['displayPicture'], id = user_data['userId'], email= user_data['contactInformation']['instituteWebmailAddress'])
                login(req, user_object)
            print(user_data)
            # print(created)
            print("hi")
            return HttpResponseRedirect(reverse('headup:home'))
        else:
            return HttpResponseNotAllowed('Sorry! This site is only accessible to IMG maintainers.')
    else:
        return HttpResponse("Some error occured, try again later")

    
def logout_view(request):
    logout(request)
    # Redirect to a success page.
    
