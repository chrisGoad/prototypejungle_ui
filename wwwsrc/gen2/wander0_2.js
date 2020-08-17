
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  
	
let numTimeSteps = 1000;
let rs = svg.Element.mk('<g/>');
rs.motionStep = 1;
addGridMethods(rs);
rs.saveImage = true;
rs.setName('wander0_2');
rs.width = 200;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numRows = 20;
  rs.numCols = 40;
  rs.numCols = 20;
	rs.lineLength = 4.8;
	rs.lineLength = .8;
	rs.pointJiggle = 0.0;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgba(250,250,250,1)';
  this.lineP['stroke-width'] = 0.5;
 
}  


rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,lineLength,lineP} = this;
	debugger;
	if (this.timeStep > 0) {
		debugger;
	}
//item.setLenDir = function (shape,len,dir) {
	let shape = this.nextShape(lineP);//rectP.instantiate();
	//let dim = rvs.dimension;
  //shape.dimension = dim;
	let tr = shape.getTranslation();
	let idir = rvs.dir;
	console.log('idir ',idir);
	let incs = 5;
	let stroke;
	if (idir < 0.5*Math.PI) {
		stroke = 'red';
	} else {
		stroke = 'blue';
	}
	let dir = Math.floor((incs*idir)/(Math.PI))*((Math.PI)/incs);//(idir < 0.5*Math.PI)?0:0.5*Math.PI;
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
     console.log('dir',dir* (180/Math.PI),' x ',cell.x);
	 }
  //shape.fill = 'black';
	shape.show();
  shape.update();
  return shape;
}

let wrs =  {step:.2,stept:.1,min:0,max:Math.PI};

const walkParams = function (i,j,ti) {
	wrs.biasUp = 0;
//	return wrs;
 let t = ti%100;
  let abb = 0.6;
	if (t < 10 ) {
		wrs.biasUp=0;
	}  else if (t<60) {
		wrs.biasUp = abb;
	} else if (t < 70) {
		wrs.biasUp = 0;
	} else {
		wrs.biasUp = -abb;
	}
	if ((i===0) && (j===0)) {
		debugger;
	}
	return wrs;
}
	
		
	

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
		this.setupShapeRandomizer('dir',{walkParams});

	//this.setupShapeRandomizer('r',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('g',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('b',{step:35,stept:5,min:150,max:250});
//	this.setupShapeRandomizer('dimension',{step:1,stept:1,min:1,max:5});
	//this.setupShapeRandomizer('dir',{step:.2,stept:.2,min:0,max:2*Math.PI,biasUp:0.4});
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

rs.timeStep = 0;
rs.step = function ()   {
	debugger;
	//this.stepShapeRandomizer('r');
	//this.stepShapeRandomizer('g');
	//this.stepShapeRandomizer('b');
	//this.stepShapeRandomizer('dimension');
	this.stepShapeRandomizer('dir');
  this.updateGrid();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(numTimeSteps,50);
	
}
return rs;
});
 