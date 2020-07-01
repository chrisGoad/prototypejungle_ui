
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 1;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 0.2;
}  

//rs.rgb2color = function (r,g,b) {
//	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
//}
rs.initialize = function () {
	this.initializeP();
	core.root.backgroundColor = 'black'

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
 
	this.boundaryStrokeWidth =1;
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
	let  rParams = {step:0.1,min:1.5,max:2,numRows:this.numRows,numCols:this.numCols};
	rnds.length  = rm.genRandomGrid(rParams);
	let  dParams = {step:0.05* Math.PI,min:0.95*Math.PI,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
	rnds.direction  = rm.genRandomGrid(dParams);
	let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
	rnds.red  = rm.genRandomGrid(cParams);
 
 
this.shapeGenerator = function (shapes,rvs) {
	debugger;
	let shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	let line0 = this.lineP.instantiate();
	let line1 = this.lineP.instantiate();
	shape.set('line0',line0);
	shape.set('line1',line1);
	line0.show();
	line1.show();
	//let rvs = randomValuesAtCell(cellx,celly);
	let dir = rvs.direction;
	let len = rvs.length;
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

