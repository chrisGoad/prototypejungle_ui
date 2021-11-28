
core.require('/ngen1/grid0_3.js','/gen0/Basics.js',
//core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (gridP,basicP)	{ 
//function (rectPP,basicP,addGridMethods,addRandomMethods)	{ 
debugger;
//let rs = svg.Element.mk('<g/>');
let rs = basicP.instantiate();
let ht = 450;
let topParams = {width:1.5*ht,height:ht,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht};
Object.assign(rs,topParams);
rs.setName('grid0_3_combo3');
rs.initialize = function() {
  debugger;
  rs.addBackground();
  let grid0 = rs.set('grid0',gridP.instantiate().show());
  let grid1 = rs.set('grid1',gridP.instantiate().show());
  //grid0.initializeAsComponent();
  grid0.initialize();
  grid1.initialize();
  let mby = 0.6 * grid1.width;
	grid0.moveto(Point.mk(-mby,0));
	grid1.moveto(Point.mk(mby,0));
}

return rs;

});

