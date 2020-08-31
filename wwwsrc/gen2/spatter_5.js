
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter_4');
rs.width = 400;
rs.height = 400;
rs.numDrops =2500;
rs.numRows = 40;
rs.numCols = 40;
rs.numTimeSteps = 1000;

	

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 0.2;
}  

rs.spatterGenerator = function (rvs,cell) {
	let {shapes,lineP} = this;

	let col = cell.x;
	let inmiddle = (col > .333* this.numCols) && (col < 0.666* this.numCols);
  let shape = svg.Element.mk('<g/>');
  shapes.push(shape);
	shape.angleInc = rvs.angleInc;

  let line0 = this.lineP.instantiate();
 // let line1 = this.lineP.instantiate();
  shape.set('line0',line0);
 // shape.set('line1',line1);
  line0.show();
 // line1.show();
  let dir = rvs.direction;
  let len = rvs.length;
	//shape.initialDirection = dir;
	shape.initialDirection = 0;
	shape.initialLength = len;
	return shape;
  /*let len = rvs.length;
  let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
  let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
  let end0 = vec0.minus();
  let end1 = vec0;
  line0.setEnds(end0,end1);
  line0.update();
  end0 = vec1.minus();
  end1 = vec1;
  line1.setEnds(end0,end1);
  line1.update();
  return shape;*/
}

rs.shapeUpdater = function (shape,rvs,cell) {
	let ts = this.timeStep;
	let {line0,line1,initialDirection,initialLength:len,angleInc} = shape;
	let dir;
	if (ts > 0) {
	  dir = ts  * 0.001 * angleInc;
	} else {
		dir = initialDirection;
	}

	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
  let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
  let end0 = vec0.minus();
  let end1 = vec0;
  line0.setEnds(end0,end1);  
	line0.update();
	//end0 = vec1.minus();
  //end1 = vec1;
 // line1.setEnds(end0,end1);
 // line1.update();
}
	

	
	
	
rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	//this.setupShapeRandomizer('length',  {step:5,min:5,max:10});
	this.setupShapeRandomizer('length',  {step:5,min:25,max:30});
	this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:1.95*Math.PI,max:2*Math.PI});
	//this.setupShapeRandomizer('angleInc',{step:2,stept:2,min:100,max:200});
	this.setupShapeRandomizer('angleInc',{step:2,stept:2,min:100,max:120});

	//this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
  this.initializeGrid();
}	

rs.timeStep = 0;
rs.step = function ()   {
	debugger;
	//this.stepShapeRandomizer('r');
	
  this.updateSpatter();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,10);
	
}
return rs;
});
 