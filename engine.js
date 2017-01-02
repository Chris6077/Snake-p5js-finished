var s;  //snake
var scl = 20;   //scale of grid
var food;   //food
var frameStep = 10; //frameRate (speed of Snake)

function setup() {
    //unbinding keys with scroll function
    //(disabling the scroll function of the keyboard)
    var keys = {};
    window.addEventListener("keydown",
        function (e) {
            keys[e.keyCode] = true;
            switch (e.keyCode) {
                case 37: case 39: case 38: case 40: //Arrow keys
                case 32: e.preventDefault(); break; //Space
                default: break; //do not block other keys
            }
        },
    false);
    window.addEventListener('keyup',
        function (e) {
            keys[e.keyCode] = false;
        },
    false);
    //unbinding keys with other functions
    $(document).unbind("keypress.key37");
    $(document).unbind("keypress.key38");
    $(document).unbind("keypress.key39");
    $(document).unbind("keypress.key40");
    createCanvas(600, 600);
    s = new Snake();
    //making snake slower
    frameRate(frameStep);
    pickLocation();
    //setting start scores
    document.getElementById("score").innerHTML = ("Last Score: " + 0 + " --- " + "Highscore: " + (localStorage['highscore'] || 0));
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    var rndmx;
    var rndmy;
    do {    // blocking food spawn on snake
        rndmx = floor(random(cols));
        rndmy = floor(random(rows));
    } while (s.isOnSnake(rndmx, rndmy));
    //creating food (not drawing)
    food = createVector(rndmx, rndmy);
    food.mult(scl);
}

//bad idea -> what if the snake eats? not good for testing
/*function mousePressed() {
    s.total++;
}*/

function draw() {
    background(51);
    if (s.eat(food)) {  //respawning food if snake got it
        pickLocation();
    }
    s.death();
    s.update();
    s.show();
    //coloring food
    fill(255, 0, 100);
    //drawing food
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if (frameCount > s.getNextPossibleFrame()) {    //blocking multiple actions (turning) in one step
        if (keyCode === UP_ARROW) {
            if (s.getLastDirection() == 37 || s.getLastDirection() == 39) {
                s.setLastDirection(38);
                s.dir(0, -1);
                s.setNextPossibleFrame(frameCount); //if pressed key is invalid user can press another one so we need this in each if and not at the end
            }
        } else if (keyCode === DOWN_ARROW) {
            if (s.getLastDirection() == 37 || s.getLastDirection() == 39) {
                s.setLastDirection(40);
                s.dir(0, 1);
                s.setNextPossibleFrame(frameCount); //if pressed key is invalid user can press another one so we need this in each if and not at the end
            }
        } else if (keyCode === RIGHT_ARROW) {
            if (s.getLastDirection() == 38 || s.getLastDirection() == 40) {
                s.setLastDirection(39);
                s.dir(1, 0);
                s.setNextPossibleFrame(frameCount); //if pressed key is invalid user can press another one so we need this in each if and not at the end
            }
        } else if (keyCode === LEFT_ARROW) {
            if (s.getLastDirection() == 38 || s.getLastDirection() == 40) {
                s.setLastDirection(37);
                s.dir(-1, 0);
                s.setNextPossibleFrame(frameCount); //if pressed key is invalid user can press another one so we need this in each if and not at the end
            }
        }
    }
}