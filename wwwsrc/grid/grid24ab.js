
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,rectPP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
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
	core.root.backgroundColor = 'black';

let numRows = rs.numRows= 5;
let numCols = rs.numCols = 5;
rs.width = 50;
rs.height =50;
rs.setupBoundaryRandomizer('red', {step:30,min:50,max:250,numRows,numCols});
rs.setupShapeRandomizer('red', {step:30,min:50,max:250,numRows,numCols}); 
let  dimParams = {step:2,min:1,max:4,numRows:rs.numRows,numCols:rs.numCols};
rs.setupShapeRandomizer('dimension',dimParams); 
let  wParams = {step:80,min:0,max:100,numRows:rs.numRows,numCols:rs.numCols};
rs.setupShapeRandomizer('which',wParams); 
let  offsetParams = {step:1,min:-3,max:3,numRows,numCols};
rs.setupShapeRandomizer('xoff',offsetParams); 
rs.setupShapeRandomizer('yoff',offsetParams); 


rs.pointJiggle = 5;

 
rs.generateNested = function (dst,osize,isize,center,count,color) {
	let dsize = osize-isize;
	let inc = dsize/(count - 1);
	let xinc  = (center.x)/(count-1);
	let yinc  = (center.y)/(count-1);
	let rect;
	for (let i = 0;i<count;i++) {
		let sz = osize - i*inc;
		let x = i*xinc;
		let y = i*yinc;
		rect = this.rectP.instantiate();
		dst.set('s'+i,rect);
		rect.width = sz;
		rect.height = sz;
		rect.moveto(Point.mk(x,y));
		rect.update();
		rect.show();
	}
	rect.fill = color;
}
		
		
let trueCount = 0;
 let falseCount = 0;
rs.shapeGenerator = function (shapes,rvs) {
	debugger;
	let wv = rvs.which;
	let red = wv > 70;
	let idim = rvs.dimension;
  let x = rvs.xoff;
  let y = rvs.yoff;

	let shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	
	this.generateNested(shape,8,2,Point.mk(x,y),5,red?'red':'blue');
	return shape;
	
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

