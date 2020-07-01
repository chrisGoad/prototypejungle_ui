
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
rs.computeDir = function (line,cell) {
	let {x,y} = cell;
	let dir;
	if ((x%1 === 0) && (x === y)) {
		dir = 0.25* Math.PI;
		line.stroke = 'rgba(100,100,255,1)';
	} else if  (x + y === (this.numRows-1)) {
		dir = 0.75*Math.PI;
		line.stroke = 'rgba(100,100,255,1)';
	} else {
	  dir = 2*Math.PI * Math.random();
	}
	return dir;
}
/*rs.setLineEnds = function (line,ilength,dir) {
  if (!line) {
    debugger;
  }
  let deltaX = this.deltaX;
  let length = ilength * deltaX;
  let end1 = Point.mk(Math.cos(dir),Math.sin(dir)).times(length/2);
	let end0 = end1.minus();
	line.setEnds(end0,end1);
	line.update();
  line.show();
}
	*/
rs.shapeGenerator = function (rvs,cell,cnt) {
	//debugger;
  //console.log('this = grid',this === grid);
	let idx = cell.index;
  let {shapes,shapeDescriptors,numCols,numRows,deltaX,symetrical,lineLength} = this;
	let hw = numCols/2;
	let onLeft = cell.x<hw;
	//let onTop = cell.y<hw;
  if (symetrical && !onLeft) {
     return;
  }
	let line0 = this.lineP.instantiate();
	shapes.set(idx,line0);
	//shapes.push(line0);
	let dir = this.computeDir(line0,cell);
  let descriptor = {'direction':dir,stroke:line0.stroke};
  shapeDescriptors.set(idx,descriptor);
	let llnf = this.lineLength;
	/*if ((x%1 === 0) && (x === y)  && includeCross) {
		dir = (alongCross)?0.25* Math.PI:.75* Math.PI;
		line0.stroke = 'rgba(100,100,255,1)';
	} else if  ((x%1 === 0) && (x + y === (this.numRows-1)) && includeCross){
		dir = (alongCross)?0.75*Math.PI:0.25*Math.PI;
		line0.stroke = 'rgba(100,100,255,1)';
	   //line0.stroke = 'rgba(200,50,50,1)';
	} else if (onTop) {
		dir = (Math.random() < 0.001?(0.25*Math.PI):0) + 0.5*Math.PI * Math.floor(Math.random()*4);
	} else if (onLeft) {
	  dir = 0.25*Math.PI * Math.floor(Math.random()*4);
	} else {
	  dir = 2*Math.PI * Math.random();
	}*/
  this.setLineEnds(line0,lineLength,dir);
	/*let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(llnf*deltaX);
	let end0 = vec0.minus();
	let end1 = vec0;
	line0.setEnds(end0,end1);
	line0.update();*/
	
	return line0;
}

rs.genSymmetry = function () {
  let {shapes,shapeDescriptors,numCols,numRows,deltaX,lineLength} = this;
  let hc = numCols/2;
  let llnf = this.lineLength;
  debugger;
  for (let i=0;i<hc;i++) {
    for (let j=0;j < numRows;j++) { 
      let idx = numRows*i +j;
      let destidx = numRows*(numCols-i-1) +j;
      let sd = shapeDescriptors[idx];
      let dir = Math.PI - sd.direction;
      let ssd = {direction:dir};
      shapeDescriptors[destidx] = ssd;
      let line0 = this.lineP.instantiate();
      line0.stroke= sd.stroke;
	    shapes.set(destidx,line0);
      this.setLineEnds(line0,lineLength,dir);
      let cnt = this.centerPnt(numCols - i - 1,j);
      line0.moveto(cnt);
    }
  }
}

rs.genVariant = function () {
  let {numCols,numRows,lineLength,generateVariant,shapeDescriptors} = this;
  debugger;
  if (!generateVariant) {
     return;
  }
  let itm = svg.Element.mk('<g/>');
  core.root.set('next',itm);
  itm.moveto(Point.mk(1.2*this.width,0));
  let shapes = itm.set('shapes',core.ArrayNode.mk());
   
  for (let i = 0;i<numCols;i++) {
   for (let j = 0;j<numRows;j++) {
      let p0 = Math.floor(numCols/3);
      let p1 = numCols - p0;
      let idx = numRows*i +j;
      let lineD = shapeDescriptors[idx];
     // console.log('dir',dir);
      let cnt = this.centerPnt(i,j);
      let line = this.lineP.instantiate();
      shapes.push(line);
      this.adjustNewLine(line,lineD,i,j);
      //if ((i<p0) || (p1 <i)) {
      //   dir = 2*Math.PI * Math.random();
//
    //  }
      //dir = 0;
     // dir = 2*Math.PI * Math.random();
      
      line.moveto(cnt);
    }
  }
}
rs.lastGridStep = function () {
  if (this.symmetrical) {
    this.genSymmetry();
  }
  this.genVariant();
}

 


rs.boundaryLineGeneratorr = function (lines,end0,end1,rvs,cell) {
	debugger;
	let line = this.boundaryLineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	line.update();
	line.show();
}
	

	 
	


return rs;
}
});

