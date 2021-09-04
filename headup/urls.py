from django.urls import path,include
from .views import home, UserDetail,oauth_redirect, authcode

app_name = 'headup'
urlpatterns = [
    path('' , home , name='home'),
    path('login', oauth_redirect, name = 'oauth_redirect'),
    path('oauth', authcode, name = 'authcode'),
    path('user/<int:pk>', UserDetail, name = 'UserDetail'),
    
]