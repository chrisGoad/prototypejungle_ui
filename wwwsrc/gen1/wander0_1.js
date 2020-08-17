
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
 
  return function (item) {
 
	
let numTimeSteps = 100;
item.motionStep = 1;
addGridMethods(item);
item.saveImage = 0;
item.width = 200;
  item.height = 200;
  item.numDrops =3000;
  item.numRows = 20;
  item.numRows = 20;
  item.numCols = 40;
  item.numCols = 20;
	item.lineLength = 4.8;
	item.lineLength = .8;
	item.pointJiggle = 0.0;
	
item.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgba(250,250,250,1)';
  this.lineP['stroke-width'] = 0.5;
 
}  


item.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,lineLength,lineP} = this;
//item.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(lineP);//rectP.instantiate();
	let shape = lineP.instantiate();
	shapes.push(shape);
	shape.show();
	return shape;
}

item.shapeUpdater =  function (shape,rvs,cell,pnt) {
  	let {lineLength} = this;

	//let dim = rvs.dimension;
  //shape.dimension = dim;
	let tr = shape.getTranslation();
	let idir = rvs.dir;
	//console.log('idir ',idir);
	let incs = 2;
	let stroke;
	if (idir < 0.25*Math.PI) {
		stroke = 'rgb(200,100,100)';
	} else {
		stroke = 'rgb(100,100,200)';
	}
	let idir0 = idir/(Math.PI/2);;
	let dir0 = Math.floor(incs*idir0)/(incs-1);//(idir < 0.5*Math.PI)?0:0.5*Math.PI;
	console.log('dir0 ',dir0);
	let dir = Math.PI/4 + dir0 * Math.PI/2;//let dir = Math.floor((incs*idir)/(Math.PI/4))*((Math.PI/4)/incs);//(idir < 0.5*Math.PI)?0:0.5*Math.PI;
	//let ms = this.motionStep;
	//let vec = Point.mk(ms*Math.cos(dir),ms*Math.sin(dir));
	//let vec = Point.mk(ms*Math.cos(dir),ms*Math.sin(dir));
	//let np = tr.plus(vec);
//	shape.moveto(np);
	let {r,g,b} = rvs;
 // let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = stroke;
   this.setLineEnds(shape,lineLength,dir);
	 let {x,y} = cell;
	 if (x === y) {
   //  console.log('dir',dir* (180/Math.PI),' x ',cell.x);
	 }
  //shape.fill = 'black';
  shape.update();
  return shape;
}

	

item.timeStep = 0;

item.animate = function ()  {
	this.animateIt(this.numTimeSteps,10);
	
}
return item;
}
});
 