
core.require('/shape/circle.js','/gen0/grid0.js','/gen1/backToSame.js',
function (circlePP,addGridMethods,addBackToSameMethods) {
  
	
let rs = svg.Element.mk('<g/>');
rs.numTimeSteps = 600;
//rs.numTimeSteps = 200;
rs.everyNthFrame = 2;
rs.motionStep = 1;
addGridMethods(rs);
addBackToSameMethods(rs);
rs.saveImage = true;
rs.setName('pulse0_3');
rs.width = 400;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 40;
	rs.lineLength = 3;
	//rs.lineLength = 10;
	rs.angleInc = 0.1;
	rs.numRotations = 8;
	rs.rotConst = 0.0001;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'shapeP',circlePP);
  this.shapeP.stroke = 'transparent';
  this.shapeP.fill = 'white';
	this.shapeP.dimension = 2;

 // this.lineP['stroke-width'] = 2;
//  this.lineP['stroke-width'] = .1;
}  

rs.updateTheShape = function (shape,angle) {
	let dim = 4* (1+Math.sin(angle)); 
	shape.dimension = dim;
}
/*
rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,circleP,numTimeSteps,numRotations} = this;
	if (this.timeStep > 0) {
		debugger;
	}
	let aDelta = rvs.aDelta;
	let baseAngleInc = (numRotations*2*Math.PI)/numTimeSteps;
	let circle = circleP.instantiate();;//rectP.instantiate();
	circle.aDelta = aDelta;
	this.baseAngleInc = baseAngleInc;
	shapes.push(circle);
	circle.show();
  return circle;
}

rs.shapeUpdater =  function (circle,rvs,cell,pnt) {
	//debugger;
	let {shapes,timeStep:ts,numTimeSteps,baseAngleInc,rotConst,numRotations} = this;
	let rotConstA = rotConst * numRotations; 
	//rotConst = 0.0;
	let hts = numTimeSteps/2;
	//let angleInc = circle.angleInc;
	let aDelta = circle.aDelta;
	//let angleInc = 0.001 * (100 + aDelta);
	let angleInc = baseAngleInc + rotConstA * aDelta;
  let  angle = ts * angleInc;
	let cell11 = (cell.x === 1) && (cell.y === 1);
  if ((ts >= hts) && cell11) {
		debugger;
	}
	if (ts === hts) {
		circle.hangle = angle;
	}
	if (ts > hts) {
		angleInc = baseAngleInc - rotConstA * aDelta;

		//angleInc = 0.001 * (100 - aDelta);
		angle = circle.hangle + (ts-hts) * angleInc;
	}
	if (cell11) {
	  console.log('angle ',angle/(2*Math.PI));
	}

	//let angle = ts  * 0.0005 * angleInc;
	//let angle = ts  * 0.001 * angleInc;
	//let angle = ts  *  angleInc;
//item.setLenDir = function (shape,len,dir) {
	let dim = 4* (1+Math.sin(angle));
	circle.dimension = dim;
	
}
*/

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
//	this.setupShapeRandomizer('angleInc',{step:2,stept:2,min:100,max:200});
	this.setupShapeRandomizer('aDelta',{step:2,stept:0.5,min:-20,max:20});
	
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

rs.timeStep = 0;
rs.step = function ()   {
  this.updateContent();
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,10);
	
}
return rs;
});
 