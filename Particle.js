class Particle{
    constructor(x, y, vel = p5.Vector.random2D(), level = 1){
        this.pos = createVector(x, y);
        this.vel = vel;
        this.acc = createVector(0, 0);
        this.level = level;
        this.r = 10 + (level**2);
    }

    applyForce(force){
        this.acc.add(force);
    }

    update(){
        this.applyForce(gravity);

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);

        this.edges();
    }

    hit(other){
        const squaredDist = (this.pos.x - other.pos.x)**2 + (this.pos.y - other.pos.y)**2;

        return squaredDist <= (this.r + other.r)**2;
    }

    edges(){
        if(this.pos.x + this.r > width){
            this.vel.x *= -BOUNCE;
            this.pos.x = width - this.r;
        }else if(this.pos.x - this.r < 0){
            this.vel.x *= -BOUNCE;
            this.pos.x = this.r;
        }
        if(this.pos.y + this.r > height){
            this.vel.y *= -BOUNCE;
            this.pos.y = height - this.r;
        }
    }

    draw(){
        stroke(0, 0, 100);
        
        fill(((this.level*10)+30) % 101, 100, 50);
        circle(this.pos.x, this.pos.y, this.r*2);

        textAlign(CENTER, CENTER);
        textSize(this.r*0.9);
        fill(0, 0, 100);
        text(2**(this.level-1), this.pos.x, this.pos.y);
    }
}