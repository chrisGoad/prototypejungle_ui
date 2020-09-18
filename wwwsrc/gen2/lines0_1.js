
core.require('/line/line.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('lines0_0');
rs.width = 400;
rs.height = 200;
rs.numLines=6000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .075; 	
}  


rs.initialize = function () {
  this.initProtos();
	let hwd = 0.5 * this.width;
	let hht = 0.5 * this.height;
	let fr = 0.4;
  let corner0 = Point.mk(-hwd,-hht);
	let extent0  = Point.mk(this.width,fr * this.height);
	let extent1  = Point.mk(this.width,(1-fr) * this.height);
	let corner1 = Point.mk(-hwd,fr * this.height - hht);
	let rect0 = geom.Rectangle.mk(corner0,extent0.copy());
	let rect1 = geom.Rectangle.mk(corner1,extent1.copy());
	let numLines = this.numLines;
	this.numLines = fr*numLines;
 // core.root.backgroundColor = 'black';
  this.initializeLines(rect0);
	this.numLines = (1-fr) * numLines;
  this.initializeLines(rect1);
}	
return rs;
});
      

