var backgour_img = new Image();
var number_img = new Image();

function DrawGame() {
	var canvasElement = document.getElementById("GameCanvas");
	this.canvasSize = {
		width : canvasElement.width,
		height : canvasElement.height
	}; //Canvas Size
	this.canvasContext = canvasElement.getContext('2d'); //Canvas Context
}

DrawGame.prototype.startAnimation = function() {
	//Clear Canvas  
	this.canvasContext.clearRect(0, 0, this.canvasSize.width-, this.canvasSize.height);
	this.canvasContext.drawImage('images/background.png', 100, 100);
}

function init() {
	var number = [
		{img: "./images/number.png", sx: "10", sy: "10", swidth:"100", sheight:"100"},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""},
		{img: "./images/number.png", sx: "", sy: "", swidth:"", sheight:""}
	];
	var background = "./images/background.png";
	backgour_img = new Image();
		asset.src = commonFiles[i];
	document.onkeydown = function( e ) {
		switch (e.keyCode) {
			case 37: 	// left
				break;
			case 38: 	// up
				break;
			case 39: 	// right
				break;
			case 40: 	// down 
				break;
		}
	};
	drawGame = new DrawGame();
	setTimeout( function() {
		drawGame.startAnimation();
	}, 100);
};

window.addEventListener("load", init, false);
