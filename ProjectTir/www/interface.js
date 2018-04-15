//Будет хранить в себя функцию drawInterface

//Радиус, чтобы подгонялся под размеры экрана
var joyRadius = gameHeight/5;
var del = gameHeight/1500;


var cellObject = game.newBaseObject({
	x : (gameWidth)/2, y : gameHeight/2,
})


var cellObject2 = game.newBaseObject({
	x : (gameWidth)/2, y : gameHeight/2,
})

//Прорисовка прицела
var cell;
//Прорисовка  полупрозрачного большого красного круга
var joy = game.newCircleObject({
	x : gameWidth+30, y : 75,
	radius : joyRadius,
	fillColor : 'black',
	alpha : 0.2 //alpha-канал
})
//Прорисовка полупрозрачного маленького круга внутри большого красного круга
var joystic = game.newCircleObject({
	x : gameWidth+30, y : 75,
	radius : joyRadius/2,
	fillColor : pjs.colors.hex2rgba('#FFFFFF', 0.5),
})

var fireRect = game.newRectObject({
	x : 0, y : 0,
	w : gameWidth, h : gameHeight,
	fillColor : '#FFFFFF'
});

//Прорисовка двери
var exit = game.newImageObject({
	file : 'door.png',
	//чтобы фон подгонялся под размер экрана
	scale : del/2,
	alpha : 0.8,
});

//Прорисовка очков
var score = game.newTextObject({
	text : '100',
	x : 10, y : 10,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 2,
	font : 'serif',
	size : 400*del,
	alpha : 0
});

//Прорисовка перезарядки
var rebull = game.newTextObject({
	text : '+5 патронитос',
	x : 10, y : 10,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 300*del,
	padding : 90*del,
});





//Прорисовка фона

var fon;
var pressTime = 0;
var patron = 10;
var premia = 0;
var bullFile; //патроны
var succFile; //премия
//var scoreCount = 0; //очки

var tmpScore = window.localStorage.getItem('userScore');//prolyPROBLEM!!
var scoreCount = tmpScore ? parseInt(tmpScore) : 0;//prolyPROBLEM!!!
/////

//var tmpBestScore = window.localStorage.getItem('bestScore');//prolyPROBLEM!!
//var BestScore = tmpBestScore ? parseInt(tmpBestScore) : 0;//prolyPROBLEM!!!
var BestScore =  0;

var rebullOk = false;
var rebullCent = 250;
var rebullBull = 5;
var winGameOk = false;

var aFire = pjs.audio.newAudio('audio/shoot_lvl1.mp3', 0.4);//Звук Выстрела
//var bestScore=0;

var drawFon = function() {
		fon.draw();
	};

