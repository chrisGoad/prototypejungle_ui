
core.require('/line/line.js',function (lineP) {
 return function (item) {
//let item = svg.Element.mk('<g/>');

item.deltaX = 10;
item.deltaY = 10;

item.generateGrid = function (lineP,dest,circle) {
  let {center,radius} = circle;
  let {deltaX,deltaY} = this;
  let numLinesX = Math.ceil(radius/deltaX);
  let numLinesY = Math.ceil(radius/deltaY);
  let {x,y} = circle;
  let cx = x - deltaX * numLinesX;
  let maxx = x + deltaX * numLineX;
  let hvec = Point.mk(1,0);
  let cnt = 0;
  while (cx < maxx) {
    let cp = Point.mk(cx,y);
    let ints = circle.intersectLine(cp,hvec);
    if (ints) {
      let line = dest.set(cnt,lineP.instantiate());
      line.setEnds(ints[0],ints[1]);
      line.update();
      line.show();
      cx += deltaX;
    }
  }
}

  
  
}});

      

