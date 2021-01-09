var timerDiv = document.createElement("div");
var min, sec, msec, kills, timer;
var complexity = 1;
//start, game, end
var interfaceState = "start";
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function changeComplexity(i) {
  complexity = i;
}

function refreshFly(){
    document.getElementById("fly").style.position = 'absolute';
    document.getElementById("fly").style.display = 'block';
    document.getElementById("fly").style.cursor = 'pointer';
    document.getElementById("fly").style.left = getRandomArbitrary(0, 95)+"%";
	document.getElementById("fly").style.top = getRandomArbitrary(0, 90)+"%";

}
function refreshFlyLoop(){
	if(interfaceState == "game") {
		refreshFly();
    	setTimeout(refreshFlyLoop, getRandomArbitrary(Math.floor(800/complexity), Math.floor(3000/complexity)));
    }
}
function refreshTimer() {
	min = Math.floor((timer/1000)/60);
	sec = Math.floor((timer/1000)-(60*min));
	msec = Math.floor((timer-(min*60*1000)-(sec*1000))/10);
	timerDiv.innerHTML = "Timer: "+ min.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +":" + sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) +":"+msec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+" Your score: "+ kills;
	timerDiv.style.position = "absolute";
	timerDiv.style.left = "80%";
	document.body.insertBefore(timerDiv, document.getElementById("img"));

}
function loopTimer() {
	if(timer>0) {
		timer -= 10;
		refreshTimer();
    	setTimeout(loopTimer, 10);
    }
    else {
    	interfaceState = "end";
    	rerenderInterface();
    }
}
function rerenderInterface() {
 if (interfaceState=="start") {
 	document.body.style.background = "#EEEEEE";
 	document.getElementById("start_menu").style.display = "block";
 	document.getElementById("fly").style.display = "none";
 }

 if (interfaceState=="end") {
 	document.body.style.background = "#EEEEEE";
 	document.getElementById("end_menu").style.display = "block";
 	document.getElementById("playerscore").innerHTML = kills;
 	document.getElementById("fly").style.display = "none";
 }

 if (interfaceState=="game") {
 	document.body.style.background = "#FFFFFF";
 	document.getElementById("end_menu").style.display = "none";
 	document.getElementById("start_menu").style.display = "none";
	loopTimer();
	refreshFlyLoop();
	document.getElementById("fly").onclick = function() {
		kills++;
		refreshTimer();
	}
 }
}

function start_game(){
	timer = 30000;
	kills = 0;
	interfaceState = "game";
  if (document.getElementById("easy").checked) {
    changeComplexity(1);
  }
  if (document.getElementById("medium").checked) {
    changeComplexity(2);
  }
  if (document.getElementById("hard").checked) {
    changeComplexity(3);
  }
	rerenderInterface();
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
window.onload = function() {
	dragElement(document.getElementById("start_menu"));
	dragElement(document.getElementById("end_menu"));
	rerenderInterface();
}

