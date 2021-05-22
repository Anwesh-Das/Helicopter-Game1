const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine;
var world;
var buildingimg;
var ground;
var helicopter,helicopterimg;
var droplets,dropletsimg;
var dropletsBody;
var dropletsGroup;
var invisibleroof;
var score = 0;
var invisibleroofGroup;
var buildings;

function preload(){

  buildingimg = loadImage("building.jpg");
  helicopterimg = loadImage("helicopter.png");
  dropletsimg = loadImage("droplets.png");

}

function setup() {
  createCanvas(1300,600);

  engine = Engine.create();
	world = engine.world;

  helicopter=createSprite(180,100,20,20);
	helicopter.addImage(helicopterimg)
	helicopter.scale=0.8;

  dropletsGroup = new Group();
  invisibleroofGroup = new Group();

  spawnDroplets();

  Engine.run(engine);

}

function draw() {
  background("white");

  droplets.x= dropletsBody.position.x 
  droplets.y= dropletsBody.position.y 

  textSize(22);
  text("Score : " + score, width-300, 50);

  spawnbuildings();

  if(dropletsGroup.isTouching(invisibleroofGroup)){
    score = +10;
  }


  drawSprites();
}

function spawnbuildings(){
  if(frameCount%300 === 0){
    var buildings = createSprite(1300,450,40,40);
    buildings.scale = 0.8;
    buildings.velocityX = -8;
    buildings.addImage(buildingimg);

    invisibleroof = createSprite(1300,330,200,5);
    invisibleroof.velocityX = -8;

    invisibleroof.visible = false;
    invisibleroofGroup.add(invisibleroof);
  }

}

function keyPressed(){
   if(keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(dropletsBody,false);
    
  }
  if(keyCode === 32){
    spawnDroplets();

  }
}

function spawnDroplets(){
    dropletsGroup.destroyEach();
    droplets=createSprite(230,150,10,10);
    droplets.addImage(dropletsimg);
    droplets.scale=0.1;
  
    dropletsBody = Bodies.circle(230,150,5,{restitution:0,isStatic:true});
    World.add(world,dropletsBody);
    dropletsGroup.add(droplets);

}