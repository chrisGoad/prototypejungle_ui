
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
  return function (item,shape) {
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
item.includeWindow= true;
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
item.visChance = 0.5;
item.includeWindow =false;
item.includeCircles = true;
item.includeShapes = false;
item.ywander = 0;
item.pathLength = 30;
item.requireFullPathLength = true;
item.occupiedCount = 0;
item.pointJiggle = 0;
item.chanceShapeIsVisible = 0.1;




item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.1; 
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

let points = [];

const defaultPositionFunction = function (grid,i,j) {
  let {numRows,numCols,deltaX,deltaY} = grid;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let botx = -0.5 * xdim;
  let boty = 0.5 * ydim; 
  return Point.mk(botx + j*deltaX, boty - i*deltaY);
}

const genPointsFunction0 = function (grid) {
  let {numRows,numCols,positionFunction,points} = grid;
  let pf = positionFunction?positionFunction:defaultPositionFunction;
  for (let j = 0;j <= numCols; j++) {
    for (let i = 0;i <= numRows; i++) {
      let p = pf(grid,i,j);
      points.push(p);
    }
  }
}
      
    


item.genPoints = function () {
  console.log('genPoints');
  let ywander = item.ywander;
  let {points,occupied} = this;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  occupied = this.set('occupied',core.ArrayNode.mk()); 
  regions = this.set('regions',core.ArrayNode.mk()); // assigns to each point its region

  let cy = this.bowYcenter;
  let r =this.bowRadius;
  let {numRows,numCols,deltaX,deltaY,genPointsFunction} = this;
  let gp = genPointsFunction?genPointsFunction:genPointsFunction0;
  gp(this);
  return;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let lx = -0.5 * xdim;
  let topy =  -0.5 * ydim;
  let boty = 0.5 * ydim;
  for (let j = 0;j <= numCols; j++) {
    let x = lx + j * deltaX;
    topy = topy + (Math.random()-0.5) * ywander;
    boty = boty + (Math.random()-0.5) * ywander;
    
    //deltaY = (boty - topy)/numRows;
    let offset = r?cy - Math.sqrt(r*r - x*x):0;
    let y = boty+offset;
    deltaY = (topy - y)/numRows;

    for (let i = 0;i <= numRows; i++) {
       y = y + deltaY;
       points.push(Point.mk(x,y));

      //points[j*numCols + i] = Point.mk(x,y);
    }
  }
}

//points have coords (0 <= i <= numRows,0 <= j <= numCols),  index =  j*(numRows+1) + i;
//cells have coords (0 <= i < numRows,0 <= j < numCols),  index =  j*numRows + i;

item.pcoordToIndex  = function (p) {
  return p.x * (this.numRows+1)+p.y;
}

item.indexToPcoord = function (idx) {
  let nr = this.numRows + 1;
  let x = Math.floor(idx/nr);
  let y = idx % nr;
  return Point.mk(x,y);
}
// i = row j = column // labeling is row major but actual order is column major // point coords
item.pointAt = function (i,j) {
  let {points,numRows,numCols} = this;
  if ((i<=numRows) && (j<=numCols)) {
    let idx = j*(numRows+1) + i;
    return points[idx];
  }
}

item.coordToPoint = function (p) {
  let idx = pcoordIndex(p);
  return this.points[idx];
}


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


item.addLine = function (p1,p2) {
  if (!p2) {
    debugger;
  }
  let hlines = this.hcontainer.hlines;
  let line = this.lineP.instantiate();
  hlines.push(line);
  line.setEnds(p1,p2);    
  line.update();
  line.show();
}
//an rline (region line) is given by the coordinates of its end points
// a region is an ArrayNode of points + an ArrayNode of growth points
//gindx = index in the array of growth points
item.addToRegion = function (region,gidx,np) {
  let occupied = this.occupied;
  let {gpoints} = region;
  let npidx = this.pcoordToIndex(np);
  if (npidx < 0) {
    debugger;
  }
  if (occupied[npidx]) {
    console.log('Occupied!!');
    debugger;
  }
  occupied[npidx] = 1;
  this.occupiedCount++;
  console.log(this.occupiedCount);
  let opnt = this.points[gpoints[gidx]];
  gpoints[gidx] = npidx;
  let npnt = this.points[npidx];
  this.addLine(opnt,npnt);
}

item.pcoordOccupied = function (p) {
  let idx = this.pcoordToIndex(p);
  return this.occupied[idx];
}

item.enlargeRegion = function (region) {
  let {numRows,numCols,occupied} = this;
  let gpoints = region.gpoints;
  let gpidx = gpoints[0];
  let gp = this.indexToPcoord(gpidx);
  let candidates = [];
  let gpx = gp.x;
  let gpy = gp.y
  if (gpx>0) {candidates.push(Point.mk(gpx-1,gpy))};
  if (gpx<numCols-1) {candidates.push(Point.mk(gpx+1,gpy))};
  if (gpy>0) {candidates.push(Point.mk(gpx,gpy-1))};
  if (gpy<numRows-1) {candidates.push(Point.mk(gpx,gpy+1))};
  let unoccupied = candidates.filter((p) => !this.pcoordOccupied(p));
  let ln = unoccupied.length;
  if (ln === 0) {
    return false;
  }
  let choice;
  occupied[gpidx] = 1;
  if (ln === 1) {
    choice = unoccupied[0];
  } else {
    let which = Math.floor((Math.random()-.00001)*ln);
    choice = unoccupied[which];
  }
  this.addToRegion(region,0,choice);
  return true;
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
    
item.setupLineArray  = function () {
  let hcontainer = this.set('hcontainer',svg.Element.mk('<g/>'));
  let hlines = hcontainer.set('hlines',core.ArrayNode.mk()); 
}

item.addAllLines = function () { 
  let hcontainer = this.hcontainer;
  let points = this.points;
  let circles = this.circles;
  if (hcontainer) {
    return;
  }  
  //hcontainer = this.set('hcontainer',svg.Element.mk('<g/>'));
  //let hlines = hcontainer.set('hlines',core.ArrayNode.mk()); 

  //circles = this.set('circles',svg.Element.mk('<g/>')); 

  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
 
 
  for (let j = 0;j <= numCols; j++) {
    for (let i = 0;i <=  numRows; i++) {
       if (this.includeWindow && this.inBox(this.theWindow,i,j)) {
        continue;
      }
  
      let p11 = this.pointAt(i,j);
      let p12 =  this.pointAt(i,j+1);
      let p21 =  this.pointAt(i+1,j);
      let p22 =  this.pointAt(i+1,j+1);
      let shw = Math.random() < this.visChance;
      if (p12 && shw && (!this.includeWindow || !this.inBox(this.theWindow,i,j+1))) {
        
        let line = this.lineP.instantiate();
        hlines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p11,p12);
        line.update();
        line.show();
      }     
      if (p21 && shw && (!this.includeWindow  || !this.inBox(this.theWindow,i+1,j))) {
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
  // debugger;
  let {shapes,numRows,numCols} = this;
  this.forEachCellInBox(this.circleCells,

    function (grid,i,j) {
      if (grid.includeWindow && grid.inBox(grid.theWindow,i,j,true)) {
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
  if (!this.includeShapes) {
    return;
  }
  let shapeP = this.shapeP;
  if (!shapeP) {
    return;
  }
  let shapes = this.shapes;
  let {numRows,numCols} = this;
  let n = 0;
  for (let j = 0;j <= numCols-1; j++) {
    for (let i = 0;i <=  numRows-1; i++) {
      if (this.inBox(this.theWindow,i,j,true)) {
        continue;
      }
      let idx = j*(numCols-1) + i;
      if (shapes[idx]) {
        continue;
      }
      let cnt = this.centerPnt(i,j);
      if (cnt  && (Math.random() < this.chanceShapeIsVisible)) {
        //let shp = (Math.random() > 0.5)?this.rectangleP.instantiate():this.circleP.instantiate();
        let shp = shapeP.instantiate();// this.rectangleP.instantiate();
        shapes.set(idx,shp);
        shp.moveto(cnt);
        shp.update();
        shp.show();
      }
     
      //line.update();
    }
  }
}

item.randomizeLineColors = function () {
  let hlines = this.hcontainer.hlines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  let bias = 100;
  hlines.forEach(function (ln) {
    let rd = delta*Math.random()-0.5*delta;
    let bd = delta*Math.random()-0.5*delta;
    let gd = delta*Math.random()-0.5*delta;
    r =  Math.min(Math.max(r + rd,0),maxGval);
    g =  Math.min(Math.max(g + gd,0),maxGval);
    b = Math.min(Math.max(b + bd,0),maxGval);
     let clr = `rgb(${Math.round(r+bias)},${Math.round(r+bias)},${Math.round(r/20)})`;
    ln.stroke = clr;
    ln.update();
    ln.show();
  });
}
  
item.randomizePoints = function () {
  let {numRows,numCols,points,pointJiggle} = this;
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
  
  
item.addRegion = function () {
  let {occupiedCount,occupied,numRows,numCols} = this;
  debugger;
  let npnts = (numRows+1) * (numCols+1);
  if ((occupiedCount/ npnts)>this.fractionToOccupy){
    console.log('last count = ',occupiedCount, 'out of ',npnts);
    return false;
  }
  let seed = Math.max(0,Math.floor((Math.random()-0.001)*npnts));
  while(this.occupied[seed]) {
    seed = Math.max(0,Math.floor((Math.random()-0.001)*npnts));
  }
  let region = {};
  region.gpoints = [seed];
  for (let ii=0;ii<this.pathLength;ii++) {
    if (!this.enlargeRegion(region)) {
      if (this.requireFullLength) {
        return ii===(this.pathLength - 1);
      } else {
        return ii>0
      }
      break;
    }
  }
  return true;
}
  
      
item.initializeGrid = function () {
 // this.initializeProtos();
  core.tlog('initialize');
  this.genPoints();
    core.tlog('genPoints');

    this.randomizePoints();
      core.tlog('randomizePoints');
  //  this.addSymmetry();
  this.setupLineArray();  
  if (!this.generative) {
    this.addAllLines();
  } else {
  //  debugger;
    while (this.addRegion()) {
    }
    /*let seed = this.pcoordToIndex(Point.mk(3,3));
    let region = {};
    region.gpoints = [seed];
    for (let ii=0;ii<this.pathLength;ii++) {
      if (!this.enlargeRegion(region)) {
        break;
      }
    }*/
  }
  core.tlog('genHorizontalLines');
  this.genShapes0();
  if (this.includeShapes) {
    this.genShapes1();
  }
  
  debugger;
  this.genShapes2();
 
  this.randomizeLineColors();
    core.tlog('randomizeLines');
debugger;
  this.show();
    core.tlog('show');

}
}
});

      

