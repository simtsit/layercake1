
      $(function(){
               
        var white="#ffffff"; 
        var red ="#c8102f";

        // canvas size
        var canvasWidth = 240;
        var canvasHeight = 280;

        var map = $("#map");
        var areas = $("#areas");
        var canvas = $("#canvas")[0];
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
        var c = canvas.getContext("2d");
        

        $.fn.render = function(){ 
          this.data.apply(this, arguments);
          render();
        }
          
        function clear(){    
          // c.fillStyle = "transparent";
          c.fillStyle = "#4a4a4c";
          c.fillRect(0, 0, canvas.width, canvas.height);
        }
        

        // URLs
        var urls = [
          "http://www.url-0000.com",
          "http://www.url-1111.com",
          "http://www.url-2222.com",
          "http://www.url-3333.com",
          "http://www.url-4444.com",
          "http://www.url-5555.com",
          "http://www.url-6666.com",
          "http://www.url-7777.com",
        ];


        // Colors 
        var colors= [
          // "#ee1bcd",
          "#eacbcd",
          "#e6cbcd",
          "de3cbcd",
          "#dfcbcd",
          "#dbcbcd",
          "#d8cbcd",
          "#d4cbcd",
          "#d0cbcd",
        ];



// Number of Layers
var layerCounter = urls.length;


// Base of the Layer Coords
var base = 30;

// Space Between Layers
var layerSpace = base-10;

// First Layer Cords
var point1x = base*4;  // Point 1 X
var point1y = base*5;  // Point 1 Y

var point2x = base*7+base-layerSpace;  // Point 2 X
var point2y = base*3+base-layerSpace;  // Point 2 Y

var point3x = base*8;              // Point 3 X
var point3y = base*3+layerSpace;  // Point 3 Y

var point4x = base*4;             // Point 4 X
var point4y = base*5+layerSpace;  // Point 4 Y

var point5x = base*0;             // Point 5 X
var point5y = base*3+layerSpace;  // Point 5 Y

var point6x = base*0+layerSpace;       // Point 6 X
var point6y = base*3+base-layerSpace;  // Point 6 Y




    // Create all the active areas of rectangle areas
      
    for (var i=layerCounter-1; i>0; i--){

        $('<area/>', {
          shape : "poly",
 
          coords : point1x + "," + (130+point1y-i*layerSpace) + "," + point2x + "," + (130+point2y-i * layerSpace) + "," + point3x + "," + (130+point3y- i * layerSpace) + "," + point4x + "," + (130+point4y - i * layerSpace) + "," + point5x + "," + (130+point5y - i * layerSpace) + "," + point6x + "," + (130+point6y- i * layerSpace), 
          href :  urls[i-1],
          alt : "rect",
          id: "rect rect"+(i+1)+"-active-area"
        }).data({
          inc : i,
          fillStyle: colors[i-1],

        }).mouseenter(function(){
          $(this).render("fillStyle", "#d43a47");
          
        }).mouseleave(function(){

          $(this).render("fillStyle", colors[$(this).data("inc")]);

          console.log(i);
        }).appendTo(areas); 
  }




      // Create the the active area of the last rectangle

        $('<area />', {
          shape : "poly",

          coords : point1x + "," + (130-(layerSpace*(layerCounter-1))+point1y-i*layerSpace) + "," + base*8 + "," + (130-(layerSpace*(layerCounter))+point3y- i * layerSpace) + "," + base*4 + "," + (130-(layerSpace*(layerCounter + 2))+point6y- i * layerSpace) + "," + base*0 + "," + (130-10-(layerSpace*(layerCounter-1))+point6y- i * layerSpace) ,
          href :  urls[layerCounter-1],
          alt : "rect",
          class: "rect1-active-area"

        }).data({
          
            fillStyle: colors[layerCounter-1],

        }).mouseenter(function(){
          $(this).render("fillStyle", "#d43a47");
          
        }).mouseleave(function(){
          $(this).render("fillStyle",colors[layerCounter-1]);

          
        }).appendTo(areas);




        render();
        

        function setStyle(fillStyle, strokeStyle, lineWidth){
          if (fillStyle){
            c.fillStyle = fillStyle; 
            
          }
          if (strokeStyle){
            if (lineWidth){
              c.lineWidth = lineWidth; 
            }
            c.strokeStyle = strokeStyle;   
          }
        }
        
        function fillStroke(fillStyle, strokeStyle){
          if (fillStyle) c.fill();
          if (strokeStyle) c.stroke();
        }
        
        function render(noClear){
          if (!noClear){
            clear();
          }
          
          areas.children().each(function(){
            var area = $(this);
            var shape = area.attr("shape");
            var coords = area.attr("coords").split(',');
            var fillStyle = area.data("fillStyle");
            var strokeStyle = area.data("strokeStyle");
            var lineWidth = area.data("lineWidth");
            
    if (shape == "poly"){
              
              if (fillStyle){
                c.fillStyle = fillStyle; 
                
              }
              if (strokeStyle){
                if (lineWidth){
                  c.lineWidth = lineWidth; 
                }
                c.strokeStyle = strokeStyle;   
              }
              
              
              c.beginPath();
              var leng = coords.length;
              c.moveTo(coords[0], coords[1]);
              for (var i = 2; i < leng; i+=2){
                c.lineTo(coords[i], coords[i+1]); 
              }
              c.closePath();
              
              fillStroke(fillStyle, strokeStyle);
              
            }
            
            c.lineWidth = 1;
          });
        }
      });


  function addLayer(){}

  function removeLayer(){}


//   $('#orangeDiv').layercake(['htpp://www.111.pl','http:www.222.pl']);


//   layerCake( ['htpp://www.111.pl','http:www.222.pl'], $('#orangeDiv'));

// // the best
//   var l = new LayerCake( ['htpp://www.111.pl','http:www.222.pl'], $('#orangeDiv'));
