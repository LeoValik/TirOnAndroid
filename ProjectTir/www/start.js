
var  newGame = game.newTextObject({
	text : 'Начать игру',
	x : 10, y : 10,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 300*del,
	padding : 90*del,
})


var  razrab = game.newTextObject({
	text : 'Разработчик',
	x : 10, y : newGame.h - 100 * del ,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 300*del,
	padding : 90*del,
})


var  describe = game.newTextObject({
	text : 'Описание игры',
	x : 10, y : newGame.h + 250 * del,
	color : '#FFFFFF',
	strokeColorText : '#000000',
	strokeWidthText : 1,
	font : 'serif',
	size : 300*del,
	padding : 90*del,
})


var drawStart = function () {
	brush.drawImageS({
		file : 'levels/level1/fon.jpg',
	//чтобы фон подгонялся под размер экрана
	scale : 5*del,
	})


	newGame.draw();
	razrab.draw();
    describe.draw();



    if(touch.isPeekObject(describe)){
        yy = 300*del;
        return game.setLoop('describe')
    }
    
	if (touch.isPeekObject(razrab)){
		yy = 100*del;
		return game.setLoop('about');
	}

    
	if (touch.isPeekObject(newGame)){
			return game.setLoop('menu');
		}
    
     	brush.drawTextS({
		text : 'Версия игры : BETA 1.0 ',
		x : width - 2000*del, y : gameHeight - 250 * del,
		color : '#FFFFFF', //'#253850',
		style : 'bold',
		size : 100 * del
	}) 


};