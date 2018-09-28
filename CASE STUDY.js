// tao 1 thanh chan
let barrier = new Barriers();

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
    ctx.font = "25px Arial";
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
