var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkeyrun, monkeycrashed;

var banana, bananaimage, bananagroup;
var obstaclesGroup, obstacle, obstacleimage;
var invi
var score;
var hedwig, Hedwigsound
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var dm,bg,bgi;

function preload(){
  monkeyrun = loadAnimation ( "monkey (1).jpg" , "monkey (2).jpg" , "monkey (3).jpg" , "monkey (4).jpg" , "monkey (5).jpg" ,  "monkey (6).jpg" , "monkey (7).jpg" );
  monkeycrashed = loadAnimation("m9.jpg");
  
  bananaimage = loadImage("banana.png");
  
  obstacleimage = loadImage("obstacle.png");
  dm=loadSound("mood.mp3")
  bgi = loadImage("aa.jpg");
}

function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(50,250,20,50);
  monkey.addAnimation("run", monkeyrun);
    monkey.addAnimation("crashed", monkeycrashed);
 invi = createSprite(300,260,600,20);
  monkey.scale = 0.4;
  
  
  //create Obstacle and Cloud Groups
  obstaclegroup = createGroup();
  bananagroup = createGroup();
  
  
  monkey.setCollider("CIRCLE",0,0,35);
  bg = createSprite(275,170)
  bg.addImage(bgi);
  bg.scale=0.7;
  bg.depth=-2
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score : "+ score, 500,15);
    monkey.collide(invi)
  invi.visible=false
  if(frameCount===10){
    dm.play();
  }

  if(gameState === PLAY){

    if(monkey.isTouching(bananagroup)){
      score=score+2
      bananagroup.destroyEach();
    }
    console.log(monkey.y)

    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 230) {
        monkey.velocityY = -14;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnobstacle();
    
    if(obstaclegroup.isTouching(monkey)){
 gameState=END
    }
  }
   else if (gameState === END) {

      monkey.velocityY = 0
     
      //change the trex animation
      monkey.changeAnimation("crashed" ,monkeycrashed);
   
      //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
     
     if(keyDown("r")){
       obstaclegroup.destroyEach();
       bananagroup.destroyEach();
       score=0
       gameState=PLAY;
       monkey.changeAnimation("run",monkeyrun);
     }
     obstaclegroup.setVelocityXEach(0);
     bananagroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down

  
  
  
  drawSprites();
}

function spawnobstacle(){
 if (frameCount % 90 === 0){
   var obstacle = createSprite(600,240,10,40);
   obstacle.velocityX = -(5+score/500)
   obstacle.addImage(obstacleimage);
       
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclegroup.add(obstacle);
 }
}



function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 50 === 0) {
     banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(110,150));
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -(5+score/500);
    
     //assign lifetime to the variable
    banana.lifetime = 150;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
  bananagroup .add(banana);
    }
}

