title = "BLITZED";

description = `
Annihilate.
[Hold Left]
  Move Left
[Hold Right]
  Move Right
`;

characters = [
`
  ll
  ll 
 llll 
 llll
llllll
llllll
`,`
 l
lll
 l
`,`
llllll
l ll l
 llll
 l  l
`,`
 llll
l ll l
 llll
l    l
`,`
 ll
l  l
l  l
 ll
`,
`
 llll
llllll
l ll l
llllll
ll  ll
`
];

const G = {
    WIDTH: 100,
    HEIGHT: 150,
    OUTER_BORDER: 30,

    PLAYER_FIRE_RATE: 30,
    PLAYER_LIFE: 30,
    PLAYER_MOVE_SPD: 1,
    FBULLET_SPEED: 5,

    ENEMY_FIRE_RATE: 60,
    ENEMY_HP: 1,
    ENEMY_ANIM_SPD: 60,
    ENEMY_MOVE_SPD_HORIZONTAL: 0.02,
    ENEMY_MOVE_SPD_VERTICAL: 0.04,
    ENEMY_TRIGGER_DISTANCE_HORIZONTAL: 27,
    ENEMY_TRIGGER_DISTANCE_VERTICAL: 17,
    EBULLET_SPEED: 1,

    DIFFICULTY_MODIFIER: 0.1,

    STAR_MIN_VELOCITY: 0.5,
    STAR_MAX_VELOCITY: 1.0,
}

options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT},
    theme: "pixel",
    isDrawingParticleFront: true,
    isDrawingScoreFront: true,
    isPlayingBgm: true,
    isReplayEnabled: true,
    // isCapturing: true,
    // isCapturingGameCanvasOnly: true,
    // captureCanvasScale: 0.5,
    seed: 894
};

/**
 * @typedef {{
 * pos: Vector,
 * life: number,
 * isFiring: false,
 * firingCooldown: number
 * }} Player
 */

/**
 * @typedef {{
 * pos: Vector
 * }} FBullet
 */

/**
 * @typedef {{
 * pos: Vector
 * }} BigBullet
 */

/**
 * @typedef {{
 * pos: Vector,
 * hp: number,
 * state: EnemyState,
 * nextDir: EnemyState,
 * speed: number,
 * distanceLog: number
 * }} Enemy
 */

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * }} EBullet
 */

/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * speed: number,
 * rotation: number,
 * rotationSpd: number
 * }} Star
 */

/**
 * @type { Player }
 */
let player;

/**
 * @type { FBullet [] }
 */
let fBullets;

/**
 * @type {BigBullet [] }
 */
let bigBullets;

/**
 * @type { Enemy [] }
 */
let enemies;

/**
 * @type { EBullet [] }
 */
let eBullets;

/**
 * @type { Star [] }
 */
let stars;

/**
 * @type { number };
 */
let enemyFiringCooldown;

/**
 * @type { number }
 */
let waveCount;

/**
 * @type { Color[] }
 */
 const C = [
    "red",
    "green",
    "blue",
    "yellow",
    "black",
    "purple",
    "cyan",
    "light_red",
    "light_green",
    "light_blue",
    "light_yellow",
    "light_black",
    "light_purple",
    "light_cyan",
];

/**
 * @type {{
 * fg: Color,
 * bg: Color
 * }}
 */
let currentCol;

/**
 * @enum { string }
 */
const EnemyState = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    DOWN: "DOWN"
};

let shotX;
let shotSize;
let charge;

