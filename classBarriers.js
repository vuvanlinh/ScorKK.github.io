//tao 1 mang mau
let color = ['#C50023', '#F1AF00', '#5BBD2B', '#00B2BF', '#A2007C', '222222', '111111', '000000', 'FF0000', 'EE0000', 'DD0000'];

// tao lop thanh chan
function Barriers() {
    this.x = innerWidth - innerWidth / 2 - 200;
    this.y = innerHeight - 50;
    this.length = innerWidth / 4;
    this.thickness = 18;
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
