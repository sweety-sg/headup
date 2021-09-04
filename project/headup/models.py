from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator

# Create your models here.
from django.db import models

class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    enrolment = models.IntegerField(blank= False)
    # user_id = models.IntegerField(blank= False)
    image = models.ImageField(blank=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
    grant_type = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Users'

class Project(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    wiki = models.TextField(blank=True, null=True)
    # creator_id = models.IntegerField(blank=True, null=True)
    creator = models.ForeignKey(to=Users, on_delete=models.SET_NULL, null=True, related_name='proj_creator')
    status = models.CharField(max_length=15, blank=True, null=True)
    when = models.DateTimeField(blank=True, null=True)
    members = models.ManyToManyField(Users, related_name='members_p')
    project_admins = models.ManyToManyField(Users, related_name='members_p_a')

    class Meta:
        managed = False
        db_table = 'Project'

class TeamMembers(models.Model):
    menber_id = models.IntegerField( blank=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    project_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Team Members'

class Lists(models.Model):
    id = models.OneToOneField('Project', models.DO_NOTHING, db_column='id', primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    # project_id = models.IntegerField(db_column='Project_id', blank=True, null=True)  # Field name made lowercase.
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name='project_l')
    members = models.ManyToManyField(Users, related_name='members')

    class Meta:
        managed = False
        db_table = 'Lists'

class Cards(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(blank=True, null=True)
    asignees = models.IntegerField(blank=True, null=True)
    list = models.ForeignKey('Lists', models.DO_NOTHING, blank=True, null=True)
    

    class Meta:
        managed = False
        db_table = 'Cards'


class Comments(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    comment_by = models.IntegerField(blank=True, null=True)
    card_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Comments'













