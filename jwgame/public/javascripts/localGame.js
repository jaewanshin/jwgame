var fps = 5; //frame per second
var isStart = false;
var isBang = false;
var isFinish = false;
var drawGame;
var keys = {
	    	13: 'enter',	    	
	    	32: 'space'
	        // 37: 'left',
	        // 39: 'right',
	        // 40: 'down',
	    };
function DrawGame(commonAssets, leftAssets, rightAssets) {
	var canvasElement = document.getElementById("GameCanvas");
	this.commonAssets = commonAssets;
	this.rightAssets = rightAssets;
	this.leftAssets= leftAssets;
	this.canvasSize = {
		width : canvasElement.width,
		height : canvasElement.height
	}; //Canvas Size
	this.canvasContext = canvasElement.getContext('2d'); //Canvas Context
}

DrawGame.prototype.startAnimation = function() {
	//Clear Canvas  
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	this.canvasContext.drawImage(this.leftAssets[0], 0, 100);
	this.canvasContext.drawImage(this.rightAssets[0], 700, 100);
	this.canvasContext.drawImage(this.commonAssets[0], 350, 40);
}

DrawGame.prototype.readyAnimation = function() {
	//Clear Canvas  
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	this.canvasContext.drawImage(this.leftAssets[0], 0, 100);
	this.canvasContext.drawImage(this.rightAssets[0], 700, 100);
	this.canvasContext.drawImage(this.commonAssets[1], 350, 50);
	setTimeout( function() {
		drawGame.steadyAnimation();
	}, 1500);
}

DrawGame.prototype.steadyAnimation = function() {
	//Clear Canvas  
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	this.canvasContext.drawImage(this.leftAssets[1], 0, 100);
	this.canvasContext.drawImage(this.rightAssets[1], 700, 100);
	this.canvasContext.drawImage(this.commonAssets[2], 350, 50);
	setTimeout( function() {
		drawGame.bangAnimation();
	}, Math.floor(Math.random() * 2000) + 1000);
}

DrawGame.prototype.bangAnimation = function() {
	//Clear Canvas
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	this.canvasContext.drawImage(this.leftAssets[1], 0, 100);
	this.canvasContext.drawImage(this.rightAssets[1], 700, 100);
	this.canvasContext.drawImage(this.commonAssets[3], 350, 50);
	isBang = true;
}

DrawGame.prototype.shotAnimation = function(winner) {
	//Clear Canvas
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	if(winner === "left") {
		this.canvasContext.drawImage(this.leftAssets[2], 0, 100);
		this.canvasContext.drawImage(this.rightAssets[1], 700, 100);
	} else {
		this.canvasContext.drawImage(this.leftAssets[1], 0, 100);
		this.canvasContext.drawImage(this.rightAssets[2], 700, 100);
	}
	setInterval( function() {
		drawGame.finishAnimation(winner);
	}, 500);
}

var win = 2;
var lose = 5;
DrawGame.prototype.finishAnimation = function(winner) {
	//Clear Canvas
	if(win == 5)
		return;

	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	if(winner === "left") {
		this.canvasContext.drawImage(this.leftAssets[win++], 0, 100);
		this.canvasContext.drawImage(this.rightAssets[lose++], 700, 100);
	} else {
		this.canvasContext.drawImage(this.leftAssets[lose++], 0, 100);
		this.canvasContext.drawImage(this.rightAssets[win++], 700, 100);
	}
}

DrawGame.prototype.right_bangAnimation = function(winner) {
	//Clear Canvas
	this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
	this.canvasContext.drawImage(this.leftAssets[2], 0, 100);
	this.canvasContext.drawImage(this.rightAssets[2], 700, 100);
}

function init() {
	document.onkeydown = function( e ) {
		if(isBang == false || isFinish == true)
			return;

		isFinish = true;
	    if ( typeof keys[e.keyCode] != 'undefined' ) {
    		if(keys[e.keyCode] === "enter") {
				drawGame.shotAnimation("right");
			} else {
				drawGame.shotAnimation("left");
			}
	    }
	};

	document.getElementById("GameCanvas").onmousedown =function(event) {
		if(isStart)
			return;
		
		mX = event.pageX ? event.pageX : event.x;
		mY = event.pageY ? event.pageY : event.y;
		if(mX > 350 && mX <550)
			if(mY > 40 && mY <240)
				setTimeout( function() {
					drawGame.readyAnimation();
					isStart = true;
				}, 100);
	}

	var commonFiles = ['images/shotgun/btn_start.png',
				'images/shotgun/text_ready.png', 'images/shotgun/text_steady.png',
				'images/shotgun/text_bang.png'];
	
	var leftFiles = ['images/shotgun/b1.png',
	 				'images/shotgun/b2.png', 'images/shotgun/b3.png',
	 				'images/shotgun/b4.png', 'images/shotgun/b5.png',
	 				'images/shotgun/b6.png', 'images/shotgun/b7.png',
	 				'images/shotgun/b8.png' ]
	 				;
	
	var rightFiles = ['images/shotgun/a1.png',
				'images/shotgun/a2.png', 'images/shotgun/a3.png',
				'images/shotgun/a4.png', 'images/shotgun/a5.png',
				'images/shotgun/a6.png', 'images/shotgun/a7.png',
				'images/shotgun/a8.png' ];

	var commonAssets = []; 
	for (var i = 0; i < commonFiles.length; i++) {
		var asset = new Image();
		asset.src = commonFiles[i];
		commonAssets.push(asset);
	}

	var leftAssets = []; 
	for (var i = 0; i < leftFiles.length; i++) {
		var asset = new Image();
		asset.src = leftFiles[i];
		leftAssets.push(asset);
	}

	var rightAssets = []; 
	for (var i = 0; i < rightFiles.length; i++) {
		var asset = new Image();
		asset.src = rightFiles[i];
		rightAssets.push(asset);
	}

	drawGame = new DrawGame(commonAssets, leftAssets, rightAssets);
	setTimeout( function() {
		drawGame.startAnimation();
	}, 100);
}

window.addEventListener("load", init, false);
