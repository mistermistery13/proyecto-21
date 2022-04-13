var fantasma,puerta,balcon,torre;
var fantasma_parado,puertaImg,balconImg,torreImg;  
var spookySound;
var invisibleBlockGroup, invisibleBlock;
var Gpuertas,Gbalcon;
var gameState = "play"


function preload(){
  // cargar imagenes y sonido
  spookySound = loadSound ("spooky.wav");
  fantasma_parado = loadAnimation ("ghost-standing.png");
  puertaImg = loadImage ("door.png");
  balconImg = loadImage ("climber.png");
  torreImg = loadImage ("tower.png");

}

function setup() {
  createCanvas(600,600);
  spookySound.loop(); //REPRODUCCIÓN EN BUCLE
   
  torre = createSprite (300,300,20,20);
  torre.addImage (torreImg);

  fantasma = createSprite (200,200,20,20)
  fantasma.addAnimation ("quieto",fantasma_parado);
  fantasma.scale = 0.2;
  fantasma.setCollider ("rectangle",0,30,150,250);
  fantasma.debug = true;

   // GRUPO DE PUERTAS
   Gpuertas = createGroup ();
   Gbalcon = createGroup ();
  // GRUPO DE CLIMBERS 
  invisibleBlockGroup = new Group();

}


function draw() {
  background(255);
  
  if (gameState === "play") {
if (keyDown ("A") || keyDown ("left_arrow")){
  fantasma.velocityX = - 5;
}
if (keyDown ("D") || keyDown ("right_arrow")){
  fantasma.velocityX = + 5;
}
if (keyDown ("W") || keyDown ("up_arrow") || keyDown ("space")){
  fantasma.velocityY = fantasma.velocityY - 5;
}
fantasma.collide (Gbalcon);
  
  fantasma.velocityY = fantasma.velocityY + 0.8 
  torre.velocityY = 5;
  if (torre.y > 400){
  torre.y = 300;
  }
  
  Gbalcon.debug = true;
  
      //escribir el código = SI EL FANTASMA TOCA EL CLIMBERSGROUP SE DETIENE. 

      if(invisibleBlockGroup.isTouching(fantasma) || fantasma.y > 600){
      
      gameState = "final"
      }
  crearPuertas();
  drawSprites();
}
  if (gameState === "final"){
    if (keyDown ("R")){
      Gpuertas.destroyEach();
      Gbalcon.destroyEach();
      invisibleBlockGroup.destroyEach();
      fantasma.x = 200;
      fantasma.y = 300;
      fantasma.velocityX = 0;
      fantasma.velocityY = 0;
      gameState = "play"
    }
    fill ("black");
    textSize (20);
    text ("presiona R para reiniciar",250,350);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text ("GAME OVER",250,300);
  }
}

function crearPuertas() // PARA QUE SIRVE ESTA FUNCION? 
 {
  if (frameCount % 120 === 0) {
    puerta = createSprite(200, -50);
    puerta.addImage (puertaImg);
    
    balcon = createSprite(200,10);
    balcon.addImage (balconImg);
    
    
    var invisibleBlock = createSprite(200,30);
    invisibleBlock.width = balcon.width;
    invisibleBlock.height = 2;
    
    puerta.x = Math.round (random(100,400)) ;
    balcon.x = puerta.x;
    invisibleBlock.x = puerta.x;

    puerta.velocityY = 5;
    balcon.velocityY = 5;
    invisibleBlock.velocityY = 5;

    fantasma.depth = puerta.depth;
    fantasma.depth +=1;
    
    Gpuertas.add (puerta);
    Gbalcon.add (balcon);
    balcon.debug = false;

    puerta.lifetime = 800;
    balcon.lifetime = 800;

    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}

