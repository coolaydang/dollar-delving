const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var gameState = "roomate";
var mainState = "play";

//animations and images
var bg_img;
var noobSpriteSheet;
var noobSpriteData;
var noobAnimation = [];
var noob;
var noobAnim;
var shop;
var bank;
var bankUpgrade;

var score;
var money = 0;
var moneyGain = 1;
var age = 0;
var time = 0;
var frameCount = 0;
var picker = 0;
var pointer;
var pointerSprite;
var outSprite
var mailBox = false;
var bigMoni;
var bank;
var bankGain = 1;

var bgm;


function preload(){
  bg_img = loadImage('image.png');
  shop = loadImage('shop.png');
  noobSpriteSheet = loadImage('player.png');
  pointer = loadImage('pointert.png');
  outSprite = loadImage('out.png');
  noobAnim = loadImage('player-idle1.png');
  bank = loadImage('bankt.png');
  bankUpgrade = loadImage('bank_upgraded.png');
  noobSpriteData = loadJSON('player.json')
  noob;

  bgm = loadSound('inst(4).ogg');
  
  
}




function setup() {
  createCanvas(1280,720);
  frameRate(80);

  var noobFrames = noobSpriteData.frames;
  for (var i = 0; i < noobFrames.length; i++) {
    var pos = noobFrames[i].position;
    var img = noobSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    noobAnimation.push(img);
  }


  engine = Engine.create();
  world = engine.world;

  pointerSprite = createSprite(430,200,10,10);
  
  pointerSprite.scale = 0.5
  pointerSprite.addImage("pointer",pointer);

  bgm.play();
}


function draw() 
{



  background(51)

  if(mainState === 'play'){
    if(gameState === 'roomate'){
      pointerSprite.visible = false;

      image(bg_img,0,0,1280,720);

      image(bank,750,200,450,450);
  
      image(noobAnim,200,200,300,490);

      image(noobAnim,200,200,300,490);
  
      fill("#00FF00");
      textSize(40);
      text(`Money:${money}`, 910, 50);
      textAlign(CENTER, CENTER);
  
      
      // fill("#00FF00");
      // textSize(40);
      // text(`Day:${age}`, 1075, 700);
      // textAlign(CENTER, CENTER);
      
      // fill("#00FF00");
      // textSize(40);
      // text(`Time:${time}`, 1075, 650);
      // textAlign(CENTER, CENTER);
    
      fill("#00FF00");
      textSize(40);
      text(`Money per press:${moneyGain}`, 1075, 100);
      textAlign(CENTER, CENTER);
  
      fill("#000000");
      textSize(40);
      text(`This is your roomate`, 200, 100);
      textAlign(CENTER, CENTER);
      
      fill("#000000");
      textSize(40);
      text(`He owes you money, press space to collect it`,420, 200)
      textAlign(CENTER, CENTER);

      text(`this is the bank`, 600, 350);
      text(`it will generate money`, 600, 400);
      text(`press C to collect`, 600, 450);


 


      fill("#00FF00");
      text(`${money}/1,000,000,000`, 1075, 150);
      text(`bank money:${time}`, 1075, 700);
  
      
    }
  
    if(gameState == 'shop'){
      image(shop,473,0,810,720);
      pointerSprite.visible = true;
  
      fill("#00FF00");
      textSize(40);
      text(`Money:${money}`, 200, 100);
      textAlign(CENTER, CENTER);
    
      text(`Money per press:${moneyGain}`, 200, 150);

      text(`upgrade bank: $200`, 200, 300);

      text(`more money gain: $50`, 200, 650);

      text(`lottery ticket: $100`, 210, 550);

      textSize(30);
      text(`win very big money or very little`, 210, 580);

      textSize(40);
      text(`mail box: $30`, 210, 400);

      textSize(30);
      text(`gain 3 more dollars!`, 210, 450);

      // textSize(40)
      // text(`Day:${age}`, 1075, 700);
   
      // text(`Time:${time}`, 1075, 650);
    }

    if(frameCount % 60 === 0){
      bankMoneys(); 
    } 

    if(time === 60){
      age = time % 60;
    }

    if(picker == 0){
      pointerSprite.y = 300;
    }
    if(picker == 1){
      pointerSprite.y = 400;
    }
    if(picker == 2){
      pointerSprite.y = 550;
    }
    if(picker == 3){
      pointerSprite.y = 650;
    }

    if(money === 1000000000){
      mainState = 'end'
    }

    drawSprites();
  }else if(mainState === 'end'){

    text( `u won :D`, 200, 200);
    text( `u've wasted ur life on a stupid tycoon game`, 200, 250);
  }




  //noob = new Noob(200,200,300,490,200,noobAnimation);
  //World.add(world, noob);

  







  Engine.update(engine);
  
}

function keyPressed(){
  if (keyCode === 32 && gameState == 'roomate') {
    addMoney()
  }

  if (keyCode === 39 && gameState == 'roomate') {
    gameState = 'shop';
  }

  if (keyCode === 37 && gameState == 'shop') {
    gameState = 'roomate';
  }

  if (keyCode === 38 && gameState == 'shop' && picker >= 1) {
    picker -= 1;
    console.log(picker);
  }

  if (keyCode === 40 && gameState == 'shop' && picker <= 2) {
    picker += 1;
    console.log(picker);
  }

  if (keyCode === 32 && gameState == 'shop' && picker <= 2 && money >= 30) {
    moneyGain += 3;
    money -= 30;
    mailBox = false;

  }

  if (keyCode === 32 && gameState == 'shop' && picker <= 4 && money >= 50) {
    moneyGain += 5;
    money -= 50;
  }

  if (keyCode === 32 && gameState == 'shop' && picker <= 3 && money >= 100) {
    var randBigorSmall = Math.round(random(0,1));;
    var randBig = Math.round(random(100,500));
    var randSmall = Math.round(random(10,30));

    if(randBigorSmall = 0){
      bigMoni = false;
    }else{
      bigMoni = true;
    }

    if(bigMoni == true){
      money += randBig;
    }
    if(bigMoni == false){
      money += randSmall;
    }
    money -= 100;
  }

  if (keyCode === 32 && gameState == 'shop' && picker <= 1 && money >= 200) {
    bankGain += 10;
    money -= 200;
  }

  if (keyCode === 67 && gameState == 'roomate') {
    money += time;
    time = 0;
  }

}

function addMoney(){
  money += moneyGain;
}

function bankMoneys(){
  time += bankGain;
}