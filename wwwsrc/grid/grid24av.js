
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/grid/addGrid8.js',
function (linePP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
 // let rs = constructor();
  
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
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

rs.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
rs.generateVariant = false;
rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'red';
	//this.initializeP();
  this.pattern = [];
	let {numRows,numCols,width,height} = this;
	let deltaX = this.deltaX = this.width/this.numCols;
	let deltaY = this.deltaY = this.height/this.numRows;
	//let fc = 5;
//	this.pointJiggle = 0;
	//this.includeShapes = true;
 // this.setupBoundaryRandomizer('red', {step:80,min:50,max:250,numRows,numCols});
	//this.initializeConstructor();
	this.initializeGrid();

}

rs.computeRandomRowCol = function () {
	sz = 4;
	let {numRows,numCols} = this;
  if (this.randomColumn === undefined) {
    this.randomColumn = 10;//sz + Math.floor(Math.random() * (numCols-2*sz));
    this.randomRow = 15;//sz + Math.floor(Math.random() * (numRows-2*sz));
    alert ('ranrow '+this.randomRow+' rancol '+this.randomColumn);
  }
}
rs.computeDir = function (line,cell) {
	debugger;
	let {x,y} = cell;
	let dir;
	this.computeRandomRowCol();
	let {randomRow,randomColumn} = this;
	if ((x - randomColumn) === (y-randomRow)) {
		dir = 0.75* Math.PI;
		//line.stroke = 'cyan';
		this.pattern.push(line);
	} else if  ((x + y) === (randomRow + randomColumn)) {
		dir = 0.25*Math.PI;
		//line.stroke = 'cyan';
	  this.pattern.push(line);

	} else {
	  dir = 2*Math.PI * Math.random();
	}
	return dir;
}

	
rs.shapeGenerator = function (rvs,cell,cnt) {
	//debugger;
  //console.log('this = grid',this === grid);
	let lineLength = this.lineLength;
	let idx = cell.index;
	let line0 = this.lineP.instantiate();
	this.shapes.set(idx,line0);
	let dir = this.computeDir(line0,cell);
	let llnf = this.lineLength;
  this.setLineEnds(line0,lineLength,dir);
	return line0;
}



	 
	


return rs;
}
});

