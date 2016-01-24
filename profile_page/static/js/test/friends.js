

// Suppression d'un ami lors d'un clique 
// sur le bouton "-"


$(document).on('click', '[data-user-to-del]',
function()
{
    $.get("deleteFriendLink/"+$(this).data("user-to-del"), function() { $("#friendChat").load("/friendChat"); });
    var user = $(this).parent().parent().parent().parent();
    
    user.addClass('animated fadeOutRight' )
        .one('animationend ', function () {
          $(this).hide();
          
     });
     
    return false;
});


// Ajout d'une demande d'amis lors d'un clique 
// sur le bouton "+"

$(document).on('click', '[data-user-to-ask]',
function()
{
    $.get("askFriendLink/"+$(this).data("user-to-ask"));
    $(this).parent().parent().parent().parent().addClass('animated flash' );

    return false;
});


// Suppression d'une demande ami lors d'un clique 
// sur le bouton "Refuser"
$(document).on('click', '.deleteAsk',
function()
{
    
    $.get("refuseFriendLink/"+$(this).data("id")+"/");
    
     $("#friendChat").addClass("fadeOutRight").one("animationend", function() {
        $("#friendChat").removeClass("fadeOutRight");
        $("#friendChat").load("/friendChat/", function() {$("#friendChat").addClass("fadeInRight");
            
        });
     }
    );
    return false;
    
});


// Accepte la demande d'amis lors d'un clique 
// sur le bouton "Accepter"
$(document).on('click','[data-user-asking]',
function()
{
    $.get("acceptFriendLink/"+$(this).data("user-asking"));
    
    $("#friendChat").addClass("fadeOutRight").one("animationend", function() {
        $("#friendChat").removeClass("fadeOutRight");
        $("#friendChat").load("/friendChat/", function() {$("#friendChat").addClass("fadeInRight");});
        
    });
    
    return false;
});