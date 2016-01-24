
$('#button-signup').on('click', function(){ $('#signup').modal('show'); return false;}); // Affiche le modal "S'inscrire" quand on appuie sur le bouton correspondant
$('#button-signin').on('click', function(){ $('#signin').modal('show'); return false;}); // Affiche le modal "Se connecter" quand on appuie sur le bouton correspondant

// Animations
$('#main_panel').addClass("animated fadeIn");
$('#main_panel img').addClass("animated zoomIn");
$('#main_desc').addClass('animated fadeInRight');
$('#main_title').addClass('animated fadeInLeft');
$('#main_panel form').addClass('animated zoomIn');
$('#main_panel h2').addClass('animated zoomIn');

shouldEnableSubmit();

//Bouton "S'inscrire"
$(document).on('submit', '#signUpModal', function(){
    $('.signup').modal('hide');
    $.post('/accounts/signup/', $(this).serialize(), function(html)
    {
        swal("Votre compte a été créé", "Vous pouvez maintenant vous connecter", "success");
    });
    
    return false; 
});

// Vérification de la disponibilité d'un nouveau compte sur les différents champs
// ------------------------------------------------------------------------------

// Le username
$(document).on("focusout", ".signup [name = 'username']", function()
{
    checkAvailability($(this), "#usernames");
    shouldEnableSubmit();
    return false;
});

// L'email
$(document).on("focusout", ".signup [name = 'email']", function()
{
    if( ! isEmail( $(this).val() )  )
        $(this).parent().removeClass("has-success")
                        .addClass("has-error");
    else {
        $(this).parent().removeClass("has-error");
        checkAvailability($(this), "#emails");
    }
    shouldEnableSubmit();
    return false;
});

// Le password
$(document).on("focusout", "#signup [name = 'password_confirm']", function()
{
    var pass  = $("#signup [name = 'password']").val();
    var pass2 = $("#signup [name = 'password_confirm']").val();
    
    console.log($("#signup [name = 'password']"));
    console.log($("#signup [name = 'password_confirm']"));
    
    if(pass != pass2 || pass == '')
    {
        $(this).parent().removeClass("has-success")
                        .addClass("has-error");
                        
        $("#signup [name = 'password']").parent().removeClass("has-success")
                        .addClass("has-error");
    }
    else
    {
        $(this).parent().removeClass("has-error")
                        .addClass("has-success");
                        
        $("#signup [name = 'password']").parent().removeClass("has-error")
                        .addClass("has-success");
    }
    shouldEnableSubmit();
    return false;
});

// Le prénom
$(document).on("focusout", ".signup [name = 'firstname']", function(){
    
    if ($(this).val() == '')
        $(this).parent().removeClass("has-success")
                        .addClass("has-error");
    else
        $(this).parent().removeClass("has-error")
                        .addClass("has-success");
    shouldEnableSubmit();
    return false;
 });
 
// Le nom de famille
$(document).on("focusout", ".signup [name = 'lastname']", function(){
    
    if ($(this).val() == '')
        $(this).parent().removeClass("has-success")
                        .addClass("has-error");
    else
        $(this).parent().removeClass("has-error")
                        .addClass("has-success");
    shouldEnableSubmit();
    
 });
     

/**
 * Fonction qui vérifie que le paramètre à la forme d'un email
 */
function isEmail(email)
{
    var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return regex.test(email);
}

/**
 * Fonction qui active le bouton s'inscrire quand tous les champs sont correctement
 * remplis
 */ 
function shouldEnableSubmit()
{
    var successes = $(".signup .has-success");
    
    
    if(successes.size() == 6)
        $(".signup [type = 'submit' ]").removeClass("disabled");
    else
        $(".signup [type = 'submit' ]").addClass("disabled");
}

/**
 * Vérifie que le contenu de input est bien dans la list
 * identifiée par listId. Met à jour l'état de l'input
 */ 
function checkAvailability(input, listId)
{
    var inputVal = input.val();
    
    $.get("/accounts/already_used/", function(data)
    {
        var elements = $(data).find(listId+" li").text().split(" ");
        console.log(elements);
        
        if(jQuery.inArray(inputVal, elements) != -1)
            input.parent().removeClass("has-success")
                          .addClass("has-error");
        else
            input.parent().removeClass("has-error")
                          .addClass("has-success");
                          
    });
}