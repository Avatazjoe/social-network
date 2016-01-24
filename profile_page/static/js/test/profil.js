
$(document).on("click", "#supprAccount", function(){
    swal({
          title: "Êtes vous sûr ?",
          text: "Votre compte sera définitivement supprimé",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Oui !",
          closeOnConfirm: false
    },
    function(){
      window.location.href = "/deleteAccount/";
    });
    
  return false;
});
