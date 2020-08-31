
core.require('/shape/circle.js','/line/line.js','/gen0/grid0.js',
function (circlePP,linePP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

rs.spatter = 1;
addGridMethods(rs);
rs.saveImage = true;
rs.setName('spatter0_6');
rs.width = 400;
  rs.height = 400;
  rs.numDrops =3000;
 // rs.numDrops =3;
  rs.numRows = 20;
  rs.numCols = 20;
	rs.numTimeSteps = 400;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'rgba(0,0,0,1)';
  this.circleP.fill = 'rgba(0,0,200)';
  this.circleP['stroke-width'] = 1;
  this.circleP.dimension = 4;
	core.assignPrototypes(this,'lineP',linePP); // for the box
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 1;
}  


//rs.spatterGenerator =  function (rvs,cell,pnt) {
rs.shapeGenerator =  function (rvs,cell,pnt) {
	debugger;
	let {shapes,circleP} = this;
//item.setLenDir = function (shape,len,dir) {
  let shape = this.circleP.instantiate();
  shapes.push(shape);
	shape.angleInc = rvs.angleInc;

	let dim = rvs.dimension;
  shape.initialDimension = dim;
  return shape;
}
rs.shapeUpdater =  function (shape,rvs,cell,pnt) {
	let ts = this.timeStep;
	let nts = this.numTimeSteps;
	let fc = 1 + (0.5*ts**1.5)/nts;
	let angle;
	if (ts === 0) {
		angle = 0;
	} else {
		let angleInc = shape.angleInc;
	//let angle = ts  * 0.0005 * angleInc;
	  angle = ts  * 0.001 * angleInc;
	}
//item.setLenDir = function (shape,len,dir) {
//	let dim = 1+  3* (1+Math.sin(angle));
	let dim = 1+  fc* (1+Math.sin(angle));
	shape.dimension = dim;
	let r = rvs.shade;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.fill = rgb;
  shape.update();
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('shade',{step:15,stept:15,min:50,max:250});
	//this.setupShapeRandomizer('dimension',{step:5,min:1,max:30});
		this.setupShapeRandomizer('angleInc',{step:20,stept:2,min:100,max:200});

  this.initializeGrid();
	this.addBox(this.lineP,15);
}	

rs.timeStep = 0;
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	
  this.updateSpatter();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,10);
	
}
return rs;
});
 