var bg;
var score = 0;
var marioimage, mariosprite, mariodead;
var invisibleground;
var coinimage, coin;
var ob1, ob2, ob3, obstaclesprite;
var coingroup, obstaclegroup;
var gameState = "Play";
var gameover, gameoverimage, restart, restartimage;
var dieSound, jumpSound;

function preload() {
  bg = loadImage("backg.jpg");
  marioimage = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  coinimage = loadImage("coin.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  mariodead = loadAnimation("mariodead.png");
  restartimage = loadImage("restart.png");
  gameoverimage = loadImage("gameover.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);
  mariosprite = createSprite(50, 130);
  mariosprite.addAnimation("running", marioimage);
  mariosprite.addAnimation("dead", mariodead);
  mariosprite.scale = 0.5;
  score = 0;
  invisibleground = createSprite(300, 170, 600, 10);
  invisibleground.visible = false;
  coingroup = createGroup();
  obstaclegroup = createGroup();
  gameover = createSprite(300, 50, 50, 50);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.5;
  restart = createSprite(300, 100, 50, 50);
  restart.addImage(restartimage);
  restart.scale = 0.3;
}

function draw() {
  background(bg);
  textSize(20);
  fill(255);
  text("Score: " + score, 500, 40);
  if (gameState == "Play") {
    gameover.visible = false;
    restart.visible = false;
    mariosprite.changeAnimation("running", marioimage);
    if (keyDown("space") && mariosprite.y > 100) {
      mariosprite.velocityY = -12;
      jumpSound.play();
    }
    mariosprite.velocityY = mariosprite.velocityY + 1;
    if (mariosprite.isTouching(coingroup)) {
      score = score + 1;
      coingroup.destroyEach();
    }
    if (mariosprite.isTouching(obstaclegroup)) {
      dieSound.play();
      gameState = "End";
    }
    mariosprite.collide(invisibleground);
    populateCoins();
    populateObstacles();
  }
  if (gameState == "End") {
    gameover.visible = true;
    restart.visible = true;
    mariosprite.changeAnimation("dead", mariodead);
    mariosprite.scale = 0.3;
    mariosprite.velocityY = 5;
    coingroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function populateCoins() {
  if (frameCount % 60 == 0) {
    coin = createSprite(600, 50, 30, 30);
    coin.addImage(coinimage);
    coin.velocityX = -5;
    coin.scale = 0.1;
    coingroup.add(coin);
  }
}

function populateObstacles() {
  if (frameCount % 60 == 0) {
    obstaclesprite = createSprite(600, 150, 50, 50);
    obstaclesprite.velocityX = -5;
    obstaclesprite.scale = 0.2;
    var r = Math.round(random(1, 3));
    switch (r) {
      case 1:
        obstaclesprite.addImage(ob1);
        break;
      case 2:
        obstaclesprite.addImage(ob2);
        break;
      case 3:
        obstaclesprite.addImage(ob3);
        break;
    }
    obstaclegroup.add(obstaclesprite);
  }
}

function reset() {
  gameState = "Play";
  coingroup.destroyEach();
  obstaclegroup.destroyEach();
  mariosprite.x = 50;
  mariosprite.y = 130;
  mariosprite.scale = 0.5;
  score = 0;
}
