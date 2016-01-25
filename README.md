# Reverse (Social network)

Context
------

A social network done in pair with the Django framework, JQuery and Bootstrap for a computer science assignment in l'Ecole des Mines de Nantes.

In this single-page website the user has no longer the control over his profile page. Actually, his profile page's content is fully decided by his friends via a voting system.

Features
-------

### Registration

A basic user registration system, the user gives minimal information about his account
(firstname, lastname, email address, username, password).

The availability and validity of each field is tested in live using an **AJAX** request.

![alt tag](screenshots/available.gif)

### Authentication

Once the user validated his account, he can login then log out from the website.

Moreover, the user can change his profile picture easily (made with **JCrop extension** & Python standard library) on his profile page.

### Posts & Comments

Once the user is logged in, he is given the opportunity to publish a random topic and comment on any of them.
Each topic/comment creation is updated live for each user online (**long polling** algorithm made by hand)

What's more, he can also remove and edit them live.

### Friend system & Chat

Each user can add a new friend to his friends' list and then talk to them live (**long polling** made by hand as well).


### Search engine

If the user knows somebody using this app, he can easily find him using the search bar.


### Voting system

When a user adds an information on someone else's profile page, a voting entry is automatically added on the left panel.
Each user can then vote the reliability of this information. If the information is sufficiently reliable, the voting entry is deleted and the information is displayed on the corresponding profile page. 
