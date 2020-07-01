
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
  return function (item) {
/*adjustable parameters  */

item.numRows= 31;
item.numCols= 31;
item.numRows = 11;
item.numCols = 11;
item.deltaX = 5;
item.deltaY = 2;
item.bowRadius = 0;
item.bowYcenter = 50;
item.windowWidth = 3;
item.windowHeight = 7;
item.windowCenterX = 16;
item.windowCenterY = 15;
item.theWindow = core.ObjectNode.mk();
item.theWindow.minx = 3;
item.theWindow.maxx = 6;
item.theWindow.miny = 3;
item.theWindow.maxy = 6;
item.circleCells = core.ObjectNode.mk();
item.circleCells.minx = 2;
item.circleCells.maxx = 7;
item.circleCells.miny = 3;
item.circleCells.maxy = 6;
item.windowMaxX = 7;
item.windowMinY = 7;
item.windowMaxY = 7;




item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.3; 
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'red';
  this.circleP.dimension = item.deltaX*0.3;
  this.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'black';
  this.rectangleP.stroke = 'transparent';
  this.rectangleP.width = item.deltaX*0.5;
  this.rectangleP.height = item.deltaX*0.05;
}  

let partsByRing = [4,3];

item.addLine(p1,p2) {
  let line = this.lineP.instantiate();
  lines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
  line.setEnds(p11,p12);
  line.update();
  line.show();
}
// cellOrientation = 'vertical', 'horizontal', or 'full'
item.addCell = function (cx,cy,deltaX,deltaY,cellOrientation) {
  let p00 = Point.mk(cx,cy);
  let p01 = Point.mk(cx+deltaX,cy);
  let p10 = Point.mk(cx,cy+deltaY);
  let p01 = Point.mk(cx+deltaX,cy+deltaY);
  this.addLine(p00,p01);
  this.addLine(p00,p10);
  if ((orientation === 'vertical') || (orientation === 'full')) {
    this.addLine(p01,p11);
  }
  if ((orientation === 'horizontal') || (orientation === 'full')) {
    this.addLine(p10,p11);
  }
}

item.addRing = function (outerSizeX,outerSizeY,parts) {
  let cellSizeX = outerSizeX/parts;
  let cellSizeY = outerSizeY/parts;
  let cx = outerSizeX/2;
  let cy = outerSizeY/2;
  for (i = 0;i<parts;i++) {
    if (i === (parts-1)) {
      this.addCell(cx,cy,cellSizeX,cellSizeY,'full');
    } else {
      this.addCell(cx,cy,cellSizeX,cellSizeY,'vertical');
    }
  }
      
    let p00 = Point.mk(cx,cy);
    let p01 = Point.mk(cx+cellSizeX,cy);
    let p10 = Point.mk(cx,cy+cellSizeY);
    let p01 = Point.mk(cx+cellSizeX,cy+cellSizey);
    this.addLine(p00,p01);
    this.addLine(p00,p10);
    this.addLine(p01,p11);
    
  }
   
    let line = this.lineP.instantiate();
    lines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p11,p12);
        line.update();
        line.show();
    
  


// i, j are cell coords
item.centerPnt = function (i,j) {
  let pnt00 =  this.pointAt(i,j);
  let pnt11 = this.pointAt(i+1,j+1);
  if (pnt00 && pnt11) {
    let x = (pnt00.x + pnt11.x)/2;
    let y = (pnt00.y + pnt11.y)/2;
    return Point.mk(x,y);
  }
}
// i = row j = column // labeling is row major but actual order is column major // point coords
item.pointAt = function (i,j) {
  let {points,numRows,numCols} = this;
  if ((i<=numRows) && (j<=numCols)) {
    let idx = j*(numRows+1) + i;
    return points[idx];
  }
}

item.shapeAt = function (i,j) {
  let {shapes,numRows,numCols} = this;
  if ((i<=numRows) && (j<=numCols)) {
    let idx = j*(numRows+1) + i;
    return shapes[idx];
  }
}


item.inBox = function (box,i,j,cell) {
  let {minx,maxx,miny,maxy} = box;
  if (cell) {
    return (minx <= j) && (j <= maxx) && (miny <= i) && (i <= maxy);
  } else {
    return (minx < (j+0)) && (j <= maxx) && (miny < (i+0)) && (i <= maxy);
  }
 
  //let wd = (cell)?this.windowCenterX-1:this.windowCenterX;
  //let 
  //return (Math.abs(j-midx) < (this.windowWidth)) && (Math.abs(i-midy) < this.windowHeight);
}
   
item.forEachCellInBox = function (box,fn) {
  let {minx,maxx,miny,maxy} = box;

  for (let j = minx;j<=maxx;j++) {
    for (let i = miny;i<=maxy;i++) {
      fn(this,i,j);
    }
  }
}
    
  
item.genHorizontalLines = function () { 
  let hcontainer = this.hcontainer;
  let points = this.points;
  let circles = this.circles;
  if (hcontainer) {
    return;
  }    
  hcontainer = this.set('hcontainer',svg.Element.mk('<g/>'));
  let hlines = hcontainer.set('hlines',core.ArrayNode.mk()); 

  //circles = this.set('circles',svg.Element.mk('<g/>')); 

  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
 
 
  for (let j = 0;j <= numCols; j++) {
    for (let i = 0;i <=  numRows; i++) {
       if (this.inBox(this.theWindow,i,j)) {
        continue;
      }
  
      let p11 = this.pointAt(i,j);
      let p12 =  this.pointAt(i,j+1);
      let p21 =  this.pointAt(i+1,j);
      let p22 =  this.pointAt(i+1,j+1);
        
      if (p12 && !this.inBox(this.theWindow,i,j+1)) {
        
        let line = this.lineP.instantiate();
        hlines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p11,p12);
        line.update();
        line.show();
      }     
      if (p21 && !this.inBox(this.theWindow,i+1,j)) {
        let line = this.lineP.instantiate();
        hlines.push(line);
        line.setEnds(p11,p21);    
        line.update();
        line.show();
      }
  
      //line.update();
    }
  }
}

