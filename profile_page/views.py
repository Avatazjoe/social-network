# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# Include des models
from .models import *
from django.contrib.auth.models import User
from django.db.models import Q
# Include authentication
from django.contrib import auth
from django.core.context_processors import csrf
# Include time
import time
from django.utils import timezone
from django.utils.dateformat import format
# Include render
from django.template import Context
from django.http import HttpResponseRedirect,HttpResponse
from django.shortcuts import render, render_to_response
# Include image manipulation
import Image
from cStringIO import StringIO
from django.core.files.base import ContentFile


# -----------------------------------------------------------
#| Page pour créer un utilisateur                           |
# -----------------------------------------------------------
def signup(request):

    # On créé un user
    newUser = User.objects.create_user(
        request.POST.get('username'),
        request.POST.get('email'),
        request.POST.get('password')
    )
    newUser.last_name = request.POST.get('lastname')
    newUser.first_name = request.POST.get('firstname')
    newUser.save()
    
    # Et le profil associé
    profile = Profil(user = newUser)
    # Ajout à la base de donnée
    profile.save()
    
    return render_to_response('login.html')
    
    

    
# -----------------------------------------------------------
#| Fragment pour la connexion utilisateur                   |
# -----------------------------------------------------------

def already_used(request):
    return render_to_response('newAccountFragments/availability.html',
    {
        "usernames" : [user.username for user in User.objects.all()],
        "emails" : [user.email for user in User.objects.all()]
    })
    
# -----------------------------------------------------------
#| Page d'accueil d'un utilisateur connecté                 |
# -----------------------------------------------------------

def index(request):
    
    # Tentative d'autentification de l'utilisateur
    if not request.user.is_authenticated():
        user = auth.authenticate(
            username = request.POST.get('username'),
            password = request.POST.get('password')
        )
        
        # Si aucun utilisateur n'est authentifié on
        # le redirige vers la page de connexion
        if user is None:
            return HttpResponseRedirect('/accounts/login/')
        else:
            auth.login(request, user)
    
    # Correspond à la page d'accueil d'un utilisateur connecté    
    return render(request, 'index.html',
    {
        'user' : request.user, # l'utilisateur connecté
        'theme' : 'flatly'
    })
    
# -----------------------------------------------------------
#| Page de suppression d'un compte                          |
# -----------------------------------------------------------

def deleteAccount(request):
    
    user = request.user
    
    toDelete = User.objects.all().get(id=user.id)
    
    auth.logout(request)
    toDelete.delete()
    
    return HttpResponseRedirect("/")
  
    
# --------------------------------------------------------------
#| Page qui affiche tous les commentaires d'un post  (fragment)|
# --------------------------------------------------------------

def comments(request, postId):
    return render(request, 'comments.html',
    {
        'post' : Post.objects.get(id=postId),
        'user' : request.user
    })

# ----------------------------------------------------------------
#| Page qui recupère le dernier commentaire posté (long polling) |
# ----------------------------------------------------------------
    
def last_comment(request, postId):
    # On récupère le timestamp envoyé par le javascript
    # vaut : - 0 à l'initialisation
    #        - sinon : le timestamp du dernier commentaire du post <postId>
    # (cf la fonction waitForComment dans "submissions.js")
    lastModif = request.GET.get('timestamp')
    
    
############# Copié/collé la boucle (le "do..while" n'existe pas en Python) #############
    # On test si au moins un commentaire existe sur ce post                             #
    if Comment.objects.filter(post__id = postId).order_by('-date'):                     #
        lastComment = Comment.objects.filter(post__id = postId).order_by('-date')[0]    #
        currentModif = format(lastComment.date, 'U')                                    #
    else: # S'il n'y en a pas, on force la relance d'une nouvelle itération             #
        currentModif = 0                                                                #
#########################################################################################
    
    # Force l'entrée dans la boucle à l'initialisation
    if  lastModif == "0":
        lastModif = currentModif
    
    # Cette boucle s'arrête lorsque le commentaire chargé est plus récent
    # que celui envoyé par le javascript
    while currentModif <= lastModif:
        time.sleep(0.3)
        # On test si au moins un commentaire existe sur ce post
        if Comment.objects.filter(post__id = postId).order_by('-date') :
            lastComment = Comment.objects.filter(post__id = postId).order_by('-date')[0]
            currentModif = format(lastComment.date, 'U')
        else: # S'il n'y en a pas, on force la relance d'une nouvelle itération
            currentModif = 0
    
    # On envoie le nouveau commentaire avec son timestamp
    return render(request, 'submissions/comment.html',
    {
        'user' : request.user,
        'comment' : lastComment,
        'timestamp': currentModif
    })

# ----------------------------------------------------------------
#| Page qui créé un nouveau commentaire                          |
# ----------------------------------------------------------------

