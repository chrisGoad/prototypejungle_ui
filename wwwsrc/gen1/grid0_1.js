
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

rs.shapeAt = function (x,y) {
	let {numRows,shapes} = this;
	let idx = x*numRows + y;
	return shapes[idx];
}


// return dir or [dir] ; the latter meaning pattern membership

rs.computeDir = function (x,y) {
	let {numRows:nr} = this;
	let hnr = nr/2;
	let qpi = 0.25*Math.PI;
	if ((x - y) === hnr) { // diagonally down
		return [-qpi];
	}
	if ((x - y) === -hnr) { // diagonally down
		return [-qpi];
	}
	if ((x + y) === hnr) { // diagonally up
		return [qpi];
	}
	if ((x + y) === nr+hnr) { // diagonally up
		return [qpi];
	}
	return 2*Math.PI * Math.random();
	
}
/*
rs.computeDir = function (x,y) {
	return 2*Math.PI * Math.random();
	
}
*/
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

rs.shapeAdjustor = function (line,dir,color) {
	let {lineLength} = this;
	this.setLineEnds(line,lineLength,dir);
  line.stroke = color;
	//line.update();
	line.draw();
}

rs.shapeGenerator = function (rvs,cell,cnt) {
	let idx = cell.index;
	let {x,y} = cell;
  let {shapes,dirValues,lineLength} = this;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
  //line0.show();
	//shapes.set(idx,line0);
//	let pdir = dirValues?dirValues[idx]:this.computeDirValues();
	let pdir = dirValues?dirValues[idx]:this.computeDirValue(x,y);
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
	




rs.innerInitialize = function (cb) {
	debugger;
	this.initProtos();
	if (this.saveJson  || this.loadFromPath) {
		this.outerInitialize(cb);
	} else {
	  this.initializeGrid();
	}
}



rs.initialize = rs.innerInitialize;	 
	


return rs;
});

