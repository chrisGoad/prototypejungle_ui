
core.require('/line/line.js','/shape/circle.js',function (linePP,circlePP) {
debugger;
let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.xdim = 20;
item.ydim = 20;
item.numPoints = 100;
item.minDist = 1;

item.genRandomPoint = function () {
  let {xdim,ydim} = this;
  let rx = Math.random() * xdim - 0.5*xdim;
  let ry = Math.random() * ydim - 0.5*ydim;
  return Point.mk(rx,ry);
}

item.genRandomPoints = function () {
  let {points,numPoints,minDist} = this;
  let lines = this.lines;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  this.set('lineSegments',core.ArrayNode.mk()); 
  //this.set('lines',core.ArrayNode.mk()); 
  this.set('unconnectable',core.ArrayNode.mk(numPoints*numPoints)); 
  points.push(this.genRandomPoint());
  while (true) {
    let pnt = this.genRandomPoint();
    let d = this.findMinDist(pnt);
    if (d > minDist) {
      points.push(pnt);
      if (points.length === numPoints) {
        return;
      }
    }
  }
}


const approxEqual = function (p1,p2) {
  return (Math.abs(p1.x - p2.x) < .001) && (Math.abs(p1.y - p2.y) < .001);
}

const lineSegmentsApproxEqual = function (l0,l1) {
  let e00 = l0.end0;
  let e01 = l0.end1;
  let e10 = l1.end0;
  let e11 = l1.end1;
  return (approxEqual(e00,e10) && approxEqual(e01,e11)) || (approxEqual(e00,e11) && approxEqual(e01,e10))
}


const lineSegmentsJoin = function (l0,l1) {
  let e00 = l0.end0;
  let e01 = l0.end1;
  let e10 = l1.end0;
  let e11 = l1.end1;
  return approxEqual(e00,e10) || approxEqual(e01,e11) || approxEqual(e00,e11) || approxEqual(e01,e10);
}

item.connectable = function (i,j) {
  let {points,lineSegments} = this;
  let pi = points[i];
  let pj = points[j];
  let lsg = geom.LineSegment.mk(pi,pj);
  let linesegs = this.lineSegments;
  let n = linesegs.length;
  for (let k = 0;k<n;k++) {
    let lk = linesegs[k];
    if (lineSegmentsApproxEqual(lsg,lk) || ((!lineSegmentsJoin(lsg,lk)) && lk.intersect(lsg))) {
      return false;
    } 
  }
  return true;
}


item.findMinDist = function (pnt) {
  let {points,numPoints} = this;
  let closest = null;
  let minDist = 1000000;
  for (let j = 0;j<numPoints;j++) {
    let pntj = points[j];
    let jdist = pnt.distance(pntj);
    if (jdist < minDist) {
      minDist = jdist;
      closest = j;
    }
  }
  return minDist;
  //return [minDist,closest];
  };

item.findClosestPoints = function (i) {
  let {points,numPoints} = this;
  let closest = null;
  let dist;
  let pnti = points[i];
  let distances = [];
  let rs = [];
  for (let j = 0;j<numPoints;j++) {
    let pntj = points[j];
    let jdist = pnti.distance(pntj);
    distances[j] = jdist;
    rs.push(j);
  }
  
  rs.sort(function (a,b) {
      let da = distances[a];
      let db = distances[b];
      return da - db;
    });
  return rs;
  };

item.findConnectablePoints = function(pi) {
  let {points,numPoints,unconnectable} = this;
  let lp,hp;
  let rs = [];
  for (let pj = 0;pj < numPoints; pj++) {
    if (pj !== pi) {
      if (pi < pj) {
        lp = pi;
        hp = pj;
      } else {
        lp = pj;
        hp = pi;
      }
      let knownUnconnectable = unconnectable[lp * numPoints + hp];
      if (knownUnconnectable) {
        break;
      }
      if (this.connectable(lp,hp)) {
        rs.push(pj);
      } else {
        unconnectable[lp,hp] = 1;
      }
    }
  }
  return rs;
}
        
  
/**/

      
  
  
  
  

    
  
  

item.initializePrototype = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.05;
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.dimension = item.deltaX*0.5;
}  
/*
let points = [];

item.genPoints = function () {
  debugger;
  
  let points = this.points;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  
  for (let j = 0;j < numRows; j++) {
    let lx = -0.5 * xdim;
    let y = ly + j* deltaY;
    for (let i = 0;i < numCols; i++) {
      let x = lx + i * deltaX;
      points.push(Point.mk(x,y));
      //points[j*numCols + i] = Point.mk(x,y);
    }
  }
  debugger;
}

item.genHorizontalLines = function () { 

  let hlines = this.hlines;
  let points = this.points;
  let circles = this.circles;
  if (hlines) {
    return;
  }  
  hlines = this.set('hlines',svg.Element.mk('<g/>')); 
  circles = this.set('circles',svg.Element.mk('<g/>')); 

  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  
  for (let j = 0;j < numRows; j++) {
    for (let i = 0;i < numCols - 1; i++) {
      let p1 = points[j*numCols + i];
      let p2 = points[j*numCols + i + 1];
      let p3 = null;
      let p4 = null;
      if (j < (numRows -1)) {
        p3 = points[(j+1)*numCols + i];
        p4 = points[j*numCols+i].plus(Point.mk(0.5*deltaX,0.5*deltaY));
        
      }
      let line = this.lineP.instantiate();
      hlines.set('h_'+j+'_'+i,line);
      line.setEnds(p1,p2);
      line.update();
      line.show();
      if (p3) {
        let line = this.lineP.instantiate();
        hlines.set('v_'+j+'_'+i,line);
        line.setEnds(p1,p3);
        line.update();
        line.show();
        if (Math.random() > 0.5) {
          let circle = this.circleP.instantiate();
          circles.set('v_'+j+'_'+i,circle);
         
          circle.moveto(p4);
          circle.update();
          circle.show();
        }
      }
      //line.update();
    }
  }
}

let maxGval = 100;
let delta = 20;
item.randomizeLines = function () {
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

    console.log('clr',clr,rd,gd,bd);
    ln.stroke = clr;
    ln.update();
    ln.show();
  });
}
  
let pointJiggle = .5;  
item.randomizePoints = function () {
  let {numRows,numCols,points} = this;
  for (let i = 0;i < numRows*numCols;i++) {
    let pnt = points[i];
    pnt.x = pnt.x + Math.random()*pointJiggle -0.5*pointJiggle;
    pnt.y = pnt.y + Math.random()*pointJiggle  -0.5*pointJiggle;
  }
}
  
  

  
*/

item.addLineSegment = function (i) {
  let {points,lineSegments,numPoints} = this;
  let closest = this.findClosestPoints(i);
  let rs;
  let pnti = points[i];
  for (let cj=0;cj<numPoints;cj++) {
    let lp,hp;
    let j = closest[cj];
   // let j = cj;
   // let pntj = points[j];
   // if (pnti.distance(pntj) < 7) {
   //   continue;
   // }
    
    if (j === i) {
      continue;
    }
    if (i < j) {
      lp = i;
      hp = j;
    } else {
      lp = j;
      hp = i;
    }
    let knownUnconnectable = unconnectable[lp * numPoints + hp];
    if (knownUnconnectable) {
      continue;
    }
    if (this.connectable(lp,hp)) {
      rs = j;
      break;
    } else {
      unconnectable[lp,hp] = 1;
    }
  }
  if (!rs) {
    return "none";
  }
  let rsp = points[rs];
 // let pnti = points[i];
  debugger;
  let lsg = geom.LineSegment.mk(pnti,rsp);
  lineSegments.push(lsg);
}

item.drawLines = function () {
  let {lineSegments,lines} = this;
  if (lines) {
    return;
  }
 lines = this.set('hlines',core.ArrayNode.mk()); 
  lineSegments.forEach((lsg) => {
    let {end0,end1} = lsg;
    let line = this.lineP.instantiate();
    line.setEnds(end0,end1);
    lines.push(line);
    line.update();
    line.show();
  });
}
    
      
item.initialize = function () {
  debugger;
  let numPoints = this.numPoints;
  this.genRandomPoints();
  for (let i=0;i<500;i++) {
    let r = Math.floor(Math.random() * numPoints);
    debugger;
    this.addLineSegment(r);
  }
  
  //debugger;
  //this.addLineSegment(0);
  debugger;
  this.drawLines();
  return;
    this.randomizePoints();

  this.genHorizontalLines();
  debugger;
  this.randomizeLines();
  this.show();
}

return item;
});

      

