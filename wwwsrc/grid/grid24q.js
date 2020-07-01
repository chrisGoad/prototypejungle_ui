
core.require('/line/line.js','/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,rectPP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgb(255,255,255)';
	this.rectP['stroke-width'] = 1;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  

rs.initialize = function () {
	this.initializeP();

	let numRows = this.numRows= 40;
	let numCols = this.numCols = 40;
	this.width = 300;
	this.height = 300;
	let deltaX = this.deltaX = this.width/this.numCols;
	let deltaY = this.deltaY = this.height/this.numRows;
	let fc = 5;
	this.pointJiggle = 3;
	this.includeShapes = true;
  this.setupBoundaryRandomizer('red', {step:80,min:50,max:250,numRows,numCols});
  this.setupShapeRandomizer('red', {step:80,min:50,max:250,numRows:numRows,numCols:numCols});
  this.setupShapeRandomizer('scale', {step:0.2,min:0,max:1,numRows:numRows,numCols:numCols});
 
this.shapeGenerator = function (shapes,rvs,cell) {
	debugger;
	let shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	//let include1 = (cell.x === 5) && (cell.y === 15);//Math.random()<0.5;
	let include1 = Math.random()<0.9;
	//let include1 = cell.x === cell.y;
	let rect = this.rectP.instantiate();
	if (include1) {
		let r = rvs.red;
	  rect.fill  = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		//rect.fill = 'red';
	}
	
	let sc = rvs.scale;
	let rfc = sc *0.6;
	rect.width = rfc * deltaX;
	rect.height = rfc * deltaY;
	let line0,line1,line2;
	line0 = this.lineP.instantiate();
	line1 = this.lineP.instantiate();
	//line1.stroke = 'blue';
	line2 = this.lineP.instantiate();
	shape.set('rect',rect);
	shape.set('line0',line0);
	if (include1) {
		shape.set('line1',line1);
	}
	shape.set('line2',line2);
	rect.show();
	line0.show();
	line1.show();
	line2.show();
	let fc = sc * .3;
	let hfc = sc* 0.2;
	let hy = fc*deltaY;
	let ly = -fc*deltaY;
	let h0 = -hfc*deltaX;
	let h1 = 0;
	let h2 = hfc*deltaX;
	line0.setEnds(Point.mk(h0,ly),Point.mk(h0,hy));
	if (include1) {
	  line1.setEnds(Point.mk(h1,ly),Point.mk(h1,hy));
	}
	line2.setEnds(Point.mk(h2,ly),Point.mk(h2,hy));
	return shape;
}
	

this.boundaryLineGeneratorr = function (lines,end0,end1,rvs,cell) {
	debugger;
	let line = this.boundaryLineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}
	

	 
	

this.initializeConstructor();
}
return rs;

});

