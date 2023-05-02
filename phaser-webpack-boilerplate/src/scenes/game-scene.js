class GameScene extends Phaser.Scene{
    constructor(config){
        console.log("This is a game scene");
        super(config);
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.elapsed = null;
    }


    
    preload(){
        this.load.image("sky", "assets/sky.png")
        this.load.image("bird", "assets/bird.png")
        this.load.image("pipe", "assets/pipe.png")
      }

    create(){
        //Ajusta imagen a tamaño de pantalla
        //this.add.image(config.width /2, config.height / 2, "sky");
        //Cambia el pivote
        this.add.image(0, 0, "sky").setOrigin(0);
      
        this.bird = this.add.sprite(100, config.height / 2, "bird");
        this.physics.add.existing(bird);
      
        //añadir "body" le da un Rigid Body al objeto, para poder asignarle valores de velocidad y gravedad
        this.bird.body.velocity.x = 30;
        //bird.body.gravity.y= 100;
        this.input.keyboard.on("keydown-SPACE", flap);
        setTimeout(spawnPipe(this), 1000);
        this.pipes = game.physics.add.group({
          allowGravity: false,
          inmovable: true
        });
        this.physics.add.collider(bird, pipes, gameOver, null, this);
        //Limita el movimiento al canvas
        this.bird.body.setCollideWorldBounds(true);
        
    }

    update(time, delta){
        elapsed += delta;
        if(elapsed >= pipeSpawnTime){
          spawnPipe();
          elapsed = 0;
        }
        console.log(Math.random() * 117 + 117); //función para aleatorio
        
      }

    flap(){
        this.bird.body.velocity.y = -flapVelocity;
    }

    spawnPipe(){
        var yPos= Phaser.Math.Between(50, 350);
        var gap = Phaser.Math.Between(100, 200);
        var upper = this.pipes.add.sprite(config.width, yPos, "pipe").setOrigin(0, 1);
        var lower = this.pipes.add.sprite(config.width, yPos, + gap, "pipe").setOrigin(0);
      
        upper.body.velocity.x = -150;
        lower.body.velocity.x = -150;
    } 

    gameOver(){
        alert("You lose");
        //Reinicia la escena
        this.scene.restart();
      }
}

export default GameScene