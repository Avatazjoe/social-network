# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from .models import *
from image_cropping import ImageCroppingMixin

class MyModelAdmin(ImageCroppingMixin, admin.ModelAdmin):
    pass

admin.site.register(Post)
admin.site.register(Profil,MyModelAdmin)
admin.site.register(Comment)
admin.site.register(FriendLink)
admin.site.register(Messages)
admin.site.register(FeatureLink)
admin.site.register(FeatureLinkVote)
admin.site.register(AskFriendLink)