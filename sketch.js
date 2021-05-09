
var bg,bgimg,start,startimg
var gameState=0
var boy, playerimg,ground,groundimg,mainimg,mainbg;
var obstacle1, obstacle2, obstacle3, obstacle4;
var bulletimg, coinimg, Obstacle, Obstacleimg, ObstacleImg;
var obstacleGroup, coinGroup, bulletGroup,obstacle, ObstaclesGroup, Ob, Obstacles2Group;
var score, bomb, bombimg, bombGroup;


function preload(){
bgimg=loadImage("images/bg1.jpg")
startimg = loadImage("images/text0.png")
playicon=loadAnimation("images/frame0.gif","images/frame1.gif","images/frame2.gif","images/frame3.gif")
playerimg=loadAnimation("images/r1.png","images/r2.png","images/r3.png","images/r4.png","images/r5.png","images/r6.png","images/r7.png","images/r8.png")
mainimg=loadImage("images/bg.png")
groundimg = loadImage("images/race.png")
obstacle1 = loadImage("images/h1.png")
obstacle2 = loadImage("images/h2.png")
obstacle3 = loadImage("images/h3.png")
obstacle4 = loadImage("images/h4.png")
bulletimg = loadImage("images/bullet.png")
Obstacleimg = loadImage("images/ice10.png")
ObstacleImg = loadImage("images/ice20.png")
coinimg = loadImage("images/coin.png")
bombimg = loadImage("images/bomb.png")


}



function setup() {
  createCanvas(displayWidth, displayHeight);
  bg=createSprite(displayWidth/3, displayHeight/3);
  bg.addImage(bgimg)
  bg.scale=1.5

  start=createSprite(displayWidth/2, displayHeight*2/3.5)
  start.addImage(startimg)
  start.scale=0.7

  play=createSprite(displayWidth/2, displayHeight*2/4.4)
  play.addAnimation("playing",playicon)
  play.scale=0.3/2

  boy=createSprite(50,350,20,50)
  boy.addAnimation("playing",playerimg)
  boy.scale=0.5
  boy.debug=false;
  boy.setCollider("rectangle",0,0,50,360)

  mainbg = createSprite(displayWidth/2,displayHeight/3,displayWidth,800)
  mainbg.addImage(mainimg)
  mainbg.scale = 1.7;
 // mainbg.velocityX=-3;

     
  ground = createSprite(displayWidth/2,800,displayWidth,20);
 ground.addImage(groundimg);
 ground.velocityX = -4;
 ground.x = ground.width /2;
 ground.scale=2.0
 boy.depth=mainbg.depth
 boy.depth=boy.depth+1
 
 invisibleGround = createSprite(400,550,800,10);
 invisibleGround.visible = false

 obstacleGroup = new Group();
 coinGroup = new Group();
 bulletGroup = new Group();
 ObstaclesGroup = new Group();
 Obstacles2Group = new Group();
 bombGroup = new Group();

 score = 0;
}

