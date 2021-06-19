var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic1, sonic2, sonic3, sonic4, sonic5;
var sonic1img, sonic2img, sonic3img, sonic4img, sonic5img;
var ground;
var obstacle;
var back;
var invisibleground;
var path;
var bush;
var obsctaclegrp;
var gameover , restart;
var restartImg;
var gameoverImg;



var score = 0;

function preload(){
  path = loadImage("back.png")
  sonic1img= loadAnimation("sonic1.png", "sonic2.png", "sonic3.png", "sonic4.png", "sonic5.png")
   bush = loadImage("bushes.png")
   restartImg = loadImage("restart.png")

}



function setup() {
  createCanvas(1200, 400);
  
  back = createSprite(100,200);
  back.addImage("p",path)
  back.x = back.width/2
  back.velocityX = -(4 + 2 * score/150);
  sonic1 = createSprite(70,150,20,20);



  invisibleground = createSprite(100,410,80,10);
  invisibleground.visible = false;

  sonic1.addAnimation("S1",sonic1img);

  obstaclegrp = new Group();

  restart = createSprite(300,100);
  restart.addImage(restartImg);

  restart.visible = false;

  


}

function draw() {
  //background("back");  

  sonic1.collide(invisibleground);

  if (gameState === PLAY){

  score = score + Math.round(getFrameRate() / 60);
  back.velocityX = -(6 + 2*score/150);

  if(back.x < 0){
    back.x = back.width/2
  }

  spawnobstacles();

  //jump for sonic
  if(keyDown("space")){
    sonic1.velocityY = -10
  }
  
  sonic1.velocityY = sonic1.velocityY + 0.8


  
  if(sonic1.isTouching(obstaclegrp)){
    gameState = END;
  }

  }
  else if (gameState === END) {

    restart.visible = true;
path.velocityX = 0;
sonic1.velocity = 0;
obstaclegrp.setVelocityX(0);

 if(mousePressedOver(restart)){
   reset();
 }
  }

  drawSprites();
  text("Score:" + score,50,50)

}

function spawnobstacles(){
  if(frameCount % 70 === 0){
    obstacle = createSprite(700,370,10,10);
    obstacle.velocityX = -5

  obstacle.addImage("O",bush);
  obstacle.scale = 0.4;
  obstaclegrp.add(obstacle)

  obstacle.setLifetime = 200
  }

  
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;

  score = 0;

  obstaclegrp.destroy();
}






