//отрисовка меню
//1 level
var newLocalGame1 = game.newTextObject({
	text : 'Отстрел ворон у леса',
	x : 100 * del, y : 100 * del,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 200*del,
})

//2 level
var newLocalGame2 = game.newTextObject({
	text : 'Отстрел птичек твитера',
	x : 100 * del, y : 310 * del,
	color : '#FFFFFF',
		strokeColorText : '#000000',
		strokeWidthText : 1,
		font : 'serif',
		size : 200*del,
})

var newLocalGame3 = game.newTextObject({
	text : 'Отстрел ворон у моря',
	x : 100 * del, y : 520 * del,
	color : '#FFFFFF',
		strokeColorText : '#000000',
		strokeWidthText : 1,
		font : 'serif',
		size : 200*del,
}) 

var exitToStart = game.newImageObject({
	file : 'door.png',
	//чтобы фон подгонялся под размер экрана
	scale : del/2,
	alpha : 0.8,
});

var drawMenu = function () {

	brush.drawImageS({
		file : 'levels/level1/backfon.jpg',
	//чтобы фон подгонялся под размер экрана
	scale : 6*del,
	//padding : 90*del,
	})


	//отрисовка exit
	exitToStart.setPositionS(point(width-exitToStart.w-10, 10));
	exitToStart.draw();

	newLocalGame1.draw();
	newLocalGame2.draw();
	newLocalGame3.draw();

    

	

//	brush.drawTextS({
//		text : 'Ваш счёт: ' + scoreCount,
//		x : width - 1000*del, y : gameHeight - 150 * del,
//		color : '#FFFFFF', //'#253850',
//		style : 'bold',
//		size : 100 * del
//	}) 
	
	var tmpBestScore = window.localStorage.getItem('bestScore');//prolyPROBLEM!!
var BestScore = tmpBestScore ? parseInt(tmpBestScore) : 0;//prolyPROBLEM!!!
	brush.drawTextS({
		text : 'Рекорд игры : ' + BestScore,
		x : width - 1100*del, y : gameHeight - 250 * del,
		color : '#FFFFFF', //'#253850',
		style : 'bold',
		size : 100 * del
	}) 
    
   
	if (touch.isPeekObject(exitToStart)) {
		return game.setLoop('start');
		
	}	

	if (touch.isPeekObject(newLocalGame1)) {
		createLocalLevel('level1');
		game.setLoop('my_game');
		return;
	}	

	 if (touch.isPeekObject(newLocalGame2)) {
		createLocalLevel('level2');
		game.setLoop('my_game');
		return;
	}	 

	if (touch.isPeekObject(newLocalGame3)) {
		createLocalLevel('level3');
		game.setLoop('my_game');
		return;
	}	

}