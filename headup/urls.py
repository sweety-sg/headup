from django.urls import path,include
from .views import home, UserDetail,oauth_redirect, authcode ,project,list,card

app_name = 'headup'
urlpatterns = [
    path('' , home , name='home'),
    path('login', oauth_redirect, name = 'oauth_redirect'),
    path('oauth', authcode, name = 'authcode'),
    path('user/<int:pk>', UserDetail, name = 'UserDetail'),
    path('project', project, name = 'project'),
    path('project/<int:pk>/lists', list, name = 'list'),
    path('project/<int:pk>/lists/<int:lk>', card, name = 'card'),
    
]