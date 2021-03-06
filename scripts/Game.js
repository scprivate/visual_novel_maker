//game functions
//i.e. branching, game start, add characters, etc.

/**
* GAME OBJECT ================================================
*
**/

//set up character
Game.character = function(character, color){
	//give character text a color
	//create another object within the game object called "characters", which will store info for all the characters
	if(Game.characters === undefined){
		Game.characters = {};
		Game.characters[character] = color; 
	}else{
		Game.characters[character] = color; 
	}
}

//TODO: make a progress bar
Game.makeProgressBar = function(){
	//create a div element?
}

/**
*  Game.branch(routeName) allows for the game to branch out to a new route
*   
**/
Game.branch = function(routeName){
	return function(){
	//update route
	currentRoute = routeName;
	//make bookmark 0 and start at the beginning of the next route array
	bookmark = 0;
	//make update false
	update = false;
	//move all characters off the screen
	//characters on screen have either a left or right class
	//a new route may have "false" as the first index, indicating no change in background for
	//the next scene.
	if(Routes[routeName][0] !== false){
		$(".left").each(function(){
			$(this).css("display", "none");
			$(this).css("left", -180);
		});
		$(".right").each(function(){
			$(this).css("display", "none");
			$(this).css("right", -180);
		});
	}else{
		//to skip the 'false' entry in the array
		bookmark = 1;
	}
		Game.nextScene();
	}
}


Game.nextScene = function(){
	if(bookmark < Routes[currentRoute].length){
		Routes[currentRoute][bookmark++]();
	}else{
		$('#rowDialog').empty();
		bookmark = 0;
	}
}

/**
* initialize the game - i.e. allow traversal through array for each scene
*
**/
//go the next scene on spacebar press down
function gameStart(){
	$(document).keydown(function(e){
		e.preventDefault();
		if(update === false){
			if(e.which == 32){
				Game.nextScene();
			}
		}
	});
}

//make spacebar prevent the default action (i.e. scrolling)
$(document).keydown(function(e){
	e.preventDefault();
});

//set new background AND music
function newBGwithMusic(picture, music){
	SetScene.background(picture);
	SetScene.playAudio(music);
}
