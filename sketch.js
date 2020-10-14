var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sprite_0, sprite_1, sprite_2, sprite_4, sprite_5, sprite_6, sprite_7, sprite_8
var monkey , monkey_running, monkey_collided
var ground, invisbleGround
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0

function preload(){
  createCanvas(600, 200);  

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png" ,"sprite_5.png" ,"sprite_6.png" ,"sprite_7.png" ,"sprite_8.png");
  monkey_collided = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}



function setup() {
  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("collided", monkey_collided);
  
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-6;
  ground.x = ground.width/2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
}


function draw() {

  background(200);
  text("Score: "+ score, 500,50);
  
   if(gameState===PLAY) {
    
   if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -15;
    }
  monkey.velocityY = monkey.velocityY + 0.8
    
   if (ground.x < 0) {
        ground.x = ground.width/2;
    }  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
    if(monkey.isTouching(obstacleGroup)){
      ground.velocityX=0;
      //obstacleGroup.destroyEach();
      obstacleGroup[0].velocityX=0;
      FoodGroup[0].velocityX=0;
      
      monkey.changeAnimation("collided", monkey_collided);
  }
  if(monkey.isTouching(FoodGroup)){
    
    FoodGroup.destroyEach();
    score = score + 1;
    
  }
     text("Score:  " + score, 100, 40);
   //GAME STATE TURNS TO END

  
  
  drawSprites();
  
}
}

function spawnObstacles(){
 if (frameCount % 90 === 0){
   var obstacle1 = createSprite(600,325,10,40);
   obstacle1.velocityX = ground.velocityX;
   
    //generate random obstacles
    obstacle1.addImage("obstacle", obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle1.scale = 0.1;
    obstacle1.lifetime = -1;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle1);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,230,40,10);
    banana.y = Math.round(random(230,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = ground.velocityX;
    
     //assign lifetime to the variable
    banana.lifetime = -1;
    
    //adjust the depth

    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}



