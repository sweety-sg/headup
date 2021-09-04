from django.contrib import admin
from .models import Users,Project,TeamMembers,Lists,Cards,Comments

# Register your models here.
admin.site.register(Users)
admin.site.register(Project)
admin.site.register(Lists)
admin.site.register(Cards)
admin.site.register(Comments)
admin.site.register(TeamMembers)
