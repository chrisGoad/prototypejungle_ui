
core.require('/shape/rectangle.js','/gen0/grid0.js',
function (rectPP,addGridMethods) {
  
	
let numTimeSteps = 3000;
let rs = svg.Element.mk('<g/>');
rs.motionStep = 1;
addGridMethods(rs);
rs.saveImage = true;
rs.setName('wander0_1');
rs.width = 400;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 32;
  rs.numCols = 64;
	rs.lineLength = 3;
	//rs.lineLength = 10;
	rs.angleInc = 0.1;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.stroke = 'transparent';
  this.rectP.fill = 'white';
	this.rectP.dimension = 2;

 // this.lineP['stroke-width'] = 2;
//  this.lineP['stroke-width'] = .1;
}  

	

rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,rectP} = this;
	if (this.timeStep > 0) {
		debugger;
	}
	let ri = rvs.angleIncR;
	let gi = rvs.angleIncG;
	let bi = rvs.angleIncB;
//item.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(rectP);//rectP.instantiate();
	let rect = rectP.instantiate();;//rectP.instantiate();
	rect.angleIncR = ri;
	rect.angleIncG = gi;
	rect.angleIncB = bi;
	shapes.push(rect);
	rect.show();

	/*let dim = rvs.dimension;
  shape.dimension = dim;
	let tr = shape.getTranslation();
	let dir = rvs.dir;
	let ms = this.motionStep;
	let vec = Point.mk(ms*Math.cos(dir),ms*Math.sin(dir));
	let np = tr.plus(vec);
//	shape.moveto(np);
	let {r,g,b} = rvs;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = rgb;
  shape.fill = 'transparent';
  shape.fill = rgb;
  //shape.fill = 'black';
	*/

 // shape.update();
  return rect;
}

rs.shapeUpdater =  function (rect,rvs,cell,pnt) {
	debugger;
	let {shapes,timeStep:ts} = this;
	let angleIncR = rect.angleIncR;
	let angleIncG = rect.angleIncG;
	let angleIncB = rect.angleIncB;
	let angleR = ts  * 0.0005 * angleIncR;
	let angleG = ts  * 0.0005 * angleIncG;
	let angleB = ts  * 0.0005 * angleIncB;
	let  r = Math.floor(125* (1+Math.sin(angleR)));
	let  g = Math.floor(125* (1+Math.sin(angleG)));
	let  b = Math.floor(125* (1+Math.sin(angleB)));
	//rect.width = dim;
	//rect.height = dim;
	rect.fill = `rgb(${r},${g},${b})`;
	
}


rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('angleIncR',{step:2,stept:2,min:100,max:200});
	this.setupShapeRandomizer('angleIncG',{step:2,stept:2,min:100,max:200});
	this.setupShapeRandomizer('angleIncB',{step:2,stept:2,min:100,max:200});
	
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

rs.timeStep = 0;
rs.step = function ()   {
	debugger;
	//this.stepShapeRandomizer('r');
	
  this.updateGrid();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(numTimeSteps,10);
	
}
return rs;
});
 