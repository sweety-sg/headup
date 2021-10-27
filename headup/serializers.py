from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import User,Project,TeamMembers,Lists,Cards,Comment, question
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
    project_members = serializers.SerializerMethodField('members')
    def members(self, obj):
        members_list = []
        for user in list(obj.members.all()):
            data = {
                'id': user.id,
                'full_name': user.full_name,
                'enrolment': user.enrolment,
            }
            members_list.append(data)
        return members_list

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

class CardProjectSerializer(serializers.ModelSerializer):
    # project_c = ProjectSerializer()
    list  = ListSerializer()
    # list = ListSerializer(many = True , read_only = True)
    class Meta:
        model = Cards
        fields = ['id','title','list','status','description']

class ListProjectSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only = True)
    class Meta:
        model = Lists
        fields = ['id','name','status','project', 'cards']

class QuestionSerializer(serializers.ModelSerializer):
    '''Comment Serializer'''
    sender = UserSerializer()
    
    class Meta:
        model = question
        fields = '__all__'



class CommentUserSerializer(serializers.ModelSerializer):
    '''Comment Serializer'''
    sender = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'