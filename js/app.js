//Declaramos algunas variables que utilizaremos
var image;
var timer;
var puntos;
var errores;
$(document).ready(function() {
   alert('Da click en la carita....mientras puedas :)');
   canvas = $('#canvas');
   puntos = 0;//Aciertos del jugador
   errores = 0;//errores del jugador


   //Inicializamos el canvas con la libreria, le pasamos el tamaño, para el ejemplo usamos window.innerWidth que da el tamaño de la pantalla del usuario
   var stage = new Kinetic.Stage({
        container: 'canvas',
        width: window.innerWidth-30,
        height: window.innerHeight-30,
      });

   //Inicializamos layer, se encarga de agregar objetos al canvas
   var layer = new Kinetic.Layer();


   //Inicializamos nuestra imagen, cargamos de un archivo
   var imageObj = new Image();
   imageObj.src = 'image/carita.png';
   //Funcion se activa cuando la imagen se cargo
    imageObj.onload = function() {
      //creamos un objeto imagen de kineticj, con la posicion, el tamaño
       image = new Kinetic.Image({
          x: window.innerWidth/2,
          y: window.innerHeight/2,
          image: imageObj,
          width: 70,
          height: 70
        });
      //agregasmos la imagen al canvas 
      layer.add(image);
      stage.add(layer);

      //evento al darle click a la carita
      image.on('click',function(){
          clearInterval(timer);//reseteamos el timer
          puntos++;//aumentamos el puntaje
          //cambiamos la posicion de la imagen y la volvemos a pintar
          image.x(Math.floor((Math.random() * window.innerWidth-30)));
          image.y(Math.floor((Math.random() * window.innerHeight)));
          layer.draw();

          //incializamos el timer...bajando el teimpo conforme a los puntos que llevamos
          timer = setInterval(function(){
            image.x(Math.floor((Math.random() * window.innerWidth-30)));
            image.y(Math.floor((Math.random() * window.innerHeight-30)));
            layer.draw();
            errores++;
            //comprobamos cuantas fallas llevamos y si son 6 entonces mandamos mensaje de los puntos hechos y recargamos la pagina para volver a empezar
            if(errores>5){
              clearInterval(timer);
              alert('Perdiste :( Tus puntos: '+puntos);
              location.href = "index.html";              
            }
          },3000-(puntos*80));
      });
    };
    

    
    //inicializamos el timer...este solo es cuando se carga la pagina
    timer = setInterval(function(){
      image.x(Math.floor((Math.random() * window.innerWidth-30)));
      image.y(Math.floor((Math.random() * window.innerHeight-30)));
      layer.draw();
      errores++;
      if(errores>5){
        clearInterval(timer);
        alert('Perdiste :( Tus puntos: '+puntos);
        location.href = "index.html";
      }
    },3000);


           
});