//Файл для генератора уровней

var arrTop = []; //массив объектов которые будут сверху проноситься 
var createLevel = function (object) {
	arrTop = [];

var animUtka = pjs.tiles.newAnimation(object.topFile, 180, 122, 4);

fon = game.newImageObject({
	file : object.fonFile,
	//чтобы фон подгонялся под размер экрана
	scale : 5*del,
	onload : function(){
		cellObject.setPosition(fon.getPositionC());
	}
});


cell = game.newImageObject({
	file : object.cellFile,
	w : joyRadius, h : joyRadius,
});


 bullFile = object.bullFile;
 succFile = object.succFile;

 if (object.bullCount ) {
 	patron = object.bullCount;
 }

 //отрисовка анимации утки
 OOP.forInt(object.topCount, function() {
 	var obj = game.newAnimationObject({
 		animation : animUtka,
 		y: random(20, gameHeight), x : random(0, gameWidth *2),
 		w : 300*del, h : 230*del,
 		fillColor : '#FF0000', 
 		userData : {
 		dx : random(-8, 8, true),
 		 dy : 0
 		}
 	})

 	obj.setDelay(10+Math.abs(obj.dx));
 		//утка летит влево
 	if (obj.dx < 0)
 		obj.setFlip(1, 0);

 	arrTop.push(obj);
 })

};

var createLocalLevel = function (level) {
	createLevel({
	topCount : 20,
	bullCount : 10,
	fonFile :  'levels/'+level+'/fon2.jpg',
	topFile :  'levels/'+level+'/top.png',
	cellFile : 'levels/'+level+'/cell.png',
	bullFile : 'levels/'+level+'/bull.png',
	succFile : 'levels/'+level+'/succes.png',
}); 
}





var drawTop = function () {
	OOP.forArr(arrTop, function(el, i, arr) {
		if (!el) return;
		//Если утка не подбита, то идут 3 фрейма, иначе - 4 фрейм
		if (!el.dy)
		el.drawFrames(0, 1, 2);
	else {
		el.drawFrames(3);
		el.turn(el.dx);
	}

		if (el.x < -el.w && el.dx < 0){
			el.x = fon.w + el.w;
			el.y =  random(20, gameHeight/1.5);
		}

		if (el.x > fon.w  && el.dx > 0){
			el.x = - el.w;	
			el.y =  random(20, gameHeight/1.5);
		}

		el.move(point(el.dx*dt, el.dy*dt));
 
		if (el.y > fon.h && fon.loaded){
			arr.splice(i, 1);
		}
	});
};

var fireTop = function() {
		OOP.forArr(arrTop, function(el, i, arr) {
			//попадает ли наш сейчас обьект в прицел в какой-нибудь другой обьект
			if (!fire) return true;
		 if (cellObject.isDynamicInside(el.getDynamicBox())) {
		 	premia += 1;
		 	el.dy = 3;
		 	fire = false;
		 	fireRect.fillColor = '#FF7575';
		  	var scorePlus =  Math.abs(el.dx)*10;
		 	score.setText('score: ' + scoreCount + '+' + scorePlus);
		 	scoreCount += scorePlus;
		 	score.setAlpha(1);
		 	score.setAngle(0);
		 	score.setPositionC(el.getPositionC());
		 	window.localStorage.setItem('userScore', scoreCount);//prolyPROBLEM!!!
		 }
	});
}