var timestamp_message = 0
waitForMessage()

// Clique sur l'enveloppe en dessous des miniatures (pour envoyer un message)
$(document).on('click', '.send-message', function ()
{
    var size = $( ".chat-window:last-child" ).css("margin-left");
    var size_total = parseInt(size) + 430;
    var id = $(this).data("profil-id")
    
    $.get("/chatBox/"+id, function(data)
    {
        $(".chat-box.container").append(data);
        $( ".chat-window:last-child" ).css("margin-left", size_total);
        
        var panel = $(".chat-window:last-child").find('.msg_container_base')
        var height = panel[0].scrollHeight;
        panel.scrollTop(height);
    });
    
    return false;
});

// Clique sur le bouton réduire/agran
$(document).on('click', '.panel-heading span.icon_minim', function ()
{
    if (!$(this).hasClass('panel-collapsed'))
    {
        $(this).parents('.panel').find('.panel-body').slideUp();
        $(this).addClass('panel-collapsed');
        $(this).removeClass('fa-minus').addClass('fa-plus');
        $(this).parents('.panel').find('.chat-form').hide()
    } 
    else
    {
        $(this).parents('.panel').find('.panel-body').slideDown();
        $(this).removeClass('panel-collapsed');
        $(this).removeClass('fa-plus').addClass('fa-minus');
        $(this).parents('.panel').find('.chat-form').show()
    }
    
    return false;
});

// Clique sur la croix
$(document).on('click', '.icon_close', function ()
{
    $(this).parent().parent().parent().parent().parent().parent().remove();
    return false;
});

// Envoie d'un nouveau message
$(document).on('submit', '.chat-form', function()
{
    $.post($(this).attr("action"), $(this).serialize())
    return false;
});

// Mis à jour des messages en temps réél
function waitForMessage()
{
    console.log("Je dois rafraichir les messages de " + timestamp_message);
	// Début de la boucle (cf partie Django, dans views)
	$.get("/chatBox/lastMessage/?timestamp=" + timestamp_message, function(data)
	{
		console.log("Je rafraichis les messages avec un timestamp de " + timestamp_message);
        // Données sur le dernier message envoyé
        var receiverID = $(data).filter(".message_data").data("receiver-id");
        var senderID = $(data).filter(".message_data").data("sender-id");
        
        // On vérifie si l'utilisateur actuel est le receveur du message envoyé
        // et que son interlocuteur est l'envoyeur de ce message
        var currentChat = $('.msg_container_base[data-user-id='+
                                                receiverID+
                                            '][data-receiver-id='+
                                                senderID+']')
        if(currentChat.length > 0)
        {
            // Ajout du message
            var wtf = currentChat.append(data)
            currentChat.find('.msg_container:last').addClass("animated fadeInDown");
            
            // Scroll en bas
            var height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
        }
        
        // Vérification du cas réciproque
        currentChat = $('.msg_container_base[data-user-id='+
                                                senderID+
                                            '][data-receiver-id='+
                                                receiverID+']')
        if(currentChat.length > 0)
        {
            // Ajout du message
            wtf = currentChat.append(data)
            currentChat.find('.msg_container:last').addClass("animated fadeInLeft");
            
            // Scroll en bas
            height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
        }
        
        // Nouvelle requete
		timestamp_message = $(data).html();
		setTimeout('waitForMessage()', 1);
	});
}
