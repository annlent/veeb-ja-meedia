let music_url = "../Music/Funkytown.mp3";
let music_player = new Audio();

function prepare_music(){
	music_player.addEventListener("canplay", show_info);
	music_player.addEventListener("canplaythrough", can_start);
	music_player.addEventListener("durationchange", start_monitoring);
	document.getElementById("volume_slider").addEventListener("input", set_volume);
	document.getElementById("speed_slider").addEventListener("input", set_speed);
	music_player.src = music_url;
	//music_player.play();
}

function can_start(){
	music_player.removeEventListener("canplaythrough", can_start);
	document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	document.getElementById("music_btn").addEventListener("click", toggle_play);
	
}

function start_monitoring(){
	document.getElementById("music_pos_slider").max = music_player.duration;
	music_player.addEventListener("timeupdate", show_info);
	document.getElementById("music_pos_slider").addEventListener("change", music_seek);
}

function toggle_play(){
	if(music_player.paused){
		music_player.play();
		document.getElementById("music_btn").innerHTML = "Peata muusika!";
	} else {
		music_player.pause();
		document.getElementById("music_btn").innerHTML = "Mängi muusikat!";
	}
}

function show_info(e){
	//console.log(e);
	if(e.type == "canplay"){
		console.log("Saab mängida");
	}
	if(e.type == "canplaythrough"){
		console.log("Saab lõpuni mängida");
	}
	if(e.type == "timeupdate"){
		document.getElementById("music_pos_place").innerHTML = e.target.currentTime.toFixed(2);
		document.getElementById("music_pos_slider").value = e.target.currentTime.toFixed(2);
	}
}

function music_seek(e){
	music_player.currentTime = e.target.value;
}

function set_volume(e){
	music_player.volume = e.target.value;
}

function set_speed(e){
	music_player.playbackRate = e.target.value;
}