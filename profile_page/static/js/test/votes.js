$(initFeaturePosts);

//Bouton "Oui"
$(document).on("submit", ".approve-form", function(){ return false; });
//Bouton "Non"
$(document).on("submit", ".reject-form", function(){ return false; });

// Permet l'ajout d'une caractéristique en temps réél
$(document).on('submit',"[data-add-feature-to]", function()
{
    var id = $(this).data("add-feature-to");
    $.post("/addfeaturePost/"+id+"/", $(this).serialize(), function(){
        initFeaturePosts();
    });
    
    return false;
});

// Permet le vote lors d'un clique sur "Non"
$(document).on('click',".btn.btn-danger[data-id]", function()
{
    var id = $(this).data("id");
    if(!$(this).hasClass("active"))
        // On active le bouton => vote négatif
        $.get("/addFeatureLinkVote/"+id+"/1/");
    else
        // On désactive le bouton => on annule l'opération (vote Neutre)
        $.get("/addFeatureLinkVote/"+id+"/0/");
    
    return false;
});

// Permet le vote (ou non) lors d'un clique sur "Oui"
$(document).on('click',".btn.btn-success[data-id]", function()
{
    var id = $(this).data("id");
    if(!$(this).hasClass("active"))
        // On active le bouton => vote positif
        $.get("/addFeatureLinkVote/"+id+"/2/");
    else
        // On désactive le bouton => on annule l'opération (vote Neutre)
        $.get("/addFeatureLinkVote/"+id+"/0/");
    
    return false;
});

/**
 * Fonction qui charge les 4 dernières cases de vote du panneau de gauche
 **/
function initFeaturePosts()
{
    $.get("featurePost/", function(data)
    {
        $("#main").html(data);
        $("#main").removeClass('animated fadeOutRight');
        $("#main").addClass('animated fadeInRight');
        initProgressbar();
        
    });
}


/**
 * Permet d'afficher les barre de progression avec les bonnes valeurs
 **/
function initProgressbar()
{
    $(".progress-bar").map(
    function()
    { 
        var votes         = $(this).data("votes");
        var approvedVotes = $(this).data("approved-votes");
        
        if(votes != 0)
        {
            var ratio = approvedVotes*100.0/votes;
            $(this).css("width", ratio.toString()+"%")
                   .html(ratio.toFixed(1).toString()+"%");
            $(this).css("background-color", "rgb("+ Math.round(2.1*(100-ratio)) +", "+ Math.round(1.5*(ratio)) +", 0)");

        }
    });
}

$(rate);


function rate()
{
    // Lorsqu'un utilisateur clique sur le bouton "+"
    $(document).on("click", ".approve" , function()
    {
        $(this).addClass('animated rubberBand').on('animationend',function () { 
            $(this).removeClass('animated rubberBand');
        });
        
        
        var postID = $(this).data("id");                          // On recupere l'id du post lié à ce bouton
        var bar =  $(".progress-bar[data-id='"+postID+"']");    // La barre de progression
        var votes = bar.data("votes");                          // Le nombre de votes
        var approvedVotes = bar.data("approved-votes");         // La fiabilite du post
        
        
        if($(".reject[data-id="+postID+"]").hasClass("active"))
        {
            approvedVotes = approvedVotes + 1;
            $(".reject[data-id="+postID+"]").button("toggle");
        }
        
        
        else if($(this).hasClass("active"))
        {
            approvedVotes = approvedVotes -1;
            votes = votes-1;
        }
        
        else
        {
            approvedVotes = approvedVotes+1;
            votes = votes + 1;  
        }
        
        $(".bar-description[data-id='"+postID+"']").html("Ce post a une fiabilité de "+approvedVotes+"/"+votes);
        
        var ratio = 100*approvedVotes/votes;
        bar.css("width", ratio.toString()+"%")         // met à jour la longueur de la barre
            .html(ratio.toFixed(1).toString() + "%");    // met à jour le chiffre affiché sur la barre  
        
        bar.data("votes", votes);
        bar.data("approved-votes", approvedVotes);
        
        bar.css("background-color", "rgb("+ Math.round(2.1*(100-ratio)) +", "+ Math.round(1.5*(ratio)) +", 0)");
        $(this).button("toggle");
    });
    
    // Lorsqu'un utilisateur clique sur le bouton "-"
    $(document).on("click", ".reject", function()
    {
        
        $(this).addClass('animated rubberBand').on('animationend',function () { 
            $(this).removeClass('animated rubberBand');
        });
        
        var postID = $(this).data("id");                          // On recupere l'id du post lié à ce bouton
        var bar =  $(".progress-bar[data-id='"+postID+"']");    // La barre de progression
        var votes = bar.data("votes");                          // Le nombre de votes
        var approvedVotes = bar.data("approved-votes");         // La fiabilite du post
        
        
        if($(".approve[data-id="+postID+"]").hasClass("active"))
        {
            approvedVotes = (approvedVotes-1)
            $(".approve[data-id="+postID+"]").button("toggle");
        }
        
        
        else if($(this).hasClass("active"))
        {
            votes = votes-1;
        }
        
        else
        {
            votes = votes+1;
        }
        
        $(".bar-description[data-id='"+postID+"']").html("Ce post a une fiabilité de "+approvedVotes+"/"+votes);
        
        var ratio = 100*(approvedVotes)/votes;
        bar.css("width", ratio.toString()+"%")         // met à jour la longueur de la barre
            .html(ratio.toFixed(1).toString() + "%");    // met à jour le chiffre affiché sur la barre  
        
        
        bar.data("votes", votes);
        bar.data("approved-votes", approvedVotes);
        
        
        bar.css("background-color", "rgb("+ Math.round(2.1*(100-ratio)) +", "+ Math.round(1.5*(ratio)) +", 0)");
        $(this).button("toggle");
    });
}
