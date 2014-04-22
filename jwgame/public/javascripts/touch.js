var touchStartX;
    var touchStartY;
    var touchEndX;
    var touchEndY;

    var isTouchStart = false;

    var screenWidth;
    var screenHeight;
    var itemMap = [
    	[0, 0, 0, 0],
    	[0, 0, 0, 0],
    	[0, 0, 0, 0],
    	[0, 0, 0, 0]
    ];

    var inputEvent = {
    	left: function() {
    		moveLeft();
    		isGameOver();
    	},
    	right: function() {
    		moveRight();
    		isGameOver();
    	},
    	up: function() {
    		moveUp();
    		isGameOver();
    	},
    	down: function() {
    		moveDown();
    		isGameOver();
    	}
    }
	function handleFingerSwipeStart(e) {
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		touchStartX = touch.pageX;
		touchStartY = touch.pageY;
		isTouchStart = true;
	}
	function handleFingerSwipeMove(e) {
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		touchEndX = touch.pageX;
		touchEndY = touch.pageY;
	}
	function handleFingerSwipeEnd(e) {
		if (isTouchStart) {
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			var distanceX = touchEndX - touchStartX;
			var distanceY = touchEndY - touchStartY;
			isTouchStart = false;

			if(Math.abs(distanceX) > 30 || Math.abs(distanceY) > 30) {
				if(Math.abs(distanceX) > Math.abs(distanceY)) {
					(distanceX > 0) ? inputEvent.right() : inputEvent.left();
				} else {
					(distanceY > 0) ? inputEvent.down() : inputEvent.up();
				}
			}
		}
	}