function Snake() {
    this.step = 20; //Grid size
    this.x = this.step; //x position of head
    this.y = this.step; //y position of head
    this.lastx = this.step; //last x position of head
    this.lasty = this.step; //last y position of head
    this.xspeed = 1; //x speed for grid
    this.yspeed = 0; //y speed for grid
    this.total = 0; //total food gained
    this.tail = []; //tail of snake
    this.lastdir = 39; //last key pressed (for blocking opposite direction)
    this.window = 600; //window size
    this.nextPossibleFrame = 0; //next possible action (frameCount) for blocking opposite direction (multiple moves in one frame)
    this.highscore = localStorage['highscore'] || 0; //cached high score or 0 if not set

    this.getLastDirection = function() {
        return this.lastdir;
    }

    this.setLastDirection = function (last) {
        this.lastdir = last;
    }

    this.setNextPossibleFrame = function (next) {
        this.nextPossibleFrame = next;
    }

    this.getNextPossibleFrame = function () {
        return this.nextPossibleFrame;
    }

    this.eat = function (pos) { //checks if snake is able to eat the food
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function () {   //calls reset on colission with tail or wall
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) this.reset();
        }
        if (
            (this.x <= 0 && this.lastx <= 0 && this.lasty == this.y)
            ||
            (this.x >= (this.window - this.step) && this.lastx >= (this.window - this.step) && this.lasty == this.y)
            ||
            (this.y <= 0 && this.lasty <= 0 && this.lastx == this.x)
            ||
            (this.y >= (this.window - this.step) && this.lasty >= (this.window - this.step) && this.lastx == this.x)
        ) this.reset();
    }

    this.isOnSnake = function (x, y) {  //checks if coord is on snake
        var res = false;
        if (this.tail.length > 0) {
            var idx = 0;
            while (idx < this.tail.length && !res) {
                var pos = this.tail[idx];
                if (pos.x == x && pos.y == y) res = true;
                idx++;
            }
        }
        else if (this.x == x && this.y == y) res = true;
        return res;
    }

    this.reset = function () { //sets snake to start position and manages scores
        if (this.total != undefined && this.highscore < this.total) {  //setting cached highscore if broken
            this.highscore = this.total;
            localStorage['highscore'] = "" + this.highscore;
        }
        //showing scores
        document.getElementById("score").innerHTML = ("Last Score: " + this.total + " --- " + "Highscore: " + localStorage['highscore']);
        //setting snake to start position
        this.x = this.step;
        this.y = this.step;
        this.lastx = this.step;
        this.lasty = this.step;
        this.xspeed = 1;
        this.yspeed = 0;
        this.lastdir = 39;
        this.total = 0;
        this.tail = [];
    }

    this.update = function () { //moving snake
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        this.lastx = this.x;
        this.lasty = this.y;
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function () {   //drawing snake
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}