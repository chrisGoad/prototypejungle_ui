
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,rectPP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	core.root.backgroundColor = 'black';
	this.lineP.stroke = 'rgb(255,255,255,1)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'transparent';
	this.circleP['stroke-width'] = 0.3;
	this.circleP.stroke = 'cyan';
	this.circleP.dimension = 4;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'transparent';
  this.rectP['stroke-width'] = 0.1;
	this.rectP.stroke = 'white';
	this.rectP.width = this.rectP.height = 8;
	core.assignPrototypes(this,'boundaryLineP',linePP);
  this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 0.5;
	
}  
rs.rgb2color = function (r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
}
rs.initializeP();

let numRows = rs.numRows= 20;
let numCols = rs.numCols = 20;
rs.width = 100;
rs.height = 100;
rs.setupBoundaryRandomizer('red', {step:30,min:50,max:250,numRows,numCols});
rs.setupShapeRandomizer('red', {step:30,min:50,max:250,numRows,numCols}); 
let  dimParams = {step:2,min:1,max:4,numRows:rs.numRows,numCols:rs.numCols};
rs.setupShapeRandomizer('dimension',dimParams); 
let  wParams = {step:80,min:0,max:100,numRows:rs.numRows,numCols:rs.numCols};
rs.setupShapeRandomizer('which',wParams); 


rs.pointJiggle = 5;

 
let trueCount = 0;
 let falseCount = 0;
rs.shapeGenerator = function (shapes,rvs) {
	debugger;
	let wv = rvs.which;
	let showCircle = wv > 70;
	console.log('wv',wv,showCircle,trueCount,falseCount);
	let idim = rvs.dimension;


	let shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	
	let rect0 = this.rectP.instantiate();
	shape.set('rect0',rect0);
	rect0.show();

	
  if (showCircle) {
		trueCount++;
		let circle = this.circleP.instantiate();
		shape.set('c',circle);
		circle.dimension = idim;
		circle.update();
		circle.show();
		return shape;
	}
	let rect1 = this.rectP.instantiate();
	shape.set('rect1',rect1);
	rect1.show();
	rect1.width = idim;
	rect1.height = idim;
	return shape;
	//let rvs = randomValuesAtCell(cellx,celly);
	let dir = rvs.direction;
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
	

rs.boundaryLineGeneratorr = function (lines,end0,end1,rvs,cell) {
	let line = this.boundaryLineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}

rs.initializeConstructor();

return rs;

});

