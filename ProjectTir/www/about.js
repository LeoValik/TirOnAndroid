

var text =  [
	'Всем привет! Меня зовут Валентин Троян! :)',
	'Я студент группы 3ПР университета ХНТУ.',
	'Данная игра была разработана для ознакомительных',
	'целях моей курсовой работы в разработке игр',
	'на мобильную платформу Android. ',
	'Так как данная игра была создана чтобы понять',
	'ООП на Android, то дальнейшие обновления и патчи',
	'к данной игре ПОКА не предусматриваются!'
];

var yy = 400*del;

var drawAbout = function () {

	brush.drawImageS({
		file : 'levels/level1/fon1.jpg',
	//чтобы фон подгонялся под размер экрана
	scale : 5*del,
	//padding : 90*del,
	})


	brush.drawTextLinesS({
	lines : text,
	x : 10, y : yy,//-=del,
	color : '#FFFF00',
	font : 'serif',
	style : 'bold',
	size : 100*del,
	})
			//отрисовка exit
	exitToStart.setPositionS(point(width-exitToStart.w-10, 10));
	exitToStart.draw();


	if (touch.isPeekObject(exitToStart)) {
		return game.setLoop('start');
		
	}	

};