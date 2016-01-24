// Charge le panneau des amis / demande d'amis
$("#friendChat").addClass('animated fadeInRight');
$("#friendChat").load("/friendChat");

/* 
 * Affiche le profil d'un utilisateur lorsqu'on clique
 * sur son avatar.
 */
$(document).on('click', "[data-user-id]", function() { 
    // Animation
    $(this).addClass('animated rubberBand').on('animationend',function () { 
        $(this).removeClass('animated rubberBand');
    });
    
    // Commute les 2 boutons bleus de la zone de droite (profil / posts)
    if ($('#toSeePosts').hasClass('active'))
        $('#toSeePosts').button("toggle");
    if ($('#toSeeProfil').hasClass('active'))
        $('#toSeeProfil').button("toggle");
    
    // Recharge la zone de droite avec le profil utilisateur
    $("#profil").removeClass('animated fadeInLeft');   
    $("#profil").load('/profilePage2/'+$(this).data('user-id')+'/',function() {
        $("#profil").addClass('animated fadeInLeft');
    });
    
    return false;
});

/*****************************************************************************************
 *  Gestion d'un clique sur l'un des boutons bleus de la zone de droite (profil / posts) *
 *****************************************************************************************/ 
 
// Clique sur le bouton "Posts"
$(document).on('click', '#toSeePosts', function() { 
    // Animation sur le bouton
    $(this).addClass('animated flipInX').on('animationend',function () { 
        $(this).removeClass('animated flipInX');
    });
    
    // Si ce bouton n'est pas déjà activé
    // (on veut éviter la commutation)
    if (!$('#toSeePosts').hasClass('active'))
    {
        // On retire le contenu courant du panneau de droite (le profil)
        $("#profil").removeClass('animated fadeInLeft'); 
        $("#profil").addClass('animated fadeOutLeft').one('animationend',
        function()
        {   
            $("#profil").removeClass('animated fadeOutLeft');
            $("#profil").hide();
            
            // Une fois retiré, on met à jour le contenu (avec la liste des posts)
            $("#profil").load("posts",
            function()
            {
                $("#profil").show();
                $("#profil").addClass('animated fadeInLeft');
                
                // Met à jour l'état des boutons
                $('#toSeePosts').addClass("active");
                $('#toSeeProfil').removeClass("active");
            });
        });
    }
    
    return false;
});


// Clique sur le bouton "Profil"
$(document).on('click', '#toSeeProfil', function()
{ 
    // Animation sur le bouton
    $(this).addClass('animated flipInX').on('animationend',function () { 
        $(this).removeClass('animated flipInX');
    });
    
    // Si ce bouton n'est pas déjà activé
    // (on veut éviter la commutation)
    if (!$('#toSeeProfil').hasClass('active'))
    {
        // On retire le contenu courant du panneau de droite (la liste des posts)
        $("#profil").removeClass('animated fadeInLeft'); 
        $("#profil").addClass('animated fadeOutLeft').one('animationend',
        function()
        { 
            $("#profil").removeClass('animated fadeOutLeft');
            $("#profil").hide();
            
            // Une fois retiré, on met à jour le contenu (avec le profil)
            $("#profil").load("profilePage",
            function()
            {
                $("#profil").show();
                $("#profil").addClass('animated fadeInLeft');
                
                // Met à jour l'état des boutons
                $('#toSeeProfil').addClass("active");
                $('#toSeePosts').removeClass("active");
            });
        });
    }
    
    return false;
});