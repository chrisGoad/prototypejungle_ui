
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

let points = [];

item.genPoints = function () {
  let ywander = 0;
  let points = this.points;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  let cy = this.bowYcenter;
  let r =this.bowRadius;
  let {numRows,numCols,deltaX,deltaY} = this;
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

item.centerPnt = function (i,j) {
  let pnt00 =  this.pointAt(i,j);
  let pnt11 = this.pointAt(i+1,j+1);
  if (pnt00 && pnt11) {
    let x = (pnt00.x + pnt11.x)/2;
    let y = (pnt00.y + pnt11.y)/2;
    return Point.mk(x,y);
  }
}
// i = row j = column // labeling is row major but actual order is column major
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


item.inWindow = function (i,j,cell) {
  let midx = (cell)?this.windowCenterX-0.5:this.windowCenterX;
   let midy = (cell)?this.windowCenterY-0.5:this.windowCenterY;
 
  //let wd = (cell)?this.windowCenterX-1:this.windowCenterX;
  //let 
  return (Math.abs(j-midx) < (this.windowWidth)) && (Math.abs(i-midy) < this.windowHeight);
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
       if (this.inWindow(i,j)) {
        continue;
      }
  
      let p11 = this.pointAt(i,j);
      let p12 =  this.pointAt(i,j+1);
      let p21 =  this.pointAt(i+1,j);
      let p22 =  this.pointAt(i+1,j+1);
        
      if (p12 && !this.inWindow(i,j+1)) {
        
        let line = this.lineP.instantiate();
        hlines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p11,p12);
        line.update();
        line.show();
      }     
      if (p21 && !this.inWindow(i+1,j)) {
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
  let {shapes,numRows,numCols} = this;
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
      if (this.inWindow(i,j)) {
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
      if (this.inWindow(i,j,true)) {
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
     for (let j = 0;j < middle;j++) {
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
  this.genShapes2();
 
  this.randomizeLines();
    core.tlog('randomizeLines');
debugger;
  this.show();
    core.tlog('show');

}
}
});

      

