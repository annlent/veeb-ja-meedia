let canvas;
let ctx;
let time_unit;
let temp_unit;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.translate(0, canvas.height / 2);
	ctx.scale(1, -1);
	time_unit = Math.floor(canvas.width / (avg_temp.length + 1));
	temp_unit = Math.floor(canvas.height / 50);
	draw_axis();
	draw_temp_graph();
}

function draw_axis(){
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
	ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(canvas.width, 0);
		ctx.stroke();
		//ctx.strokeRect(0,0, 100, 100);
	ctx.closePath();
}

function draw_temp_graph(){
	ctx.strokeStyle = "gray";
	ctx.beginPath();
		ctx.moveTo(time_unit, avg_temp[0][2] * temp_unit);
		for(let i = 1; i < avg_temp.length; i ++){
			ctx.lineTo(time_unit * (i + 1),avg_temp[i][2] * temp_unit);
		}
		ctx.stroke();
	ctx.closePath();
}