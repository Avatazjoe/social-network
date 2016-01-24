# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
import views

urlpatterns = patterns('',
    # On renvoie la liste des urls de la racine
    # vers les urls de profile_page 
    # (ouvrir profile_page/urls.py pour la liste)
    url(r'^', include('profile_page.urls')),
    url(r'^admin/', include(admin.site.urls)),
)

# Permet de dire à Django que la racine des images uploadées
# est le dossier media
if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        })
    )