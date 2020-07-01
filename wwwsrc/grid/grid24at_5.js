
core.require('/grid/grid24at.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.initProtos();
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
		rs.pointJiggle = 0;
  rs.lineLength = 0.7;
  rs.symmetrical = false;
  rs.generateVariant = true;
  //rs.set('adjustedLines', core.ArrayNode.mk())
  rs.pattern = []; 
 // rs.adjustedLines1 = []; 
	rs.computeDir = function (line,cell) {
	let {x,y} = cell;
	let dir;
	if (randomRow === undefined) {
		randomRow = Math.floor(Math.random()*this.numRows);
	}
	console.log('rr',randomRow);
	//if ((y === randomRow) && (5<x) && (x<15) && (Math.random() < 5)  && (x%2 === 0)) {
	if ((y === randomRow)  && (x%4 === 0)) {
		dir = 0 * Math.PI;
	} else {
	  dir = 2*Math.PI * Math.random();
	}
	return dir;
}

rs.adjustNewLine = function (newLine,lineD,i,j) {
  let {numCols,numRows,lineLength,shapeDescriptors,pattern} = this;
  debugger;
  let sz = 4;

  let rancol = this.randomColumn;
  if (rancol === undefined) {
     rancol = this.randomColumn = sz + Math.floor(Math.random() * (numCols-2*sz));
    rancol = this.randomColumn = 16;
  }
 let ranrow = this.randomRow;
  if (ranrow === undefined) {
     ranrow = this.randomRow = sz + Math.floor(Math.random() * (numRows-2*sz));
    ranrow = this.randomRow = 12;
    alert ('ranrow '+ranrow+' rancol '+rancol);
  }
  let hwh = Math.floor(numCols/2);
  let hwv = Math.floor(numRows/2);
  let dir;
  let highRow = ranrow+sz;
  let highCol = rancol+sz;
  let lowRow = ranrow-sz;
  let lowCol = rancol-sz;
  let inRange = (lowRow < j) && (j < highRow) && (lowCol<i) && (i<highCol);
 // if (inRange && ((j-ranrow) === (i-rancol))) {
  let visible = 0;
  let colored = 0;
  if ((pattern.length < 12)&& (i > 1)&& (j< (numRows-1)) && (((i - ranrow) === (j - rancol)) || ((i+j) === (ranrow + rancol)))) {
//  if ((i === rancol) && ((hwv-4) < j) && (j < (hwv+4))) {
    dir = lineD.direction + 0.5*Math.PI;
   // dir = visible?0.25*Math.PI:0.75*Math.PI;
  //  dir = 0.75*Math.PI;
    if (colored) {
      newLine.stroke = 'blue';
    }
    debugger;
    pattern.push(newLine);
  } else  if (0 && ((i+j) === (ranrow + rancol))) {
    dir = lineD.direction + 0.5*Math.PI;
   // dir = visible?0.75*Math.PI:0.25*Math.PI;
    if (colored) {
      newLine.stroke = 'blue';
    }
    adjustedLines1.push(newLine);
  } else {
    dir = lineD.direction;
  }
  this.setLineEnds(newLine,lineLength,dir);
}

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
  
/*	rs.step0 = 0.05;
	rs.min0 = 0;
	rs.max0 = 0.4;
	//rs.maxLeft = 0.8;
 rs.min1 = -0.4;//0.9;
	rs.max1 = 0;	
	rs.step1 = 0.05;
	rs.spatter = 0;
	rs.changePoint =  0.5;
	rs.lineLengthFactor = 4;
	rs.numDrops = 100;*/
  return rs;
});