var drawInterface = function () {
	//Позиция джойстика
	joy.setPositionS({
		x : gameWidth- joy.w - 10, 
		y : gameHeight - joy.h - 10,
	});


fireRect.setPositionS(point(0, 0));

//score.setPositionCS(point(gameWidth/2, gameHeight/2)); // Not PROBLEM!!!!!!

var dist = joystic.getDistanceC(joy.getPositionC());
//Тут все события, когда джойстик у нас активен, когда юзер прикоснулся 
//пальцем и хочет куда-то сдвинуть прицел
 if (touch.isDown() && touch.isInStatic(joy.getStaticBox())) {
			joystic.moveTimeC(touch.getPosition(), 10);
			if (joy.alpha < 0.7)
			joy.alpha += 0.05; //нажал - круг стал черным
 }    else {
	joystic.moveTimeC(joy.getPositionC(), 10);
	 	if (joy.alpha > 0.2)
			joy.alpha -= 0.05; //отпустил - крус стал полупрозрачным
 }



var angle = vector.getAngle2Points(joy.getPositionC(), joystic.getPositionC());
cellObject.setAngle(angle);
cellObject.moveAngle((dist/20) *dt);

joy.draw();
joystic.draw();
cell.draw();

//Дрожание прицела
cellObject2.moveTimeC(cellObject.getPosition(), 10);
cell.motionC(cellObject2.getPosition(), size(random(0, 10)/5, random(0 ,10)/5), 10);
//cellObject.drawStaticBox();

//Рисуем патроны 
 OOP.forInt(patron, function(i){
 	brush.drawImageS({
 		x : 0 + (5 + 100*del) * i, y : gameHeight - 50*del-30,
 		w : 100*del, h : 100*del,
 		file : bullFile,
 	});
 });
//Рисуем трофеи
 OOP.forInt(premia, function(i){
 	brush.drawImageS({
 		x : 0 + (20 + 50*del) * i, y :  10,
 		w : 70*del, h : 90*del,
 		file : succFile,
 	});
 });

//стрельба
if (touch.isPress() && touch.isInStatic(joystic.getStaticBox()))
	pressTime = game.getTime();
	

if (touch.isUp())
	if (game.getTime() - pressTime < 200 && patron){

		fire = true;
		patron -= 1;
		fireRect.fillColor = '#7CD67D'
		fireRect.setAlpha(1);
		cellObject2.move(point(0,  -50));
		cellObject.move(point(random(-5, 5), random(-5, 5)));
		//aFire.replay();
	}

	//отрисовка exit
exit.setPositionS(point(width-exit.w-10, 10));
exit.draw();


	if (patron == 0 && scoreCount >= rebullCent) {
			rebull.draw();
			if (touch.isPeekObject(rebull)) {
				rebullOk = true;
		}

		if (rebullOk) {
			if (rebull.getAlpha() > 0) {
		rebull.setAlpha(rebull.getAlpha() -0.01);
		rebull.move(point(0 , -1));
////////////////////////////////////////		
		brush.drawTextS({
			text : 'Ваш счёт: ' + scoreCount,
			x : 100*del, y : gameHeight -  200 * del - 50*del,
			color : '#FFFFFF',
			strokeColor : '#000000',
			strokeWidth : 1,
			style : 'bold',
			font : 'serif',
			size : 200 * del,
		}) 
		}
		 else {
		 	scoreCount -= rebullCent;
		 	patron += rebullBull;
		 	rebullOk == false;
		 	rebull.setAlpha(1);
		 }

		} else {
			brush.drawTextS({
			text : 'Ваш счёт: ' + scoreCount,
			x : 100*del, y : gameHeight -  200 * del - 50*del,
			color : '#FFFFFF',
			strokeColor : '#000000',
			strokeWidth : 1,
			style : 'bold',
			font : 'serif',
			size : 200 * del,
		}) 
			rebull.setPositionCS(point(gameWidth/2, gameHeight/2));
		}
	}


if (fireRect.getAlpha() > 0)
	fireRect.setAlpha(fireRect.getAlpha() -0.05);
fireRect.draw();

if (score.getAlpha() > 0) {
	score.setAlpha(score.getAlpha() -0.01);
	score.move(point(0 , 2));
}
//отрисовка очков
score.draw();


//Прорисовка win the game
var winGame = game.newTextObject({
	text : 'Поздравляю! Вы прошли уровень! Ваш счёт : ' + scoreCount,
	x : 150*del, y : gameHeight -  200 * del - 50*del,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	style : 'bold',
	font : 'serif',
	size : 100*del,
	padding : 90*del,
});

var tmpBestScore = window.localStorage.getItem('bestScore');//prolyPROBLEM!!
var BestScore = tmpBestScore ? parseInt(tmpBestScore) : 0;//prolyPROBLEM!!!
//Прорисовка best result
var bestResult = game.newTextObject({
	text : 'Вы установили рекорд и теперь счёт : ' + BestScore,
	x : 150*del, y : gameHeight -  150 * del - 50*del,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 100*del,
	padding : 90*del,
	//window.localStorage.setItem('bestScore', BestScore);
});

//Прорисовка game over
var loseGame = game.newTextObject({
	text : 'GAME OVER! Ваш счёт : ' + scoreCount,
	x : 10, y : 10,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 150*del,
	padding : 90*del,
});



///Отрисовка победы уровня
if (premia == 20){
	winGame.draw();
		//	if (touch.isPeekObject(winGame)) {
		//		winGameOk = true;
		//}
	//if (winGameOk) {
	//		if (winGame.getAlpha() > 0) {
		//winGame.setAlpha(winGame.getAlpha() -0.01);
		//winGame.move(point(0 , -1));
////////////////////////////////////////		
 
	//	}

winGame.setPositionCS(point(gameWidth/2, gameHeight/2));
		//} 
			
			if (scoreCount >= BestScore) 	//Пока не работает, результат "NaN"
			{
			BestScore = scoreCount;
			window.localStorage.setItem('bestScore', BestScore);
			bestResult.draw();	
			bestResult.setPositionCS(point(gameWidth/2, gameHeight/2));
				} else {
		brush.drawTextS({
			text : 'У вас не рекорд, лучший счёт: ' + BestScore,
			x : 100*del, y : gameHeight -  150 * del - 50*del,
			color : '#FFFFFF',
			strokeColor : '#000000',
			strokeWidth : 1,
			style : 'bold',
			font : 'serif',
			size : 150 * del,
		}) 
				}
				
		}

//GAME OVER нашего уровня
if (premia < 20 && scoreCount<250 && patron == 0){
	loseGame.draw();
	loseGame.setPositionCS(point(gameWidth/2, gameHeight/2));
}






//Позиционируем камеру (следить за прицелом) в самом конце игрового цикла
camera.moveTime(vector.pointMinus(cell.getPositionC(), point(gameWidth/2 , gameHeight/2)), 10);
//Делаем так, чтобы камера у нас не выходила за пределы 
if (cellObject.x < gameWidth/2)
	camera.setPosition(point(0,'none'));
if (cellObject.y < gameHeight/2)
	camera.setPosition(point('none', 0));

if (cellObject.x > fon.w - gameWidth/2)
	camera.setPosition(point(fon.w - gameWidth, 'none'));
if (cellObject.y > fon.h - gameHeight/2)
	camera.setPosition(point('none', fon.h - gameHeight));
//exit
if (touch.isPeekObject(exit)) {
	game.setLoop('menu');
	premia = 0;
	scoreCount = 0;
	window.localStorage.setItem('userScore', scoreCount);//prolyPROBLEM!!!
	return;

}


}