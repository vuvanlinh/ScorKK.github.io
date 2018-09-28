let playerName = prompt("Enter your name : ");

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let score = 0;

function scoreCount() {
    //hien diem so o goc trai
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 30);
}


let mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove",
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });