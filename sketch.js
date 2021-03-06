var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameOverImg;
var gameState = "play";
var score = 0;

function preload() {
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(580, 450);

  ocean = createSprite(300, 300);
  ocean.addImage("ocean", oceanImg);

  frog = createSprite(200, 350, 50, 50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);

  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group();
  createEdgeSprites();
}

function draw() {
  background(0);

  spawnCoin();
  if (gameState === "play") {
    ocean.setVelocity(0, 0.7);
    if (ocean.y > 290) {
      ocean.y = 150;
    }
    if (keyDown("space")) {
      if (frog.y > 50) {
        frog.y = frog.y - 4;
      }
    } else {
      frog.y = frog.y + 4;
    }
    frog.collide(climbersGroup);
    if (coinGroup.isTouching(frog)) {
      coinGroup.destroyEach();
      score=score+1;
    }
    if (keyDown("right")) {
      frog.x = frog.x + 4;
    }
    if (keyDown("left")) {
      frog.x = frog.x - 4;
    }
    if (frog.y == 450) {
      gameState = "end";
    }
  }

  if (gameState === "end") {
    ocean.setVelocity(0, 0);
    frog.addImage("frog", gameOverImg);
    frog.scale = 0.5;
    frog.x = 290;
    frog.y = 225;
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
  }
  drawSprites();
  fill("white");
  textSize(28);
  text("Score:"+ score,450,40);
}

// create the coin and climber in the same function
function spawnCoin() {
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
    climber = createSprite(Math.round(random(130, 450)), 0, 50, 10);
    climber.addImage("climber", climberImg);
    climber.setVelocity(0, 1);
    climber.scale = 0.5;
    climbersGroup.add(climber);
    climber.setCollider("rectangle", 0, 0, 500, 100);
    climber.lifetime = 500;

    coin = createSprite(climber.x, climber.y - 50, 20, 20);
    coin.addImage("coin", coinImg);
    coin.setVelocity(0, 1);
    coin.scale = 0.1;
    coinGroup.add(coin);
    coin.lifetime = 500;
  }
}
