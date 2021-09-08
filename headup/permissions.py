'''Permissions for various views in the app'''
from requests.sessions import session
from .models import User
from rest_framework import permissions
# from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

class IsAdmin(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_admin:
            return True
        return False

class  IsAdminOrTeamMember(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_admin:
            return True
        if request.user in obj.members.all():
            return True
        return False



class IsAdminOrProjectCreator(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_admin:
            return True
        if request.user in obj.project_admins.all():
            return True


class NotDisabled(permissions.BasePermission):
    def has_permission(self, request, view):
        for person in User.objects.all().iterator():
            if person== request.user and request.user.disabled:
                return False
        return True


class isSelforAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        for person in User.objects.all().iterator():
            if person.is_admin and person == request.user:
                return True

            if request.user.id == session['user_id']:
                return True
        return False

class noPerm(permissions.BasePermission):
    def has_permission(self, request, view):
        return False

class  IsAdminOrMemberbyCard(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_admin:
            return True
        if request.user in obj.list.project.members.all():
            return True
        return False