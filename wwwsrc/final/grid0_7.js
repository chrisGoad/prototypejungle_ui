//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/grid0.js',
//function (linePP,circlePP,rectPP,addGridMethods) {
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',

function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
  debugger;	//this.initProtos();


  addGridMethods(rs);
  addRandomMethods(rs);
	//rs.initProtos();
	rs.saveImage = true;
	rs.setName('grid0_7');
  rs.loadFromPath = 0;
	
  
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(00,200,200)';
//	this.circleP['stroke-width'] = 0.5;
	this.circleP.dimension = 4;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'rgb(200,0,0)';
//	this.circleP['stroke-width'] = 0.5;
}  
rs.rgb2color = function (r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
}

 let trueCount = 0;
 let falseCount = 0;

rs.shapeGenerator = function (rvs) {
	debugger;
	let shapes = this.shapes;
	let wv = rvs.which;
	let showCircle = wv > 50;
	console.log('wv',wv,showCircle,trueCount,falseCount);
  let len = rvs.length;
  let shape;
	if (showCircle) {
		trueCount++;
		shape = this.circleP.instantiate();
		shape.dimension = rvs.dimension;
		shapes.push(shape);
		shape.update();
		shape.show();
		return shape;
	}
	trueCount++;
	shape = this.rectP.instantiate();
	shape.width = rvs.dimension;
	shape.height = rvs.dimension;
	shapes.push(shape);
	shape.update();
	shape.show();
	return shape;

}
	

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	debugger;
	let lines = this.lines;
	let line = this.lineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}

rs.initialize = function () {
	this.initProtos();
  core.root.backgroundColor = 'black';
	let numRows = this.numRows= 41;
	let numCols = this.numCols = 41;
	this.width = 300;
	this.height = 300;
	let deltaX = this.deltaX = this.numCols/this.width;
	let deltaY = this.deltaY = this.numRows/this.height;
	let fc = 5;
	
	this.visChance= 1;
	this.pointJiggle = 0;
	this.includeShapes = true;
	this.includeCellBoundaries = 1;
 
	this.boundaryStrokeWidth =0.5;
	this.shapeStroke = 'white';
	this.shapeStrokeWidth = 0.2;
	this.shapeLengthRatio = 0.6;
	this.redP = {step:35,min:10,max:250};
	this.greenP = {step:35,min:20,max:250};
	this.blueP = {step:35,min:20,max:250};

	//let rm = this.randomizer = {};
	//addRandomMethods(rm);
	//let rnds = this.randomGridsForShapes = {};
//	let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols};

	let  rParams = {step:30,min:50,max:200,numRows,numCols};
	this.setupBoundaryRandomizer('red', rParams);

	//rnds.length  = rm.genRandomGrid(rParams);
	let  dimParams = {step:2,min:1,max:4,numRows,numCols};
	this.setupShapeRandomizer('dimension', dimParams);

	//rnds.dimension  = rm.genRandomGrid(dimParams);
	let  dParams = {step:0.05* Math.PI,min:0.95*Math.PI,max:2*Math.PI,numRows,numCols};
	this.setupShapeRandomizer('direction', dParams);
	//rnds.direction  = rm.genRandomGrid(dParams);
	let  cParams = {step:30,min:50,max:250,numRows,numCols};
	this.setupShapeRandomizer('red', dimParams);

	//rnds.red  = rm.genRandomGrid(cParams);
 	let  wParams = {step:80,min:0,max:100,numRows,numCols};
	this.setupShapeRandomizer('which', wParams);
	//rnds.which  = rm.genRandomGrid(wParams);

 

	
this.initializeGrid();
}
return rs;

});

