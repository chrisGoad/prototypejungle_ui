
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/gen0/grid0.js',
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
/*
rs.computeRandomRowCol = function () {
	let excl = this.randomRowColExclude;
	let {numRows,numCols} = this;
  if (this.randomColumn === undefined) {
    this.randomColumn = excl + Math.floor(Math.random() * (numCols-2*excl));
    this.randomRow = excl + Math.floor(Math.random() * (numRows-2*excl));
    alert ('ranrow '+this.randomRow+' rancol '+this.randomColumn);
  }
}
*/
// return dir or [dir] ; the latter meaning pattern membership
rs.computeDir = function (x,y) {
	return 2*Math.PI * Math.random();
	
}
rs.computeDirValues = function () {
	let {numCols,numRows} = this;
	let rvl = [];
	for (let i = 0;i<numCols;i++) {
	  for (let j = 0;j<numRows;j++) {
		  rvl.push(this.computeDir(i,j));
		}
	}
	return rvl;
}

rs.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
rs.generateVariant = false;
rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'red';
	//this.initializeP();
 // this.dirValues = this.computeDirValues();
	let {path} = this;
	
	
	
	this.dirValues = [];
	if (this.loadFromPath) {
		debugger;
	  core.httpGet(path, (error,json) => {
			let vls = JSON.parse(json);
			Object.assign(this,vls);
			this.initializeGrid();
		});
	} else {
		//this.ranRowCol = this.randomCell(this.randomCellExclude);
    this.dirValues = this.computeDirValues();
		this.initializeGrid();
		if (this.saveJson) {
      let jsn = JSON.stringify({dirValues:this.dirValues});
			if (this.saveJson) {
	      core.saveJson(path,jsn,function (err,rs) {
		      debugger;
		    });
			}
		}
  }
}

rs.shapeGenerator = function (rvs,cell,cnt) {
	let idx = cell.index;
  let {shapes,dirValues,lineLength} = this;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	//shapes.set(idx,line0);
	let pdir = dirValues[idx];
	let dir,inPattern;
	if (typeof pdir === 'number') {
		dir = pdir;
	} else {
		inPattern = 1;
		dir = pdir[0];
	}
  this.setLineEnds(line0,lineLength,dir);
	if (inPattern && this.patternOp) {
		this.patternOp(line0);
	}
	return line0;
}



 
	 
	


return rs;
}
});

