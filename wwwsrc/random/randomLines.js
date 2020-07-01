
core.require('/line/line.js','/shape/circle.js',function (linePP,circlePP) {
debugger;
let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.xdim = 100;
item.ydim = 100;
item.numLines = 1000;
item.minDist = 1;
item.lineLength = 10;



item.initializePrototype = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.5;
}  

item.genRandomLineSegment = function () {
  let {xdim,ydim,lineLength} = this;
  let rx = Math.random() * xdim - 0.5*xdim;
  let ry = Math.random() * ydim - 0.5*ydim;
  let end0 = Point.mk(rx,ry);
  let dir = 2 * Math.PI * Math.random();
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength);
  let end1 = end0.plus(vec);
  let lsg = geom.LineSegment.mk(end0,end1);
  return lsg;
  lineSegments.push(lsg);
  return;
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);
  lines.push(line);
  line.update();
  line.show();
}

item.intersectsAsegment = function (lsg) {
  let linesegs = this.lineSegments;
  let n = linesegs.length;
  for (let k = 0;k<n;k++) {
    let lk = linesegs[k];
    if (lk.intersect(lsg)) {
      return true;
    } 
  }
  return false;
}


     
  
item.drawLines = function () {
  let {lineSegments,lines} = this;
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
  let {numLines,lines,lineSegments} = this;
  if (lines) {
    return;
  }
  this.set('lines',core.ArrayNode.mk());
  lineSegments = this.set('lineSegments',core.ArrayNode.mk());

  for (let i=0;i<numLines;i++) {
    let lsg = this.genRandomLineSegment();
    if (!this.intersectsAsegment(lsg)) {
      lineSegments.push(lsg);
    }
  }
  this.drawLines();
  return;
  //debugger;
  //this.addLineSegment(0);
  debugger;
  this.drawLines();
  return;
}


return item;
});

      

