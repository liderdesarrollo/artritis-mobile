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

var router=new $.mobile.Router({
  "#home": {handler: "home", events: "s" },
  "#page1": {handler: "homepage", events: "s" },
  "#page2": {handler: "entrades", events: "s" },
  "#page3": {handler: "article", events: "s" },
},{
  home: function(type,match,ui){
    $('span').click(function(){
        $.mobile.changePage( "#page1", { role: "page" } );
    });
  },
  homepage: function(type,match,ui){
     
     $.mobile.loading( 'show', {
         text: 'Cargando...',
         textVisible: true,
         theme: 'z',
         html: ""
     });
     setTimeout(function(){
         $('.title').click(function(){
              $(this).parent().find('.imagen').find('a').click();
          });
     },500);
     
     
    if(typeof(Storage) !== "undefined") {
     
        if(localStorage.getItem("datos")==null)
        {
           $.ajax({
              url:webService,
              data:{
                accion:"categorias"
              },
              type:"GET",
              success:function(data){
                  
                  var datos = JSON.parse(data);
                //   console.log(datos);
                  
                  localStorage.setItem("datos", JSON.stringify(datos));
    
                  $(".categories").empty();
                  var str="";
                  var c=0;
                  for(var i = 0; i < datos.length; i++){
                        // console.log(datos[i]);
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
              }
              
        });
        
        }
        else
        {
            var datos = JSON.parse(localStorage.getItem("datos"));
            
            $(".categories").empty();
                  var str="";
                  var c=0;
                  for(var i = 0; i < datos.length; i++){
                        // console.log(datos[i]);
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
                 
            
            
        }
        
    }
    
      

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
      console.log(parameters.id);
      $.ajax({
          type: "GET",
          url: webService,
          data:{
              accion:"entradas",
              id: parameters.id
          },success:function(data){
              var response = JSON.parse(data);
              var entries_template = $('#entries').html();
              response.forEach(function(i,o){
                //   console.log(i); Objeto
                //   console.log(o); Indice
                var html = entries_template.replace('##img',i.img)
                                            .replace('##title', i.title)
                                            .replace('##id',i.id);
                                            
                $('.content_entries').append(html);
              });
              $.mobile.loading( 'hide', {
                 text: 'Cargando...',
                 textVisible: true,
                 theme: 'z',
                 html: ""
             }); 
          }
      });
      
        $('.back').unbind('click').click(function(){
            history.back();
        });
  },
  article:function(type,match,ui){
      $('.content_article').empty();
      var parameters = router.getParams(match[1]);
      var id = parameters.id;
      $.ajax({
          type: "GET",
          url: webService,
          data: {
              id:id,
              accion: "articulo"
          },success: function(data){
              var response = JSON.parse(data);
              var template = $('#detalle_entrada').html();
              var img_slide = $('#slide').html();
              var html = template.replace("##title",response.title).replace("##content",response.content).replace('##slider',response.galeria_);
              var galeria = response.ale;
              var htm ="";
              galeria.forEach(function(o,i){
                  htm += img_slide.replace('##slide',o);
              });
              console.log(response);
              $('.content_article').append(html);
              $('.content_article').find('.flexslider').find('.slides').html(htm);
              
              $('.flexslider').flexslider({controlNav:false});
          }
      });
      $('.back').unbind('click').click(function(){
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

$('.back').click(function(){
    alert()
    history.back();
});
var control = true;
function localStoriage(json){
    if(control){
        console.log("funcrion");
        console.log(json);
        control = false;
    }else{
        control = true;
    }
}
  