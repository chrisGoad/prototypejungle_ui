
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

let numRows = rs.numRows= 40;
let numCols = rs.numCols = 40;
rs.width = 400;
rs.height = 400;
rs.setupBoundaryRandomizer('red', {step:30,min:50,max:250,numRows,numCols});
rs.setupShapeRandomizer('red', {step:30,min:50,max:250,numRows,numCols}); 
//let  dimParams = {step:2,min:1,max:4,numRows:rs.numRows,numCols:rs.numCols};
let rnp = {correlated:true};

const walkParams = function (i,j) {
		let fri = i/numRows;
		let frj = j/numCols;
		let scale = 0.3;
		rnp.stepx = scale * 10;
		rnp.stepy = scale * 30;
		let bandwd = 0.02;
		if (fri === 0) {
			if (frj < 0.5) {
				rnp.max = scale * 100;
				rnp.min = scale * 70;
			} else {
				rnp.max = scale * 1;
				rnp.min = scale * 0;
			}
		} else if ((fri > (0.5-bandwd)) && (fri < (0.5 + bandwd))) {
			if (frj < 0.5) {
				rnp.max = scale * 1;
				rnp.min = scale * 0;
			} else {
				rnp.max = scale * 100;
				rnp.min = scale * 70;
			}
		} else {
			rnp.min =scale * 0;
			rnp.max = scale * 100;
		}
		return rnp;
	}
	
const walkParams2 = function (i,j) {
		let fri = i/numRows;
		let frj = j/numCols;
		let scale = 0.1;
		rnp.stepx = scale * 10;
		rnp.stepy = scale * 50;
		let bandwd = 0.02;
		if (fri === 0) {
			if (frj < 0.2) {
				rnp.max = scale * 100;
				rnp.min = scale * 70;
			} else if ((0.2 < frj) && (frj < 0.8)) {
				rnp.max = scale * 1;
				rnp.min = scale * 0;
			} else {
			  rnp.max = scale * 100;
				rnp.min = scale * 70;
			}
		} else {
			rnp.min =scale * 0;
			rnp.max = scale * 100;
		}
		return rnp;
	}
//let  dimParams = {step:.1,min:0.5,max:2,numRows:rs.numRows,numCols:rs.numCols};
let  dimParams = {walkParams:walkParams,numRows,numCols};
rs.setupShapeRandomizer('dimension',dimParams); 
let  wParams = {step:80,min:0,max:100,numRows:rs.numRows,numCols:rs.numCols};
rs.setupShapeRandomizer('which',wParams); 


rs.pointJiggle = 0;//5;

 
let trueCount = 0;
 let falseCount = 0;
rs.shapeGenerator = function (shapes,rvs) {
	debugger;
	let wv = rvs.which;
	let showCircle = 0;//wv > 70;
	console.log('wv',wv,showCircle,trueCount,falseCount);
	let idim = rvs.dimension;


	let shape = svg.Element.mk('<g/>');
	shapes.push(shape);
	let odim = 3;
	let rect0 = this.rectP.instantiate();
	shape.set('rect0',rect0);
	rect0.show();
	rect0.width = odim;
	rect0.height = odim;
	
  if (showCircle) {
		trueCount++;
		let circle = this.circleP.instantiate();
		shape.set('c',circle);
		circle.dimension = 0.5*idim;
		circle.update();
		circle.show();
		return shape;
	}
	let rect1 = this.rectP.instantiate();
	shape.set('rect1',rect1);
	rect1.show();
	rect1.width = 0.25*idim;
	rect1.height = 0.25*idim;
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

