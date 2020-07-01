
core.require(function () {
 return function (item) {
//let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.dimension = 200;
item.height = 200;

item.numCols= 25
item.numRows= 20;
item.numCols= 20;
item.xdim = 100;
item.ydim = 100;
item.numLines = 2;
item.angleMax = 90;
item.angleMin =  -90;
item.minDist = 1;
item.lineLengthRatio = .9;
item.fractionShown = 1;
item.lineCenterDistance = 50;
item.excludeLineFuncton = undefined;


item.genSides = function () {
  let hw = this.width/2;
  let hh = this.height/2;
  let UL = Point.mk(-hw,hh)
  let UR = Point.mk(hw,hh)
  let LL = Point.mk(-hw,-hh)
  let LR  = Point.mk(hw,-hh)
  this.topSide = geom.LineSegment.mk(UL,UR);
  this.bottomSide = geom.LineSegment.mk(LL,LR);
  this.leftSide = geom.LineSegment.mk(UL,LL);
  this.rightSide = geom.LineSegment.mk(UR,LR);
}

item.genRandomPoint = function () {
  let rx = (Math.random()-0.5) * this.dimension;
  let ry= (Math.random()-0.5) * this.dimension;
  return Point.mk(rx,ry);
}

item.addRandomSegment = function () {
  debugger;
  let p = this.genRandomPoint();
  let amin = Math.PI*(this.angleMin/180);
  let amax = Math.PI*(this.angleMax/180);
  let dir = amin + (amax - amin)*Math.random();
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));//.times(this.dimension *4);
  let circle = this.circle;
  let sols = circle.intersectLine(p,vec);
  if (sols) {
    let e0 = sols[0];
    let e1 = sols[1];
    let  sg = geom.LineSegment.mk(e0,e1);
    let elf = this.excludeLineFunction;
    if (elf && elf(sg)) {
      return;
    }
    this.segments.push(sg);
    return sg;
  }
}

/*
item.addLine = function (lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*150);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
 // line.stroke  = genRandomColor();
 debugger;
  
  let {end0,end1} = lsg;
  let numparts = 3;
  let fractionShown = 0.6;
  let strokeWidthFactor = 0.08;
  let step = end1.difference(end0).times(1/numparts);
  let shownStep = step.times(fractionShown);
  let gapStep= step.times(1-fractionShown);
  let cp = end0;
  for (i=0;i<numparts;i++) {
    let e0 = cp;
    let e1 = cp.plus(shownStep);
    if (i === 1) {
      let line = this.lineP.instantiate();
      this.	lines.push(line);
      line.setEnds(e0,e1);
      let maxx = Math.max(e0.x,e1.x);
      let sw = (maxx+200)/400;
      sw = 1;
      line['stroke-width'] = strokeWidthFactor * sw;
      line.update();
      line.show();
    }
    cp = e1.plus(gapStep);
  }
}
*/

item.addLine = function (lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  /*const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*150);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
 // line.stroke  = genRandomColor();
 debugger;
  
  let {end0,end1} = lsg;
  let numparts = 3;
 // let fractionShown = 0.2;
 let r = Math.random();
  let fractionShown = this.fractionShown;// 0.5* r;
  //let strokeWidthFactor = 0.08;
  let vec = end1.difference(end0);
  let e0 = end0.plus(vec.times(0.5*(1-fractionShown)));
  let e1 = e0.plus(vec.times(fractionShown));
  let mid = e0.plus(e1).times(0.5);
  let ln = mid.length();
  if (ln > this.lineCenterDistance) {
    return;
  }*/
  let line = this.lineP.instantiate();
  this.lines.push(line);
  line.setEnds(lsg.end0,lsg.end1);
  //let maxx = Math.max(e0.x,e1.x);
  //let sw = (maxx+200)/400;
  //sw = 1;
  //line['stroke-width'] = strokeWidthFactor;// * sw;
  line.update();
  line.show();
}

    
    
    
    
//  line.setEnds(lsg.end0,lsg.end1);   
 // line.update();
 // line.show();
  //debugger;
//}

item.addLines = function () {
  let segs = this.segments;
  segs.forEach( (sg) => this.addLine(sg));
}

item.computeIntersections = function () {
  let n = this.numLines;
  for (let i = 0;i<n;i++) {
    let isg = this.segments[i];
    for (let j = i+1;j<n;j++) {
      let jsg = this.segments[j];
      let intr = isg.intersect(jsg);
      if (intr) {
        this.points.push(intr);
      }
    }
  }
}
  
item.showPoints = function () {
  let points = this.points
  points.forEach( (p) => {
    let dp = this.circleP.instantiate();
    this.circles.push(dp);
    dp.moveto(p);
    dp.show();
    dp.update();
  });
}


item.initializeLines = function () {
  debugger;
  this.set('segments',core.ArrayNode.mk());
  this.set('lines',core.ArrayNode.mk());
  this.set('points',core.ArrayNode.mk());  
  this.set('circle',geom.Circle.mk(Point.mk(0,0),0.5 * this.dimension));
  let n=this.numLines;
  let i=0;
  while (true) {
    if (this.addRandomSegment()) {
      i++;
      if (i>=n) {
        break;
      }
    }
  }
  this.addLines();
 /* let n=this.numLines;
  while (this.lines.length < n) {
    let sg = this.addRandomSegment();
    if (sg) {
      this.addLine(sg);
    }
  }*/
}
}});

      

