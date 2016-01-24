var api = $.Jcrop('#preview',
{
    onChange: showPreview,  // A chaque modification de la séléction on change la preview
	onSelect: showPreview,
    bgColor:     '#efefef',
    bgOpacity:   .2,
    setSelect:   [ 0, 0, 700, 700 ], // Par défaut on séléctionne la région [0, 0, 700, 700]
    aspectRatio: 1
});

// Pour pouvoir voir l'image avant de l'uploader
$("#imgUpload").change(function(){
    readURL(this);
});

/*
 * Permet d'afficher directement le contenu
 * des fichiers présents dans 'input' sans avoir
 * à valider le formulaire
 */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result); // met à jour la source de l'image à uploader
            $('.previewOfPreview').attr('src', e.target.result); // met à jour la source pour la preview de cette image
            
            // Mis à jour de Jcrop
            api.setImage(e.target.result);
            api.setSelect([0, 0, 700, 700]);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Permet d'afficher un aperçu de la zone sélectionnée
 */
function showPreview(coords)
{
    showCoords(coords);
    
    // 100x100 = la taille de l'image d'aperçu
	var rx = 100 / coords.w;
	var ry = 100 / coords.h;

    // Mise à jour des coordonnées a afficher
	$('.previewOfPreview').css({
		width: Math.round(rx * $(".jcrop-holder").width()) + 'px',
		height: Math.round(ry * $(".jcrop-holder").height()) + 'px',
		marginLeft: '-' + Math.round(rx * coords.x) + 'px',
		marginTop: '-' + Math.round(ry * coords.y) + 'px'
	});
}

/**
 * Permet d'de remplir les champs input avec les coordonnées qui vont
 * bien (pour pouvoir les envoyer à Django)
 */
function showCoords(c)
{
    $("#x1").val(c.x);
    $("#y1").val(c.y);
    $("#x2").val(c.w);
    $("#y2").val(c.h);
}