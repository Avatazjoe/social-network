{"filter":false,"title":"votes.js","tooltip":"/profile_page/static/js/test/votes.js","undoManager":{"mark":45,"position":45,"stack":[[{"start":{"row":0,"column":0},"end":{"row":111,"column":1},"action":"insert","lines":["$(initFeaturePosts);","","// Permet l'ajout d'une caractéristique en temps réél","$(document).on('submit',\"[data-add-feature-to]\", function()","{","    var id = $(this).data(\"add-feature-to\");","    $.post(\"/addfeaturePost/\"+id+\"/\", $(this).serialize(), function(){","        initFeaturePosts();","    });","    ","    return false;","});","","// Permet le vote lors d'un clique sur \"Rejète\"","$(document).on('click',\".btn.btn-danger[data-id]\", function()","{","    var id = $(this).data(\"id\");","    if(!$(this).hasClass(\"active\"))","        // On active le bouton => vote négatif","        $.get(\"/addFeatureLinkVote/\"+id+\"/1/\");","    else","        // On désactive le bouton => on annule l'opération (vote Neutre)","        $.get(\"/addFeatureLinkVote/\"+id+\"/0/\");","    ","    return false;","});","","// Permet le vote (ou non) lors d'un clique sur \"Approuve\"","$(document).on('click',\".btn.btn-success[data-id]\", function()","{","    var id = $(this).data(\"id\");","    if(!$(this).hasClass(\"active\"))","        // On active le bouton => vote positif","        $.get(\"/addFeatureLinkVote/\"+id+\"/2/\");","    else","        // On désactive le bouton => on annule l'opération (vote Neutre)","        $.get(\"/addFeatureLinkVote/\"+id+\"/0/\");","    ","    return false;","});","","/**"," * Fonction qui charge les 4 dernières cases de vote du panneau de droite"," **/","function initFeaturePosts()","{","    var a = 0;","    var b = 0;","    var c = 0;","    ","    // Charge le premier vote","    $(\"#main\").addClass('animated fadeOutRight');","    $(\"#main\").load(\"featurePost/?a=0&b=0&c=0\", function()","    {","        var truc = $(\".progress-bar[data-id]\");","        if($(truc).size() >= 1)","            a = $(truc[0]).data(\"id\");","            ","        // Charge le deuxième vote","        $.get(\"featurePost/?a=\"+ a + \"&b=0&c=0\", function(html1)","        {","            $(\"#main\").append(html1);","            truc = $(\".progress-bar[data-id]\");","            if($(truc).size() >= 2)","                b = $(truc[1]).data(\"id\");","            ","            // Charge le troisième vote","            $.get(\"featurePost/?a=\"+a +\"&b=\" + b +\"&c=0\",function(html2)","            {","                $(\"#main\").append(html2);","                truc = $(\".progress-bar[data-id]\");","                if($(truc).size() >= 3)","                    c = $(truc[2]).data(\"id\");","                ","                // Charge le quatrième vote","                $.get(\"featurePost/?a=\"+ a +\"&b=\"+ b+\"&c=\"+ c,function(html3)","                {","                    $(\"#main\").append(html3);","                    ","                    // Une fois que tout est chargé, on anime","                    // et on initialise les barres de progression","                    $(\"#main\").removeClass('animated fadeOutRight');","                    $(\"#main\").addClass('animated fadeInRight');","                    initProgressbar();","                });","            });","        });","    });","}","","","/**"," * Permet d'afficher les barre de progression avec les bonnes valeurs"," **/","function initProgressbar()","{","    $(\".progress-bar\").map(","    function()","    { ","        var votes         = $(this).data(\"votes\");","        var approvedVotes = $(this).data(\"approved-votes\");","        ","        if(votes != 0)","        {","            var ratio = approvedVotes*100.0/votes;","            $(this).css(\"width\", ratio.toString()+\"%\")","                   .html(ratio.toFixed(1).toString()+\"%\");","            $(this).css(\"background-color\", \"rgb(\"+ Math.round(2.1*(100-ratio)) +\", \"+ Math.round(1.5*(ratio)) +\", 0)\");","","        }","    });","}"],"id":1}],[{"start":{"row":13,"column":40},"end":{"row":13,"column":46},"action":"remove","lines":["Rejète"],"id":2},{"start":{"row":13,"column":40},"end":{"row":13,"column":41},"action":"insert","lines":["N"]},{"start":{"row":13,"column":41},"end":{"row":13,"column":42},"action":"insert","lines":["o"]},{"start":{"row":13,"column":42},"end":{"row":13,"column":43},"action":"insert","lines":["n"]}],[{"start":{"row":27,"column":49},"end":{"row":27,"column":57},"action":"remove","lines":["Approuve"],"id":3},{"start":{"row":27,"column":49},"end":{"row":27,"column":50},"action":"insert","lines":["O"]},{"start":{"row":27,"column":50},"end":{"row":27,"column":51},"action":"insert","lines":["u"]},{"start":{"row":27,"column":51},"end":{"row":27,"column":52},"action":"insert","lines":["i"]}],[{"start":{"row":42,"column":66},"end":{"row":42,"column":73},"action":"remove","lines":[" droite"],"id":4},{"start":{"row":42,"column":66},"end":{"row":42,"column":67},"action":"insert","lines":[" "]},{"start":{"row":42,"column":67},"end":{"row":42,"column":68},"action":"insert","lines":["g"]},{"start":{"row":42,"column":68},"end":{"row":42,"column":69},"action":"insert","lines":["a"]},{"start":{"row":42,"column":69},"end":{"row":42,"column":70},"action":"insert","lines":["u"]},{"start":{"row":42,"column":70},"end":{"row":42,"column":71},"action":"insert","lines":["h"]},{"start":{"row":42,"column":71},"end":{"row":42,"column":72},"action":"insert","lines":["e"]}],[{"start":{"row":42,"column":70},"end":{"row":42,"column":71},"action":"insert","lines":["c"],"id":5}],[{"start":{"row":111,"column":1},"end":{"row":112,"column":0},"action":"insert","lines":["",""],"id":6},{"start":{"row":112,"column":0},"end":{"row":113,"column":0},"action":"insert","lines":["",""]},{"start":{"row":113,"column":0},"end":{"row":114,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":114,"column":0},"end":{"row":211,"column":0},"action":"insert","lines":["$(rate);","","","function rate()","{","    // Lorsqu'un utilisateur clique sur le bouton \"+\"","    $(document).on(\"click\", \".approve\" , function()","    {","        $(this).addClass('animated rubberBand').on('animationend',function () { ","            $(this).removeClass('animated rubberBand');","        });","        ","        ","        var postID = $(this).data(\"id\");                          // On recupere l'id du post lié à ce bouton","        var bar =  $(\".progress-bar[data-id='\"+postID+\"']\");    // La barre de progression","        var votes = bar.data(\"votes\");                          // Le nombre de votes","        var approvedVotes = bar.data(\"approved-votes\");         // La fiabilite du post","        ","        ","        if($(\".reject[data-id=\"+postID+\"]\").hasClass(\"active\"))","        {","            approvedVotes = approvedVotes + 1;","            $(\".reject[data-id=\"+postID+\"]\").button(\"toggle\");","        }","        ","        ","        else if($(this).hasClass(\"active\"))","        {","            approvedVotes = approvedVotes -1;","            votes = votes-1;","        }","        ","        else","        {","            approvedVotes = approvedVotes+1;","            votes = votes + 1;  ","        }","        ","        $(\".bar-description[data-id='\"+postID+\"']\").html(\"Ce post a une fiabilité de \"+approvedVotes+\"/\"+votes);","        ","        var ratio = 100*approvedVotes/votes;","        bar.css(\"width\", ratio.toString()+\"%\")         // met à jour la longueur de la barre","            .html(ratio.toFixed(1).toString() + \"%\");    // met à jour le chiffre affiché sur la barre  ","        ","        bar.data(\"votes\", votes);","        bar.data(\"approved-votes\", approvedVotes);","        ","        bar.css(\"background-color\", \"rgb(\"+ Math.round(2.1*(100-ratio)) +\", \"+ Math.round(1.5*(ratio)) +\", 0)\");","        $(this).button(\"toggle\");","    });","    ","    // Lorsqu'un utilisateur clique sur le bouton \"-\"","    $(document).on(\"click\", \".reject\", function()","    {","        ","        $(this).addClass('animated rubberBand').on('animationend',function () { ","            $(this).removeClass('animated rubberBand');","        });","        ","        var postID = $(this).data(\"id\");                          // On recupere l'id du post lié à ce bouton","        var bar =  $(\".progress-bar[data-id='\"+postID+\"']\");    // La barre de progression","        var votes = bar.data(\"votes\");                          // Le nombre de votes","        var approvedVotes = bar.data(\"approved-votes\");         // La fiabilite du post","        ","        ","        if($(\".approve[data-id=\"+postID+\"]\").hasClass(\"active\"))","        {","            approvedVotes = (approvedVotes-1)","            $(\".approve[data-id=\"+postID+\"]\").button(\"toggle\");","        }","        ","        ","        else if($(this).hasClass(\"active\"))","        {","            votes = votes-1;","        }","        ","        else","        {","            votes = votes+1;","        }","        ","        $(\".bar-description[data-id='\"+postID+\"']\").html(\"Ce post a une fiabilité de \"+approvedVotes+\"/\"+votes);","        ","        var ratio = 100*(approvedVotes)/votes;","        bar.css(\"width\", ratio.toString()+\"%\")         // met à jour la longueur de la barre","            .html(ratio.toFixed(1).toString() + \"%\");    // met à jour le chiffre affiché sur la barre  ","        ","        ","        bar.data(\"votes\", votes);","        bar.data(\"approved-votes\", approvedVotes);","        ","        ","        bar.css(\"background-color\", \"rgb(\"+ Math.round(2.1*(100-ratio)) +\", \"+ Math.round(1.5*(ratio)) +\", 0)\");","        $(this).button(\"toggle\");","    });","}",""],"id":7}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":8},{"start":{"row":2,"column":0},"end":{"row":3,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":2,"column":0},"end":{"row":6,"column":70},"action":"insert","lines":["","//Bouton \"Oui\"","$(document).on(\"submit\", \".approve-form\", function(){ return false; });","//Bouton \"Non\"","$(document).on(\"submit\", \".reject-form\", function(){ return false; });"],"id":9}],[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"remove","lines":["",""],"id":10}],[{"start":{"row":51,"column":4},"end":{"row":51,"column":7},"action":"insert","lines":["// "],"id":11},{"start":{"row":52,"column":4},"end":{"row":52,"column":7},"action":"insert","lines":["// "]},{"start":{"row":53,"column":4},"end":{"row":53,"column":7},"action":"insert","lines":["// "]},{"start":{"row":55,"column":4},"end":{"row":55,"column":7},"action":"insert","lines":["// "]},{"start":{"row":56,"column":4},"end":{"row":56,"column":7},"action":"insert","lines":["// "]},{"start":{"row":57,"column":4},"end":{"row":57,"column":7},"action":"insert","lines":["// "]},{"start":{"row":58,"column":4},"end":{"row":58,"column":7},"action":"insert","lines":["// "]},{"start":{"row":59,"column":4},"end":{"row":59,"column":7},"action":"insert","lines":["// "]},{"start":{"row":60,"column":4},"end":{"row":60,"column":7},"action":"insert","lines":["// "]},{"start":{"row":61,"column":4},"end":{"row":61,"column":7},"action":"insert","lines":["// "]},{"start":{"row":63,"column":4},"end":{"row":63,"column":7},"action":"insert","lines":["// "]},{"start":{"row":64,"column":4},"end":{"row":64,"column":7},"action":"insert","lines":["// "]},{"start":{"row":65,"column":4},"end":{"row":65,"column":7},"action":"insert","lines":["// "]},{"start":{"row":66,"column":4},"end":{"row":66,"column":7},"action":"insert","lines":["// "]},{"start":{"row":67,"column":4},"end":{"row":67,"column":7},"action":"insert","lines":["// "]},{"start":{"row":68,"column":4},"end":{"row":68,"column":7},"action":"insert","lines":["// "]},{"start":{"row":69,"column":4},"end":{"row":69,"column":7},"action":"insert","lines":["// "]},{"start":{"row":71,"column":4},"end":{"row":71,"column":7},"action":"insert","lines":["// "]},{"start":{"row":72,"column":4},"end":{"row":72,"column":7},"action":"insert","lines":["// "]},{"start":{"row":73,"column":4},"end":{"row":73,"column":7},"action":"insert","lines":["// "]},{"start":{"row":74,"column":4},"end":{"row":74,"column":7},"action":"insert","lines":["// "]},{"start":{"row":75,"column":4},"end":{"row":75,"column":7},"action":"insert","lines":["// "]},{"start":{"row":76,"column":4},"end":{"row":76,"column":7},"action":"insert","lines":["// "]},{"start":{"row":77,"column":4},"end":{"row":77,"column":7},"action":"insert","lines":["// "]},{"start":{"row":79,"column":4},"end":{"row":79,"column":7},"action":"insert","lines":["// "]},{"start":{"row":80,"column":4},"end":{"row":80,"column":7},"action":"insert","lines":["// "]},{"start":{"row":81,"column":4},"end":{"row":81,"column":7},"action":"insert","lines":["// "]},{"start":{"row":82,"column":4},"end":{"row":82,"column":7},"action":"insert","lines":["// "]},{"start":{"row":84,"column":4},"end":{"row":84,"column":7},"action":"insert","lines":["// "]},{"start":{"row":85,"column":4},"end":{"row":85,"column":7},"action":"insert","lines":["// "]},{"start":{"row":86,"column":4},"end":{"row":86,"column":7},"action":"insert","lines":["// "]},{"start":{"row":87,"column":4},"end":{"row":87,"column":7},"action":"insert","lines":["// "]},{"start":{"row":88,"column":4},"end":{"row":88,"column":7},"action":"insert","lines":["// "]},{"start":{"row":89,"column":4},"end":{"row":89,"column":7},"action":"insert","lines":["// "]},{"start":{"row":90,"column":4},"end":{"row":90,"column":7},"action":"insert","lines":["// "]},{"start":{"row":91,"column":4},"end":{"row":91,"column":7},"action":"insert","lines":["// "]},{"start":{"row":92,"column":4},"end":{"row":92,"column":7},"action":"insert","lines":["// "]}],[{"start":{"row":95,"column":0},"end":{"row":96,"column":0},"action":"insert","lines":["",""],"id":12},{"start":{"row":96,"column":0},"end":{"row":97,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":96,"column":0},"end":{"row":105,"column":22},"action":"insert","lines":["$.get(\"featurePost/?a=\"+ a +\"&b=\"+ b+\"&c=\"+ c,function(html3)","    //             {","    //                 $(\"#main\").append(html3);","                    ","    //                 // Une fois que tout est chargé, on anime","    //                 // et on initialise les barres de progression","    //                 $(\"#main\").removeClass('animated fadeOutRight');","    //                 $(\"#main\").addClass('animated fadeInRight');","    //                 initProgressbar();","    //             });"],"id":13}],[{"start":{"row":97,"column":4},"end":{"row":97,"column":7},"action":"remove","lines":["// "],"id":14},{"start":{"row":98,"column":4},"end":{"row":98,"column":7},"action":"remove","lines":["// "]},{"start":{"row":100,"column":4},"end":{"row":100,"column":7},"action":"remove","lines":["// "]},{"start":{"row":101,"column":4},"end":{"row":101,"column":7},"action":"remove","lines":["// "]},{"start":{"row":102,"column":4},"end":{"row":102,"column":7},"action":"remove","lines":["// "]},{"start":{"row":103,"column":4},"end":{"row":103,"column":7},"action":"remove","lines":["// "]},{"start":{"row":104,"column":4},"end":{"row":104,"column":7},"action":"remove","lines":["// "]},{"start":{"row":105,"column":4},"end":{"row":105,"column":7},"action":"remove","lines":["// "]}],[{"start":{"row":97,"column":0},"end":{"row":97,"column":4},"action":"remove","lines":["    "],"id":15},{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]},{"start":{"row":99,"column":0},"end":{"row":99,"column":4},"action":"remove","lines":["    "]},{"start":{"row":100,"column":0},"end":{"row":100,"column":4},"action":"remove","lines":["    "]},{"start":{"row":101,"column":0},"end":{"row":101,"column":4},"action":"remove","lines":["    "]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"remove","lines":["    "]},{"start":{"row":103,"column":0},"end":{"row":103,"column":4},"action":"remove","lines":["    "]},{"start":{"row":104,"column":0},"end":{"row":104,"column":4},"action":"remove","lines":["    "]},{"start":{"row":105,"column":0},"end":{"row":105,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":97,"column":0},"end":{"row":97,"column":4},"action":"remove","lines":["    "],"id":16},{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]},{"start":{"row":99,"column":0},"end":{"row":99,"column":4},"action":"remove","lines":["    "]},{"start":{"row":100,"column":0},"end":{"row":100,"column":4},"action":"remove","lines":["    "]},{"start":{"row":101,"column":0},"end":{"row":101,"column":4},"action":"remove","lines":["    "]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"remove","lines":["    "]},{"start":{"row":103,"column":0},"end":{"row":103,"column":4},"action":"remove","lines":["    "]},{"start":{"row":104,"column":0},"end":{"row":104,"column":4},"action":"remove","lines":["    "]},{"start":{"row":105,"column":0},"end":{"row":105,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":97,"column":0},"end":{"row":97,"column":4},"action":"remove","lines":["    "],"id":17},{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]},{"start":{"row":99,"column":0},"end":{"row":99,"column":4},"action":"remove","lines":["    "]},{"start":{"row":100,"column":0},"end":{"row":100,"column":4},"action":"remove","lines":["    "]},{"start":{"row":101,"column":0},"end":{"row":101,"column":4},"action":"remove","lines":["    "]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"remove","lines":["    "]},{"start":{"row":103,"column":0},"end":{"row":103,"column":4},"action":"remove","lines":["    "]},{"start":{"row":104,"column":0},"end":{"row":104,"column":4},"action":"remove","lines":["    "]},{"start":{"row":105,"column":0},"end":{"row":105,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":97,"column":0},"end":{"row":97,"column":4},"action":"remove","lines":["    "],"id":18},{"start":{"row":98,"column":0},"end":{"row":98,"column":4},"action":"remove","lines":["    "]},{"start":{"row":99,"column":0},"end":{"row":99,"column":4},"action":"remove","lines":["    "]},{"start":{"row":100,"column":0},"end":{"row":100,"column":4},"action":"remove","lines":["    "]},{"start":{"row":101,"column":0},"end":{"row":101,"column":4},"action":"remove","lines":["    "]},{"start":{"row":102,"column":0},"end":{"row":102,"column":4},"action":"remove","lines":["    "]},{"start":{"row":103,"column":0},"end":{"row":103,"column":4},"action":"remove","lines":["    "]},{"start":{"row":104,"column":0},"end":{"row":104,"column":4},"action":"remove","lines":["    "]},{"start":{"row":105,"column":0},"end":{"row":105,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":96,"column":59},"end":{"row":96,"column":60},"action":"remove","lines":["3"],"id":19}],[{"start":{"row":98,"column":26},"end":{"row":98,"column":27},"action":"remove","lines":["3"],"id":20}],[{"start":{"row":96,"column":19},"end":{"row":96,"column":45},"action":"remove","lines":["?a=\"+ a +\"&b=\"+ b+\"&c=\"+ c"],"id":21}],[{"start":{"row":96,"column":19},"end":{"row":96,"column":20},"action":"insert","lines":["\""],"id":22}],[{"start":{"row":96,"column":21},"end":{"row":96,"column":22},"action":"insert","lines":[" "],"id":23}],[{"start":{"row":105,"column":2},"end":{"row":105,"column":3},"action":"remove","lines":[";"],"id":24}],[{"start":{"row":105,"column":2},"end":{"row":105,"column":3},"action":"insert","lines":[";"],"id":25}],[{"start":{"row":105,"column":0},"end":{"row":107,"column":0},"action":"insert","lines":["","    ",""],"id":26}],[{"start":{"row":104,"column":22},"end":{"row":105,"column":0},"action":"remove","lines":["",""],"id":27}],[{"start":{"row":96,"column":0},"end":{"row":106,"column":3},"action":"remove","lines":["$.get(\"featurePost/\", function(html)","{","    $(\"#main\").append(html);","    ","    // Une fois que tout est chargé, on anime","    // et on initialise les barres de progression","    $(\"#main\").removeClass('animated fadeOutRight');","    $(\"#main\").addClass('animated fadeInRight');","    initProgressbar();","    ","});"],"id":28}],[{"start":{"row":95,"column":0},"end":{"row":96,"column":0},"action":"remove","lines":["",""],"id":29},{"start":{"row":94,"column":0},"end":{"row":95,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":50,"column":1},"end":{"row":51,"column":0},"action":"insert","lines":["",""],"id":30},{"start":{"row":51,"column":0},"end":{"row":51,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":51,"column":4},"end":{"row":61,"column":3},"action":"insert","lines":["$.get(\"featurePost/\", function(html)","{","    $(\"#main\").append(html);","    ","    // Une fois que tout est chargé, on anime","    // et on initialise les barres de progression","    $(\"#main\").removeClass('animated fadeOutRight');","    $(\"#main\").addClass('animated fadeInRight');","    initProgressbar();","    ","});"],"id":31}],[{"start":{"row":52,"column":0},"end":{"row":52,"column":4},"action":"insert","lines":["    "],"id":32},{"start":{"row":53,"column":0},"end":{"row":53,"column":4},"action":"insert","lines":["    "]},{"start":{"row":54,"column":0},"end":{"row":54,"column":4},"action":"insert","lines":["    "]},{"start":{"row":55,"column":0},"end":{"row":55,"column":4},"action":"insert","lines":["    "]},{"start":{"row":56,"column":0},"end":{"row":56,"column":4},"action":"insert","lines":["    "]},{"start":{"row":57,"column":0},"end":{"row":57,"column":4},"action":"insert","lines":["    "]},{"start":{"row":58,"column":0},"end":{"row":58,"column":4},"action":"insert","lines":["    "]},{"start":{"row":59,"column":0},"end":{"row":59,"column":4},"action":"insert","lines":["    "]},{"start":{"row":60,"column":0},"end":{"row":60,"column":4},"action":"insert","lines":["    "]},{"start":{"row":61,"column":0},"end":{"row":61,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":62,"column":0},"end":{"row":103,"column":10},"action":"remove","lines":["    // var a = 0;","    // var b = 0;","    // var c = 0;","    ","    // // Charge le premier vote","    // $(\"#main\").addClass('animated fadeOutRight');","    // $(\"#main\").load(\"featurePost/?a=0&b=0&c=0\", function()","    // {","    //     var truc = $(\".progress-bar[data-id]\");","    //     if($(truc).size() >= 1)","    //         a = $(truc[0]).data(\"id\");","            ","    //     // Charge le deuxième vote","    //     $.get(\"featurePost/?a=\"+ a + \"&b=0&c=0\", function(html1)","    //     {","    //         $(\"#main\").append(html1);","    //         truc = $(\".progress-bar[data-id]\");","    //         if($(truc).size() >= 2)","    //             b = $(truc[1]).data(\"id\");","            ","    //         // Charge le troisième vote","    //         $.get(\"featurePost/?a=\"+a +\"&b=\" + b +\"&c=0\",function(html2)","    //         {","    //             $(\"#main\").append(html2);","    //             truc = $(\".progress-bar[data-id]\");","    //             if($(truc).size() >= 3)","    //                 c = $(truc[2]).data(\"id\");","                ","    //             // Charge le quatrième vote","    //             $.get(\"featurePost/?a=\"+ a +\"&b=\"+ b+\"&c=\"+ c,function(html3)","    //             {","    //                 $(\"#main\").append(html3);","                    ","    //                 // Une fois que tout est chargé, on anime","    //                 // et on initialise les barres de progression","    //                 $(\"#main\").removeClass('animated fadeOutRight');","    //                 $(\"#main\").addClass('animated fadeInRight');","    //                 initProgressbar();","    //             });","    //         });","    //     });","    // });"],"id":33},{"start":{"row":61,"column":7},"end":{"row":62,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":54,"column":0},"end":{"row":56,"column":53},"action":"remove","lines":["        ","        // Une fois que tout est chargé, on anime","        // et on initialise les barres de progression"],"id":34},{"start":{"row":53,"column":32},"end":{"row":54,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"insert","lines":["☺"],"id":35}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"remove","lines":["☺"],"id":36}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"insert","lines":["♦"],"id":37}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"remove","lines":["♦"],"id":38}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"insert","lines":["♥"],"id":39}],[{"start":{"row":84,"column":0},"end":{"row":84,"column":1},"action":"remove","lines":["♥"],"id":40}],[{"start":{"row":82,"column":1},"end":{"row":83,"column":0},"action":"remove","lines":["",""],"id":41}],[{"start":{"row":53,"column":19},"end":{"row":53,"column":25},"action":"remove","lines":["append"],"id":122},{"start":{"row":53,"column":19},"end":{"row":53,"column":20},"action":"insert","lines":["h"]},{"start":{"row":53,"column":20},"end":{"row":53,"column":21},"action":"insert","lines":["t"]},{"start":{"row":53,"column":21},"end":{"row":53,"column":22},"action":"insert","lines":["m"]},{"start":{"row":53,"column":22},"end":{"row":53,"column":23},"action":"insert","lines":["l"]}],[{"start":{"row":53,"column":24},"end":{"row":53,"column":28},"action":"remove","lines":["html"],"id":123}],[{"start":{"row":53,"column":24},"end":{"row":53,"column":25},"action":"insert","lines":["d"],"id":124},{"start":{"row":53,"column":25},"end":{"row":53,"column":26},"action":"insert","lines":["a"]},{"start":{"row":53,"column":26},"end":{"row":53,"column":27},"action":"insert","lines":["t"]},{"start":{"row":53,"column":27},"end":{"row":53,"column":28},"action":"insert","lines":["a"]}],[{"start":{"row":51,"column":35},"end":{"row":51,"column":39},"action":"remove","lines":["html"],"id":125}],[{"start":{"row":51,"column":35},"end":{"row":51,"column":36},"action":"insert","lines":["d"],"id":126},{"start":{"row":51,"column":36},"end":{"row":51,"column":37},"action":"insert","lines":["a"]},{"start":{"row":51,"column":37},"end":{"row":51,"column":38},"action":"insert","lines":["t"]},{"start":{"row":51,"column":38},"end":{"row":51,"column":39},"action":"insert","lines":["a"]}]]},"ace":{"folds":[],"scrolltop":597,"scrollleft":0,"selection":{"start":{"row":51,"column":39},"end":{"row":51,"column":39},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":32,"state":"start","mode":"ace/mode/javascript"}},"hash":"80a328199efb335c6a47cb76f1efcfca2ac0a46a","timestamp":1448918035000}