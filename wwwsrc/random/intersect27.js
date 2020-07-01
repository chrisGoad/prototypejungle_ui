
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

//addMethods(item);
/*adjustable parameters  */


const initializeProto = function (itm) {
  core.assignPrototypes(itm,'lineP',linePP);
  itm.lineP.stroke = 'black';
  itm.lineP['stroke-width'] = .175; 	
/*  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2; */
}  


item.initialize = function () {
	let lines0 = svg.Element.mk('<g/>');
	let lines1 = svg.Element.mk('<g/>');
	this.set('lines0',lines0);
	this.set('lines1',lines1);
	addMethods(lines0);
	addMethods(lines1);
  lines0.moveto(Point.mk(0,-100));
  lines1.moveto(Point.mk(0,100));
  initializeProto(lines0);
  initializeProto(lines1);
  lines0.width = 400;
  lines0.height = 200;
  lines0.numLines= lines1.numLines = 1000;
  lines0.angleMin = -90;
  lines0.angleMax = 90;
	lines1.width = 400;
  lines1.height = 200;
  lines1.angleMin = -90;
  lines1.angleMax = 90;
  lines0.initializeLines();
  lines1.initializeLines();
}	
return item;
});
      

