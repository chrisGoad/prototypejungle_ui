
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
return function () {
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.randomizeOrder = 1;
let sqsz= 50;
//let sqd = 128;
let sqd = 64;
let ar = 1;
rs.saveImage = 1;
rs.loadFromPath = 0;
rs.numCols = ar*sqd;
rs.numRows = sqd;
rs.height =  sqd * sqsz;
rs.width = ar * rs.height;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	
		core.assignPrototypes(this,'circleP',circlePP);
}  


rs.finishProtos = function () {
	this.rectP.stroke = 'black';
	this.rectP['stroke-width'] = 5;
}

const numPowers = function(n,p) {
	if (n === 0) {
		return 0;
	}
	if (n === p) { 
	  return 1;
	}
	if (n%p === 0) {
		return 1 + numPowers(n/p,p);
	}
	return 0;
}

rs.sizeFactor = function (rvs, cell) {
	let {x,y} = cell;
	let px = numPowers(x,2);
	let py = numPowers(y,2);
	return Math.min(px,py);
	return px+py;
}

rs.colorSetter = function (shape,fc) {
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}


rs.shapeGenerator = function (rvs,cell) {
	  debugger;
		let {shapes,rectP,circleP,numRows,numCols,genCircles} = this;
	  let shape = (this.genCircles)?circleP.instantiate():rectP.instantiate();
		let fc = this.sizeFactor(rvs,cell);
		let dim = Math.pow(fc+1,1.2) *40;
		if (!this.genCircles) {
			shape.width = dim;
			shape.height = dim;
		} else {
			shape.dimension = dim;
		}
		shapes.push(shape);
	
		this.colorSetter(shape,fc);
		shape.show();
		return shape;
	}



rs.initialize = function () {
	//core.root.backgroundColor = 'black';
	this.initProtos();
	this.finishProtos();
	if (this.backgroundColor) {
	  let bkr = this.set('rect',this.rectP.instantiate());
	  bkr.show();
	  bkr.width = this.width;
	  bkr.height = this.height;
		bkr.fill = this.backgroundColor;
		bkr['stroke-width'] = 0;
	}
	this.initializeGrid();
}
		

return rs;

}});

