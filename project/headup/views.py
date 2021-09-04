from django.http.response import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponse, Http404, HttpResponseRedirect , HttpResponseNotAllowed
from django.template import context, loader
from django.contrib.auth.models import User, Group
from rest_framework import serializers, viewsets
from rest_framework import permissions
from .serializers import UserSerializer,  TeamMemberSerializer, ListSerializer, CardSerializer , CommentSerializer , ProjectSerializer
from rest_framework.renderers import JSONRenderer
from .models import Project,TeamMembers,Lists,Cards,Comments
from .param_settings.oauth2_params import auth_params
import requests
from .utils.auth_utils import login, if_loggedin
from . import models
# from headup.serializers import UserSerializer, GroupSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]

# Create your views here.
def home(request) :
    # permission_classes =(permissions.IsAuthenticatedOrReadOnly,)
    return HttpResponse("hello")

def UserDetail(request , pk):
    user = Users.objects.get(id= pk)
    serializer = UserSerializer(user)
    # json_data = JSONRenderer().render(serializer.data)
    # return HttpResponse(json_data, content_type = 'application/json')
    return JsonResponse(serializer.data)


def oauth_redirect(req):
    """ 
    authorise the user
    """
    url = f"https://channeli.in/oauth/authorise/?client_id={auth_params['CLIENT_ID']}&redirect_uri={auth_params['REDIRECT_URI']}&state={auth_params['STATE_STRING']}"
    return HttpResponseRedirect(url)


@if_loggedin('headup:home')
def authcode(req):
    params = {
        'client_id' : auth_params['CLIENT_ID'],
        'client_secret' : auth_params['CLIENT_SECRET'],
        'grant_type' : 'authorization_code',
        'redirect_uri' : auth_params['REDIRECT_URI'],
        'code' : req.GET.get('code', None),
    }
    res = requests.post(
        "https://channeli.in/open_auth/token/", data=params)

    if(res.status_code == 200):
        data = res.json()
        header = {
            "Authorization": "Bearer " + data['access_token']
        }
        response_data = requests.get(
            "https://channeli.in/open_auth/get_user_data/", headers=header)
        user_data = response_data.json()

        if user_data['person']['roles'][1]['role'] == 'Maintainer' and user_data['person']['roles'][1]['activeStatus'] == 'ActiveStatus.IS_ACTIVE':
            user_object = models.User.objects.update_or_create(
                defaults = {
                    'id' : user_data['userId'],
                    'name' : user_data['person']['fullName'],
                    'image' : user_data['person']['displayPicture'],
                    'enrolment' : user_data['student']['enrolmentNumber'],
                },
                # userid = user_data['userId']
            )
            login(req, user_object)
            return HttpResponseRedirect(reverse('headup:home'))
        else:
            return HttpResponseNotAllowed('Sorry! This site is only accessible to IMG maintainers.')
    else:
        return HttpResponse("Some error occured, try again later")
