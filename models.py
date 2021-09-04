# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class Cards(models.Model):
#     id = models.IntegerField(primary_key=True)
#     title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     description = models.TextField(blank=True, null=True)
#     asignees = models.IntegerField(blank=True, null=True)
#     list = models.ForeignKey('Lists', models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Cards'


# class Comments(models.Model):
#     id = models.IntegerField(primary_key=True)
#     text = models.TextField(blank=True, null=True)
#     comment_by = models.IntegerField(blank=True, null=True)
#     card_id = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Comments'


# class Lists(models.Model):
#     id = models.OneToOneField('Project', models.DO_NOTHING, db_column='id', primary_key=True)
#     name = models.CharField(max_length=255, blank=True, null=True)
#     project_id = models.IntegerField(db_column='Project_id', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'Lists'


# class Project(models.Model):
#     id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=255, blank=True, null=True)
#     wiki = models.TextField(blank=True, null=True)
#     creator_id = models.IntegerField(blank=True, null=True)
#     status = models.CharField(max_length=15, blank=True, null=True)
#     when = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Project'


# class TeamMembers(models.Model):
#     menber_id = models.IntegerField(blank=True, null=True)
#     role = models.CharField(max_length=255, blank=True, null=True)
#     project_id = models.IntegerField()

#     class Meta:
#         managed = False
#         db_table = 'Team Members'


# class Users(models.Model):
#     id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=255, blank=True, null=True)
#     email = models.CharField(db_column='Email', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     password = models.CharField(db_column='Password', max_length=255, blank=True, null=True)  # Field name made lowercase.
#     grant_type = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'Users'
