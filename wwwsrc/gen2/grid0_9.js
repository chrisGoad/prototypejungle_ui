
core.require('/shape/rectangle.js','/gen0/grid0.js',

//core.require(,'/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,addGridMethods) {
  debugger;

  let numTimeSteps = 200;
let rs = svg.Element.mk('<g/>');	
addGridMethods(rs);
//rs.initProtos();
rs.saveImage = true;
rs.setName('grid0_9');
rs.loadFromPath = 0;
rs.numRows= 200;
rs.numRows= 20;
rs.numCols = 200;
//rs.numCols = 50;
rs.width = 300;
rs.height = 300;

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  
let timeStep = 0;
rs.shapeGenerator = function (rvs) {
	let {rectP,shapes,deltaX,deltaY} = this;
	let shape = rectP.instantiate();
	let fh = 1.1;
  let fw = 0.5;
	shape.width = fw*deltaX;
	shape.height = fh*deltaY;
	shapes.push(shape);
	shape.update();
	shape.show();
	return shape;
}

let wrs = {stepx:20,stepy:20,stept:20};
const walkParams1 = (i,j,ti) => {
	let ht = numTimeSteps/2;
	wrs.biasUp = 0;
//	return wrs;
 let nmin = 0;
 let nmax = 250;
 let fr = ti/(ht-5);
 let frt = 0.80;
 let mrk = frt * ht;
 let min,max;
 let rfr = (ti - mrk)/(ht - mrk); // fraction while on rights
 let lfr = ti/mrk; // fraction while on left
 let minTrans = 50; // transition value
 let maxTrans = 250; // transition value
 if (ti > mrk) {
	 min = minTrans +  rfr * (nmax-minTrans);
	 max = maxTrans + rfr * (nmax - maxTrans);
 } else {
	 min = lfr*minTrans;
	 max = lfr*maxTrans;
	 // fraction while on left
 }
 //let min = 0.25 * fr*nmax;
 //min = 0;
 //let max = fr * nmax;
 wrs.min = min;
 wrs.max = max;
 if ((i==5)&&(j==5)) {
    console.log('ti ',ti,' fr ',fr,' lfr ',lfr,' rfr ',rfr,' min ',min,' max ',max);
 }
	return wrs;
}

const walkParams = function (i,j,t) {
	let ht = numTimeSteps/2;
	if (t < ht) {
		return walkParams1(i,j,t);
	} else {
		return walkParams1(i,j,2*ht - t);
	}
}

rs.shapeUpdater = function (shape,rvs) {
	let {rectP,deltaX,deltaY,shapes,timeStep} = this;
	if (timeStep === 2) {
		debugger;
	}
	//let fr = (numTimeSteps-timeStep)/numTimeSteps;
/*	let frfr = 1;
	let fr = frfr*timeStep/(numTimeSteps/4);
	//shapes.push(shape);
	let fh = 1.1;
  let fw = 0.5;*/
	//shape.width = fw*deltaX;
	//shape.height = fh*deltaY;
	let r = rvs.red;
	let g = rvs.green;
	let b = rvs.blue;
	//let ir = Math.floor(r/50)*50;
//	let fill = (timeStep > (numTimeSteps - 5))?'white':`rgb(${Math.floor(fr*r)},${Math.floor(fr*g)},${Math.floor(fr*b)})`; 
	let fill = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`; 
	shape.fill = fill;
	shape.update();
	return shape;
}
rs.initialize = function () {
	core.root.backgroundColor = 'black';
  let {numRows,numCols } = this;
	this.initProtos();
	//this.deltaX = this.width/this.numCols;
	//this.deltaY = this.height/this.numRows;

	//this.setupShapeRandomizer('red', {step:35,min:40,max:250,constantFirstRoww:250,numRows,numCols,backwards:false});
	//this.setupShapeRandomizer('red', {walkParams,numRows,numCols});
	this.setupShapeRandomizer('red', {walkParams});
	this.setupShapeRandomizer('green', {walkParams});
	this.setupShapeRandomizer('blue', {walkParams});
//	this.setupShapeRandomizer('red', {stepx:20,stepy:20,stept:20,min:0,max:200});
//		this.setupShapeRandomizer('green', {stepx:20,stepy:20,stept:20,min:0,max:200});
	//	this.setupShapeRandomizer('blue', {stepx:20,stepy:20,stept:20,min:0,max:200});

  this.initializeGrid();
}


rs.step = function ()   {
	debugger;
	this.stepShapeRandomizer('red');
	this.stepShapeRandomizer('green');
	this.stepShapeRandomizer('blue');
  this.updateGrid();
	timeStep++;
}
rs.animate = function ()  {
	debugger
	this.animateIt(numTimeSteps,10);
	
}


return rs;
});

