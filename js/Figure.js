class Figure {

  constructor (posX , posY, fill, context) {
    this.posX = posX;
    this.posY = posY;
    this.fill = fill;
    this.resaltado= false;
    this.resaltadoEstilo= "red";    
    this.ctx = context;

  }

  setFill(fill){
     this.fill = fill;
  }
  getFill(){
     return this.fill;
  }

setPosX (posX) {
    this.posX = posX;
  }

  setPosY (posY) {
    this.posY = posY;

  }

  getPosY () {
     return this.posY;

        }

   getPosX(){
       return this.posX;
   }     

  getPosition (){
     return {
        x: this.getPosX(),
        y: this.getPosY()
     };


  }

 setPosition (x,y){
    this.posX=x;
    this.posY =y;
  
 }




 draw(){
    this.ctx.fillStyle = this.fill; 
  }

  setResaltado(resaltado){
       this.resaltado= resaltado;
  }

  getResaltado(){
       return this.resaltado;
  }

  isPointInside( x,y){};


  
 }

