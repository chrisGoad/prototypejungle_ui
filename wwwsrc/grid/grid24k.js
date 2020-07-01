
core.require('/line/line.js','/shape/circle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(00,200,200)';
//	this.circleP['stroke-width'] = 0.5;
	this.circleP.dimension = 4;
}  
rs.rgb2color = function (r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
}
rs.initialize = function () {
	this.initializeP();

	this.numRows= 41;
	this.numCols = 41;
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

	let rm = this.randomizer = {};
	addRandomMethods(rm);
	let rnds = this.randomGridsForShapes = {};
//	let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols:this.numCols};
	let  rParams = {step:0.2,min:1.5,max:2,numRows:this.numRows,numCols:this.numCols};
	rnds.length  = rm.genRandomGrid(rParams);
	let  dimParams = {step:2,min:1,max:4,numRows:this.numRows,numCols:this.numCols};
	rnds.dimension  = rm.genRandomGrid(dimParams);
	let  dParams = {step:0.05* Math.PI,min:0.95*Math.PI,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
	rnds.direction  = rm.genRandomGrid(dParams);
	let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
	rnds.red  = rm.genRandomGrid(cParams);
 	let  wParams = {step:80,min:0,max:100,numRows:this.numRows,numCols:this.numCols};
	rnds.which  = rm.genRandomGrid(wParams);

 
 let trueCount = 0;
 let falseCount = 0;
this.shapeGenerator = function (shapes,rvs) {
	debugger;
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
  falseCount++;
	shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	let line0 = this.lineP.instantiate();
	let line1 = this.lineP.instantiate();
	shape.set('line0',line0);
	shape.set('line1',line1);
	line0.show();
	line1.show();
	//let rvs = randomValuesAtCell(cellx,celly);
	let dir = rvs.direction;
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
	let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
	let end0 = vec0.minus();
	let end1 = vec0;
	line0.setEnds(end0,end1);
	let r = rvs.red;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	line0.stroke = rgb;
	line0.update();
	end0 = vec1.minus();
	end1 = vec1;
	line1.stroke = rgb;
	line1.setEnds(end0,end1);
	line1.update();
	return shape;
	}
	

this.initializeConstructor();
}
return rs;

});

