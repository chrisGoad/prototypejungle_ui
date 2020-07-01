
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

rs.positionFunctionnn = function (grid,i,j) {
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

	//let numRows = this.numRows= 40;
	let numRows = this.numRows= 40;
	let numCols = this.numCols = 80;
	this.numDrops = 5000;
	let width = this.width = 600;
	let height = this.height = 300;
	let deltaX = this.deltaX = this.width/this.numCols;
	let deltaY = this.deltaY = this.height/this.numRows;
	let rnp = {correlated:false};
	const walkParams = function (i,j) {
		let mpf = 0.6;
		var mp = mpf * numCols;
		//let fri = i/numCols*2; // goes from 0 to 1 in first half
		//let sfri = (i - mp)/numCols  * 2; // goes from 0 to 1 in second half
		let fri = i/(numCols*mpf); // goes from 0 to 1 in first half
	  let sfri = (i - mp)/(numCols * (1 - mpf)); // goes from 0 to 1 in second half
		rnp.stepx = 0.2;
		rnp.stepy = 0.2;
		if (i < mp) {
			rnp.max=fri;
			rnp.min=0;//0.5*fri;
			rnp.min = 0;rnp.max = 0.7;
			rnp.min = 0;rnp.max = 0.8;
		} else  {
			rnp.min = 0.5*sfri;
      rnp.max = 1;
      rnp.min = 0.3;rnp.max = 1;			
      rnp.min = 0.2;rnp.max = 1;			
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
	this.theSpatterRect =  geom.Rectangle.mk(corner,extent);
		
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

this.spatterGenerator = function (shapes,rvs,cell) {
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
}
return rs;

});

