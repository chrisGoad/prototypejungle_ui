
core.require(function () {
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
  let {numRows,numCols,width,height} = this;
  let xdim = width/numCols;
  let ydim = width/numRows;
  let lx = -0.5*width;
  let ly = -0.5*height;
  return Point.mk(lx + (col+0.5)*xdim,ly + (row+0.5)*ydim);
}

itm.indexAt =  function (i,j) {
  let {numRows} = this;
  let idx = i*numRows + j;
  return idx;
}
/*itm.noLineAt = function (i,j) {
  let {numCols,lines} = this;
  let idx = row*numCols + col;
  lines1[idx] = 'none';
}




itm.noLineAt = function (row,col) {
  let idx = this.indexAt(row,col);
  return this.lines[idx];
}
*/

itm.lineAt = function (lines,i,j) {
  let idx = this.indexAt(i,j);
  return lines[idx];
}


itm.setLineDir = function (line,i,j,dir) {
  let {width,height,numRows,numCols,lineLengthRatio} = this;

  let xdim = width/numCols;
  let ydim = width/numRows;
  let lx = -0.5*width;
  let ly = -0.5*height;
  let center = this.cellCenter(i,j);//Point.mk(lx + (col+0.5)*xsz,ly + (row+0.5)*ysz);
 /* if (Math.random() < 0.2) {
    let circle = this.circleP.instantiate();
    circle.dimension = Math.min(xsz,ysz) * 0.6;
    lines.set(idx,circle);
    circle.moveto(center);
    circle.update();
    circle.show();
    return circle;
  } else {*/
  //let dir = 2 * Math.PI * Math.random();
  let lineLength = Math.min(xdim,ydim) * lineLengthRatio;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
  let end0 = center.difference(vec);
  let end1 = center.plus(vec);
  line.setEnds(end0,end1);
  }
  
itm.addLine = function (lines,lineP,i,j,dir) {
 // let {width,height,numRows,numCols,lineLengthRatio} = this;
  let idx = this.indexAt(i,j);
  if (lines[idx]) {
    return;
  }
  /*let xdim = width/numCols;
  let ydim = width/numRows;
  let lx = -0.5*width;
  let ly = -0.5*height;
  let center = this.cellCenter(i,j);//Point.mk(lx + (col+0.5)*xsz,ly + (row+0.5)*ysz);
  let lineLength = Math.min(xdim,ydim) * lineLengthRatio;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
  let end0 = center.difference(vec);
  let end1 = center.plus(vec);
  */
  let line = lineP.instantiate();
  this.setLineDir(line,i,j,dir);
  //line.setEnds(end0,end1);
  //lines[idx] = line;
  lines.set(idx,line);
 // lines.push(line);
  line.update();
  line.show();
  return line;
}


 itm.addRandomLine = function (lines,lineP,i,j) {
  let idx = this.indexAt(i,j);
  let r;
  if (this.useRandoms) {
    r = this.randoms[idx];
  } else {
    r = Math.random();
    if (this.randoms) {
      this.randoms.set(idx,r); 
    }
  }
  //let r = Math.random();
  let dir = 2 * Math.PI * r;
  //this.randomIndex = idx + 1;
  //let dir = 2 * Math.PI * Math.random();
  this.addLine(lines,lineP,i,j,dir);
 
 }

  
      
itm.addTheLines = function (lines,lineP) {
 // initializer(this);
  let {numRows,numCols,width,height} = this;
  this.xdim = width/numCols;
  this.ydim = width/numRows;
  /*if (lines) {
    return;
  }
  lines = this.set('lines',core.ArrayNode.mk());
  let n = numRows*numCols;

  for (let i=0;i<n;i++) {
    lines.push(null);
  }
  */
  //lines1.length = numRows * numCols;
 // this.randomIndex = 0;
  for (let i=0;i<numRows;i++) {
    for (let j=0;j<numCols;j++) {
      this.addRandomLine(lines,lineP,i,j);
    }
  }
 
}


}
});

      

