//OBsoLETE();
core.require(function () {
  console.log('obsolete: addIntersectingLines4.js');
 return function (item) {
//let item = svg.Element.mk('<g/>');
  //alert('obsolete: addIntersectingLines4.js');
//debugger;

/*adjustable parameters  */

item.width = 200;
item.height = 200;

item.numCols= 25
item.numRows= 20;
item.numCols= 20;
item.xdim = 100;
item.ydim = 100;
item.numLines = 2;
item.angleMax = 90;
item.angleMin =  -90;
//item.minDist = 1;
//item.lineLengthRatio = .9;
item.excludeLineFuncton = undefined;
item.segmentToLineFunction = undefined;



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
  let {width,height} = this;
  let rx = Math.floor((Math.random()-0.5) * width);
  let ry= Math.floor((Math.random()-0.5) * height);
  return Point.mk(rx,ry);
}

item.intersectWithRectangle = function (lsg) {
  let intersections = [];
  const pushIfNnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  pushIfNnul(this.topSide.intersect(lsg));
  pushIfNnul(this.bottomSide.intersect(lsg));
  pushIfNnul(this.leftSide.intersect(lsg));
  pushIfNnul(this.rightSide.intersect(lsg));
  return geom.LineSegment.mk(intersections[0],intersections[1]);
}
 
item.intersectWithRectangleee = function (lsg) {
  let {end0,end1} = lsg;
  let vec = end1.difference(end0).normalize();
  let intersections = [];
  const pushIfNnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  pushIfNnul(this.topSide.intersectLine(end0,vec));
  pushIfNnul(this.bottomSide.intersectLine(end0,vec));
  pushIfNnul(this.leftSide.intersectLine(end0,vec));
  pushIfNnul(this.rightSide.intersectLine(end0,vec));
  return geom.LineSegment.mk(intersections[0],intersections[1]);
}
  
  
item.addRandomSegment = function () {
  let p = this.genRandomPoint();
  let amin = Math.PI*(this.angleMin/180);
  let amax = Math.PI*(this.angleMax/180);
  let dir = amin + (amax - amin)*Math.random();
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(this.width *4);
  
  let e0 = p.plus(vec.minus()) ;
  let e1 = p.plus(vec);
  let lsg = geom.LineSegment.mk(e0,e1);
  let rsg;
  if (this.dimension) {
    let circle = this.circle;
    let sols = circle.intersectLine(p,vec);
    if (sols) {
      rsg = geom.LineSegment.mk(sols[0],sols[1]);
    } else {
      return;
    }
  } else {
    rsg = this.intersectWithRectangle(lsg);
  }
  let elf = this.excludeLineFunction;
  if (elf) {
    if (elf(rsg)) {
      return;
    }
  }
  this.segments.push(rsg);
  return rsg;
}

item.addLine = function (lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  debugger;
  const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*150);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
 // line.stroke  = genRandomColor();
  let seg2line = this.segmentToLineFunction;
  let line;
  if (seg2line) {
    line = seg2line(this,lsg);
  } else {
    line = this.lineP.instantiate();
    let {end0,end1} = lsg;
    line.setEnds(end0,end1);
  }
  this.lines.push(line);
 
  debugger;
  //sw = 1;
 // line['stroke-width'] = strokeWidthFactor * sw;
  line.update();
  line.show();
}

   

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
  this.set('segments',core.ArrayNode.mk());
  this.set('lines',core.ArrayNode.mk());
  this.set('points',core.ArrayNode.mk());  
  this.set('circles',core.ArrayNode.mk());
  if (this.dimension) {
    this.set('circle',geom.Circle.mk(Point.mk(0,0),0.5 * this.dimension));
  } else {
    this.genSides();
  }
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
  ///this.computeIntersections();
  //this.showPoints();
}
}});

      