function draw() {
  background(255,255,255); 
 
  
  if(gameState===1){
   bg.visible=false;
   start.visible=false;
   play.visible=false;
   mainbg.visible=false;
  ground.visible = false;
   boy.visible = false;

   
   background("black")

   textSize(25)
   textStyle(BOLD)
   textFont("SNAP ITC")
   fill("yellow")
   text("INSTRUCTIONS",370,60)

   textSize(15)
   textStyle(ITALIC)
   textFont("Calibri")
   fill("yellow")
   text("You have to overcome obstacles and also collect coins to reach the next levels.",displayWidth/5,displayHeight*2/9.7)
   text("Press the UP ARROW KEY to make the player jump.",displayWidth/5,displayHeight*2/7.7)
   text("Press the DOWN ARROW KEY to reduce the player's scale,",displayWidth/5,displayWidth*2/11.7)
   text("so that the player doesn't get hit by the bullet." ,displayWidth/5,displayHeight*2/5.7)
   text("Press the Z key to increase the player's size once it has been reduced",displayWidth/5,displayHeight*2/5)
  
   fill("yellow")
   textStyle(BOLD)
   text("This is a obstacle course race.",400,120)
   text("PRESS SPACE TO CONTINUE",450,400)

   

  

   if(keyDown("space")&&gameState===1){
     gameState=2
   }

 }

 if(gameState===2){
   createCanvas(displayWidth-50,displayHeight-50)
   mainbg.visible=true
  ground.visible=true
  boy.visible=true

  
  

   
  if(keyDown("up")){
    boy.velocityY=-10
  }

  if(keyDown("down")){
    boy.scale = boy.scale-0.01
  }

  if(keyDown("z")){
    boy.scale+=0.01
  }
 boy.velocityY=boy.velocityY+0.5
  if (ground.x < 0){
    ground.x = ground.width/2;

  };

  if(coinGroup.isTouching(boy)){
    coinGroup.destroyEach();
    score = score+10;
  }

  if(bulletGroup.isTouching(boy)){
    bulletGroup.destroyEach();
    score = score-20;
  }

  for(i=0;i<obstacleGroup.length;i++){
    if(obstacleGroup.isTouching(boy)){
      obstacleGroup.get(i).destroy()
      score=score-10
    }
  }
  
 



  boy.collide(invisibleGround)
  spawnObstacles()
  spawnBullets()
  spawnCoins()

  if(score===-40&&gameState===2){
    gameState=3;
 
  }

 }
 
 if(mousePressedOver(play)&&gameState===0){
     gameState=1
   }

   if(gameState===3){
     createCanvas(displayWidth, displayHeight)
      background("black")

    bg.visible=false;
    start.visible =false;;
    play.visible=false;;
    mainbg.visible=false;
 ground.visible = false;
  boy.visible = false;
 obstacleGroup.destroyEach();
 bulletGroup.destroyEach();
 coinGroup.destroyEach();

 fill("white")
 textStyle(BOLD)
 textSize(25)
 text("CONGRATULATIONS!!! YOU HAVE REACHED LEVEL 2",285, 60)
 
 
 fill("white")
 textSize(18)
 textStyle(ITALIC)
 textFont("Calibri")
 text("This is the final level of the Obstacle Course Race",340, 140)
 text("In this level the functions will be the same, the obstacles will be different",340, 185)
 text( "Instead of the bullet now there will be a bomb that will explode",340, 230)
 text("You have to dodge the bomb and collect coins to win" ,340, 280)
 text("Get 600 point to win.. ALL THE BEST",340, 330)
 text("PRESS SPACE TO CONTINUE", 350, 420)



 if(keyDown("space")&&gameState===3){
  gameState=4
  score=0
}
}

if(gameState===4){
createCanvas(displayWidth-50,displayHeight-50)

  
    mainbg.visible=true
   ground.visible=true
   boy.visible=true
 
   if(keyDown("up")){
     boy.velocityY=-10
   }
 
   if(keyDown("down")){
     boy.scale = boy.scale-0.01
   }
 
   if(keyDown("z")){
     boy.scale+=0.01
   }
  boy.velocityY=boy.velocityY+0.5
   if (ground.x < 0){
     ground.x = ground.width/2;
 
   };
 
   if(coinGroup.isTouching(boy)){
     coinGroup.destroyEach();
     score = score+10;
   }
 
   if(bulletGroup.isTouching(boy)){
     bulletGroup.destroyEach();
     score = score-20;
   }
 
   for(i=0;i<ObstaclesGroup.length;i++){
     if(ObstaclesGroup.isTouching(boy)){
       ObstaclesGroup.get(i).destroy()
       score=score-10
     }
   }
   for(i=0;i<Obstacles2Group.length;i++){
    if(Obstacles2Group.isTouching(boy)){
      Obstacles2Group.get(i).destroy()
      score=score-10
    }
  }
  boy.collide(invisibleGround)
   spawnObstacle2()
   spawnBomb()
   spawnCoins()
   Obstacles3()
}
  

 
  
 
  
 
   drawSprites();
   if(gameState===2){
     fill("black")
   textSize(20)
  text("Score:"+score,200,35)
   }

   if(gameState===4){
    fill("black")
  textSize(20)
 text("Score:"+score,200,35)
  }

  
   
 
   if(gameState===0){
     bg.visible=true
     start.visible =true;
     play.visible=true;
     mainbg.visible=false;
  ground.visible = false;
   boy.visible = false;

     textSize(25)
   textStyle(BOLDITALIC)
   textFont("Algerian")
   fill("black")
   text("OBSTACLES COURSE RACE",displayWidth/4, 50)

 
   }
 
   
  
 
 }
 function spawnObstacles(){
   if(frameCount%150===0){
  obstacle = createSprite(1800,500,10,40)
     obstacle.velocityX = -6;
     obstacle.scale = 0.25;

     var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    obstacleGroup.add(obstacle)
   }
 }

 function spawnBullets(){
  if(frameCount%250===0){
    var  bullet = createSprite(600,270,10,40)
    bullet.velocityX = -20;
    bullet.y = Math.round(random(50,340));
    bullet.addImage(bulletimg);
    bullet.scale = 0.7;

    bulletGroup.add(bullet)
  }
 }

  function spawnCoins(){
    if(frameCount%110===0){
    var coin = createSprite(600,270,10,40)
    coin.velocityX = -9;
    coin.y = Math.round(random(30,280));
    coin.addImage(coinimg);
    coin.scale = 1.0;

    coinGroup.add(coin)
    }
  }

  function spawnObstacle2(){
    if(frameCount%50===0){
      Ob = createSprite(600,170,10,40)
      Ob.addImage(Obstacleimg)
         Ob.velocityX = -6;
         Ob.scale = 0.1;
        ObstaclesGroup.add(Ob)
       }
  }

  function Obstacles3(){
    if(frameCount%160===0){
      var obst = createSprite(600,30,10,40)
      obst.addImage(ObstacleImg)
         obst.velocityX = -6;
         obst.scale = 0.1;
        Obstacles2Group.add(obst)
       }
  }

  function spawnBomb(){
    if(frameCount%250===0){
      bomb = createSprite(600,170,10,40)
      bomb.velocityX = -15;
      bomb.y = Math.round(random(50,300));
      bomb.addImage(bombimg);
      bomb.scale = 0.2;
  
      bombGroup.add(bomb)
    }
   }
