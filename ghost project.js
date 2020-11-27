var ghost,ghostImg;
var door,doorImg;
var sound;
var tower,towerImg;
var invisibleBlock;
var doorGroup;
var climberGroup;
var invisibleBlockGroup;
var gameState ="play";


function preload() {
  ghostImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  //sound.loop();
  
  tower = createSprite(300,300,600,600);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  
  background("black");  
  if (gameState === "play") {
    
  
  if (tower.y>400) {
    tower.y = 300;
  }
  if (keyDown("left")) {
    ghost.x=ghost.x-2;
  }
  
  if (keyDown("right")) {
    ghost.x=ghost.x+2;
  }
  if (keyDown("space")) {
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  doorfcn();
  
  if (ghost.isTouching(invisibleBlockGroup)||ghost.y>600) {
    ghost.destroy();
    gameState = "end";
  }
  if (ghost.isTouching(climberGroup)) {
    ghost.velocityY = 0;
  }
    drawSprites();                      
  }else if(gameState === "end") {
    textSize(20);
    text("Game Over",250,300)
  }

}
function doorfcn() {
  if (frameCount%240 === 0) {
  door = createSprite(300,-50,10,10);
  door.addImage("door",doorImg);
  door.velocityY = 2;
  door.lifetime = 300;
  doorGroup.add(door);  
  
  climber = createSprite(300,5,10,10);
  climber.addImage("climber",climberImg);
  climber.velocityY = 2;
  climber.lifetime = 300;
  climberGroup.add(climber);  
    
  invisibleBlock = createSprite(300,10,10,10);
  invisibleBlock.velocityY = 2;
  invisibleBlock.lifetime = 300;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug=true; 
  invisibleBlock.width = climber.width;  
  invisibleBlock.height = 2;          
    
  door.x=Math.round(random(120,400));
  invisibleBlock.x = door.x; 
  climber.x = door.x;
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;  
  }
}