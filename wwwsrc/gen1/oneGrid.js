
//core.require('/line/line.js','/shape/rectangle.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/shape/rectangle.js','/gen0/grid0.js',
function (linePP,rectPP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');


addGridMethods(rs);
 // let rs = constructor();
 
rs.initProtos = function () {
	let {width,height} = this;
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgb(255,255,255)';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	this.rectP.width= 2*width;
	this.rectP.height =2*height;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
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
rs.computeDir = function () {
	return 2*Math.PI * Math.random();
	
}


rs.computeDirValues = function () {
	let {numCols,numRows} = this;
	let rvl = [];
	for (let i = 0;i<numCols;i++) {
	  for (let j = 0;j<numRows;j++) {
		  rvl.push(this.computeDir());
		}
	}
	return rvl;
}


rs.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
rs.generateVariant = false;
rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'black';
	this.dirValues = this.computeDirValues();
	/*
	let diffIndices = this.__parent.diffIndices;
  let showDiffs = this.__parent.showDiffs;*/
	let {path} = this;
	this.initializeGrid();
}


rs.shapeGenerator = function (rvs,cell) {
	let idx = cell.index;
  let {shapes,dirValues,lineLength} = this;
	let line0 = this.lineP.instantiate();
	let rect = this.rectP.instantiate();
	rect.show();
	this.set('rect',rect);
	//shapes.set(idx,line0);
	shapes.push(line0);
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
  this.setLineEnds(line0,lineLength,dir);
	if (inPattern && this.patternOp) {
		this.patternOp(line0);
	}
	return line0;
}

/*
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
		debugger;
	  core.saveJson(this.path,jsn,function (err,rs) {
		  debugger;
		});
	}
}
*/

/*
rs.setName = function (name,jsonName) {
	debugger;
	this.name = name;
	core.vars.whereToSave = `images/${name}.jpg`;
	let theName = jsonName?jsonName:name;
	this.path = `json/${theName}.json`;
}	 
*/
	


return rs;
}
});

