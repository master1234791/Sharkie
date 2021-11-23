var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleGround;
var cloudImage;
var obstacles;
var obstacles1;
var obstacles2;
var obstacles3;
var obstacles4;
var obstacles5;
var obstacles6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesGroup;
var cloudsGroup;
var score = 0;
var trexCollided;
var gameOver,gameOver_img
var restart,restart_img
var bg

function preload(){
       trex_running = loadAnimation("tiburon.png", "tiburon2.png", "tiburon3.png");
  trexCollided = loadAnimation("tiburonMuerto2.png");
       groundImage = loadImage("ground2.png");
  cloudImage = loadImage("burbujas.png");
  obstacles1 = loadImage("bomba1.png");
  obstacles2 = loadImage("bomba1.png");
  obstacles3 = loadImage("bomba1.png");
  obstacles4 = loadImage("bomba1.png");
  obstacles5 = loadImage("bomba1.png");
  obstacles6 = loadImage("bomba1.png");
  gameOver_img = loadImage("GameOverVerde.png");
  restart_img = loadImage("ResetTiburon.png");
  bg = loadImage("fondo.png")
}

function setup(){
      createCanvas(windowWidth,windowHeight);
      var rand = Math.round(random (1,100)) 
      console.log (rand)
      //crea el Trex
      trex = createSprite(50,height-70,20,50);
      trex.addAnimation("running", trex_running);
      trex.addAnimation("collied", trexCollided);
      edges = createEdgeSprites();
      obstaclesGroup = new Group();
      cloudsGroup = new Group();
      trex.setCollider("circle",0,0,50);
      trex.debug = false;

  
  
      ground = createSprite(width/2,height,width,20);
      //ground.velocityX = -2
      ground.addImage("ground",groundImage);
      
      gameOver = createSprite(width/2,height/2)
      gameOver.addImage("gameOver",gameOver_img);
      gameOver.visible = false;
      restart = createSprite(width/2,height/2-50);
      restart.scale = 1.6
      restart.addImage("restart",restart_img);
      restart.visible = false;
      
      
  
      invisibleGround = createSprite(width/2,height-10,width,125);
      invisibleGround.visible = false;
  
      //añade escala y posición al Trex
      trex.scale = 0.8;
      trex.x = 50
}


function draw(){
      //establece un color de fondo 
      background(bg);
      textSize(40);
      fill("black")
      text("Score " + score, width/2,height-300);
      if(gameState == PLAY){
        trex.changeAnimation("running", trex_running);
        score = Math.round(getFrameRate()/60) + score
         spawnObstacles();
        spawnClouds();
        ground.velocityX = -2
        if(ground.x < 0){
        
        ground.x = 200;
        
      }
         if(touches.length>0||keyDown("space")&& trex.y>=height-120){
        
        trex.velocityY = -10;
        touches=[];
      }
        if(obstaclesGroup.isTouching(trex)){
          gameState = END;
        }
      }
      else if(gameState == END){
         ground.velocityX = 0
         obstaclesGroup.setVelocityXEach(0)
         cloudsGroup.setVelocityXEach(0)
        trex.changeAnimation("collied",trexCollided);
        gameOver.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
          reset();
        }
       }
      //ingresa la posición y del Trex
      //console.log("ψ(｀∇´)ψ" + frameCount) 

      //salta cuando se presiona la barra espaciadora
  
      
  
      
      trex.velocityY = trex.velocityY + 0.5;
      
      
      //evita que el Trex caiga
      trex.collide(invisibleGround);
      drawSprites();
}
      function spawnClouds(){
        
        if (frameCount % 60 == 0){ 
          var cloud = createSprite(width+20,height-300,40,10);
          cloud.depth = trex.depth;
          trex.depth = trex.depth + 1;
          cloud.lifetime = 200;
          cloud.addImage(cloudImage);
          
        cloud.velocityX = -3;
            cloud.y = Math.round(random (10,190));
          cloudsGroup.add(cloud)
        }
        
      }
        function spawnObstacles(){
         if (frameCount % 60 == 0){
           obstacles = createSprite(width+20,height-95,10,40);
           obstacles.scale = 0.1
           obstacles.velocityX = -6;
          
           var rand = Math.round(random (1,6))
           switch (rand){
             case 1: obstacles.addImage(obstacles1);
             break;
             case 2: obstacles.addImage(obstacles2);
             break;
             case 3: obstacles.addImage(obstacles3);
             break; 
             case 4: obstacles.addImage(obstacles4);
             break;
             case 5: obstacles.addImage(obstacles5);
             break;
             case 6: obstacles.addImage(obstacles6);
           }
             obstaclesGroup.add(obstacles);
           }
        }
          function reset(){
            gameState = PLAY
            obstaclesGroup.destroyEach();
            gameOver.visible = false;
            restart.visible = false;
            score = 0;
            
            
          }
          
           
        
          
        
        