def submit_comment(request, postId):
    #postId correspond a l'id du post sur lequel on veux ajoute un commentaire
    #Création d'un commentaire 
    comment = Comment(
        user = request.user.profil,
        post = Post.objects.all().get(id = postId),
        content = request.POST.get("content"),
        date = timezone.now(),
    )
    #Ajout à la base de donnée
    comment.save()
    
    return render(request, 'comments.html',
    {
        'post' : Post.objects.get(id=postId)
    })
    

# ----------------------------------------------------------------
#| Page qui edite un commentaire                                 |
# ----------------------------------------------------------------

def edit_comment(request,id):
    content = request.POST.get('com')
    toEdit = Comment.objects.get(id = id)
    toEdit.content = content
    
    toEdit.save()
    return HttpResponse(""+content)
    
# ----------------------------------------------------------------
#| Page qui supprime un commentaire                              |
# ----------------------------------------------------------------

def delete_comment(request, id):
    
    comment = Comment.objects.get(id = id)
    comment.delete()
    
    return HttpResponse("ok")

# -----------------------------------------------------------
#| Page qui affiche tous les posts   (fragment)             |
# -----------------------------------------------------------
def posts(request):
    return render(request, 'mainPost.html',
    {
        'posts' : Post.objects.order_by('-date'),
        'user'  : request.user
    })

# ----------------------------------------------------------------
#| Page qui recupère le dernier post (long polling)              |
# ----------------------------------------------------------------
def last_post(request):
    # On récupère le timestamp envoyé par le javascript
    # vaut : - 0 à l'initialisation
    #        - sinon : le timestamp du dernier commentaire du post <postId>
    # (cf la fonction waitForPost dans "submissions.js")
    lastModif = request.GET.get('timestamp')
    
######### Copié/collé la boucle (le "do..while" n'existe pas en Python) #########
    # On test si au moins un post existe                                        #
    if Post.objects.all() :                                                     #
        currentModif = format(Post.objects.order_by('-date')[0].date, 'U')      #
    else: # S'il n'y en a pas, on force la relance d'une nouvelle itération     #
        currentModif = 0                                                        #
#################################################################################
    
 
    if  lastModif == "0":
        lastModif = currentModif
    
    while currentModif <= lastModif :
        time.sleep(0.3)
        num = num+1
        # On test si au moins un post existe
        if Post.objects.all() :
            currentModif = format(Post.objects.order_by('-date')[0].date, 'U')
        else: # S'il n'y en a pas, on force la relance d'une nouvelle itération
            currentModif = 0
           
    # On envoie le nouveau commentaire avec son timestamp
    

    
    return render(request, 'submissions/post.html',
    {
        'post' : Post.objects.last(),
        'timestamp': currentModif
    })

# ----------------------------------------------------------------
#| Page qui créé un nouveau post                                 |
# ----------------------------------------------------------------

def submit_post(request):
    #Création du post 
    post = Post(
        title   = request.POST.get('title'),
        content = request.POST.get('content'),
        user    = request.user.profil,
        date    = timezone.now()
    )
    #Ajout à la base de donnée
    post.save()
    return HttpResponse("ok")


def edit_post(request,id):
    #Création du post 
    
    title   = request.POST.get('title')
    content = request.POST.get('content')

    
    toEdit = Post.objects.get(id=id)
    
    toEdit.title = title
    toEdit.content = content
    
    #Ajout à la base de donnée
    toEdit.save()
    return render(request, 'submissions/post.html',
    {
        'post' : toEdit
    })
    
# ----------------------------------------------------------------
#| Page qui supprime un post                                     |
# ----------------------------------------------------------------

def delete_post(request, postId):
    
    post = Post.objects.get(id = postId)
    post.delete()
    
    return HttpResponse("ok")

# ----------------------------------------------------------------
#| Page de login                                                 |
# ----------------------------------------------------------------
def login(request):
    auth.logout(request)
    args = {'theme' : 'simplex'}
    args.update(csrf(request))
    return render_to_response('login.html', args)

############################################
# Pages de featurePost
############################################

def featurePost(request):
    user = request.user.profil
    
    tuples = []
    for featureLink in FeatureLink.objects.all():
        tuples += [(featureLink, FeatureLinkVote.objects.filter(featureLink = featureLink, voter = user))]
    
    return render(request, "featurePost.html",
    {
        "tuples" : tuples,
    })
    
