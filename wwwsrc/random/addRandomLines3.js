
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
 return function (itm) {
//let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

itm.numRows= 25;
itm.numCols= 25
itm.numRows= 20;
itm.numCols= 20;
itm.xdim = 100;
itm.ydim = 100;
itm.numLines = 1000;
itm.minDist = 1;
itm.lineLengthRatio = .9;




itm.cellCenter = function (row,col) {
  let {xdim,ydim,numRows,numCols,lineLengthRatio,lines} = this;
  let lx = -0.5*xdim;
  let ly = -0.5*ydim;
  let xsz = xdim/numCols;
  let ysz = ydim/numRows;
  return Point.mk(lx + (col+0.5)*xsz,ly + (row+0.5)*ysz);
}

itm.noLineAt = function (row,col) {
  let {numCols,lines1} = this;
  let idx = row*numCols + col;
  lines1[idx] = 'none';
}


itm.lineAt = function (row,col) {
  let {numCols,lines1} = this;
  let idx = row*numCols + col;
  return lines1[idx];
}

  
itm.genLine = function (lines,row,col,dir) {
  let {xdim,ydim,numRows,numCols,lineLengthRatio} = this;
  let idx = row*numCols + col;
  if (lines[idx]) {
    return;
  }
  let lx = -0.5*xdim;
  let ly = -0.5*ydim;
  let xsz = xdim/numCols;
  let ysz = ydim/numRows;
  let center = this.cellCenter(row,col);//Point.mk(lx + (col+0.5)*xsz,ly + (row+0.5)*ysz);
  if (Math.random() < 0.2) {
    let circle = this.circleP.instantiate();
    circle.dimension = Math.min(xsz,ysz) * 0.6;
    lines.set(idx,circle);
    circle.moveto(center);
    circle.update();
    circle.show();
    return circle;
  } else {
  //let dir = 2 * Math.PI * Math.random();
    let lineLength = Math.min(xsz,ysz) * lineLengthRatio;
    let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
    let end0 = center.difference(vec);
    let end1 = center.plus(vec);
    let line = this.lineP.instantiate();
    line.setEnds(end0,end1);
    lines.set(idx,line);
   // lines.push(line);
    line.update();
    line.show();
    return line;
  }
}


 itm.genRandomLine = function (lines,row,col) {
  let idx = this.randomIndex;
  let r = (this.randoms)?this.randoms[idx]:Math.random();
  let dir = 2 * Math.PI * r;
  this.randomIndex = idx + 1;
  //let dir = 2 * Math.PI * Math.random();
  this.genLine(lines,row,col,dir);
 
 }

  
      
itm.addTheLines = function () {
 // initializer(this);
  let {lines1,olines2,numRows,numCols} = this;
  let lines2;
  if (olines2) {
    lines2 = olines2.lines2;
  }
    
  /*if (lines) {
    return;
  }
  lines = this.set('lines',core.ArrayNode.mk());
  let n = numRows*numCols;

  for (let i=0;i<n;i++) {
    lines.push(null);
  }
  */
  lines1.length = numRows * numCols;
  this.randomIndex = 0;
  for (let i=0;i<numRows;i++) {
    for (let j=0;j<numCols;j++) {
      this.genRandomLine(lines1,i,j);
    }
  }
  this.randomIndex = 0;
 
  if (lines2) {
    for (let i=0;i<numRows;i++) {
      for (let j=0;j<numCols;j++) {
        this.genRandomLine(lines2,i,j);
      }
    }
  }	
}


}
});

      

