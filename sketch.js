var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisible,invisibleGroup; 
var gameState="PLAY";
var PLAY=1;
var END =0;


function preload(){
 towerImg=loadImage("tower.png");
 doorImg=loadImage("door.png");
 climberImg=loadImage("climber.png");
 ghostImg=loadImage("ghost-standing.png");
  
 doorGroup=new Group();
 climberGroup=new Group();
 invisibleGroup=new Group(); 
}

function setup(){
  createCanvas(600,600);
 tower=createSprite(300,300,600,600);
 tower.addImage("towerImg",towerImg);
 tower.velocityY=2;
 
 ghost=createSprite(300,200,50,50);
 ghost.addImage("ghostImg",ghostImg);
 ghost.scale=0.3;

}

function draw(){
   background("black");
  
  if(gameState==="PLAY"){
    
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
   ghost.x=ghost.x-3; 
  }
  
  
  if(keyDown("right_arrow")){
   ghost.x=ghost.x+3; 
  } 
  
  if(keyDown("space")){
   ghost.velocityY=-5;  
  }
  ghost.velocityY=ghost.velocityY+0.8; 
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  spawnDoor();
  
  drawSprites();
  }
  else if(gameState==="END"){
    stroke("Yellow");
    fill("Yellow");
    textSize(30);
    text("Game Over",250,250);
    
  }
}
  
 function spawnDoor(){
   if(frameCount % 240===0){
     door=createSprite(200,-50);
     door.addImage("doorImg",doorImg);
     
     door.x=Math.round(random(120,400));
     door.velocityY=2;
     door.lifetime=800;
     doorGroup.add(door);
     
     climber=createSprite(200,10);
     climber.addImage("climberImg",climberImg);
     climber.x=door.x;
     climber.velocityY=2;
     climber.lifetime=800;
     climberGroup.add(climber);
     ghost.depth=door.depth;
     ghost.depth+=1;

     invisible=createSprite(200,15);
     invisible.width=climber.width;
     invisible.height=2;
     invisible.x=door.x;
     invisible.velocityY=2;
     invisibleGroup.add(invisible);
    }
   
 }
