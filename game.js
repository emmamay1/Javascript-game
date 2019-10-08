
var gridSize; // This will be set using functions
var btn;
var size;
var numBombs;
var clicked = false;
var gameStart = false;
var bombs = [];
var square; // image for saquare
var flag;
var numFlag;
var canvas;
var context;
var mX;
var mY;
var clickedX;
var clickedY;
var clickedBoxes = [];



$(document).ready(function() {
	canvas = document.getElementById("game");
	context = canvas.getContext("2d");
	
	
	// These functions determine gameboard size and number of bombs
		$("#l1").on("click", function() {
			clicked = true;
			gridSize = 3;
			numBombs = 2;
		});
		
		$("#l2").on("click", function() {
			clicked = true;
			gridSize = 4;
			numBombs = 4;
		});
		
		$("#l3").on("click", function() {
			clicked = true;
			gridSize = 5;
			numBombs = 5;
		});
	
	
	// If the generate/start game button is selected then a game will start...must be clicked twice
	$("#generate").on("click", function() {
		if(gameStart == false) {
			makeGrid();
		}
		else {
			alert("You need to finish the game!");
		}
	});
	//This gets the loc of the mouse click, and computes what square it is in in the gird
	window.onclick = function(e){
		mX = e.pageX;
		mY = e.pageY;
		
		var gameGrid = $("#game").position();

		if(mX < gridSize*30 && mY < gridSize*30){
			clickedX = Math.floor(mX/30);
			clickedY = Math.floor(mY/30);
		}
		//This checks to see if you clicked a bomb or not. If you do, it ends the game (for now) if not it checks for surrounding bombs
		var clickedBomb = false;
		for(var i = 0; i < numBombs; i++){
			if(clickedX == bombs[i][0] && clickedY == bombs[i][1]){
				clickedBomb = true;
				loseGame();
			}
		}
		if(!clickedBomb){
			checkSurrounding();
		}
	};
	
});


//This function gets the image of the squares (origional mine sweeper!)
function makeGrid() {
	//gameStart = true; TODO if game is started do not let them continue w/out finishing!
	square = new Image();
	square.src = "square.svg";
	makeBombs();
	gameStart = false;
	drawGrid();
}


//This function makes the bombs that we are going to use and it places their locations in 
//an array this array is bounded by the gridSize that is determeined above
function makeBombs(){
	
	// Place random integers into a 2x2 array, this will hold row and col of where the bomb will be
	for(var i = 0; i < numBombs; i++){
		var randRow = Math.floor((Math.random() * gridSize) + 1);
		var randCol = Math.floor((Math.random() * gridSize) + 1);
		bombs[i] = [randRow, randCol];	
	}
	console.log(bombs);
}


//This function draws the grid, it loops though gridsize and draws the grid. Starts at location (0,0) 

function drawGrid(){
	context.clearRect(0, 0, 500, 500);
	size = gridSize * 10;
	document.getElementById("game").style.height = size;
	// Draw cubes
	for(var i = 0; i < gridSize; i++){
		var row = i * 30;			// These scale the locations so they match the image sizes
		for(var j = 0; j < gridSize; j++){
			var col = j * 30;			// These scale the locations so they match the image sizes
			
			//Okay this bit is the start of the logic to add the image for the number of bombs surrounding
			//TODO: get images for each possible number of bombs?
			//TODO: make this work? hahah
			var wasClicked = [false, 0];
			for(var k=0; k < clickedBoxes.length; k++){
				if(clickedBoxes[k][0] == j && clickedBoxes[k][1] == i){
					wasClicked = [true, k];
				}
			}
			if(wasClicked[1]){
				if(clickedBoxes[(wasClicked[0])][2] > 0){
					context.drawImage(
				}
			}
			//End of my unsure section
			context.drawImage(square, row, col, 30, 30);  // draw the images making them size 30x30 at each location
		}
	}
}

//Checks the surrounding boxes for if they have a bomb to count how many surround the selected square
function checkSurrounding(){
	//These are the combos of increments of the surrounding boxes. These will be added to the loc of the clicked box to check
	var boxesSurrround = [
		[-1, -1],
		[0, -1],
		[1, -1],
		[1, 0],
		[1, 1],
		[0, 1],
		[-1, 1],
		[-1, 0]
	];
	var countBombSurround = 0;
	for(box in boxesSurrround){
		for(var i = 0; i < numBombs; i++){
			if(bombCheck(i, clickedX + boxesSurrround[box][0], clickedY + boxesSurrround[box][1])){
				countBombSurround ++;
			}
		}
	}
	
	clickedBoxes[clickedBoxes.length] = [clickedX, clickedY, countBombSurround];
	drawGrid();//TODO: so the idea here is that once you have checked the surrounding boxes, you then redraw the grid with the image displaying num bombs
	
	console.log(countBombSurround);
}

//This does the actual check of if there is a bomb at that loc
function bombCheck(i, x, y){
	if(bombs[i][0] == x && bombs[i][1] == y){
		return true;
	}else{
		return false;
	}
}

//TODO: add to this
function loseGame(){
	console.log("you lost");
}


