
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y: 450}
    }
  },
  scene: {
    preload,
    create,
    update
  }
}

var bird = null;
var flapVelocity = 300;
//var pipe = null;
var pipeSpawnTime = 3000;
var elapsed = 0;
var pipes

function preload(){
  this.load.image("sky", "assets/sky.png")
  this.load.image("bird", "assets/bird.png")
  this.load.image("pipe", "assets/pipe.png")
}

function create(){
  //Ajusta imagen a tamaño de pantalla
  //this.add.image(config.width /2, config.height / 2, "sky");
  //Cambia el pivote
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.add.sprite(100, config.height / 2, "bird");
  this.physics.add.existing(bird);

  //añadir "body" le da un Rigid Body al objeto, para poder asignarle valores de velocidad y gravedad
  bird.body.velocity.x = 30;
  //bird.body.gravity.y= 100;
  this.input.keyboard.on("keydown-SPACE", flap);
  setTimeout(spawnPipe(this), 1000);
  pipes = game.physics.add.group({
    allowGravity: false,
    inmovable: true
  });
  this.physics.add.collider(bird, pipes, gameOver, null, this);
  //Limita el movimiento al canvas
  bird.body.setCollideWorldBounds(true);
  
}

function update(time, delta){
  elapsed += delta;
  if(elapsed >= pipeSpawnTime){
    spawnPipe();
    elapsed = 0;
  }
  console.log(Math.random() * 117 + 117); //función para aleatorio
  
}

function flap(){
  bird.body.velocity.y = -flapVelocity;
}

function spawnPipe(){
  var yPos= Phaser.Math.Between(50, 350);
  var gap = Phaser.Math.Between(100, 200);
  var upper = pipes.add.sprite(config.width, yPos, "pipe").setOrigin(0, 1);
  var lower = pipes.add.sprite(config.width, yPos, + gap, "pipe").setOrigin(0);

  upper.body.velocity.x = -150;
  lower.body.velocity.x = -150;
}

function gameOver(){
  alert("You lose");
  //Reinicia la escena
  this.scene.restart();
}

new Phaser.Game(config);
