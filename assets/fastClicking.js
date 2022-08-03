var createdTime;
var clickedTime;
var stat = [0,0,0,0];

document.getElementById("startButton").onclick = function () {
	document.getElementById("startButton").innerHTML = "Reset";
	stat = [0,0,0,0];
	clearStat();
	document.getElementById("box").style.visibility = "hidden";
	setTimeout(gamePlay,2000*Math.random()); // gamePlay starts after the time delay in milliseconds
}

function gamePlay () {
		// use alert() to check the loop
		// alert("gamePlay starts");
		reAppear ();
		disAppear ();
		// alert("gamePlay ends");
}
function clearStat() {
	document.getElementById("stat0").innerHTML = stat[0];
	document.getElementById("stat1").innerHTML = stat[1];
	document.getElementById("stat2").innerHTML = stat[2];
	document.getElementById("stat3").innerHTML = stat[3];
}
function statUpdate (x) {
	if (x <= 0.4) {
		stat[0]++;
		document.getElementById("stat0").innerHTML = stat[0];
	} else if (x <= 0.7) {
		stat[1]++;
		document.getElementById("stat1").innerHTML = stat[1];
	} else if (x <= 1) {
		stat[2]++;
		document.getElementById("stat2").innerHTML = stat[2];
	}
	else {
		stat[3]++;
		document.getElementById("stat3").innerHTML = stat[3];
	}
}
function disAppear () {
	document.getElementById("box").onclick = function() {
		clickedTime = Date.now();
		this.style.visibility = "hidden";
		var reactTime = (clickedTime-createdTime)/1000;
		statUpdate (reactTime);
		document.getElementById("result").innerHTML = "Your reaction time was <strong>" + reactTime + "</strong> seconds.";
		// ----- Important -----
		// The program would not work properly if this setTimeout(reappear,xx) is in the gamePlay() but outside the disappear() --> Because the browser will read through the code without waiting for the disappearing click
		setTimeout(reAppear,3000*Math.random());
		// alert("disAppear ends");
	}
}
function reAppear () {
	// generate random width, height, position, color, ... *must be convert to string before assign to the object
	var randomColor = "#" + Math.random().toString(16).slice(2, 8);
	var randomW = 50 + 200*Math.random();
	var randomH = 50 + 200*Math.random();
	var randomB = 0.5*Math.min(randomW,randomH)*Math.random();

	// use window.getComputedStyle(XXX).getPropertyValue("property") to get the property's value from CSS
	// style.XXX can only get CSS properties that were defined as inline in that element
	var frameW = window.getComputedStyle(document.getElementById("frame")).getPropertyValue("width");
	frameW = Number(frameW.slice(0,frameW.length-2)); // remove 'px' and convert to number
	var frameH = window.getComputedStyle(document.getElementById("frame")).getPropertyValue("height");
	frameH = Number(frameH.slice(0,frameH.length-2)); // remove 'px' and convert to number

	// random position
	var leftPos = (frameW - randomW)*Math.random();
	var topPos = (frameH - randomH)*Math.random();

	document.getElementById("box").style.backgroundColor = randomColor;
	document.getElementById("box").style.width = randomW + "px";
	document.getElementById("box").style.height = randomH + "px";
	document.getElementById("box").style.borderRadius = randomB + "px";
	document.getElementById("box").style.left = leftPos + "px";
	document.getElementById("box").style.top = topPos + "px";
	document.getElementById("box").style.visibility = "visible";
	createdTime = Date.now(); // must be inside the function to be assigned with the time delay
	// alert("reAppear ends");
}
/* Example section to try

setTimeout(doneAlert, 3000);

function doneAlert () {
	alert("done");
}

// if using doneAlert() = execute the function right away --> not what we want -- not using parentheses = assign the function to the caller to process
*/
