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
  "#menu": {handler: "menu", events: "s" },
  "#entrades": {handler: "entrades", events: "s" },
  "#article": {handler: "article", events: "s" },
},{
  home: function(type,match,ui){
      $('.home').hide();
      $.mobile.loading( 'show', {
         text: 'Sincronizando...',
         textVisible: true,
         theme: 'z',
         html: ""
     });
      $.ajax({
          type:"GET",
          url:webService,
          data:{
              accion:"sincronizacion"
          },
          success:function(data){
              var datos = JSON.parse(data);
              
              localStorage.setItem('all_data_eng',JSON.stringify(datos[0]));
              localStorage.setItem('all_data_esp',JSON.stringify(datos[1]));
              $.mobile.loading( 'hide', {
                 text: '',
                 textVisible: true,
                 theme: 'z',
                 html: ""
             });
             $('.home').show();
          }
      });
    $('span a').unbind('click').click(function(e){
        $('#menu div[data-role="content"]').css('display','none');
    });
  },
  menu: function(type,match,ui){
     var parameters = router.getParams(match[1]);
     var idioma = parameters.lang;
     
     localStorage.setItem("idioma", idioma);
     
     if(localStorage.getItem('idioma') == 'eng'){
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
     
     $('.title_app').unbind('click').click(function(e) {
         e.preventDefault();
     });
     
     setTimeout(function(){
         $('.title').unbind('click').click(function(){
             $('.content_entries').fadeOut(5);
              var col = $(this).css('border-bottom-color');
              localStorage.setItem('color',col);
              var href = $(this).parent().find('.imagen').find('a').attr("href");
              $.mobile.changePage(href,{role:"page",transition:"pop"});
          });
          
           $('.imagen a').click(function(e) {
                 e.preventDefault();
                 var color = $(this).parent().parent().find('.titulo').css('border-bottom-color');
                 localStorage.setItem('color',color);
                 var href = $(this).attr("href");
                 var c = localStorage.getItem('color');
                 
                clean_containers();
                 
                 $.mobile.changePage(href,{role:"page",transition:"slidefade"});
                 
             });
             $('.back_languaje').unbind('click').click(function() {
                 $('.home').css('display','none');
                 $.mobile.changePage( "#home", { 
                    role: "page",
                    transition: "flow"
                 } );
             });
     },500);
     
     
    if(typeof(Storage) !== "undefined") {
     
        if(localStorage.getItem("all_data_eng")==null)
        {
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
                  var colores = [];
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
                                    colores[i] = datos[i].color;
                          c++;
                      }else if(c==2){
                          str += "</div>";
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                                        colores[i] = datos[i].color;
                          c=1;
                      }else{
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                                        colores[i] = datos[i].color;
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
                 var items = $('.m > div');
                 
                for(var k = 0; k < colores.length; k++){
                    items.eq(k).find('.titulo').css('border-bottom-color', colores[k]);
                }
                 $('#menu div[data-role="content"]').fadeIn(500);
              }
              
        });
        
        }
        else
        {
            var colores = [];
            var datos = null;
            if(localStorage.getItem('idioma') == 'eng'){
                 datos = JSON.parse(localStorage.getItem("all_data_esp")).data;
             }else{
                 datos = JSON.parse(localStorage.getItem("all_data_eng")).data;
             }
            
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
                                    colores[i] = datos[i].color;
                          c++;
                      }else if(c==2){
                          str += "</div>";
                          str += "<div class='m'>";
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                                        colores[i] = datos[i].color;
                          c=1;
                      }else{
                          str += html.replace("##titulo",datos[i].nombre)
                                        .replace("##id",datos[i].id)
                                        .replace("##titulo",datos[i].nombre)
                                        .replace("##img",datos[i].img);
                                        colores[i] = datos[i].color;
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
                 var items = $('.m > div');
                for(var k = 0; k < colores.length; k++){
                    items.eq(k).find('.titulo').css('border-bottom-color', colores[k]);
                }
                 $('#menu div[data-role="content"]').fadeIn(500);
            
            
        }
        
    }
    
      

  },
  entrades:function(type,match,ui){
      
      var c = localStorage.getItem('color');
      cambiar_colores(ui.toPage,c);
      
      $('.content_entries').empty();
      $.mobile.loading( 'show', {
         text: 'Cargando...',
         textVisible: true,
         theme: 'z',
         html: ""
     }); 
     
     
     
      var parameters = router.getParams(match[1]);
      
         if(typeof(Storage) !== "undefined") {
         
            if(localStorage.getItem("all_data_eng")==null){
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
                                                    .replace('##id',i.id)
                                                    .replace('##cat_id',i.cat_id);
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
            }else{
                var response = null;
                 if(localStorage.getItem('idioma') == 'eng'){
                     
                     response = $.grep(
                                          JSON.parse(localStorage.getItem('all_data_eng')).data,
                                          function(e){
                                                return e.id == parameters.id;
                                          }
                                      );
                     
                     response = response[0].entradas;
                     
                     var entries_template = $('#entries').html();
                      var category = "";
                      response.forEach(function(i,o){
                        var html = entries_template.replace('##img',i.img)
                                                    .replace('##title', i.title)
                                                    .replace('##id',i.id)
                                                    .replace('##cat_id',i.cat_id);
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
                    
                 }else{
                     
                      response = $.grep(
                                          JSON.parse(localStorage.getItem('all_data_esp')).data,
                                          function(e){
                                                return e.id == parameters.id;
                                          }
                                      );
                 
                     response = response[0].entradas;

                     var entries_template = $('#entries').html();
                      var category = "";
                      response.forEach(function(i,o){
                        var html = entries_template.replace('##img',i.img)
                                                    .replace('##title', i.title)
                                                    .replace('##id',i.id)
                                                    .replace('##cat_id',i.cat_id);
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
                 
            }
         }
      
        $('.back').unbind('click').click(function(){
            clean_containers();
            $('#menu div[data-role="content"]').css('display','none');
            history.back();
        });
        setTimeout(function(){
            $('.item_category .text a').click(function(e){
                e.preventDefault();
                var id_cat = $(this).attr('data-cat-id');
                var href = $(this).attr("href");
                clean_containers();
                $.mobile.changePage(href+"&id_cat="+id_cat,{role:"page",transition:"flow"});
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
      
      var c = localStorage.getItem('color');
      cambiar_colores(ui.toPage,c);
      
      var parameters = router.getParams(match[1]);
      var id = parameters.id;
      var id_cat = parameters.id_cat;
      
      if(typeof(Storage) !== "undefined") {
         
            if(localStorage.getItem("all_data_eng")==null){
                $.ajax({
                  type: "GET",
                  url: webService,
                  data: {
                      id:id,
                      accion: "articulo",
                      idioma:localStorage.getItem('idioma')
                  },success: function(data){
                      var response = JSON.parse(data);
                      var template = $('#detalle_entrada').html();
                      var img_slide = $('#slide').html();
                      var html = template.replace("##title", response.title).replace("##content", response.content).replace('##slider', response.galeria_);
                      var galeria = response.ale;
                      var htm ="";
                      galeria.forEach(function(o,i){
                          htm += img_slide.replace('##slide', o);
                      });
                      
                      $('.content_article').append(html);
                      $('.content_article').fadeIn(800);
                      $('.content_article').find('.flexslider').find('.slides').html(htm);
                      
                      $('.flexslider').flexslider({controlNav:false});
                  }
              });
            }else{
                var response = null;
                 if(localStorage.getItem('idioma') == 'eng'){
                    response = $.grep(
                                          JSON.parse(localStorage.getItem('all_data_eng')).data,
                                          function(e){
                                                return e.id == id_cat;
                                          }
                                      );
                                      
                    response = $.grep(
                                          response[0].entradas,
                                          function(e){
                                                return e.id == id;
                                          }
                                      );
                    
                    response = response[0];
                 }else{
                     response = $.grep(
                                          JSON.parse(localStorage.getItem('all_data_esp')).data,
                                          function(e){
                                                return e.id == id_cat;
                                          }
                                      );
                                      
                    response = $.grep(
                                          response[0].entradas,
                                          function(e){
                                                return e.id == id;
                                          }
                                      );
                    response = response[0];
                 }
                 console.log(response);
                 var template = $('#detalle_entrada').html();
                  var img_slide = $('#slide').html();
                  var html = template.replace("##title", response.title).replace("##content", response.content).replace('##slider', response.galeria_);
                  var galeria = response.ale;
                  var htm ="";
                  galeria.forEach(function(o,i){
                      htm += img_slide.replace('##slide', o);
                  });
                  $('.content_article').append(html);
                   $('.content_article').fadeIn(800);
                  $('.content_article').find('.flexslider').find('.slides').html(htm);
                  
                  $('.flexslider').flexslider({controlNav:false});
            }
      }
      $('.back').unbind('click').click(function(){
            clean_containers();
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
function cambiar_colores(obj,c){
    var color = c;
    obj.find('div[data-role="header"]').css('border-bottom-color',color);
    obj.find('div[data-role="header"]').find('h1').find('a').css({'color':color,'border-right-color':color});
    obj.find('div[data-role="header"]').find('h1').find('span').css('color',color);
    setTimeout(function(){
        $('.item_category').css('border-color',color);
        $('.item_category .item_category_container').css('border','thin solid '+color);
        $('.item_category h5 ').css({'text-shadow':'1px 1px 1px white'});
        $('.flexslider .slides ').css({'border-bottom':'12px solid '+color});
        $('#article h1').css({'color':color,'border-bottom':"1px solid "+color});
        
    },500);
    console.log($('.item_category'));
}

