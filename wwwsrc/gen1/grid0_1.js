
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/shape/rectangle.js','/gen0/grid0.js',
function (linePP,rectPP,addGridMethods) {
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
 // let rs = constructor();

let nR = 10;
let aR = 1;
let topParams = {saveImage:1,saveJson:1,loadFromPath:0,numRows:nR,numCols:aR*nR,width:300,height:300,pointJiggle:3,
} ;

Object.assign(rs,topParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
	if (this.finishProtos) {
		finishProtos();
	}
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
  
}
*/
rs.shapeAt = function (x,y) {
	let {numRows,shapes} = this;
	let idx = x*numRows + y;
	return shapes[idx];
}
/*
rs.posFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}


rs.computeRanges = function (times) {
	let ctime = 0;
	let ranges  = [];
	const addToRanges = function (tm) {
		ranges.push(ctime);
		ctime += tm;
	}
	times.forEach(addToRanges);
	this.timeRanges = ranges;
	this.numTimeSteps = ctime;
	return ranges;
}
rs.whatTimeRange = function () {
	let {timeRanges,timeStep} = this;
	let ln = timeRanges.length;
	for (let i=0;i<ln-1;i++) {
		if ((timeStep >= timeRanges[i]) && (timeStep < timeRanges[i+1])) {
			return i;
		}
	}
	return 'done';
}
*/

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

rs.computeValuesToSave = function () {
	let vl = this.computeDirValues();
	let vls = [[['dirValues'],vl]];
	this.dirValues = vl;
	return vls;
}
	

rs.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
rs.generateVariant = false;
/*
rs.innerInitialize = function (cb) {
	debugger;
	//core.root.backgroundColor = 'red';
	//this.initializeP();
 // this.dirValues = this.computeDirValues();
	let {path} = this;
	
	
	
	//this.dirValues = [];
	if (this.loadFromPath) {
		debugger;
	  core.httpGet(path, (error,json) => {
			let vls = JSON.parse(json);
			Object.assign(this,vls);
			this.initializeGrid();
			if (cb) {
				cb();
			}
			debugger;
		});
	} else {
		//this.ranRowCol = this.randomCell(this.randomCellExclude);
    this.dirValues = this.computeDirValues();
		this.initializeGrid();
		if (this.saveJson) {
      let jsn = JSON.stringify({dirValues:this.dirValues});
			if (this.saveJson) {
	      core.saveJson(path,jsn,function (err,rs) {
					if (cb) {
						cb();
					}
		      debugger;
		    });
			}
		}
  }
}
*/
rs.shapeGenerator = function (rvs,cell,cnt) {
	let idx = cell.index;
  let {shapes,dirValues,lineLength} = this;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
  //line0.show();
	//shapes.set(idx,line0);
	let pdir = dirValues?dirValues[idx]:this.computeDirValues();
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


rs.showInCircle = function (circle) {
	let {numRows,numCols} = this;
	let {center,radius} = circle;
	for (let i=0;i<numCols;i++) {
		for (let j=0;j<numRows;j++) {
			let shape = this.shapeAt(i,j);
			let pos = this.posFunction(i,j);
			let dist = pos.distance(center);
			if (dist <= radius) {
				shape.stroke = 'white';
			} else {
				shape.stroke = 'rgba(255,255,255,0.14)';
			}
			shape.draw();
		}
	}
}
	




rs.innerInitialize = function () {
	debugger;
	this.initProtos();
//	this.computeValuesToSave();
	/*if (this.backgroundColor) {
		let bkr;
		if (this.outerRadius) {
			
			bkr = this.set('backGround',this.circleP.instantiate());
			bkr.show();
			bkr.dimension = 2*this.outerRadius;
    } else {
			
			bkr = this.set('rect',this.rectP.instantiate());
			bkr.width = this.width;
			bkr.height = this.height;
		}
		bkr.show();
		bkr.fill = this.backgroundColor;
		bkr['stroke-width'] = 0;
	}*/
	if (this.saveJson  || this.loadFromPath) {
		this.outerInitialize();
	} else {
	  this.initializeGrid();
	}
}



rs.initialize = rs.innerInitialize;	 
	


return rs;
});

