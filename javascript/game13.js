let canvas;
let ctx;

let base_r = 15;

let ball_list= [];
let elements_limit = 10;
let game_alphabet = [];
let correct_hit_count = 0; 

//täiendada mängu!
//mänguelemendid värviliseks - juhuslikud värvid
//lugeda ka valesid ja lausa mööda tehtud klikke!
//Luua mängu alustamine ja lõpetamine koos võimalusega uuesti mängida
//lisage helid tabamustele
//lisada heliklipid erinevate tabamuste jaoks, miks mitte ka mängu alguseks ja lõpuks. 
//lisada taustamuusika (võimalusega seda mitte mängida)
//lisada ajavõtt (fikseerida algushetk, lõpuhetk,  getTime() annab ajahetke millisekundites ja sellest saab arvutada minutid, sekundid jms).
//lisada punktisüsteem
//laske fantaasial lennata!


window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	init_game();
}

function init_game() {
	add_elements();
	//moving();
	canvas.addEventListener("mousedown", check_hits);
}


function add_elements() {
	//ball = new Game_ball(x, y, r); enam ei ole vaja
	let base_alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "Š", "Z", "Ž", "T", "U", "V", "W", "Õ", "Ä", "Ö", "Ü", "X", "Y"];
	game_alphabet = base_alphabet.slice(0);
	//loosime soovitud arvu tähti
	while(game_alphabet.length > elements_limit) {
		let one_to_remove =Math.round(Math.random() * (game_alphabet.length - 1));
		game_alphabet.splice(one_to_remove, 1);
	}

	//console.log(game_alphabet);
	for(let i = 0; i < elements_limit; i++) {
		let x = canvas.width / 2;
		let y = canvas.height / 2;
		let r = base_r + Math.round(Math.random() * 15); //lubame raadiusi 15st 30ni
		let symbol = game_alphabet[game_alphabet.length - 1 - i];
		ball_list.push(new Game_ball(x, y, r, symbol));
	}

	move_elements();
}

function move_elements() {
	canvas.width = canvas.width;
	// ball.move_self();
	// ball.draw_self();
	for(let i = 0; i < ball_list.length; i ++) {
		ball_list[i].move_self();
		ball_list[i].draw_self();
	}
	if(ball_list.length > 0) {
		requestAnimationFrame(move_elements);
	}
	else {
		canvas.removeEventListener("mousedown", check_hits);
	}
	
}

function check_hits(e) {
	let m_x = e.clientX - canvas.offsetLeft + window.scrollX;
	let m_y = e.clientY - canvas.offsetTop + window.scrollY;
	for(let i = 0; i < ball_list.length; i ++) {
		if(ball_list[i].was_hit(m_x, m_y)) {
			if(ball_list[i].symbol == game_alphabet[correct_hit_count]) {
				ball_list.splice(i, 1);
				correct_hit_count ++;
				break; //üks sai pihta, katkestame tsükli
			}

		}
	}
}

function pythagoras(b_x, b_y, m_x, m_y){ //defineerime Pythagorase teoreemist kauguse 
	return Math.sqrt(Math.pow(b_x-m_x, 2) + Math.pow(b_y-m_y), 2);
}
//defineerin klassi ehk mängu elemendi "proto"
class Game_ball {
	constructor(x, y, r, symbol) {
		this.x = x; //selle klassi x, mille siia saatsime
		this.y = y; 
		this.r = r;
		this.symbol = symbol;
		this.speed_x = 0;
		this.speed_y = 0;
		this.set_speed();
		this.draw_self();
	}

set_speed() {
	while(this.speed_x == 0 && this.speed == 0); //kuni tingimus on täidetud, seni tsükkel käib
	this.speed_x = 4  - Math.round(Math.random() * 8); //leian juhusliku suuruse (ümardan ka) vahemikus nullist kaheksani
	this.speed_y = 4  - Math.round(Math.random() * 8);
}

	draw_self() {
		ctx.fillStyle = "#ff00cc";
		ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "#FFFFFF"; //tekstile saab lsiada ka vormingut nt "bold 20px Verdana"
		ctx.font = "bold " + Math.round(this.r *1.4) + "px Times New Roman";
		ctx.textAlign = "center";	
		ctx.textBaseline = "middle";
		ctx.fillText(this.symbol, this.x, this.y);
	}

	move_self() {
		this.x += this.speed_x;
		this.y += this.speed_y;
//kontrollin kas on jõudnud servani ja edasi põrkama
	if(this.x <= this.r || this.x >= canvas.width - this.r) {
		this.speed_x *= -1;
	}
	if(this.y <= this.r || this.y >= canvas.height - this.r) {
		this.speed_y *= -1;
	}	
	}

	was_hit(m_x, m_y) {
		return pythagoras(this.x, this.y, m_x, m_y) <= this.r;
	}

} //klass lõppeb

//seda funktsiooni enam ei kasuta (nagu Rinde ütles: ballast!)
function moving() {
	
	//ctx.clearRect(0, 0, canvas.width, canvas.height); //saab ära kustutada täpi taga olevat jutti
	canvas.width = canvas.width; //lähtestab canvase nii, et eelnevad sätted ei muutu (saab ka height'ga ka)
	ctx.fillStyle = "#ff00cc";
	//muudan asukohta
	x += speed_x;
	y += speed_y;
//kontrollin kas on jõudnud servani ja edasi põrkama
	if(x <= r || x >= canvas.width - r) {
		speed_x *= -1;
	}
	if(y <= r || y >= canvas.height - r) {
		speed_y *= -1;
	}
	ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.fill();
	ctx.closePath();
	requestAnimationFrame(moving);
}