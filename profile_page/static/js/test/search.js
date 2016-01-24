$(initSearch);

function initSearch()
{
    $(document).on('focusin', '#search', onSubmitSearchIn);
    $(document).on('input', '#search', onSubmitSearchInput);
    $(document).on('click', '#back', onSubmitSearchOut);
}

function onSubmitSearchIn()
{
    $.post('/search/',  
           $(this).serialize(), 
           function(main){
                 $("#main").addClass("animated fadeOutRight").one('animationend', function()
                 {
                    $(this).html(main);
                    $(this).removeClass('fadeOutRight');
                 });

           });
    return false;
}

function onSubmitSearchOut()
{
    $("#main").removeClass('animated fadeInRight');
    $("#main").addClass('animated fadeOutRight').one('animationend', function()
    {
        $("main").removeClass('animated fadeOutRight');
        initFeaturePosts();
    });
    
    return false;
}

function onSubmitSearchInput()
{
     $.post('/search/',  
           $(this).serialize(), 
           function(main){
                 $("#main").html(main);
           });
    return false;
}