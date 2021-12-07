
core.require('/line/line.js','/shape/circle.js','/generators/basics.js','/mlib/lines.js',
function (linePP,circlePP,item,addMethods) {
debugger;

addMethods(item);
item.setName('lines_lights');
let wd = 200;
let topParams = {width:wd,height:wd,numLines:3000,angleMin:-90,angleMax:90}
Object.assign(item,topParams);

item.shapePairs = 
[[geom.Circle.mk(Point.mk(-50,40),5),geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80))],
 [geom.Circle.mk(Point.mk(-50,-40),5),geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80))],
 [geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80)),geom.Circle.mk(Point.mk(50,0),10),]];
 
item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .015; 	
}  


item.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initializeProto();
  this.initializeLines();
}	
return item;
});
      

