let canvas;
let ctx;

function init_draw() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    draw_rect();
    draw_circle();
    draw_lines();
    draw_pacman();
}

function draw_cirle() {
    ctx.beginPath();
// ringi pole olemas, on olemas kaar. Anname talle algusnurga ja lõpnurga
        ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI);
        ctx.stroke();
    ctx.closePath();
}

function draw_pacman(){
	ctx.beginPath();
    ctx.fillStyle="#FFFF00";
		ctx.arc(800, 110, 100, .1 * Math.PI, 1.9 * Math.PI);
		ctx.lineTo(800, 110);
		//ctx.stroke();
		ctx.fill();
	ctx.closePath();
}


function draw_lines() {
    ctx.beginPath();
        ctx.strokeStyle = "#000FF";
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2, canvas.height / 2 - 200);
        ctx.lineTo(canvas.width / 2 + 200, canvas.height / 2);
        ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "magenta";
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width, canvas.height);

    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "magenta";
    ctx.moveTo(0,0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "magenta";
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(canvas.width, 0, 0, canvas.height, canvas.width, canvas.height);
    ctx.stroke();
    ctx.closePath();

}

function draw_rect() {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 8;
    ctx.fillStyle = "pink";
    ctx.beginPath();
        ctx.rect(100, 100, canvas.width / 4, canvas.height / 4);
        ctx.stroke();
        ctx.fill();
    ctx.closePath();

    ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 8;
        ctx.fillStyle = "lightblue";
        ctx.rect(100+canvas.width /4 + 8, 100 + canvas.height / 4 + 8, canvas.weight / 4, canvas.height / 4);
    ctx.closePath();

}