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
