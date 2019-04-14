const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

const c = canvas.getContext('2d');


var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


//function randomIntFromRange(min, max) {
//    return Math.floor(Math.random() * (max - min + 1) + min);
//}
//
//function randomColor(colors) {
//    return colors[Math.floor(Math.random() * colors.length)];
//}


addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener("click", function (event) {
    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

let gravity = 1;
let friction = 0.98;

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } 
//        else if(this.y - this.radius - this.dy <= 0) {
//            this.dy = this.dy/2;
//        }
        else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
    
    window.addEventListener('keydown', (e) => {
    if (e.keyCode == '38') {
        gravity -= 0.0005;
//        if(-this.y > window.innerHeight){
//            this.y -= 1;
//        }
    } else if (e.keyCode == '40') {
        friction -= 0.0005;
    } else if (e.keyCode == '32'){
        this.dy = this.dy * 2;
    }else if (e.keyCode == '37'){
        this.dx = this.dx - 0.5;
    }else if (e.keyCode == '39'){
        this.dx = this.dx + 0.5;
    }else if (e.keyCode == '77'){
        this.radius = this.radius / 2;
    }else if (e.keyCode == '78'){
 this.radius = this.radius * 2;    }
})

    
}

let ball;
let ballArray;

function init() {
    ballArray = [];
    for (let i = 0; i < 300; i++) {
        let radius = randomIntFromRange(8, 20);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height - radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        let color = randomColor(colors);
        ballArray.push(new Ball(x, y, dx, 2, radius, color));
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }

    //    ball.update();
}

//window.addEventListener('keydown', (e) => {
//    if (e.keyCode == '38') {
//        gravity -= 0.1;
//    } else if (e.keyCode == '40') {
//        friction -= 0.02;
//    } else if (e.keyCode == '32'){
//      
//    }else if (e.keyCode == '37'){
//        
//    }else if (e.keyCode == '39'){
//
//    }
//})



Ball();
init();
animate();
