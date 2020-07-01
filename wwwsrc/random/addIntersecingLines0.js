
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
 return function (itm) {
//let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

itm.width = 200;
itm.height = 200;

itm.numCols= 25
itm.numRows= 20;
itm.numCols= 20;
itm.xdim = 100;
itm.ydim = 100;
itm.numLines = 1000;
itm.minDist = 1;
itm.lineLengthRatio = .9;
itm.excludeLineFuncton = undefined;


item.genSides = function () {
  let hw = this.width/2;
  let hh = this.height/2;
  let UL = Point.mk(-hw,hh)
  let UR = Point.mk(hw,hh)
  let LL = Point.mk(-hw,-hh)
  let LR  = Point.mk(-hw,-hh)
  this.topSide = geom.LineSegment.mk(UL,UR);
  this.bottomSide = geom.LineSegment.mk(LL,LR);
  this.leftSide = geom.LineSegment.mk(UL,LL);
  this.rightSide = geom.LineSegment.mk(UR,LR);
}

item.genRandomPoint = function () {
  let {width,height} = this;
  let rx = Math.floor((Math.random()-0.5) * width);
  let rx = Math.floor((Math.random()-0.5) * height);
  return Point.mk(rx,ry);
}

item.addRandomSegment = function () {
  let p = this.genRandomPoint();
  let dir = Math.random()*Math.PI;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(this.width *4);
  
  let e0 = p.plus(vec.minus()) ;
  let e1 = p.plus(vec);
  let intersections = [];
  const pushIfNnnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  let lsg = geom.LineSegment.mk(end0,end1));
  pushIfNnul(this.topSide.intersect(lsg));
  pushIfNnul(this.bottomSide.intersect(lsg));
  pushIfNnul(this.leftSide.intersect(lsg));
  pushIfNnul(this.rightSide.intersect(lsg));
  let rsg = geom.LineSegment.mk(intersections[0],intersections[1]);
  this.segments.push(rsg);
 // this.segments.push(intersections[0],intersections[1]);
}


item.addLine = function (lsg) {
  let line = this.lineP.instantiate();
  this.lines.push(line);
  line.setEnds(lsg.end0,lsg.end1);   
  line.update();
  line.show();
  //debugger;
}

item.addLines = function () {
  let segs = this.segments;
  segs.forEach( (sg) => this.addLine(sg));
}

item.initializeLines = function () {
  this.set('segments',core.ArrayNode.mk());
  this.set('lines',core.ArrayNode.mk());
  this.genSides();
  let n=this.numLines;
  for (let i=0;i<n;i++) {
    addRandomSegment();
  }
  this.addLines();
}
  
  

}
});

      

