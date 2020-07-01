
core.require('/line/line.js','/shape/circle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,gridConstructor,addRandomMethods) {
return function () {
  debugger;
  let rs = gridConstructor();
	rs.generatorsDoMoves = true;
	rs.intersectWithRects = false;
	rs.lineLengthFactor = 10;
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
	this.spatterP['stroke-width'] = 0.005;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP['stroke-width'] = 0;
	this.circleP.fill = 'red';
	this.circleP.dimension = 8;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  


rs.initializeSpat = function () {
	debugger;
	let {minLeft,maxLeft,minRight,maxRight}  = this;
	//let {numRows,numCols,minLeft,maxLeft,minRight,maxRight}  = this;
	core.root.backgroundColor = 'black';
	this.initializeP();
  rs.numRed = 0;
	//let numRows = this.numRows= 40;
	let numRows = this.numRows= 60;
	let numCols = this.numCols = 60;
	this.numDrops = 200;
	//let width = this.width = 600;
	let width = this.width = 1000;
	let height = this.height = 1000;
	let hw = 0.5*width;
	let tw = 0.45 * width;
	let hh = 0.5*height;
	let leftCorner = Point.mk(-hw,-hh);
	let leftExtent = Point.mk(hw,height);
	this.leftRect = geom.Rectangle.mk(leftCorner,leftExtent);
	debugger;
	this.leftRectSides = this.constructSides(this.leftRect);
	let rightCorner = Point.mk(0,-hh);
	let rightExtent = Point.mk(hw,height);
	this.rightRect = geom.Rectangle.mk(rightCorner,rightExtent);
	this.rightRectSides = this.constructSides(this.rightRect);
  let deltaX = this.deltaX = this.width/this.numCols;
	let deltaY = this.deltaY = this.height/this.numRows;
	let rnp = {correlated:true};
	let sideBySide = this.sideBySide;
	const walkParams =  (i,j) => {
		let fri = i/numCols;
		let left = fri < 0.5;
		if (left) {
			rnp.step = this.step0;
			rnp.min = this.min0;
			rnp.max = this.max0;
	  } else {
		  rnp.step = this.step1;
			rnp.min = this.min1;
			rnp.max = this.max1;			
	  }
		return rnp;
	}
	let fc = 5;
	this.pointJiggle = 10;
	this.includeShapes = true;
  //this.setupShapeRandomizer('red', {step:80,min:150,max:250,numRows,numCols});
 // this.setupShapeRandomizer('direction0', {step:this.step0,min:this.min0,max:this.max0,numRows,numCols});
  this.setupShapeRandomizer('direction0', {walkParams,numRows,numCols});
	//debugger;
 // this.setupShapeRandomizer('direction1', {step:this.step1,min:this.min1,max:this.max1,numRows,numCols});
 // this.setupShapeRandomizer('direction1', {walkParams,numRows,numCols});
	
	//let w2 = width/2;
	//let h2 = height/2;
	//let corner = Point.mk(-w2,-h2);
	//let extent = Point.mk(w2,h2);
	//this.theSpatterRect =  geom.Rectangle.mk(corner,extent);


this.lineEnds = function (dir,wh,pnt) {
	let llnf = this.lineLengthFactor; 
	//let llnf = .4; //linelengthfactor
	let end1 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = end1.minus();
	let lsg = geom.LineSegment.mk(end0.plus(pnt),end1.plus(pnt));
	//let ilsg = this.intersectWithSides(lsg,wh?this.rightRect:this.leftRect,
	//                                   wh?this.rightRectSides:this.leftRectSides);
	if (!this.intersectWithRects) {
		return lsg;
	}
	debugger;
	if (pnt.x < 0) {
	  return this.intersectWithSides(lsg,this.leftRect,this.leftRectSides);
	} else {
	  return this.intersectWithSides(lsg,this.rightRect,this.rightRectSides);
	}
	return ilsg;
	//re
//		line.setEnds(ilsg.end0,ilsg.end1);
//		return line;
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
			this.lineSetEnds(shp,0);
		} else {
			this.lineSetEnds(shp,0.5 * Math.PI);
		}
	}
}

	
const generator = function (shapes,rvs,cell,pnt) {
	
  let container = svg.Element.mk('<g/>');
  shapes.push(container);
  const addLine =  (wh) => {
		let dir = 0.5 *Math.PI * (wh?rvs.direction1:rvs.direction0);
		let ends = this.lineEnds(dir,wh,pnt);
    if (ends) {
		  let line = this.lineP.instantiate();
		  container.set('l'+wh,line);
			line.setEnds(ends.end0,ends.end1);
		  line.show();
		  line.update();
		}
	}
	debugger;	
	addLine(0);
	let circle = this.circleP.instantiate();
	container.set('circle',circle);
	circle.moveto(pnt);
	circle.show();
	//addLine(1);
	return container;
}

	

//this.spatterRect = function (cell) {
//	return this.theSpatterRect;
//}
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