function shootall()
 {fBullets.push({
    pos: vec(5, 160)
    });

    fBullets.push({
        pos: vec(10, 160)
        });

        fBullets.push({
            pos: vec(15, 160)
            });

            fBullets.push({
                pos: vec(20, 160)
                });

                fBullets.push({
                    pos: vec(25, 160)
                    });

                    fBullets.push({
                        pos: vec(30, 160)
                        });
                        fBullets.push({
                            pos: vec(35, 160)
                            });
                
                            fBullets.push({
                                pos: vec(40, 160)
                                });
                
                                fBullets.push({
                                    pos: vec(45, 160)
                                    });
                
                                    fBullets.push({
                                        pos: vec(50, 160)
                                        });
                
                                        fBullets.push({
                                            pos: vec(55, 160)
                                            });
                
                                            fBullets.push({
                                                pos: vec(60, 160)
                                                });
                                                fBullets.push({
                                                    pos: vec(65, 160)
                                                    });
                                        
                                                    fBullets.push({
                                                        pos: vec(70, 160)
                                                        });
                                        
                                                        fBullets.push({
                                                            pos: vec(75, 160)
                                                            });
                                        
                                                            fBullets.push({
                                                                pos: vec(80, 160)
                                                                });
                                        
                                                                fBullets.push({
                                                                    pos: vec(85, 160)
                                                                    });
                                        
                                                                    fBullets.push({
                                                                        pos: vec(90, 160)
                                                                        });
                                                                        fBullets.push({
                                                                            pos: vec(95, 160)
                                                                            });
                                                                            fBullets.push({
                                                                                pos: vec(100, 160)
                                                                                });
                                                                            }



