var PLAY=1;
var END=0;
var gameState=PLAY;
var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var cloudsGroup,cloudImage;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var score=0
var gameOver,restart;
localStorage["HighScore"]=0

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOverImg=loadImage("gameOver.png")
  restartImg-loadImage("restart.png")
}
function setup(){
  createCanvas(600,200)
  trex=createSprite(50,100,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
  ground=createSprite(200,100,400,20)
  ground.addImage("ground",groundImage)
  ground.x=ground.width/2;
  ground.velocityX=-(6+3*score/100)
  gameOver=createSprite(300,70)
  gameOver.addImage("gameOver",gameOverImg)
  restart=createSprite(300,70)
  restart.addImage("restart",restartImg)
  gameOver.scale=0.5;
  restart.scale=0.5;
  gameOver.visible=false;
  restart.visible=false;
  invisibleGround=createSprite(200,190,400,10)
  invisibleGround.visible=false;
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  score=0
}
function draw(){
  //trex.debug=true
  camera.x=trex.x;
  gameOver.position.x=restart.position.x=camera.x;
  backGround(255)
  text("Score"+score,500,50)
  if (gameState===PLAY){
    score=score+ Math.round(getFrameRate()/60)
    ground.velocityX=-(6+3*score/100)
      }
      if(keyDown("space")&&trex.y>=159){
        trex.velocityY=-12
      }
      trex.velocityY=trex.velocityY+0.8
      if(ground.x<0){
        ground.x=ground.width/2;
      }
      trex.collide(invisibleGround);
      spawnClouds();
      spawnObstacles();
      if(obstaclesGroup.isTouching(trex)){
        gameState=END
      }
      else if(gameState===END){
        gameOver.visible=true
        restart.visible=true
        ground.velocityX=0
        trex.velocityY=0
        obstaclesGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)
        trex.changeAnimation("collided",trex_collided)
        obstaclesGroup.setLifeTimeEach(-1)
        cloudsGroup.setLifeTimeEach(-1)
        if(mousePressedOver(restart)){
          restart()
        }
      }
      drawSprites()
}
function spawnClouds(){
  if(frameCount%60){
    var obstacle=createSprite(camera.x+width/2,165,10,40)
    obstacle.velocityX=-(6+3*score/100)
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      default:break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=300
    obstaclesGroup.add(obstacle)
  }
}
function reset(){
  gamestate=PLAY
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"]=score;
  }
  console.log(localStorage["HighestScore"])
  score=0
}
function draw(){
  camera.x=trex.x
  gameOver.position.x=restart.position.x=camera.x
  background(255)
  text("Score"+score,500,50)
  if(gameState=PLAY){
    score=score+Math.round(getFrameRate()/60)
    ground.velocityX=-(6+3*score/100)

    if(keyDown("space")&&trex.y>=159){
      trex.velocityX=-12
    }
    trex.velocityY=trex.velocityY+0.8
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    trex.collide(invisibleGround)
    spawnClouds()
    spawnObstacles()
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState=END){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0
    trex.velocityY=0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setLifeTimeEach(-1)
    cloudsGroup.setLifeTimeEach(-1)
    if (mousePressedOver(restart)){
      reset()
    }
  }
  drawSprites()
}
function spawnClouds(){
  if(frameCount%60===0){
    var cloud=createSprite(camera.x+width/2,120,40,10)
    cloud.y=Math.round(random(80,120))
    cloud.addImage(cloudImage)
    cloud.scale=0.5
    cloud.velocityX=3
    cloud.lifetime=200 
    cloud.depth=trex.depth+1
    cloudsGroup.add(cloud)
  }
}
function spawnObstacles(){
if (frameCount%60===0){
  var obstacle=createSprite(camera.x=width/2,165,10,40)
  obstacle.velocityX=-(6=3*score/100)
  var rand=Math.round(random(1,6))
  switch(rand){
    case 1:obstacle.addImage(obstacle1)
    break;
    case 2:obstacle.addImage(obstacle2)
    break;
    case 3:obstacle.addImage(obstacle3)
    break;
    case 4:obstacle.addImage(obstacle4)
    break;
    case 5:obstacle.addImage(obstacle5)
    break;
    case 6:obstacle.addImage(obstacle6)
    break;
    default:break;
  }
  obstacle.scale=0.5
  obstacle.lifetime=300
  obstaclesGroup.add(obstacle)
}
}
function reset(){
  gamestate=PLAY;
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  if(localStorage['HighestScore']<score){
    localStorage["HighestScore"]=score
  }
  console.log(localStorage["HighestScore"])
  score=0
}