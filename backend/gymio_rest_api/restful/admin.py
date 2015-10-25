from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Club
from .models import ClubUser

admin.site.unregister(Group)
admin.site.register(Club)
admin.site.register(ClubUser)
