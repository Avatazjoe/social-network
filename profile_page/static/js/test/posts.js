var timestamp_comment = [];

var timestamp_post = 0;
//Bouton pour publier un post
$(document).on('submit', '.post-form', onSubmitPost);
//Bouton pour modifier un post
$(document).on('submit', '.post-form-edit', onEditPost);
//Bouton pour modifier un com
$(document).on('submit', '.com-form-edit', onEditCom);
// Affiche le modal "Editer" quand on appuie sur le bouton correspondant
$('#editPostModal').on('click', function(){ $('#editMyPost').modal('show'); }); 
// Long Polling sur les posts (Push)
waitForPost();


var id = 0;


$(document).on('click', '.editPostModal', function(){
    $(".editMyPost").modal("show");
    id = $(this).data("id");
    var title=   $(this).parents('.panel').find('.postTitle').text();
    var content=   $(this).parents('.panel').find('.postContent').text();
    $(".editMyPost").find('[placeholder="Titre du post"]').val(title);
    $(".editMyPost").find('[placeholder="Écrivez votre post"]').val(content);
     
    return false;
});


$(document).on('click', '.editComModal', function(){
    $(".editMyCom").modal("show");
    id = $(this).parents('.comment').data("com-id");
    var comment=   $(this).parents('.comment').find('.comContent')    .text();
    $(".editMyCom").find('[placeholder="modifiez votre com"]').val(comment);
    
    return false;
});


function onEditPost()
{
    var postId = id
    if( $(".post-form-edit[name='post-content']").val() == '' || $(".post-form-edit[name='title']").val() == '')
        swal("Absence de contenu", "Vérifiez bien que tous les champs sont remplis.", "error");
    else {
        $.post('/posts/editPost/'+postId, $(this).serialize(), function(res) {
            $(".post[data-id="+postId+"]").html(res)
            $(".editMyPost").modal("hide");
        });
    }

    return false;    
}

function onEditCom()
{
    var comId = id
    if( $(".com-form-edit[name='com-content']").val() == '' )
        swal("Absence de contenu", "Vérifiez bien que tous les champs sont remplis.", "error");
    else {
        $.post('/comments/editComment/'+comId+"/", $(this).serialize(), function(res) {
            $(".comment[data-com-id="+comId+"]").find(".comContent").html(res)
            $(".editMyCom").modal("hide");
        });
    }

    return false;    
}

function onSubmitPost()
{
    if( $(".post-form[name='post-content']").val() == '' || $(".post-form[name='title']").val() == '')
        swal("Absence de contenu", "Vérifiez bien que tous les champs sont remplis.", "error");
    else {
        $.post('/posts/submitPost/', $(this).serialize(), function() {
        });
    }
    return false;    
}


// Charge le panneau de droite avec le fragment contenant les posts
$.get("posts", function(data) {
    $("#profil").html(data).addClass('animated fadeInLeft');
    
    // Initialise le long-posting pour la liste de commentaires
    // de chacun des posts.
    $(".post").map(function() {
        var postId = $(this).data("id");
        timestamp_comment[postId] = 0;
        waitForComment(postId);
    });
    
    // Active le bouton bleu "post"
    $('#toSeePosts').button("toggle");
});

$(document).on('click', "#supprPost", function()
{
    var id = $(this).data("id");
    $.get("/posts/delete/"+id+"/");
    $(this).parent().parent().parent().slideUp().addClass("animated zoomOutDown").one("animationend", function(){$(this).remove();});
    return false;
});

function waitForPost()
{
    console.log("Je dois rafraichir les posts de " + timestamp_post);
	$.get("/posts/lastPost/?timestamp=" + timestamp_post, function(data)
	{
		
		console.log("Je rafraichis avec un timestamp de " + timestamp_post);
		$(".post-group").prepend(data);
		$(".post:first").hide().slideDown("slow").addClass("animated zoomInDown").one("animationend", function(){ $(this).removeClass("zoomInDown"); });
	
	    var postId = $(".post:first").data("id");
        timestamp_comment[postId] = 0;
        waitForComment(postId);
	
		timestamp_post = $(data).html();
		setTimeout('waitForPost()', 1);
	});
}
