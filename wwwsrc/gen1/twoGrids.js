
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');
let grid1 = svg.Element.mk('<g/>');
rs.set('grid1',grid1);
let grid2 = svg.Element.mk('<g/>');
rs.set('grid2',grid2);

addGridMethods(grid1);
addGridMethods(grid2);
 // let rs = constructor();
 
const initProtos = function (item) {
	core.assignPrototypes(item,'lineP',linePP);
	item.lineP.stroke = 'rgb(255,255,255)';
	item.lineP['stroke-width'] = 1;
	item.lineP.dimension = 4;
	core.assignPrototypes(item,'boundaryLineP',linePP);
	item.boundaryLineP.stroke = 'rgb(255,255,0)';
	item.boundaryLineP['stroke-width'] = 1;
}  

rs.initProtos = function () {
	initProtos(grid1);
	initProtos(grid2);
}

/*
rs.positionFunction = function (grid,i,j) {
	 let {deltaX,deltaY,numRows,numCols,width,height} = grid;
  //let xdim = numCols * deltaX;
  //let ydim = numRows * deltaY;
	let hwy = numRows/2;
	let bothalf = j<hwy;
  let botx = -0.5 * width;
  let boty = -0.5 * height;
  return Point.mk((bothalf?0*deltaX:0)+botx + deltaX*i,boty + deltaY*j);
  
}*/

// return dir or [dir] ; the latter meaning pattern membership
const computeDir = function () {
	return 2*Math.PI * Math.random();
	
}

grid1.computeDir = computeDir;

const computeDirValues = function (item) {
	let {numCols,numRows} = item;
	let rvl = [];
	for (let i = 0;i<numCols;i++) {
	  for (let j = 0;j<numRows;j++) {
		  rvl.push(computeDir());
		}
	}
	return rvl;
}

grid1.computeDirValues = function () {return computeDirValues(this);}

grid1.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
rs.generateVariant = false;
grid1.initialize = function () {
	debugger;
	core.root.backgroundColor = 'red';
	this.dirValues = this.__parent.dirValues;
	//this.initializeP();
 // this.dirValues = this.computeDirValues();
	let {path} = this;
	this.initializeGrid();
	return;

	
	
	
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
    let jsn = JSON.stringify(
		{dirValues:this.dirValues});
	  core.saveJson(path,jsn,function (err,rs) {
		  debugger;
		});
  }
}

grid2.initialize = function () {
	debugger;
	let {numRows,numCols,lineLength,width} = this;
	this.deltaX = this.width/numCols;
  let diffIndices = this.__parent.diffIndices;
  let showDiffs = this.__parent.showDiffs;
	grid2.moveto(Point.mk(1.2*this.width));

	let shapes = this.set('shapes',core.ArrayNode.mk());
	let shapes1 = this.__parent.grid1.shapes;
	let dirs1 = this.__parent.grid1.dirValues;
	let sln = shapes1.length;
	for (let i=0;i<sln;i++) {
		let line0 = this.lineP.instantiate();
		let line1 = shapes1[i];
		let dir = dirs1[i];
		let pos = line1.getTranslation();
	  shapes.push(line0);
		line0.show();
		let dir2;
		if ((diffIndices.indexOf(i))>-1) {
			dir2 = dir + 0.5*Math.PI;
			if (showDiffs) {
		 	  line0.stroke = 'black';
			}
		} else {
			dir2 = dir;
		}
    this.setLineEnds(line0,lineLength,dir2);
		line0.moveto(pos);
	}
}



const shapeGenerator = function (item,rvs,cell) {
	let idx = cell.index;
  let {shapes,dirValues,lineLength} = item;
	let line0 = item.lineP.instantiate();
	shapes.set(idx,line0);
	let pdir = dirValues[idx];
	let dir,inPattern;
	if (typeof pdir === 'number') {
		dir = pdir;
	} else {
		inPattern = 1;
		dir = pdir[0];
	}
	if (idx === 5) {
		debugger;
	}
  item.setLineEnds(line0,lineLength,dir);
	if (inPattern && item.patternOp) {
		item.patternOp(line0);
	}
	return line0;
}

grid1.shapeGenerator = function (rvs,cell) {return shapeGenerator(this,rvs,cell);}

rs.initialize = function () { 
  grid1.numRows = this.numRows;
  grid1.numCols = this.numCols;
  grid1.width = this.width;
  grid1.height = this.height;
	grid1.lineLength = this.lineLength;
  grid2.numCols = this.numCols;
  grid2.width = this.width;
	grid2.lineLength = this.lineLength;
	//let diffIndices = grid2.diffIndices = [];
	core.root.backgroundColor ='red';
	if (this.loadFromPath) {
		debugger;
	  core.httpGet(this.path, (error,json) => {
			let vls = JSON.parse(json);
			Object.assign(this,vls);
			grid1.dirValues = this.dirValues;
	    grid1.initialize()
	    grid2.initialize();
			//this.initializeGrid();
		});
	} else {
		//this.ranRowCol = this.randomCell(this.randomCellExclude);
    this.dirValues = grid1.computeDirValues();
		//this.initializeGrid();
		let diffIndices = this.diffIndices = [];
		let sln = (this.numRows) * (this.numCols);
	  let cnt = 0;
	  while (cnt < 24) {
		  let ridx = Math.floor(Math.random() * (sln-1));
		  if (diffIndices.indexOf(ridx) < 0) {
			  diffIndices.push(ridx);
			  cnt++;
		  }
	  }
		let dln = diffIndices.length;
	  console.log('dln',dln);
		grid1.initialize()
	  grid2.initialize();
    let jsn = JSON.stringify(
		{dirValues:this.dirValues,diffIndices:diffIndices});
	  core.saveJson(this.path,jsn,function (err,rs) {
		  debugger;
		});
	}
}

	 
	


return rs;
}
});

