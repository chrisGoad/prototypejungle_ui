
core.require('/line/line.js','/shape/circle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,gridConstructor,addRandomMethods) {
return function () {
  debugger;
  let rs = gridConstructor();
	//rs.verticalOrHorizontal = true;
	/*let spat =svg.Element.mk('<g/>');
	rs.set('spat',spat);
  addSpatterMethods(spat);
	spat.initializeP = function () {
		core.assignPrototypes(this,'lineP',linePP);
		this.lineP.stroke = 'rgb(255,255,255)';
		this.lineP['stroke-width'] = 1;
		this.lineP.dimension = 4;
			core.assignPrototypes(this,'circleP',circlePP);
		this.circleP.stroke = 'rgb(255,255,255)';
		this.circleP['stroke-width'] = 0;
		this.circleP.dimension = 2;
	}
	spat.numRows= 20;
	spat.numCols = 20;
	spat.width = 100;
	spat.height = 100;
	spat.numDrops = 100;
	spat.shapeGeneratator = function () {
		
	spat.initialize = function () {
		*/
rs.initializeP = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	core.assignPrototypes(this,'spatterP',linePP);
	this.spatterP.stroke = 'rgb(255,255,255)';
	this.spatterP['stroke-width'] = 0.1;
  core.assignPrototypes(this,'spatterP2',circlePP);
	//this.spatterP2.stroke = 'rgb(255,255,255)';
	this.spatterP2['stroke-width'] = 0;		
	this.spatterP2.dimension = 2;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP['stroke-width'] = 0;
	this.circleP.dimension = 2;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  


rs.initializePair = function () {
	debugger;
	let {minLeft,maxLeft,minRight,maxRight}  = this;
	//let {numRows,numCols,minLeft,maxLeft,minRight,maxRight}  = this;
	core.root.backgroundColor = 'black';
	this.initializeP();
  rs.numRed = 0;
	//let numRows = this.numRows= 40;
	let numRows = this.numRows= 60;
	let numCols = this.numCols = 60;
	this.numDrops = 5000;
	//let width = this.width = 600;
	let width = this.width = 400;
	let height = this.height = 400;
	let deltaX = this.deltaX = this.width/this.numCols;
	let deltaY = this.deltaY = this.height/this.numRows;
	let rnp = {correlated:false};
	let sideBySide = this.sideBySide;
	const walkParams =  (i,j) => {
		let left;
		if (sideBySide) {
			left = i < 30;
		} else {
		  left = (13<i) && (i<47) && (13<j) && (j<47);
		}
		let mpf = this.changePoint;
		var mp = mpf * numCols;
		let fri = i/(numCols*mpf); // goes from 0 to 1 in first half
	  let sfri = (i - mp)/(numCols * (1 - mpf)); // goes from 0 to 1 in second half
		rnp.stepx = 0.2;
		rnp.stepy = 0.2;
		//if (i < mp) {
		if (left) {
			rnp.min = this.minLeft;
			rnp.max = this.maxLeft;
		//	rnp.min = 0;rnp.max = 0.7;
			//rnp.min = 0;rnp.max = 0.8;
		} else  {
			rnp.min = this.minRight;
			rnp.max = this.maxRight;
			//rnp.min = 0.5*sfri;
      //rnp.max = 1;
      //rnp.min = 0.3;rnp.max = 1;			
      //rnp.min = 0.2;rnp.max = 1;			
		} 
		return rnp;
	}
	let fc = 5;
	this.pointJiggle = 0;
	this.includeShapes = true;
  this.setupShapeRandomizer('red', {step:80,min:150,max:250,numRows,numCols});
  this.setupShapeRandomizer('direction', {walkParams,numRows,numCols});
	
	let w2 = width/2;
	let h2 = height/2;
	let corner = Point.mk(-w2,-h2);
	let extent = Point.mk(w2,h2);
	//this.theSpatterRect =  geom.Rectangle.mk(corner,extent);


const lineSetEnds = function (line,dir) {
	let llnf = .4; //linelengthfactor
	let end1 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = end1.minus();
	line.setEnds(end0,end1);
}

this.turnRandomShapesRed = function () {
	let {numRows,numCols,spatter,numDrops,shapes,numRed} = this;
	let n =spatter?numDrops:numRows*numCols;
	for (let i=0;i<numRed;i++) {
	  let idx = Math.floor(Math.random() * n);
	  let shp = shapes[idx];
	  shp.stroke = 'red';
	//	if (i<(numRed/2)) {
		if (i===0) {
			lineSetEnds(shp,0);
		} else {
			lineSetEnds(shp,0.5 * Math.PI);
		}
	}
}

	
const generator = function (shapes,rvs,cell) {
	


	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir;
	if (this.verticalOrHorizontal) {
	  dir = 0.5*Math.PI * Math.floor(rvs.direction*2);
	} else {
	  dir = 0.5*Math.PI * rvs.direction;
	}
	lineSetEnds(line0,dir);
  let r = rvs.red;
	/*	
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	
	line0.setEnds(end0,end1);*/
 // line0.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  line0.show();
	line0.update();
	
	return line0;
	}
	
this.shapeGeneratorr = function (shapes,rvs,cell) {
	debugger;
	
	let llnf = .4; //linelengthfactor


	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir = 0.5*Math.PI * rvs.direction;
  let r = rvs.red;
		
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	
	line0.setEnds(end0,end1);
 // line0.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  line0.show();
	line0.update();
	
	return line0;
	}
	

this.spatterRect = function (cell) {
	return this.theSpatterRect;
}
if (this.spatter) {
  this.spatterGenerator = generator;
} else {
  this.shapeGenerator = generator;
}

/*function (shapes,rvs,cell) {
	debugger;
	
	let llnf = .4; //linelengthfactor


	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir = 0.5*Math.PI * rvs.direction;
  let r = rvs.red;
		
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	
	line0.setEnds(end0,end1);
 // line0.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  line0.show();
	line0.update();
	
	return line0;
	}
}
*/
this.spatterGeneratorr = function (shapes,rvs,cell) {
	let {deltaX} = this;
	let bcc = this.bigCellCoords(cell);
	/*let {x,y} = cell;

	let bcd = numCols/numBigRows; // BigCellDim
	let bcx = Math.floor(x/bcd);// BigCellX
	let bcy = Math.floor(y/bcd);*/
	let bcx = bcc.x;
	let bcy = bcc.y;
	if ((bcx === 1) && (bcy === 1)) {
		  debugger;
		let line0 = this.spatterP.instantiate();
    shapes.push(line0);
	  let dir = 2 * Math.PI * Math.random();
		let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(5*deltaX);
  	let end0 = vec0.minus();
	  let end1 = vec0;
	  line0.setEnds(end0,end1);
    line0.update();
		line0.show();
		return line0;
	}/*
	  let r = rvs.red;
		let circle = this.spatterP2.instantiate();
		shapes.push(circle);
		circle.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;

		circle.show();
		return circle;
	}*/
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
debugger;
this.turnRandomShapesRed();

}
return rs;

}});

