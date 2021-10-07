from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser
from datetime import datetime
# from django.contrib.auth.models import User


# Create your models here.
from django.db import models

class User(AbstractUser):
    id = models.AutoField(primary_key = True)
    enrolment = models.IntegerField(blank= True ,null=True)
    # user_id = models.IntegerField(blank= False)
    image = models.ImageField(blank=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
    is_admin = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)

#     class Meta:
#         managed = False
#         db_table = 'User'

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    wiki = models.TextField(blank=True, null=True)
    # creator_id = models.IntegerField(blank=True, null=True)
    creator = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, related_name='proj_creator')
    status = models.CharField(max_length=15, blank=True, null=True)
    start_date = models.DateTimeField(default=datetime.now)
    when = models.DateTimeField(blank=True, null=True)
    members = models.ManyToManyField(User, related_name='projects')
    project_admins = models.ManyToManyField(User, related_name='members_p_a')

    
    # class Meta:
    #     managed = False
    #     # db_table = 'Project'

class TeamMembers(models.Model):
    member = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, related_name='team_member')
    role = models.CharField(max_length=255, blank=True, null=True)
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name='project_member', default=None)
    
    class Meta(object):
        # ordering = ['when']
        '''unique list names in a particular project model'''
        unique_together = ('member', 'project')
    # class Meta:
    #     managed = False
    #     # db_table = 'Team Members'

class Lists(models.Model):
    # id = models.OneToOneField('Project', models.DO_NOTHING, db_column='id', primary_key=True)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    # project_id = models.IntegerField(db_column='Project_id', blank=True, null=True)  # Field name made lowercase.
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name='project_l')
    # members = models.ManyToManyField(User, related_name='members')
    status = models.CharField(max_length=15, blank=True, null=True)


    # class Meta:
    #     managed = False
        

class Cards(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(blank=True, null=True)
    asignees = models.ManyToManyField(User, related_name='cards')
    list = models.ForeignKey('Lists',on_delete=models.CASCADE, blank=True, null=True,related_name="list")
    status = models.BooleanField(blank=True, null=True)
    

    # class Meta:
    #     managed = False
        


class Comment(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    comment_by = models.ForeignKey(to=User, null=True, on_delete=models.SET_NULL, related_name='commentor')
    card = models.ForeignKey(to=Cards,on_delete=models.CASCADE, related_name="card")
    time = models.DateTimeField(default=datetime.now)

    class Meta(object):
        ordering = ['time']

    
class question(models.Model):
    '''
    Questions regarding project
    '''

    content = models.TextField()
    sender = models.ForeignKey(to=User, null=True, on_delete=models.SET_NULL, related_name='asked_by')
    time = models.DateTimeField(default=datetime.now)
    project = models.ForeignKey(to=Project,on_delete=models.CASCADE)

    class Meta(object):
        ordering = ['time']

    













