
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.numRings= 21;
item.numSpokes = 21;
item.innerRadius = 20;
item.outerRadius = 50; 



item.initializePrototype = function () {
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
  let {points,numRings,numSpokes,innerRadius,outerRadius} = this;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
 
  let angleStep = (Math.PI * 2)/numSpokes;
  let radiusStep = (outerRadius - innerRadius)/numRings;
  let angle = 0;
  for (let j = 0;j <= numSpokes; j++) {
    let radius = innerRadius;
    for (let i = 0;i <= numRings; i++) {
      let pnt = Point.mk(Math.cos(angle),Math.sin(angle)).times(radius);
       points.push(pnt);
       radius += radiusStep;
    }
    angle += angleStep;
  }
}

item.pointAt = function (ring,spoke) {
  let {points,numRings,numSpokes} = this;
  if ((ring<=numRings) && (spoke<=numSpokes)) {
    let idx = ring*(numRings+1) + spoke;
    return points[idx];
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


item.shapeAt = function (i,j) {
  let {shapes,numRows,numCols} = this;
  if ((i<=numRows) && (j<=numCols)) {
    let idx = j*(numRows+1) + i;
    return shapes[idx];
  }
}


  
item.genLines = function () { 
  let hlines = this.hlines;
  let points = this.points;
  if (hlines) {
    return;
  }    
  hlines = this.set('hlines',core.ArrayNode.mk()); 

  //circles = this.set('circles',svg.Element.mk('<g/>')); 

  let {numRings,numSpokes} = this;
 
  for (let j = 0;j <= numSpokes; j++) {
    for (let i = 0;i <=  numRings; i++) {

      let p11 = this.pointAt(i,j);
      let p12 =  this.pointAt(i,j+1);
      let p21 =  this.pointAt(i+1,j);
      let p22 =  this.pointAt(i+1,j+1);
        
      if (p12) {
        let line = this.lineP.instantiate();
        hlines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p11,p12);
        line.update();
        line.show();
      }
      if (p21) {
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

let maxGval = 150;
let delta = 40;
/*item.randomizeLines = function () {
  let hlines = this.hlines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  core.forEachTreeProperty(hlines,function (ln) {
    let rd = delta*Math.random()-0.5*delta;
    let bd = delta*Math.random()-0.5*delta;
    let gd = delta*Math.random()-0.5*delta;
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
*/

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
  let highx = hcols + wd;
  let lowy = hrows - ht;
  let highy = hrows + ht;
  
  for (let j = lowx ;j <= highx; j++) {
    for (let i = lowy;i <=highy; i++) {
      if (Math.abs(j - hcols) < 3) {
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
  let hlines = this.hlines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  core.forEachTreeProperty(hlines,function (ln) {
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
  
let pointJiggle = 1;  
item.randomizePoints = function () {
  let {numRings,numSpokes,points} = this;
  for (let i = 0;i<=numRings;i++) {
     for (let j = 0;j <= numSpokes;j++) {
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
  
  

  
      
item.initialize = function () {
  core.tlog('initialize');
  debugger;
  this.genPoints();
    core.tlog('genPoints');

    this.randomizePoints();
      core.tlog('randomizePoints');
  //  this.addSymmetry();

  this.genLines();
    core.tlog('genHorizontalLines');
/*
  this.genShapes0();
  this.genShapes1();
  this.genShapes2();
 */
  this.randomizeLines();
    core.tlog('randomizeLines');
debugger;
  this.show();
    core.tlog('show');

}
return item;
});

      

