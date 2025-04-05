
document.addEventListener("DOMContentLoaded", () => {
     const botonDraw = document.getElementById("btn-draw");
     
     if (botonDraw) {
         botonDraw.addEventListener("click", addFigures);
     } else {
         console.error("Error: No se encontró el botón con id 'btn-draw'");
     }

     mostrarInstrucciones(); // Mostrar instrucciones al cargar la página
 });





let canvas = document.getElementById ("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIGU = 30;

let figures = [];
let lastClickedFigure= null;
let isMouseDown = false;


// Agregar instrucciones en el HTML
const instrucciones = document.createElement("div");
instrucciones.id = "instrucciones";
instrucciones.style.position = "absolute";
instrucciones.style.top = "10px";
instrucciones.style.left = "50%";
instrucciones.style.transform = "translateX(-50%)";
instrucciones.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
instrucciones.style.color = "white";
instrucciones.style.padding = "10px";
instrucciones.style.borderRadius = "5px";
document.body.appendChild(instrucciones);



function mostrarInstrucciones() {
    instrucciones.innerHTML = `
        <b>Instrucciones:</b><br>
        - Haz clic en una figura para seleccionarla.<br>
        - Mantén presionado y arrastra para mover la figura.<br>
        - Usa las <b>flechas del teclado</b> para mover la figura seleccionada.<br>
        - Presiona <b>ESC</b> o haz clic fuera para deseleccionar.<br>
    `;
}


// Mensaje flotante para acciones
const mensajeDiv = document.createElement("div");
mensajeDiv.id = "mensaje";
mensajeDiv.style.position = "absolute";
mensajeDiv.style.bottom = "10px"; // Ahora está en la parte inferior
mensajeDiv.style.left = "50%";
mensajeDiv.style.transform = "translateX(-50%)";
mensajeDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
mensajeDiv.style.color = "white";
mensajeDiv.style.padding = "8px 15px";
mensajeDiv.style.borderRadius = "5px";
mensajeDiv.style.fontSize = "14px"; // Tamaño de fuente más pequeño
mensajeDiv.style.display = "none";
document.body.appendChild(mensajeDiv);

function mostrarMensaje(mensaje) {
    mensajeDiv.innerText = mensaje;
    mensajeDiv.style.display = "block";

    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 2000);
}


function mostrarMensaje2(texto) {
    let infoMensaje = document.getElementById("infoMensaje");
    infoMensaje.innerText = texto;
    infoMensaje.style.display = "block";

    setTimeout(() => {
        infoMensaje.style.display = "none";
    }, 2000);
}



function randomRGBA(){
         let colores=[
           ["#693EFE","#D8FC40"],
        
           ["#FB41B0","#41FB8C"],

           ["#FFE53D","#3D57FF"]];

         let color = colores[Math.floor(Math.random()*colores.length)];
           
            return color [Math.floor(Math.random() * 2)]; // Retorna uno de los dos colores;

     }

function addFigure (){

    if( Math.random() >  0.66 ){
           addRect();
    } else if (Math.random() > 0.36) {
         addCircle();
    } else  {
         addCuadrado();
    }
     
    drawFigure();
}


function addFigures(){
      addFigure();
      if(figures.length < CANT_FIGU){
           setTimeout(addFigures,333);
      }
}





function addRect() {

  
    
        let posX = Math.round(Math.random() * canvasWidth);
         let posY = Math.round(Math.random() * canvasHeight);
//    se pinta de un color fijo para poder diferenciar colores complementarios entre las demas figuras
    let color= " #00FFFF" ;

    let rect = new Rect(posX, posY,80,40,color,ctx);
    figures.push(rect);    

}


function addCircle(){
       

    let posX= Math.round(Math.random()*  canvasWidth);
    
    let posY= Math.round(Math.random()*  canvasHeight);
    let color= randomRGBA();
    let circle = new Circle(posX, posY, 15, color, ctx);

    
    figures.push(circle);



}

 function addCuadrado(){
     let posX = Math.round(Math.random() * canvasWidth);
     let posY = Math.round(Math.random() * canvasHeight);

     let color= randomRGBA();

      let cuad = new Rect(posX,posY,20,20,color,ctx);
      figures.push(cuad);  
}


function drawFigure(){
    clearCanvas();   // si elimino no se limpia el canvas
    for ( let i =0 ; i < figures.length ; i ++){
          figures[i].draw();
    }
      };


function clearCanvas(){
ctx.fillStyle = '#F8F8FF';
// ctx.fillRect(0,0,canvasWidth,canvasHeight);
ctx.fillRect(0, 0, canvas.width, canvas.height);


};


function findClickedFigure(x,y){
   for (let i =0 ;i<figures.length;i++ ){
     const element = figures[i];
        if(element.isPointInside(x,y)){
             return element ;
        }
   }
}


function onMouseDown(e) {
    isMouseDown = true;

    // Obtener la posición del canvas en la pantalla
    const rect = canvas.getBoundingClientRect();

    // Obtener la posición del mouse dentro del canvas sin escalado
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Buscar si hay una figura en la posición del clic
    let clickedFigure = findClickedFigure(x, y);

    if (clickedFigure) {
        clickedFigure.setResaltado(true);
        lastClickedFigure = clickedFigure;

        // Mostrar mensaje con info de la figura
        mostrarMensaje(`Seleccionaste una figura`);

        // Corregir el cálculo del offset usando la posición absoluta de la figura
        offsetX = x - lastClickedFigure.posX;
        offsetY = y - lastClickedFigure.posY;
    } else {
        lastClickedFigure = null;
    }
}




function onMouseUp(e){
     mouseUp = true; 
     mouseDown = false;
     if (lastClickedFigure) {
          lastClickedFigure.setResaltado(false);
          drawFigure();
      }
      lastClickedFigure= null;
}



function onMouseMove(e) {
    if (isMouseDown && lastClickedFigure) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Mover la figura con respecto al cursor y su offset
        lastClickedFigure.setPosition(x - offsetX, y - offsetY);
        drawFigure();  // Redibujar las figuras
    }
}

// 🎮 Soporte para mover figuras con las flechas del teclado
function onKeyDown(e) {
    if (lastClickedFigure) {
        const step = 5;
        switch (e.key) {
            case "ArrowUp":
                lastClickedFigure.posY -= step;
                break;
            case "ArrowDown":
                lastClickedFigure.posY += step;
                break;
            case "ArrowLeft":
                lastClickedFigure.posX -= step;
                break;
            case "ArrowRight":
                lastClickedFigure.posX += step;
                break;
            case "Escape":
                lastClickedFigure.setResaltado(false);
                lastClickedFigure = null;
                mostrarMensaje("Figura deseleccionada");
                break;
            default:
                return;
        }
        drawFigure();
    }
}



canvas.addEventListener('mousedown', onMouseDown, false);

canvas.addEventListener('mousemove' ,onMouseMove, false);

canvas.addEventListener('mouseup', onMouseUp, false);
document.addEventListener("keydown", onKeyDown, false);