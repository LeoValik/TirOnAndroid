//Файл где мы инициализируем все наши переменные
var pjs = new PointJS('2D', 400, 400);
pjs.system.initFullPage();

var vector = pjs.vector;
var log = pjs.system.log;
var game = pjs.game;
var point = pjs.vector.point;
var size = vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;

var random = math.random;

var touch = pjs.touchControl;
touch.initTouchControl();

var width = game.getWH().w;
var heigth = game.getWH().h;


//Глобальные переменные ширины и высоты
var gameWidth = width;
var gameHeight = heigth;

var fire;
var dt;