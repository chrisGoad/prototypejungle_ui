
core.require('/line/line.js','/shape/circle.js',function (linePP,circlePP) {
let item = svg.Element.mk('<g/>');

item.initializePrototype = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.1;
  this.lineP.stroke = 'white';
}

item.delta = 2;
item.center = Point.mk(0,0);
item.dimension = 40;

item.update = function () {
  debugger;
  if (this.lines) {
    this.lines.length = 0;
  } else {
    let circle = this.set('circle',this.circleP.instantiate());
    circle.dimension = this.dimension;
    circle.update();
    circle.show();
    this.set('lines',core.ArrayNode.mk());
 
  }
  let {delta,center,dimension,lineP} = this;
  let radius = 0.5*dimension;
  let numLines = Math.ceil(radius/delta);
  let circle = geom.Circle.mk(center,radius);
  let {x,y} = center;
  let cx = x - delta * numLines;
  let cy = y - delta * numLines;
  let maxx = x + delta * numLines;
  let maxy = y + delta * numLines;
  let hvec = Point.mk(1,0);
  let vvec = Point.mk(0,1);
 // let cnt = 0;
  const addLine =  (ints) => {
    let line = lineP.instantiate();
    this.lines.push(line);
    line.setEnds(ints[0],ints[1]);
    line.update();
    line.show();
  }
  while (cx < maxx) {
    let cp = Point.mk(cx,cy);
    let intsx = circle.intersectLine(cp,vvec);
    let intsy = circle.intersectLine(cp,hvec);
    if (intsx) {
      addLine(intsx);
      addLine(intsy);
    }
    cx += delta;
    cy += delta;
  }
}

return item;
  
});

      

