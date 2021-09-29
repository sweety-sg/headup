from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

app_name = 'headup'

router.register(r'user',UserViewSet, basename='user')
router.register(r'project',ProjectViewSet, basename='project')
router.register(r'list',ListViewSet, basename='list')
router.register(r'card',CardViewSet, basename='card')


urlpatterns = [
    path('' , home , name='home'),
    path('login', oauth_redirect, name = 'oauth_redirect'),
    path('oauth', authcode, name = 'authcode'),
    # path('user/<int:pk>', UserDetail, name = 'UserDetail'),
    path('projects', Projects_v.as_view()),
    # path('project/<int:pk>/lists', Lists_v.as_view()),
    path('project/<int:pk>/lists/<int:lk>', Cards_v.as_view()),
    path('project/<int:pk>/members', MembersofProject_v.as_view()),
    
]
urlpatterns += router.urls