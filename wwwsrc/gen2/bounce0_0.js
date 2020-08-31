

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
rs.setName('bounce0_0');
rs.width = 400;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 40;
	rs.lineLength = 3;
	//rs.lineLength = 10;
	rs.angleInc = 0.1;
	rs.numRotations = 20;
	rs.rotConst = 0.0001;
	//rs.rotConst = 0.0005;
	
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'white';
	this.circleP.dimension = 5;
	//this.lineP.dimension = 2;

 this.circleP['stroke-width'] = 1;
//  this.lineP['stroke-width'] = .1;
}  
/*
rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,lineP,numTimeSteps} = this;
	let aDelta = rvs.aDelta;
	let baseAngleInc = (numRotations*2*Math.PI)/numTimeSteps;
	let line = lineP.instantiate();;//rectP.instantiate();
	line.aDelta = aDelta;
	this.baseAngleInc = baseAngleInc;
	shapes.push(line);
	line.show();
  return line;
}

rs.shapeUpdater =  function (circle,rvs,cell,pnt) {
	//debugger;
	let {shapes,timeStep:ts,numTimeSteps,baseAngleInc,rotConst,numRotations} = this;
	let rotConstA = rotConst * numRotations; 
	//rotConst = 0.0;
	let hts = numTimeSteps/2;
	//let angleInc = circle.angleInc;
	let adiv = circle.adiv;
	//let angleInc = 0.001 * (100 + adiv);
	let angleInc = baseAngleInc + rotConstA * adiv;
  let  angle = ts * angleInc;
	let cell11 = (cell.x === 1) && (cell.y === 1);
  if ((ts >= hts) && cell11) {
		debugger;
	}
	if (ts === hts) {
		circle.hangle = angle;
	}
	if (ts > hts) {
		angleInc = baseAngleInc - rotConstA * adiv;

		//angleInc = 0.001 * (100 - adiv);
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
rs.generateShape = function () {
	let shp = svg.Element.mk('<g/>');
	let circle = this.circleP.instantiate();
	shp.set('inner',circle);
	circle.show();
	return shp;
}
	


rs.updateTheShape = function (shape,angle,rvs,cell) {
	debugger;
	let delta = 20* Math.cos(angle);
	let vel = - Math.sin(angle);
	let {x,y} = cell;
	if ((x===1) && (y===1)) {
		//console.log('phase ',phase);
	}
	let phm = 25* vel + 100;
	shape.inner.fill = `rgb(${phm},${phm},${phm})`;
	shape.inner.moveto(Point.mk(0,delta));
	//this.setLineEnds(line,this.lineLength,angle);
}

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
	//debugger;
	//this.stepShapeRandomizer('r');
	
  this.updateGrid();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,30);
	
}
return rs;
});
 