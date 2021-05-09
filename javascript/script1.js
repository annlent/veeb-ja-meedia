let message = "see tõesti töötab!"; 
let picurl = "http://greeny.cs.tlu.ee/~rinde/media/photos/TLU_600x400/";
let picNamePrefix = "tlu_";
let picext = ".jpg";
let minPicNum = 1;
let maxPicNum = 43;
// meil on kokku pilte 1 kuni 43ni ja selle eelnevaga panemegi paika millise numbrivahemiku hulgast saab pilte valida
// varasemalt kasutati var muutujat
let picNum = 1;
let picChange = 0;

window.onload=function() {
    //alert("see töötab")
    //console.log("Sõnum on: " + message);
    putOpeningTime();
    putRandomPic();
    document.getElementById("tlu_pic").addEventListener("click", putRandomPic);
    // järgnev on clock8.js
    init_clock();
    // addEventListener on lisame mingi tegevuse kuulamise, st kui klikitakse, siis karju
    // putRandomPic on ilma sulgudeta, sest muidu ta hiljem tööle ei lähe
    // setInterval(clockTick, 500);
    document.getElementById("nextPhoto").addEventListener("click", nextPhoto);
    document.getElementById("prevphoto").addEventListener("click", prevPhoto);
    // see prepare_music on music8.js failis
    prepare_music();
    init_draw();

}

function nextPhoto() {
    picNum ++;
    if(picNum > maxPicNum){
        picNum = minPicNum;
    }
    putPhoto();
}

function prevPhoto(){
	picnum --;
	if(picnum < minpicnum){
		picnum = maxpicnum;
	}
	putPhoto();
}

function putRandomPic() {
    let randomNum = minPicNum + Math.round(Math.random() * (maxPicNum -minPicNum));
    picNum = randomNum;
    putPhoto();
    
}

function putPhoto() {
       if(picChange%2 == 0) {
        document.getElementById("tlu_pic2").src = picurl + picNamePrefix + picNum + picext;
        document.getElementById("tlu_pic2").style.opacity = 1;
    }
    else {
    document.getElementById("tlu_pic").src = picurl + picNamePrefix + picNum + picext;
    document.getElementById("tlu_pic2").style.opacity = 0;
    }
    picChange ++;
}

function putOpeningTime() {
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    document.getElementById("timeplace").innerHTML = "Lehe avati kell: " + currentHours +":" + currentMinutes + ":" + currentSeconds + ".";
}



