
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
 
 let rs = svg.Element.mk('<g/>');

	
let numTimeSteps = 200;

rs.motionStep = 1;
addGridMethods(rs);
rs.setName('wander0_3');

rs.saveImage = 0;
rs.width = 400;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numRows = 20;
  rs.numCols = 40;
  //rs.numCols = 20;
	rs.lineLength = 4.8;
	rs.lineLength = 1.5;
	rs.pointJiggle = 0;
	rs.numFramesToRepeat = 20;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgba(250,250,250,1)';
  this.lineP['stroke-width'] = 1;
 
}  


rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,lineLength,lineP} = this;
//rs.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(lineP);//rectP.instantiate();
	let shape = lineP.instantiate();
	shapes.push(shape);
	shape.show();
	return shape;
}

let directions = [0,0.5,0.25,0.75,0.25,0,0,0];
//let directions = [0.25,0.75,0.25,0.75,0,0,0];
//let directions = [0.25,0.75,0.25];
let bk = 150;
let colors = [`rgb(250,${bk},${bk})`,`rgb(${bk},250,${bk}`,`rgb(${bk},${bk},250)`,`rgb(${bk},250,250)`,`rgb(250,250,${bk})`,`rgb(250,${bk},${bk})`,'black','black'];//`rgb(250,${bk},${bk})`];
//let colors = [`rgb(250,${bk},${bk})`,`rgb(${bk},250,${bk}`,`rgb(${bk},${bk},250)`,`rgb(${bk},250,250)`,`rgb(250,250,${bk})`,'black','black'];//`rgb(250,${bk},${bk})`];
//let colors = [`rgb(${bk},250,${bk}`,`rgb(${bk},${bk},250)`,`rgb(${bk},250,${bk}`,`rgb(${bk},250,${bk}`,'black','black'];//`rgb(250,${bk},${bk})`];
rs.shapeUpdater =  function (shape,rvs,cell,pnt) {
  	let {lineLength} = this;

	//let dim = rvs.dimension;
  //shape.dimension = dim;
	let tr = shape.getTranslation();
	let value = rvs.value;
	//console.log('idir ',idir);
	//let incs = 2;
	/*if (idir < 0.25*Math.PI) {
		stroke = `rgb(200,100,100)';
	} else {
		stroke = 'rgb(100,100,200)';
	}*/
	
	let ival = Math.floor(value);
	let dir = Math.PI * directions[ival];
	let {r,g,b} = rvs;
 // let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.stroke = colors[ival];
   this.setLineEnds(shape,lineLength,dir);
	 let {x,y} = cell;
	 if (x === y) {
   //  console.log('dir',dir* (180/Math.PI),' x ',cell.x);
	 }
  //shape.fill = 'black';
  shape.update();
  return shape;
}

let wrs =  {step:.2,stept:.2,min:0,max:Math.PI/2};
let numStages = directions.length - 1;
const walkParams = (i,j,ti) => {
	wrs.biasUp = 0;
//	return wrs;
 let fr = ti/(numTimeSteps);
 let min = fr*(numStages+0.1);
 let max = 1 + min;;
 wrs.min = min;
 wrs.max = max;
 if ((i===1) && (j===1)) {
	 console.log('min ',min,' max ',max);
  }
	return wrs;
}
	

rs.initialize = function () {
  debugger;
	  this.initProtos();
   this.addBox(10,'white');
  core.root.backgroundColor = 'black';
		this.setupShapeRandomizer('value',{walkParams});

	//this.setupShapeRandomizer('r',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('g',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('b',{step:35,stept:5,min:150,max:250});
//	this.setupShapeRandomizer('dimension',{step:1,stept:1,min:1,max:5});
	//this.setupShapeRandomizer('dir',{step:.2,stept:.2,min:0,max:2*Math.PI,biasUp:0.4});
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

//rs.timeStep = 0;
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('r');
	//this.stepShapeRandomizer('g');
	//this.stepShapeRandomizer('b');
	//this.stepShapeRandomizer('dimension');
	this.stepShapeRandomizer('value');
  this.updateGrid();
	//draw.saveFrame(rs.timeStep);
	//rs.timeStep++;
}
	


rs.animate = function ()  {
	this.animateIt(numTimeSteps,100);
	
}
return rs;
}
);
 