# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from . import views

urlpatterns = [
    
    url(r'^$', views.index, name='index'),              # La page d'accueil
    
    # ---------------------------------
    # Pages de gestion des utilisateurs
    # ---------------------------------
    
    url(r'^accounts/login/$', views.login, name='login'),    # Le login
    url(r'^accounts/signup/$', views.signup, name='signup'), # La création d'un compte
    # Liste les nom d'utilisateur et mails déjà utilisés
    url(r'^accounts/already_used/$', views.already_used, name='already_used'),

    # ---------------------------------
    # Pages de gestion des commentaires
    # ---------------------------------
    
    # Le fragment contenant tous les commentaires du post dont l'id est <postId>
    url(r'^comments/(?P<postId>\w+)/$', views.comments, name="comments"),
    # Le fragment contenant le dernier commentaire posté sur le post d'id <postId>
    url(r'^comments/lastComment/(?P<postId>\w+)/', views.last_comment, name="last_comment"),
    # Pour le formulaire "Envoie d'un commentaire"
    url(r'^comments/submitComment/(?P<postId>\w+)/$', views.submit_comment, name="submit_new_comment"),
    # Pour le formulaire "modification d'un commentaire"
    url(r'^comments/editComment/(?P<id>\w+)/$', views.edit_comment, name="edit_comment"),
    # Suppression d'un commentaire
    url(r'^comments/delete/(?P<id>\w+)/$', views.delete_comment, name="delete_comment"),
     
    # ---------------------------------
    # Pages de gestion des posts
    # ---------------------------------
    
    # Le fragment contenant tous les posts
    url(r'^posts/$', views.posts, name="posts"),
    # Le fragment contenant le dernier post
    url(r'^posts/lastPost/', views.last_post, name="last_post"),
    # Pour le formulaire "Envoie d'un post"
    url(r'^posts/submitPost/$', views.submit_post, name="submit_new_post"),
     # Pour le formulaire "modification d'un post"
    url(r'^posts/editPost/(?P<id>\w+)$', views.edit_post, name="edit_post"),
    # Suppression d'un post
    url(r'^posts/delete/(?P<postId>\w+)/$', views.delete_post, name="delete_post"),
    
    # ---------------------------------
    # Pages de profil
    # ---------------------------------
    
    url(r'^profilePage/$', views.profilePage, name ="profilePage"), # La sienne
    url(r'^profilePage2/(?P<userId>\w+)/$', views.profilePage2, name ="profilePage2"), # Celle d'un autre
    url(r'^submitPhoto', views.submitPhoto, name ="submitPhoto"),
    url(r'^deleteAccount/$', views.deleteAccount, name ="deleteAccount"), # La sienne
    
    # ---------------------------------
    # Pages pour les caractéristiques
    # ---------------------------------
    
    url(r'^featurePost/', views.featurePost, name="feature_post"),
    # Pour le formulaire "Ajouter une caractéristique"
    url(r'^addfeaturePost/(?P<userId>\w+)/$', views.addFeaturePost, name="addfeature_post"),
    # Pour le formulaire "Voter pour ou contre une caractéristique"
    url(r'^addFeatureLinkVote/(?P<featureLinkId>\w+)/(?P<vote>\w+)/$', views.addFeatureLinkVote, name="addFeatureLinkVote"),
    
    # ---------------------------------
    # Pages pour les amis
    # ---------------------------------
    
    # La page de recherche
    url(r'^search/$', views.search, name="search"),
    
    # Le fragment correspondant aux panels "Mes amis" et "Demandes d'amis"
    url(r'^friendChat/$', views.friendChat, name ="friendChat"),
    # Pour le formulaire "Demander en ami"
    url(r'^askFriendLink/(?P<userId>\w+)/$', views.askFriendLink, name ="askFriendLink"),
    # Pour le formulaire "Accepter cet ami"
    url(r'^acceptFriendLink/(?P<userId>\w+)/$', views.acceptFriendLink, name ="acceptFriendLink"),
    # Pour le formulaire "Refuse cet ami"
    url(r'^refuseFriendLink/(?P<userId>\w+)/$', views.refuseFriendLink, name ="refuseFriendLink"),
    # Pour le formulaire "Supprimer cet ami"
    url(r'^deleteFriendLink/(?P<userId>\w+)/$', views.deleteFriendLink, name ="deleteFriendLink"),
    
    # ---------------------------------
    # Chat box
    # ---------------------------------
    url(r'^chatBox/(?P<otherUserId>\w+)$', views.chatBox, name="chatBox"),
    url(r'^chatBox/submit/(?P<otherUserId>\w+)$', views.submit_message, name="submit_message"),
    url(r'^chatBox/lastMessage/', views.last_message, name="last_message"),
    
]