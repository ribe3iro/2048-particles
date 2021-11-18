const BOUNCE = 0.75;
const FRAMES_UNTIL_NEW_PARTICLE = 10;


let particles = [];
let gravity;

function setup(){
    colorMode(HSB, 100);
    createCanvas(1000, 600);

    gravity = createVector(0, 0.1);
}

function draw(){
    background(0);

    if((frameCount % FRAMES_UNTIL_NEW_PARTICLE) == 0){
        particles.push(new Particle(
            random(width), 
            random(-50)
        ));
    }
    for(let i = 0; i < particles.length; i++){
        let p = particles[i];
        p.update();
        p.draw();
    }

    let fused = false;

    for (let i = particles.length-1; i >= 0; i--){
        const p = particles[i];
        for (let j = i-1; j >= 0; j--){
            const other = particles[j];
            if(p.level != other.level){
                break;
            }
            if(p.hit(other)){
                const newP = new Particle(
                    p.pos.x, 
                    p.pos.y,
                    p5.Vector.add(p.vel, other.vel), 
                    p.level+1
                );

                particles.splice(i,1);
                particles.splice(j,1);

                particles.splice(j, 0, newP);

                fused = true;

                break;
            }
        }
    }

    if(fused){
        // Insertion sort
        for (let i = 1; i < particles.length; i++) {
            let p = particles[i];

            let j = i-1; 
            while ((j >= 0) && (p.r > particles[j].r)) {
                particles[j+1] = particles[j];
                j--;
            }
            particles[j+1] = p;
        }
    }
}
