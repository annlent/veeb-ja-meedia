let sound_url="../Music/kellaheli/";
let time_words = [];
let clock_speaker = new Audio();
let prev_hour = new Date().getHours();

function init_clock() {
    clockTick();
    document.getElementById("speaks_btn").addEventListener("click", tell_time);
}

function clockTick() {
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    let secAngle = currentSeconds*6;
    let minAngle = (currentMinutes*60+currentSeconds)*0.1;
    let hourAngle = (360/12) * (currentHours + currentMinutes/60);
    //transform: rotate(45deg) peaksime talle ette andma. siin saame ette anda omaduse style
    document.getElementById("secondhand").style.transform = "rotate(" + secAngle + "deg)";
    //setTimeout(clockTick, 1000);
    // setTimeout on olemas olnud kaua ning see kasutab liiga palju ressursse ning sprst ei ole hea seda kasutada.
    document.getElementById("minutehand").style.transform = "rotate(" + minAngle + "deg)";
    document.getElementById("hourhand").style.transform = "rotate(" + hourAngle + "deg)";
    requestAnimationFrame(clockTick);
    //olemselt sarnane settimeoutile, aga talle ei anta aega ette ning see on 1/60ndik sekundit, 
    //nõuab vähe ressurssi

}

function tell_time() {
    time_words.push("kellon");
    let currenttime = new Date();
    num_to_words(currenttime.getHours());
    time_words.push("ja");
	num_to_words(currenttime.getMinutes());
	if(currenttime.getMinutes() == 1){
		time_words.push("minut");
	} else {
		time_words.push("minutit");
	}
	console.log(time_words);
	clock_speaker.addEventListener("ended", speak_time);
	speak_time();

}

function speak_time(){
	if(time_words.length > 0){
		clock_speaker.src = sound_url + time_words[0] + ".mp3";
		clock_speaker.play();
		time_words.shift();
	} else {
		clock_speaker.removeEventListener("ended", speak_time);
	}
}


function num_to_words(num_value) {
    if (num_value <= 10) {
        time_words.push(num_value);
    }
    else {
        let tens = Math.floor(num_value/10);
        let ones = num_value % 10;
        if (tens==1) {
            time_words.push(ones);
            time_words.push("teist");
        }
        else {
            time_words.push(ones);
            time_words.push("kümmend");
            if(ones>0) {
                time_words.push(ones);
            }
        } 
    }
}