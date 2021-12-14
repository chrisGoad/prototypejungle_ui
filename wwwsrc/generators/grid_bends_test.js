
//core.require('/line/line.js','/shape/circle.js','/generators/basics.js','/generators/grid_bend.js','/generators/grid_fan.js',
//function (linePP,circlePP,basicP,gridP,fanP)	{ 

core.require('/generators/grid_bend.js','/shape/circle.js','/generators/grid_fan.js',
function (gridP,circlePP,fanP)	{ 


debugger;
//let rs = basicP.instantiate();
let rs = svg.Element.mk('<g/>');
//rs.setName('grid_bends');

rs.addGrid = function (nm,fromLeft,turnUp) {
  debugger;
  let g = gridP.instantiate();
  g.fromLeft = fromLeft;
  g.turnUp = turnUp;
  this.set(nm,g);
  g.initialize();
  return g;
}

    
rs.addFan = function (nm,fromLeft,turnUp) {
  debugger;
  let f = fanP.instantiate();
  f.fromLeft = fromLeft;
  f.turnUp = turnUp;
  this.set(nm,f);
  f.initialize();
  return f;
}
'/generators/grid_bend.js',

rs.initialize = function () {
  //this.addBackground();
  let g00 = this.addGrid('g00',0,0);
  let mv = 0.4*g00.width;
  g00.moveto(Point.mk(-mv,-mv));
  let g01 = this.addGrid('g01',1,1);
   g01.moveto(Point.mk(mv,mv));
//  let f00 = this.addFan('f00',0,0);
 // f00.moveto(Point.mk(mv,mv));

}

return rs;


});

