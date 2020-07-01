
core.require('/line/line.js','/shape/circle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,circlePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
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

rs.positionFunction = function (grid,i,j) {
	 let {deltaX,deltaY,numRows,numCols,width,height} = grid;
  //let xdim = numCols * deltaX;
  //let ydim = numRows * deltaY;
	let hwy = numRows/2;
	let bothalf = j<hwy;
  let botx = -0.5 * width;
  let boty = -0.5 * height;
  return Point.mk((bothalf?0*deltaX:0)+botx + deltaX*i,boty + deltaY*j);
  
}


rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'black';
	this.initializeP();

	let numRows = this.numRows= 39;
	let numCols = this.numCols = 39;
	this.numDrops = 500;
	let width = this.width = 300;
	let height = this.height = 300;
	let deltaX = this.deltaX = this.numCols/this.width;
	let deltaY = this.deltaY = this.numRows/this.height;
	let fc = 5;
	this.pointJiggle = 0;
	this.includeShapes = true;
  this.setupShapeRandomizer('red', {step:80,min:50,max:250,numRows,numCols});
  this.setupShapeRandomizer('green', {step:80,min:50,max:250,numRows,numCols});
  this.setupShapeRandomizer('blue', {step:80,min:50,max:250,numRows,numCols});
	let rnp = {};
	const walkParams = function (i,j) {
		debugger;
		if (i < numCols * 0.333) {
			rnp.step = 0;
			rnp.min = 0;
			rnp.max = 0;
		} else if (i < numCols*0.666) {
			rnp.step = 2;
			rnp.min= 0;
			rnp.max = 5;
		} else {
			rnp.step = 5;
			rnp.min= 0;
			rnp.max = 10;
		}
		return rnp;
	}
	let jogParams = {walkParams,numRows,numCols};
  this.setupShapeRandomizer('jogX', jogParams);
  this.setupShapeRandomizer('jogY', jogParams);
	let numBigCols = 3;
	let numBigRows = 3;
  const bigCellIndex = function (x,y) {
		return x * numBigRows + y;
	}
	let w3 = width/3;
	let h3 = height/3;
	let corner = Point.mk(-w3/2,-h3/2);
	let extent = Point.mk(w3,h3);
	this.theSpatterRect =  geom.Rectangle.mk(corner,extent);
		
  let bigCellPropsArray = 
	  [{orientation:'h',length:.2},{orientation:'hv',length:.3},{orientation:'v',length:.3},
		{orientation:'h',length:.3},{orientation:'hv',length:.3},{orientation:'v',length:.3},
		{orientation:'h',length:.3},{orientation:'hv',length:.3},{orientation:'v',length:.2}];
		
	const bigCellProps = function (x,y) {
		return bigCellPropsArray[bigCellIndex(x,y)];
	}

this.bigCellCoords = function (cell) {
	let {x,y} = cell;

	let bcd = numCols/numBigRows; // BigCellDim
	let bcx = Math.floor(x/bcd);// BigCellX
	let bcy = Math.floor(y/bcd);
	return {x:bcx,y:bcy};
}
this.shapeGenerator = function (shapes,rvs,cell) {
	//debugger;
	let {deltaX,numCols,numRows} = this;
	let bcc = this.bigCellCoords(cell);
	/*let {x,y} = cell;

	let bcd = numCols/numBigRows; // BigCellDim
	let bcx = Math.floor(x/bcd);// BigCellX
	let bcy = Math.floor(y/bcd);*/
	let bcx = bcc.x;
	let bcy = bcc.y;
	let cellProps = bigCellProps(bcx,bcy);
	let cellO = cellProps.orientation;
	let llnf = 0.2; //linelengthfactor
	if (cellProps.length) {
		llnf = 1* cellProps.length;
	}
	console.log('cellx,celly,bcx,bcy,cello',cell.x,cell.y,bcx,bcy,cellO);
	let r = rvs.red;
	let g = rvs.green;
	let b = rvs.blue;
	if ((bcy === 1) && (bcx!==1)) {
		return;
	}
	if (0 && (bcx === 1) && (bcy === 1)) {
		let circle = this.circleP.instantiate();
		shapes.push(circle);
	  circle.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		return circle;
	}
  let jog = Point.mk(rvs.jogX,rvs.jogY);
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir;
	switch (cellO) {
		case 'h':
		  dir = 0;
			
		  break;
	  case 'v':
		  dir = 0.5*Math.PI;
		  break;
		case 'hv':
		  dir = 0.5*Math.PI * Math.floor(Math.random()*2);
			break;
	  case 'hvd':
		  //dir = 0.25*Math.PI * Math.floor(Math.random()*4);
		  dir = 2*Math.PI * Math.random();
	}
		
	let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	
	line0.setEnds(end0.plus(jog),end1.plus(jog));
  line0.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;

	line0.update();
	
	return line0;
	}

this.spatterRect = function (cell) {
	return this.theSpatterRect;
}
this.spatterGeneratorr = function (shapes,rvs,cell) {
	let {deltaX} = this;
	let bcc = this.bigCellCoords(cell);
	/*let {x,y} = cell;

	let bcd = numCols/numBigRows; // BigCellDim
	let bcx = Math.floor(x/bcd);// BigCellX
	let bcy = Math.floor(y/bcd);*/
	let bcx = bcc.x;
	let bcy = bcc.y;
	if (bcy === 1) {
		return;
	}
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
}
return rs;

});

