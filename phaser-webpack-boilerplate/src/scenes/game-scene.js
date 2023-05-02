import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";

export default class GameScene extends Phaser.Scene{
    constructor(config) {
        super(config);
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.score = null;
        this.layers = {
          background: null,
          game: null,
          ui: null
        }
    }
    
    preload(){
        this.load.image("sky", "assets/sky.png")
        this.load.image("bird", "assets/bird.png")
        this.load.image("pipe", "assets/pipe.png")
      }

    create(){
        this.layers.background = this.add.layer();
        this.layers.game = this.add.layer();
        this.layers.ui = this.add.layer();
        //Ajusta imagen a tamaño de pantalla
        //Cambia el pivote
        const sky = this.add.image(0, 0, "sky").setOrigin(0);
        this.layers.background.add(sky);
        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.layers.game.add(this.bird);
        this.pipes = new PipeSystem(this, this.layers.game);
      
        //añadir "body" le da un Rigid Body al objeto, para poder asignarle valores de velocidad y gravedad
        this.bird.body.velocity.x = 10;        
        this.physics.add.collider(this.bird, this.pipes.group, this.gameOver, null, this);
        //Limita el movimiento al canvas
        this.bird.body.setCollideWorldBounds(true);
        this.score = new Score(this, 16, 16, this.layers.ui);

        this.pipes.onPipeExit = ()=>{
          this.score.addScore(1);
        }

        this.pipes.start();
        
    }

    update(time, delta){
        this.pipes.update();
      }

    gameOver(){
        alert("You lose");
        //Reinicia la escena
        this.scene.restart();
      }
}