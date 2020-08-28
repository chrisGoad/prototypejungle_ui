
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  
	
let numTimeSteps = 3000;
let rs = svg.Element.mk('<g/>');
rs.motionStep = 1;
addGridMethods(rs);
rs.saveImage = true;
rs.setName('wander0_1');
rs.width = 400;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numCols = 40;
	rs.lineLength = 3;
	//rs.lineLength = 10;
	rs.angleInc = 0.1;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP.stroke = 'white';

  this.lineP['stroke-width'] = 2;
//  this.lineP['stroke-width'] = .1;
}  

	

rs.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,lineP} = this;
	if (this.timeStep > 0) {
		debugger;
	}
	let aa = rvs.angleInc;
//item.setLenDir = function (shape,len,dir) {
	//let shape = this.nextShape(circleP);//rectP.instantiate();
	let line = lineP.instantiate();;//rectP.instantiate();
	line.angleInc = aa;
	shapes.push(line);
	this.setLineEnds(line,this.lineLength,0) ;

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
  return line;
}

rs.shapeUpdater =  function (line,rvs,cell,pnt) {
	debugger;
	let {shapes,timeStep:ts} = this;
	let angleInc = line.angleInc;
	let angle = ts  * 0.0005 * angleInc;
//item.setLenDir = function (shape,len,dir) {
	this.setLineEnds(line,this.lineLength,angle) ;
	
}


rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('angleInc',{step:2,stept:2,min:100,max:200});
	
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
 