def addFeatureLinkVote(request,featureLinkId,vote):
    #Vue appelé lorsqu'un utilisateur veux ajouter son vote a un featureLink
    voter = request.user.profil
    featureLinkVoted = FeatureLink.objects.all().get(id = featureLinkId)
    a = FeatureLinkVote.objects.all().filter(Q(featureLink = featureLinkVoted) & Q(voter = voter))
    
    #Suppression de l'ancien vote s'il existe
    if a:
        a[0].delete()
    
    #Codage du vote dans la base de donnée
    if vote == '1':
        vote = -1
    
    if vote == '2':
        vote = 1
    
    if not vote == '0':
        #Création du vote 
        q = FeatureLinkVote(voter = voter, vote = vote,  featureLink  = featureLinkVoted)
        #Ajout à la base de donnée
        q.save()
    
    voteYes=0
    totalVotes=0
    # Après le vote on recalcule les votes totaux pour vérifier si le vote est passé
    for vote in FeatureLinkVote.objects.filter(featureLink=featureLinkVoted):
        totalVotes+=1
        if vote.vote==1:
            voteYes+=1 
            
    featureLinkVoted.votes = totalVotes
    featureLinkVoted.save()
    
    #Si oui on change l'état du featureLink, sachant que si voted = 1, le featureLink est passé et affiché dans le profil
    if totalVotes>=5 and (voteYes*1.0)/(totalVotes*1.0) > 0.7:
        featureLinkVoted.voted=1
        featureLinkVoted.save()
        
                
    
    return HttpResponse("Ok") 
    
def addFeaturePost(request,userId):
    #Vue pour ajouté un vote sur un featureLink
    sender = request.user.profil
    owner = User.objects.all().get(id=userId).profil
    feature = request.POST.get('feature')
    #Création d'un featureLink
    q = FeatureLink(owner =owner , sender = sender , feature = feature , voted = 0 )
    #Ajout à la base de donnée
    q.save()
    
    return HttpResponse("Ok") 
    
    
############################################
# friendChat
############################################
   
def friendChat(request):
    #Vue pour afficher les amis et les demandes d'amis
    user = request.user
    
    #Selection des amis de user
    friends = User.objects.all().filter(
          Q(id__in = [fl.user2.id for fl in FriendLink.objects.filter(user1=user)]) 
        | Q(id__in = [fl.user1.id for fl in FriendLink.objects.filter(user2=user)])
    )
    
    #Selection des demandes d'amis sur user
    askFriendLinktoUser = AskFriendLink.objects.all().filter(user2 = user)
    askingUsers=[]
    for a in askFriendLinktoUser:
        askingUsers += [a.user1]
    
    #Affichage des amis et demandes
    return render(request, 'friendChat.html',
    {
        'friends': friends,
        'user' : user,
        'askingUsers' : askingUsers
    })
    
############################################
# profilePage
############################################

def profilePage2(request,userId):
    #Vue renvoyant la page de profile du user correspondant au userId
    user = User.objects.get(id=userId).profil
    #Selection de l'ensemble des caractéristque voté (feature) du user
    features = FeatureLink.objects.all().filter( Q(voted=1) & Q(owner = user))
        
    return render(request, 'profilePage.html', 
    {
        'user' : user,
        'features' : features,
        'isUserpage' : 0
    })


def profilePage(request):
    #Vue renvoyant la page de profile de l'utilisateur connecté
    user = request.user.profil
    #Selection de l'ensemble des caractéristque voté (feature) du user
    features = FeatureLink.objects.all().filter( Q(voted=1) & Q(owner = user))

 
    return render(request, 'profilePage.html', 
    {
        'user' : user,
        'features' : features,
        'isUserpage' : 1,
    })

############################################
# Upload de photo profile
############################################

def submitPhoto(request):
    user = request.user
    
    user.username = request.POST.get('username')
    user.email =   request.POST.get('email')
    user.last_name = request.POST.get('lastname')
    user.first_name = request.POST.get('firstname')
    user.set_password(request.POST.get('password'))
    user.save()
    
    x1 = int(request.POST['x1'])
    x2 = int(request.POST['x2'])
    y1 = int(request.POST['y1'])
    y2 = int(request.POST['y2'])
    
   
    
    
    if request.FILES:
         # Converti un input en une image traitable
        # par la bibliotheque de Python (PIL)
        photo = Image.open(request.FILES['file'])
        # Decoupage
        photo = photo.crop((x1, y1, x2+x1, y2+y1))
        
        # Converti l'image traitee par python
        # en une imagefield
        f = StringIO()
        try:
            photo.save(f, format='jpeg')
            s = f.getvalue()
            # Sauvegarde de l'imagefield
            user.profil.photo.save(str(user.id)+".jpeg",
                                    ContentFile(s))
        finally:
            f.close()
            
    return HttpResponseRedirect("/")
    
    

############################################
# Page de recherche
############################################

