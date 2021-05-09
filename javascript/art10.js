let canvas;
let ctx;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	init_draw();
}

function init_draw(){
	canvas.addEventListener("mousedown", start_draw);
}

function start_draw(e){
	//console.log(e);
	let x = e.clientX - canvas.offsetLeft + window.scrollX;
	let y = e.clientY - canvas.offsetTop + window.scrollY;
	ctx.lineWidth = document.getElementById("art_linewidth").value;
	ctx.strokeStyle = document.getElementById("art_color").value;
	ctx.beginPath();
		ctx.moveTo(x,y);
		canvas.addEventListener("mousemove", do_draw);
		canvas.addEventListener("mouseup", stop_draw);
		canvas.addEventListener("mouseleave", stop_draw);
}

function do_draw(e){
	let x = e.clientX - canvas.offsetLeft + window.scrollX;
	let y = e.clientY - canvas.offsetTop + window.scrollY;
	ctx.lineTo(x,y);
	ctx.stroke();
}

function stop_draw(e){
		let x = e.clientX - canvas.offsetLeft + window.scrollX;
		let y = e.clientY - canvas.offsetTop + window.scrollY;
		ctx.lineTo(x,y);
	ctx.closePath();
	canvas.removeEventListener("mousemove", do_draw);
	canvas.removeEventListener("mouseup", stop_draw);
	canvas.removeEventListener("mouseleave", stop_draw);
}