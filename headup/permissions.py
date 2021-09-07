'''Permissions for various views in the app'''
from rest_framework import permissions

class IsAdmin(permissions.Basepermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.grant_type == 1:
            return True
        return False

class  IsAdminOrTeamMember(permissions.Basepermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.grant_type == 1:
            return True
        if request.user in obj.members.all():
            return True
        return False



class IsAdminOrProjectCreator(permissions.Basepermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS or request.user.grant_type == 1:
            return True
        if request.user in obj.project_admins.all():
            return True
