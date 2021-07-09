var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,50,40);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() 
{
  background(200);
  if(gameState==="play")
  {

   if(keyDown("right_arrow"))
   {
     ghost.x=ghost.x+3
   }

   if(keyDown("left_arrow"))
   {
     ghost.x=ghost.x-3
   }

   if(keyDown("space"))
   {
     ghost.velocityY=-10
   }

   ghost.velocityY=ghost.velocityY+0.8;
   if(climbersGroup.isTouching(ghost))
   {
     ghost.velocityY=0
   }
   if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
   {
     ghost.destroy()
     gameState="end"
   }
   if(tower.y > 400)
   {
     tower.y = 300
   }
   spawnObstacles();
 } 
  drawSprites();
  if(gameState==="end")
  {
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
  }
}

function spawnObstacles()
{
  if(frameCount%300===0)
  { 
    door = createSprite(100,50,50,40);
    door.addImage("door",doorImg);
    door.velocityY = 1;
    door.x=Math.round(random(100,500));
    door.lifetime=600;
    doorsGroup.add(door);
    climber = createSprite(100,120,50,40);
    climber.addImage("climber",climberImg);;
    climber.velocityY = 1;
    climber.x=door.x;
    climber.lifetime=600;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(100,130,100,10);;
    invisibleBlock.visible=false;
    invisibleBlock.debug=false;
    invisibleBlock.velocityY = 1;
    invisibleBlock.x=door.x;
    invisibleBlock.lifetime=600;
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth;
    ghost.depth+=1
 } 
}