function update() {
    if (!ticks) {
        player = {
            pos: vec(G.WIDTH*0.5, G.HEIGHT*0.9),
            life:G.PLAYER_LIFE,
            isFiring: false,
            firingCooldown: 0
        };
        fBullets = [];
        bigBullets = [];
        enemies = [];
        eBullets = [];
        stars = times(rndi(4, 7), () => {
            return {
                pos: vec(rnd(G.WIDTH), rnd(G.HEIGHT)),
                angle: rnd(PI*2),
                speed: rnd(3,1),
                rotation: rnd(),
                rotationSpd: rnd(0.1)
            };
        });

        enemyFiringCooldown = G.ENEMY_FIRE_RATE;
        waveCount = 0;
        currentCol = {
            bg: "white",
            fg: "white"
        };

        shotX = shotSize = undefined;
        charge = 0;
    
  }
  
    if(G.PLAYER_LIFE<0)
    {
      end();
      G.PLAYER_LIFE=50;
      G.PLAYER_FIRE_RATE =30;
      G.ENEMY_HP = 1;
    }

    if (enemies.length === 0) {
        regenerate();
        waveCount++;
        //G.PLAYER_LIFE +=5; give player more hp after each round
        G.PLAYER_FIRE_RATE -=3; //change to -1; //player firerate increase per round
        if (ticks > 60) addScore(waveCount*10, player.pos);
    }

    color(currentCol.bg);
    // stars.forEach((s) => {
    //     s.pos.x += s.speed * Math.cos(s.angle);
    //     s.pos.y += s.speed * Math.sin(s.angle);
    //     s.rotation += s.rotationSpd;
    //     s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    //     char("f", s.pos, {rotation: s.rotation});
    // });

    color(currentCol.fg);
    char("a", player.pos);
    player.firingCooldown--;
    if (player.firingCooldown < 0 && !input.isPressed) {
        player.firingCooldown = G.PLAYER_FIRE_RATE;


      //muzzle flash
      particle(
      player.pos.x,  // x coordinate
      player.pos.y, // y coordinate
      5, // The number of particles
      1, // The speed of the particles
      -PI/2, // The emitting angle
      PI/4  // The emitting width
      );


        fBullets.push({ pos: vec(player.pos.x, player.pos.y) });
      
    } else if (player.firingCooldown < 0 && input.isPressed) {
        player.firingCooldown = G.PLAYER_FIRE_RATE;


      //muzzle flash
      particle(
      player.pos.x,  // x coordinate
      player.pos.y, // y coordinate
      5, // The number of particles
      1, // The speed of the particles
      -PI/2, // The emitting angle
      PI/4  // The emitting width
      );


        bigBullets.push({ pos: vec(player.pos.x, player.pos.y) });
    }


  //Player Engine Particles
  
  particle(
  player.pos.x,  // x coordinate
  player.pos.y, // y coordinate
  5, // The number of particles
  5, // The speed of the particles
  PI/2, // The emitting angle (originally 2)
  PI/5  // The emitting width
  );
 
    //MOVEMENT
    player.pos = vec(input.pos.x, G.HEIGHT * 0.9);
    player.pos.x = clamp(player.pos.x, G.WIDTH * 0.1, G.WIDTH * 0.9);
    ///


    fBullets.forEach((fb) => {
        fb.pos.y -= G.FBULLET_SPEED;
        char("b", fb.pos);
    });

    bigBullets.forEach((bb) => {
        bb.pos.y -= G.FBULLET_SPEED;
        char("f", bb.pos);
    } )

    enemyFiringCooldown--;
    if (enemyFiringCooldown <= 0) {
        if (enemies.length <= 0) return;
        let pickedEnemy = enemies[rndi(enemies.length)];
        if (rnd() > 0.7) {
            eBullets.push({
                pos: vec(pickedEnemy.pos.x, pickedEnemy.pos.y),
                angle: PI*0.5
            });
        } else {
            eBullets.push({
                pos: vec(pickedEnemy.pos.x, pickedEnemy.pos.y),
                angle: PI*0.6
            });
            eBullets.push({
                pos: vec(pickedEnemy.pos.x, pickedEnemy.pos.y),
                angle: PI*0.4
            });
        }
        enemyFiringCooldown = G.ENEMY_FIRE_RATE - difficulty * 0.1;

        play("laser");
    }

    remove(enemies, (e) => {
        
        switch(e.state) {
            case EnemyState.LEFT:
                e.pos.x -= e.speed;
                break;
            case EnemyState.RIGHT:
                e.pos.x += e.speed;
                break;
            case EnemyState.DOWN:
                e.pos.y += e.speed;
                break;
        }

        e.distanceLog += abs(e.speed);
        if (e.state === EnemyState.LEFT
            && e.distanceLog >= G.ENEMY_TRIGGER_DISTANCE_HORIZONTAL) {

            e.distanceLog = 0;
            e.state = EnemyState.DOWN;
            e.nextDir = EnemyState.RIGHT;
            e.speed = G.ENEMY_MOVE_SPD_VERTICAL
                + difficulty * G.DIFFICULTY_MODIFIER;
        } else if (e.state === EnemyState.RIGHT
            && e.distanceLog >= G.ENEMY_TRIGGER_DISTANCE_HORIZONTAL) {

            e.distanceLog = 0;
            e.state = EnemyState.DOWN;
            e.nextDir = EnemyState.LEFT;
            e.speed = G.ENEMY_MOVE_SPD_VERTICAL
                + difficulty * G.DIFFICULTY_MODIFIER;
        } else if (e.state === EnemyState.DOWN
            && e.distanceLog >= G.ENEMY_TRIGGER_DISTANCE_VERTICAL) {

            e.distanceLog = 0;
            e.state = e.nextDir;
            e.speed = G.ENEMY_MOVE_SPD_HORIZONTAL
                + difficulty * G.DIFFICULTY_MODIFIER;
        }

        const isCollidingWithPlayer =
            char(addWithCharCode("c", floor(ticks/G.ENEMY_ANIM_SPD)%2), e.pos)
                .isColliding.char.a;
        const isCollidingWithFBullet =  
            char(addWithCharCode("c", floor(ticks/G.ENEMY_ANIM_SPD)%2), e.pos)
                .isColliding.char.b;

        if (isCollidingWithFBullet) e.hp--;
        if (isCollidingWithPlayer) {
            //end();
            
            G.PLAYER_LIFE--;
            shootall();
            play("lucky");
        }

        if (e.hp === 0) {
            addScore(waveCount, e.pos);
            play("explosion");
            particle(e.pos, 30, 7);
        }

        return (e.hp === 0 || e.pos.y > G.HEIGHT);
    });
    
 

    remove(eBullets, (eb) => {
        eb.pos.x += G.EBULLET_SPEED * Math.cos(eb.angle);
        eb.pos.y += G.EBULLET_SPEED * Math.sin(eb.angle);
      
        
        const isCollidingWithFBullet = char("e", eb.pos).isColliding.char.b; //remove enemy bullets if collides with player bullet
        if(isCollidingWithFBullet){
            play("hit");
            particle(eb.pos) //destroys enemy bullet 
        }
        
        const isCollidingWithPlayer = char("e", eb.pos).isColliding.char.a;
        if (isCollidingWithPlayer) {
            //end();
            G.PLAYER_LIFE--;
            shootall();
            play("lucky");
          
        }

        return ( isCollidingWithFBullet||!eb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
    });




    remove(fBullets, (fb) => { //removing player bullets
       
      

      const isCollidingWithEnemy =
            char("b", fb.pos).isColliding.char.c
            || char("b", fb.pos).isColliding.char.d;

        if (isCollidingWithEnemy) {
            play("hit");
            particle(fb.pos);
        }

        const isCollidingwithEBullets =   //removes player bullet when collides with enemy bullet
        char("b", fb.pos).isColliding.char.e;
         
          if (isCollidingwithEBullets) {
            play("hit"); 
            color("red");           
            particle(fb.pos);
            
        }

    
        return (isCollidingwithEBullets||isCollidingWithEnemy || fb.pos.y < 0);
    });

    color("red");
    //text("enemy hp:"+G.ENEMY_HP.toString(),3,20);  //shows enemy hp 
    
    //text("FIRE RATE:"+G.PLAYER_FIRE_RATE.toString(),3,30);  //shows player firerate 

    text("PLAYER HP:"+G.PLAYER_LIFE.toString(),3,10);  //shows player hp

    function regenerate() {


        if(G.ENEMY_HP>=4)  //figure out how to channge enemy sprite
        {
          currentCol.fg = (C[rndi(C.length)]);
          currentCol.bg = (C[rndi(C.length)]);
          do {
              currentCol.bg = (C[rndi(C.length)]);
          } while (currentCol.fg === currentCol.bg);
          
          for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 4; j++) {
  
                  let x = G.WIDTH*0.1 + i*12 + (j%2)*6;
                  let y = G.HEIGHT*0.1 + j*6;
  
                  enemies.push({
                      pos: vec(x, y),
                      hp: G.ENEMY_HP + ceil(waveCount/2),
                      state: EnemyState.RIGHT,
                      nextDir: EnemyState.LEFT,
                      speed: G.ENEMY_MOVE_SPD_HORIZONTAL
                          + difficulty * G.DIFFICULTY_MODIFIER,
                      distanceLog: 0
                  });
              }
          }
        }
        
        else{
        
        currentCol.fg = (C[rndi(C.length)]);
        currentCol.bg = (C[rndi(C.length)]);
        do {
            currentCol.bg = (C[rndi(C.length)]);
        } while (currentCol.fg === currentCol.bg);
        
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 4; j++) {

                let x = G.WIDTH*0.1 + i*12 + (j%2)*6;
                let y = G.HEIGHT*0.1 + j*6;

                enemies.push({
                    pos: vec(x, y),
                    hp: G.ENEMY_HP + ceil(waveCount/2),
                    state: EnemyState.RIGHT,
                    nextDir: EnemyState.LEFT,
                    speed: G.ENEMY_MOVE_SPD_HORIZONTAL
                        + difficulty * G.DIFFICULTY_MODIFIER,
                    distanceLog: 0
                });
            }
        }
      }
        
        enemyFiringCooldown = G.ENEMY_FIRE_RATE - difficulty * 0.1;
        G.ENEMY_HP++;
        play("powerUp");
        particle(G.WIDTH/2, G.HEIGHT*0.15, 70, 7);
    }

    //stars
    stars.forEach((s) => {
    
    //var starcolors= ["yellow","white"];
    //var starcolor = starcolors[Math.floor(Math.random()*starcolors.length)];
    // @ts-ignore
    //color(starcolor);      
    s.pos.y += s.speed*(difficulty);  
    if (s.pos.y > G.HEIGHT) s.pos.y = 0;
    color("light_black");       
    box(s.pos, 1);
    
    });
}