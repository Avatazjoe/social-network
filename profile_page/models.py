# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os

from django.db import models
from django.contrib.auth.models import User


# -----------------------------------------------------------
#| Les demandes de liens d'amitié                           |
# -----------------------------------------------------------

class AskFriendLink(models.Model):
    user1 = models.ForeignKey(User, related_name='user1isAsking')
    user2 = models.ForeignKey(User, related_name='user2isAsked')
    
    def __unicode__(self):
        return self.user1.get_full_name() + ' is asking to be friend with ' + self.user2.get_full_name()

# -----------------------------------------------------------
#| Les liens d'amitié                                       |
# -----------------------------------------------------------

class FriendLink(models.Model):
    user1 = models.ForeignKey(User, related_name='user1')
    user2 = models.ForeignKey(User, related_name='user2')
    
    def __unicode__(self):
        return self.user1.get_full_name() + ' is friend with ' + self.user2.get_full_name()

# -----------------------------------------------------------
#| Profil utilisateur                                       |
# -----------------------------------------------------------

class Profil(models.Model):

    user =  models.OneToOneField(User) # Le model de base disponible dans le framework Django
    photo = models.ImageField(upload_to='photos', default='photos/default.png') # Photo de profil
    
    def __unicode__(self):
        return self.user.get_full_name()



# -----------------------------------------------------------
#| Post                                                     |
# -----------------------------------------------------------

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=1000)
    
    date = models.DateTimeField('date published')
    user = models.ForeignKey(Profil)
    
    def __unicode__(self):
        return self.title

# -----------------------------------------------------------
#| Commentaires sur ces posts                               |
# -----------------------------------------------------------

class Comment(models.Model):
    user = models.ForeignKey(Profil)
    post = models.ForeignKey(Post)
    content = models.CharField(max_length=200)
    date = models.DateTimeField('date published')
    
    def __unicode__(self):
        return self.content



# -----------------------------------------------------------
#| Caractéristique liée aux profils utilisateurs            |
# -----------------------------------------------------------

class FeatureLink(models.Model):
    owner = models.ForeignKey(Profil, related_name = "owner")   # La cible d'une modification
    sender = models.ForeignKey(Profil, related_name = "sender") # La source de la modification
    feature = models.CharField(max_length=50) # La caracteristique en question
    
    # Vaut 1 s'il y a suffisamment de personnes ont approuvé
    # la modification du profil.
    voted = models.IntegerField(default = 0)  
    votes = models.IntegerField(default = 0)
    
    def __unicode__(self):
        return str(self.sender) + " describes " + str(self.owner) + " as " + str(self.feature) 
        
        
        
# -----------------------------------------------------------
#| Vote des caractéristiques liées aux profils utilisateurs |
# -----------------------------------------------------------

class FeatureLinkVote(models.Model):
    # La caractéristique sur laquelle le vote est effectué
    featureLink = models.ForeignKey(FeatureLink, related_name = "featurevote")
    
    voter = models.ForeignKey(Profil, related_name = "voter")   # La personne qui vote pour cette caracteristique
    vote = models.IntegerField(default = 0) # -1 : Non
                                            #  0 : Pas de vote
                                            #  1 : Oui
    def __unicode__(self):
        return str(self.voter) + " voted "+str(self.vote) + " for " + str(self.featureLink)

        
class Messages(models.Model):
    receiver = models.ForeignKey(Profil, related_name = "message_receiver")  # La cible du message
    sender = models.ForeignKey(Profil, related_name = "message_sender") # La source du message
    content = models.CharField(max_length = 255)
    
    date = models.DateTimeField(auto_now = True)
    isRead = models.BooleanField(default=False)
    
    def __unicode__(self):
        return self.content