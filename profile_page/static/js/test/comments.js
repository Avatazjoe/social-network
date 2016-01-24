//Bouton pour poster un commentaire
$(document).on('submit', '.comment-form', onSubmitComment);

function onSubmitComment()
{
    var postId = $(this).data("id");
    
    if( $(".comment-content[data-id="+postId+"]").val() == '')
        swal("Absence de contenu", "Vérifiez bien que tous les champs sont remplis.", "error");
    else
        $.post('/comments/submitComment/'+postId+'/', $(this).serialize(), function(){
            var content = $(".badge[data-id =" + postId + "]").html();
            $(".badge[data-id =" + postId + "]").html(parseInt(content)+1);
        });
    return false;    
}

$(document).on("click", ".suppr_comment", function(){
    var comment = $(this).parent().parent()
    var id = $(this).data("id");
    var postId = comment.data("id");
    
    $.get("/comments/delete/"+id+"/", function(){
        comment.slideUp(400).addClass("animated zoomOutUp").one("animationend", function(){$(this).remove();});
        var content = $(".badge[data-id =" + postId + "]").html();
        $(".badge[data-id =" + postId + "]").html(parseInt(content)-1);
    })
    return 
});

function waitForComment(postId)
{
    console.log("Je dois rafraichir les commentaires sur le postId : " + postId);
	$.get("/comments/lastComment/"+postId+"/?timestamp=" + timestamp_comment[postId], function(data)
	{
			console.log("Je rafraichis les commentaire");
			$(".comment-section[data-id="+postId+"]").append(data);
			$(".comment[data-id="+postId+"]:last").hide().slideDown("fast").addClass("animated bounceInUp")
			                                      .one("animationend", function(){ $(this).removeClass("zoomInDown"); });
	
		timestamp_comment[postId] = $(data).html();
		setTimeout('waitForComment('+postId+')', 100);
	});
}

