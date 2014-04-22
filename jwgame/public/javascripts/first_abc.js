
    var isFinish = false;
    var isMoveItem = false;
    $(document).ready(function() {
		$('#game_over').hide();
		for(var i=0; i<16 ; i++) {
			generateItem();
		}

	    var isStart = false;
		$("body").keydown(function(event) {

			switch(event.which) {
				case 37:
					inputEvent.left();
					break;	
				case 38:
					inputEvent.up();
					break;	
				case 39:
					inputEvent.right();
					break;	
				case 40:
					inputEvent.down();
					break;	
			}

			if(isStart == false) {
				isStart = true;
				startGame();
			}
			isGameOver();
			event.preventDefault();
		});

		$(window).bind("touchstart",function(ev){
			event.preventDefault();
		});
		$("#bg_wrap").bind("touchstart",function(ev){
			handleFingerSwipeStart(ev);
			event.preventDefault();
		});
		$("#bg_wrap").bind("touchmove",function(ev){
			handleFingerSwipeMove(ev);
			event.preventDefault();
		});
		$("#bg_wrap").bind("touchend",function(ev){
			handleFingerSwipeEnd(ev);
			event.preventDefault();
			startGame();
		});
	});

	var getScore = function() {
		var score = 0;
		for(var x=0 ; x<4 ; x++) {
			for(var y=0 ; y<4 ; y++) {
				score = score + itemMap[x][y];
			}
		}
		return score;
	}

	function startGame() {
		var min = 0;
		var sec = 0;
		var milli = 0;
		
		setInterval( function() {
    		if(isFinish) {
    			return;
    		}
			milli++;
			if(milli == 10) {
				milli = 0;
				sec++;
			}

			if(sec == 60) {
				sec = 0;
				min++;
			}

			var strTime = min + ":" + sec + ":"  + milli;
			if(sec < 10) {
				strTime = min + ":0" + sec + ":"  + milli;
			}
			$("#time").html(strTime);
			$("#score").html(getScore());
			$("#score").html(getScore());
		}, 100);
	}

	function moveLeft() {
		// 醫뚯륫 �대룞
		for(var rowIdx = 0 ; rowIdx<4 ; rowIdx++) {
			var dest = 0;
			while(dest < 3) {
				var source = dest + 1;
				while(source <= 3) {
					if(itemMap[rowIdx][source] == 0) {
						source++;
						continue;
					}
					if(itemMap[rowIdx][dest] == 0) {
						var destPos = { row: rowIdx, col: dest };
						var sourcePos = { row: rowIdx, col: source };
						var value = itemMap[rowIdx][source];
						moveItem(destPos, sourcePos, value);

						// console.log("after value :" + itemMap[rowIdx][dest] + ' | ' + itemMap[rowIdx][source]);
						source++;
					} else {
						if(itemMap[rowIdx][dest] == itemMap[rowIdx][source]) {
							var removePos = { row: rowIdx, col: dest };
							var destPos = { row: rowIdx, col: dest };
							var sourcePos = { row: rowIdx, col: source };
							var value = itemMap[rowIdx][dest] + itemMap[rowIdx][source];

							removeItem(removePos);
							moveItem(destPos, sourcePos, value);
						} 
						break;
					}
				}
				dest++;
			}
			// console.log(itemMap[rowIdx]);
		}
		console.log("==============================");
	}
	function moveRight() {
		for(var rowIdx = 0 ; rowIdx<4 ; rowIdx++) {
			var dest = 3;
			while(dest > 0) {
				var source = dest - 1;
				while(source >= 0) {
					if(itemMap[rowIdx][source] == 0) {
						source--;
						continue;
					}
					if(itemMap[rowIdx][dest] == 0) {
						var destPos = { row: rowIdx, col: dest };
						var sourcePos = { row: rowIdx, col: source };
						var value = itemMap[rowIdx][source];
						moveItem(destPos, sourcePos, value);

						// console.log("after value :" + itemMap[rowIdx][dest] + ' | ' + itemMap[rowIdx][source]);
						source--;
					} else {
						if(itemMap[rowIdx][dest] == itemMap[rowIdx][source]) {
							var removePos = { row: rowIdx, col: dest };
							var destPos = { row: rowIdx, col: dest };
							var sourcePos = { row: rowIdx, col: source };
							var value = itemMap[rowIdx][dest] + itemMap[rowIdx][source];

							removeItem(removePos);
							moveItem(destPos, sourcePos, value);
						}
						break;
					}
				}
				dest--;
			}
			// console.log(itemMap[rowIdx]);
		}
		console.log("==============================");
	}
	function moveUp() {
		for(var colIdx = 0 ; colIdx < 4 ; colIdx++) {
			var dest = 0;
			while(dest < 3) {
				var source = dest + 1;
				while(source <= 3) {
					if(itemMap[source][colIdx] == 0) {
						source++;
						continue;
					}
					if(itemMap[dest][colIdx] == 0) {
						var destPos = { row: dest, col: colIdx };
						var sourcePos = { row: source, col: colIdx };
						var value = itemMap[source][colIdx];
						moveItem(destPos, sourcePos, value);

						// console.log("after value :" + itemMap[rowIdx][dest] + ' | ' + itemMap[rowIdx][source]);
						source++;
					} else {
						if(itemMap[dest][colIdx] == itemMap[source][colIdx]) {
							var removePos = { row: dest, col: colIdx };
							var destPos = { row: dest, col: colIdx };
							var sourcePos = { row: source, col: colIdx };
							var value = itemMap[dest][colIdx] + itemMap[source][colIdx];

							removeItem(removePos);
							moveItem(destPos, sourcePos, value);
						} 
						break;
					}
				}
				dest++;
			}
			// console.log(itemMap[colIdx]);
		}
		console.log("==============================");
	}
	function moveDown() {
		for(var colIdx = 0 ; colIdx<4 ; colIdx++) {
			var dest = 3;
			while(dest > 0) {
				var source = dest - 1;
				while(source >= 0) {
					if(itemMap[source][colIdx] == 0) {
						source--;
						continue;
					}
					if(itemMap[dest][colIdx] == 0) {
						var destPos = { row: dest, col: colIdx };
						var sourcePos = { row: source, col: colIdx };
						var value = itemMap[source][colIdx];
						moveItem(destPos, sourcePos, value);

						// console.log("after value :" + itemMap[rowIdx][dest] + ' | ' + itemMap[rowIdx][source]);
						source--;
					} else {
						if(itemMap[dest][colIdx] == itemMap[source][colIdx]) {
							var removePos = { row: dest, col: colIdx };
							var destPos = { row: dest, col: colIdx };
							var sourcePos = { row: source, col: colIdx };
							var value = itemMap[dest][colIdx] + itemMap[source][colIdx];

							removeItem(removePos);
							moveItem(destPos, sourcePos, value);
						} 
						break;
					}
				}
				dest--;
			}
			// console.log(itemMap[colIdx]);
		}
		console.log("==============================");
	}

	function removeItem(removePos) {
		var itemID = "item_" + removePos.row + "_" + removePos.col;
		$("#"+itemID).remove();
		itemMap[removePos.row][removePos.col] = 0;
	}

	function moveItem(destPos, sourcePos, value) {

		var destID = "item_" + destPos.row + "_" + destPos.col;
		var sourceID = "item_" + sourcePos.row + "_" + sourcePos.col;

		// itemMap 蹂�꼍
		itemMap[destPos.row][destPos.col] = value;
		itemMap[sourcePos.row][sourcePos.col] = 0;

		// item �대룞
		$("#"+sourceID).removeClass(sourceID);
		$("#"+sourceID).addClass(destID);

		// text 蹂�꼍
		$("#"+sourceID).html(value+"");
		$("#"+sourceID).removeClass("item_text_" + (value/2));
		$("#"+sourceID).addClass("item_text_" + value);

		// id 蹂�꼍
		$("#"+sourceID).attr("id", destID);

		isMoveItem = true;
	}

	function isGameOver() {
		if(isEmpty() && isMoveItem) {
			isMoveItem = false;

			setTimeout(function() {
				generateItem();
				if(!isEmpty() && !isMove()) {
					isFinish = true;
					$('#game_over').show(); 
					alert("Game Over");
				}
			},250);
		}
	}

	function isEmpty() {
		for(var x=0 ; x<4 ; x++) {
			for(var y=0 ; y<4 ; y++) {
				if(itemMap[x][y] == 0) {
					return true;
				}
			}
		}
		return false;
	}

	function isMove() {
		// left & right
		for(var x=0 ; x<4 ; x++) {
			for(var y=0 ; y<3 ; y++) {
				if(itemMap[x][y] == itemMap[x][y+1]) {
					return true;
				}
			}
		}

		// up & down
		for(var x=0 ; x<4 ; x++) {
			for(var y=0 ; y<3 ; y++) {
				if(itemMap[y][x] == itemMap[y+1][x]) {
					return true;
				}
			}
		}

		return false;
	}

	function generateItem() {
		var value = 2;
		if(Math.floor(Math.random() * 10) < 2) {
			value = 4;
		}

		var row;
		var col;
		while(true) {
			row = Math.floor(Math.random() * 4);
			col = Math.floor(Math.random() * 4);

			if(itemMap[row][col] == 0) 
				break;
		}

		var itemID = "item_" + row + "_" + col;
		var innerHtml = '<div class="item_text" id="' + itemID + '">' + value + '</div>' ;
		itemMap[row][col] = value;
		$("#bg_wrap").append(innerHtml);

		$("#"+itemID).addClass(itemID);
		$("#"+itemID).addClass("item_text_" + value);
	}