let maxGval = 100;
let delta = 40;



item.genShapes0 = function () {
    let {numRows,numCols} = this;
  let shapes = this.set('shapes',core.ArrayNode.mk()); 
  shapes.length = (numRows-1)*(numCols-1);
}

item.genShapes1 = function () { 
   debugger;
  let {shapes,numRows,numCols} = this;
  this.forEachCellInBox(this.circleCells,
    function (grid,i,j) {
      if (grid.inBox(grid.theWindow,i,j,true)) {
        return;
      }
      let cnt = grid.centerPnt(i,j);
      let shp = grid.circleP.instantiate();
      grid.shapes.set(j*(numCols-1) + i,shp);
      shp.moveto(cnt);
      shp.update();
      shp.show();
    });
  return;
  let hcols = (numCols - 1)/2;
  let hrows = (numRows - 1)/2;
  let n = 0;
  let wd = 5;
  let ht = 3;
  let lowx = hcols - wd;
  let highx = hcols + wd+1;
  let lowy = hrows - ht;
  let highy = hrows + ht;
  
  for (let j = lowx ;j <= highx; j++) {
    for (let i = lowy;i <=highy; i++) {
      if (Math.abs(j - hcols) < 3) {
        continue;
      }
      if (this.inBox(i,j)) {
        continue;
      }
      let cnt = this.centerPnt(i,j);
      let shp = this.circleP.instantiate();
      shapes.set(j*(numCols-1) + i,shp);
      shp.moveto(cnt);
      shp.update();
      shp.show();
     
      //line.update();
    }
  }
}


item.genShapes2 = function () { 
  let shapes = this.shapes;
  let {numRows,numCols} = this;
  let n = 0;
  for (let j = 0;j <= numCols-1; j++) {
    for (let i = 0;i <=  numRows-1; i++) {
debugger;
      if (this.inBox(i,j,true)) {
        continue;
      }
      let idx = j*(numCols-1) + i;
      if (shapes[idx]) {
        continue;
      }
      let cnt = this.centerPnt(i,j);
      if (cnt  && (Math.random() > 0.5)) {
        //let shp = (Math.random() > 0.5)?this.rectangleP.instantiate():this.circleP.instantiate();
        let shp = this.rectangleP.instantiate();
        shapes.set(idx,shp);
        shp.moveto(cnt);
        shp.update();
        shp.show();
      }
     
      //line.update();
    }
  }
}

item.randomizeLines = function () {
  let hlines = this.hcontainer.hlines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  //core.forEachTreeProperty(hlines,function (ln) {
  hlines.forEach(function (ln) {
    let rd = delta*Math.random()-0.5*delta;
    let bd = delta*Math.random()-0.5*delta;
    let gd = delta*Math.random()-0.5*delta;
    /*let g = Math.floor(maxGval*Math.random());
    let b = Math.floor(maxGval*Math.random());
    let r = Math.floor(maxGval*Math.random());
    let g = Math.floor(maxGval*Math.random());
    let b = Math.floor(maxGval*Math.random());    
    */
    r = Math.min(Math.max(r + rd,0),maxGval);
    g = Math.min(Math.max(g + gd,0),maxGval);
    b = Math.min(Math.max(b + bd,0),maxGval);
     let clr = `rgb(${Math.round(r)},${Math.round(r)},${Math.round(r/20)})`;

    //console.log('clr',clr,rd,gd,bd);
    ln.stroke = clr;
    ln.update();
    ln.show();
  });
}
  
let pointJiggle = .5;  
item.randomizePoints = function () {
  debugger;
  let {numRows,numCols,points} = this;
  let middle = (numCols+1)/2;
  for (let i = 0;i<numRows;i++) {
     for (let j = 0;j < numCols;j++) {
        let pnt = this.pointAt(i,j);
        pnt.x = pnt.x + Math.random()*pointJiggle -0.5*pointJiggle;
        pnt.y = pnt.y + Math.random()*pointJiggle -0.5*pointJiggle;
     }
  }
}
  
  
item.addSymmetry= function () {
  let {numRows,numCols,points} = this;
  let middle = (numCols+1)/2;
  for (let i = 0;i<numRows;i++) {
     for (let j = 1;j < middle;j++) {
        let pntL = this.pointAt(i,middle-j);
        let pntR = this.pointAt(i,middle+j);
        pntR.x = pntL.x;
        pntR.y = pntL.y;
     }
  }       
}
  
  

  
      
item.initializeGrid = function () {
  this.initializeProtos();
  this.set('lines',core.ArrayNode.mk());
  this.addRing(20,20,10);
  return;
  
  core.tlog('initialize');
  this.genPoints();
    core.tlog('genPoints');

    this.randomizePoints();
      core.tlog('randomizePoints');
  //  this.addSymmetry();

  this.genHorizontalLines();
    core.tlog('genHorizontalLines');

  this.genShapes0();
  this.genShapes1();
  //this.genShapes2();
 
  this.randomizeLines();
    core.tlog('randomizeLines');
debugger;
  this.show();
    core.tlog('show');

}
}
});

      

