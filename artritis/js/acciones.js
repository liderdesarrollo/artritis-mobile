/*
    bc  => pagebeforecreate
    c   => pagecreate
    i   => pageinit
    bs  => pagebeforeshow
    s   => pageshow
    bh  => pagebeforehide
    h   => pagehide
    rm  => pageremove
    bC  => pagebeforechange
    bl  => pagebeforeload
    l   => pageload
*/

var webService = "http://72.29.87.162/~artritis/wordpress/zopp.php";

var router = new $.mobile.Router({
  "#home": {handler: "home", events: "s" },
  "#menu": {handler: "homepage", events: "s" },
  "#entrades": {handler: "entrades", events: "s" },
  "#article": {handler: "article", events: "s" },
},{
  home: function(type,match,ui){
    $('span').unbind('click').click(function(e){
        var idioma = e.target.className;
        localStorage.setItem("idioma", idioma);
        $.mobile.changePage( "#menu", { role: "page" } );
        $('#menu div[data-role="content"]').css('display','none');
    });
  },
  homepage: function(type,match,ui){
     if(localStorage.getItem('idioma') == 'eng'){
         $('.title_app').text('Professional tips for arthritis');
         $('.title_app').text('Professional tips for arthritis');
     }else{
         $('.title_app').text('Consejos profesionales para la artritis');
     }
     $('#menu div[data-role="content"]').css('display','none');
     $.mobile.loading( 'show', {
         text: 'Cargando...',
         textVisible: true,
         theme: 'z',
         html: ""
     });
     
     setTimeout(function(){
         $('.title').unbind('click').click(function(){
             $('.content_entries').fadeOut(5);
              $(this).parent().find('.imagen').find('a').unbind('click').click();
          });
          
           $('.imagen a').click(function(e) {
                 e.preventDefault();
                 var href = $(this).attr("href");
                clean_containers();
                 
                 window.location = href;
                 
             });
             $('.back_languaje').unbind('click').click(function() {
                 $.mobile.changePage( "#home", { role: "page" } );
             });
     },500);
     
     
   /// if(typeof(Storage) !== "undefined") {
     
      //  if(localStorage.getItem("datos")==null)
    //    {
           $.ajax({
              url:webService,
              data:{
                accion:"categorias",
                idioma:localStorage.getItem("idioma")
              },
              type:"GET",
              success:function(data){
                  
                  var datos = JSON.parse(data);
                  
                  localStorage.setItem("datos", JSON.stringify(datos));
    
                  $(".categories").empty();
                  var str="";
                  var c=0;
                  for(var i = 0; i < datos.length; i++){
                      if(i%2==0){
    
                          var html=jQuery("#categorias0").html();
    
                      }else{
    
                          var html=jQuery("#categorias1").html();
    
                      }
    
                      if(c==0){
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                    .replace("##id",datos[i].id)
                                    .replace("##titulo",datos[i].nombre)
                                    .replace("##img",datos[i].img);
                          c++;
                      }else if(c==2){
                          str += "</div>";
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                          c=1;
                      }else{
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                          c++;
                      }
    
                  }
    
                  $(".categories").append(str);
                  $.mobile.loading( 'hide', {
                     text: 'foo',
                     textVisible: true,
                     theme: 'z',
                     html: ""
                 });   
                 $('#menu div[data-role="content"]').toggle("explode");
              }
              
        });
        
       /* }
        else
        {
            var datos = JSON.parse(localStorage.getItem("datos"));
            
            $(".categories").empty();
                  var str="";
                  var c=0;
                  for(var i = 0; i < datos.length; i++){
                      if(i%2==0){
    
                          var html=jQuery("#categorias0").html();
    
                      }else{
    
                          var html=jQuery("#categorias1").html();
    
                      }
    
                      if(c==0){
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                    .replace("##id",datos[i].id)
                                    .replace("##titulo",datos[i].nombre)
                                    .replace("##img",datos[i].img);
                          c++;
                      }else if(c==2){
                          str += "</div>";
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                          c=1;
                      }else{
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                          c++;
                      }
    
                  }
    
                  $(".categories").append(str);
                  $.mobile.loading( 'hide', {
                     text: 'foo',
                     textVisible: true,
                     theme: 'z',
                     html: ""
                 });   
                 
            
            
        }*/
        
  //  }
    
      

  },
  entrades:function(type,match,ui){
      $('.content_entries').empty();
      $.mobile.loading( 'show', {
         text: 'Cargando...',
         textVisible: true,
         theme: 'z',
         html: ""
     }); 
      var parameters = router.getParams(match[1]);
      console.log(localStorage.getItem('idioma'));
      $.ajax({
          type: "GET",
          url: webService,
          data:{
              accion:"entradas",
              id: parameters.id,
                idioma:localStorage.getItem("idioma")
          },success:function(data){
              var response = JSON.parse(data);
              var entries_template = $('#entries').html();
              var category = "";
              response.forEach(function(i,o){
                var html = entries_template.replace('##img',i.img)
                                            .replace('##title', i.title)
                                            .replace('##id',i.id);

                category = i.category;
                    $('.content_entries').append(html);
                });
                 $.mobile.loading( 'hide', {
                     text: 'Cargando...',
                     textVisible: true,
                     theme: 'z',
                     html: ""
                 });

              $('.title_entrade').text(category);
             $('.content_entries').fadeIn(500);
          }
      });
      
        $('.back').unbind('click').click(function(){
            clean_containers();
            $('#menu div[data-role="content"]').css('display','none');
            history.back();
        });
        setTimeout(function(){
            $('.item_category .text a').click(function(e){
                e.preventDefault();
                var href = $(this).attr("href");
                clean_containers();
                window.location = href;
            });
            $('.item_category').click(function(e){
                $(e.target).find('.text').find('a').click();
            });
            $('.item_category_container img').click(function(e){
                $(e.target).parent().parent().parent().find('.text').find('a').click();
            });
        },500);
  },
  article:function(type,match,ui){
      $('.content_article').empty();
      $('.content_article').css("display","none!important");
      
      var parameters = router.getParams(match[1]);
      var id = parameters.id;
      $.ajax({
          type: "GET",
          url: webService,
          data: {
              id:id,
              accion: "articulo",
              idioma:localStorage.getItem('idioma')
          },success: function(data){
              var response = JSON.parse(data);
              console.log(response);
              var template = $('#detalle_entrada').html();
              var img_slide = $('#slide').html();
              var html = template.replace("##title",response.title).replace("##content",response.content).replace('##slider',response.galeria_);
              var galeria = response.ale;
              var htm ="";
              galeria.forEach(function(o,i){
                  htm += img_slide.replace('##slide',o);
              });
              $('.content_article').append(html);
               $('.content_article').fadeIn(500);
              $('.content_article').find('.flexslider').find('.slides').html(htm);
              
              $('.flexslider').flexslider({controlNav:false});
          }
      });
      $('.back').unbind('click').click(function(){
          clean_containers()
            history.back();
        });
  },
}, { 
  defaultHandler: function(type, ui, page) {
    console.log("Default handler called due to unknown route (" 
      + type + ", " + ui + ", " + page + ")"
    );
  },
  defaultHandlerEvents: "s",
  defaultArgsRe: true
});

$('.back').unbind('click').click(function(){
    clean_containers()
    history.back();
});
function clean_containers(){
    $('#entrades div[data-role="content"]').empty();
    $('#article div[data-role="content"]').empty();
}