def search(request):
    #Vue renvoyant l'ensemble des amis et autres utilisateurs dont le nom ou prénom contient le paramètre 'name'
    user = request.user
    name = request.POST.get("name")

    #Selection de l'ensemble des amis contenant 'name' dans leur nom ou prénom
    friends2 = User.objects.all().filter(
          Q(id__in = [l.user2.id for l in FriendLink.objects.all().filter(user1=user)]) 
        | Q(id__in = [l.user1.id for l in FriendLink.objects.all().filter(user2=user)])
    )
    
    #Selection de l'ensemble des utilisateur (sans les amis) contenant 'name' dans leur nom ou prénom
    users2 = User.objects.all().exclude(
          Q(id__in = [f.id for f in friends2])
        | Q(id = user.id)
    )
    
    friends = []
    users = []
    
    if name:
        for friend in friends2:
            if name.lower() in friend.get_full_name().lower() :
                friends += [friend]
        for user in users2:
            if name.lower() in user.get_full_name().lower() :
                users += [user]
    else : 
        friends = friends2
        users = users2
    
    
    return render(request,'mainSearch.html',
    {
        'user' : user,
        'friends' : friends,
        'users' : users,
        'search' : request.POST.get("name")
    })
    
    
def askFriendLink(request,userId):
    #Vue pour demander un lien d'amitier à un user dont l'id est userId
    user = request.user
    #Selection de l'utilisateur sollicité
    userAsked = User.objects.all().get(id = userId)
    
    #Vérifiation pour voir si une demande existe déjà 
    a = AskFriendLink.objects.all().filter(   Q(user1__id = user.id) & Q(user2__id = userId))
    
    if not a:
        q = AskFriendLink(user1 = user , user2 = userAsked)
        q.save()
        
    return HttpResponse("fait") 
    
    
def acceptFriendLink(request,userId):
    #Vue pour que l'utilisateur connecté puisse accepter un lien d'amitié
    user=request.user
    
    #Selection de la demande existante
    askFriendLink = AskFriendLink.objects.all().get( Q(user1__id = userId) & Q(user2__id = user.id)   ) 
    #Selection de l'utilisateur sollicitant user
    userAsking = askFriendLink.user1
    #Suppression de la demande existante
    askFriendLink.delete()
    #Création du lien d'amitié correspondant
    q = FriendLink(user1 = user , user2 = userAsking)
    #Ajout à la base de donnée du lien d'amitié
    q.save()
    
    return HttpResponse("fait") 
    
def refuseFriendLink(request,userId):
    #Vue pour que l'utilisateur connecté puisse accepter un lien d'amitié
    user=request.user
    
    #Selection de la demande existante
    askFriendLink = AskFriendLink.objects.all().get( Q(user1__id = userId) & Q(user2__id = user.id)   ) 
    #Suppression de la demande existante
    askFriendLink.delete()

    
    return HttpResponse("fait") 
    
def deleteFriendLink(request,userId):
    #Vue supprimant un lien d'amitié 
    user=request.user
    #Selection du lien d'amitié a supprimmer
    friendLinkToSuppr = FriendLink.objects.all().get(  
        (Q(user1__id = userId) & Q(user2__id = user.id) ) 
        |(Q(user1__id = user.id) & Q(user2__id = userId) ) 
        )
    #Suppression si possible
    if friendLinkToSuppr:
        friendLinkToSuppr.delete()

    return HttpResponse("fait") 
    

################### Chat box #########################

def chatBox(request, otherUserId) :
    messages = Messages.objects.filter(
        ( Q(receiver__id = otherUserId)      & Q(sender = request.user.profil) ) |
        ( Q(receiver = request.user.profil) & Q(sender__id = otherUserId) )
    ).order_by("date")
    
    return render(request, "tchat.html", 
    {
        "messages" : messages,
        "user" : request.user.profil,
        "receiver" : Profil.objects.get(id = otherUserId)
    })
    
def submit_message(request, otherUserId) :
    receiver = Profil.objects.get(id=otherUserId)
    sender = request.user.profil
    content = request.POST.get('chat-input')
    
    message = Messages(receiver = receiver, sender = sender, content = content)
    message.save()
    
    return render(request, "submissions/message.html", 
    {
        "message" : message,
        "user" : request.user.profil
    })
    
# ----------------------------------------------------------------
#| Page qui recupère le dernier message (long polling)              |
# ----------------------------------------------------------------
def last_message(request):
    lastModif = request.GET.get('timestamp')
    
    if Messages.objects.all() :
        currentModif = format(Messages.objects.order_by('-date')[0].date, 'U')
    else:
        currentModif = 0
    
    if  lastModif == "0":
        lastModif = currentModif
    
    while currentModif <= lastModif:
        time.sleep(0.1)
        
        if Messages.objects.all() :
            currentModif = format(Messages.objects.order_by('-date')[0].date, 'U')
        else:
            currentModif = 0
  
    return render(request, 'submissions/message.html',
    {
        'message' : Messages.objects.last(),
        'user' : request.user.profil,
        'timestamp': currentModif
    })
