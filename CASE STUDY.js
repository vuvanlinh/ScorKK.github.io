let playerName = prompt("Enter your name : ");

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
    });

//tao 1 mang mau
let color = ['#C50023', '#F1AF00', '#5BBD2B', '#00B2BF', '#A2007C', '222222', '111111', '000000', 'FF0000', 'EE0000', 'DD0000'];

// tao lop thanh chan
function Barriers() {
    this.x = innerWidth - innerWidth / 2 - 200;
    this.y = innerHeight - 50;
    this.length = 322;
    this.thickness = 25;
    this.color = color[Math.floor(Math.random() * 10)];

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.length, this.thickness);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineJoin = "round";
        ctx.stroke();
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
    this.color = color[Math.floor(Math.random() * 10)];

    //ve bong
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = this.color;
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

}

//tao 1 day bong
let ballArray = [];

for (let i = 0; i < 3; i++) {
    let radius = Math.random() * 20 + 8;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = innerHeight / 4;
    let dx = Math.random() * 3 + 5;
    let dy = Math.random() * 3 + 5;
    ballArray.push(new Balls(x, y, dx, dy, radius))
}


function gameOver() {
    for (let i = 0; i < ballArray.length; i++) {
        if (ballArray[i].y >= barrier.y - barrier.thickness / 2) {
            cancelAnimationFrame(id);
            ctx.beginPath();
            ctx.font = "50px Arial";
            ctx.fillStyle = "purple";
            ctx.fillText(playerName + " gà vậy :C", innerWidth / 2 - 200, innerHeight / 3);
            ctx.fill();

        }
    }

}

let id;

//hien thi
function animate() {
    id = requestAnimationFrame(animate);

    //xoa tan anh
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    //hien diem so o goc trai
    ctx.font = "25px Verdana";
    ctx.fillText("Score: " + score, 10, 30);
    score++;

    // dieu kien doi huong khi ball va cham voi barrier
    for (let i = 0; i < ballArray.length; i++) {
        if (ballArray[i].y + ballArray[i].radius >= barrier.y - barrier.thickness / 2 && ballArray[i].x > barrier.x && ballArray[i].x < barrier.x + barrier.length) {
            ballArray[i].dy = -ballArray[i].dy;
        }
    }

    //hien thi barrier
    barrier.update();

    //hien thi day bong
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update()
    }

    gameOver();

}

animate();
