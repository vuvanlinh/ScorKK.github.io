let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let score = 0;

let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove",
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse)
    });

// tao lop thanh chan
function Barriers() {
    this.x = innerWidth - innerWidth / 2 - 200;
    this.y = innerHeight - 50;
    this.length = 288;
    this.thickness = 5;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.length, this.thickness);
        ctx.fillStyle = "green";
        ctx.fill();
    };

    this.update = function () {
        this.x = mouse.x;
        this.draw();
    }


}

// tao 1 thanh chan
let barrier = new Barriers();

//tao lop bong
function Balls(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    //ve bong
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fill();
    };


    //xu li tinh huong cua qua bong
    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        if (this.y + this.radius >= canvas.height) {
            this.dy = 0;
            this.dx = 0;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

};

//tao 1 qua bong
let ballNum1 = new Balls(100, 100, 25, 25, 22);

function gameOver() {
    if (barrier.y <= ballNum1.y) {
        cancelAnimationFrame(id);
        ctx.beginPath();
        ctx.font = "100px Arial";
        ctx.fillStyle = "purple";
        ctx.fillText("Game OVER", innerWidth / 2 - 366, innerHeight / 2);
        ctx.fill();

    }
}

//hien thi
let id;

function animate() {
    id = requestAnimationFrame(animate);

    //xoa tan anh
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = "25px Verdana";
    ctx.fillText("Score: " + score, 10, 30);
    score++;
    if (ballNum1.y + ballNum1.radius > barrier.y - barrier.thickness && ballNum1.x > barrier.x && ballNum1.x < barrier.x + barrier.length) {
        ballNum1.dy = -ballNum1.dy;
        ballNum1.dx = ballNum1.dx;
    }

    //hien thi barrier
    barrier.update();

    //hien thi ballNum1
    ballNum1.update();

    gameOver();


}

animate();


