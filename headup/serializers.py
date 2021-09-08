from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import User,Project,TeamMembers,Lists,Cards,Comment
from django.contrib.auth import get_user_model
User = get_user_model()


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email', 'groups']

# # class UserSerializer(serializers.HyperlinkedModelSerializer):

# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']

class UserSerializer(serializers.ModelSerializer):
    '''User serializer'''
    class Meta:
        model = User
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    '''Project Serializer'''
    class Meta:
        model = Project
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    '''List Serilizer'''
    class Meta:
        model = Lists
        fields = '__all__'

class CardSerializer(serializers.ModelSerializer):
    '''Card Serializer'''
    class Meta:
        model = Cards
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    '''Comment Serializer'''
    class Meta:
        model = Comment
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    '''TeamMember Serializer'''
    class Meta:
        model = TeamMembers
        fields = '__all__'

