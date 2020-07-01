
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',

function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .025; 	
   core.assignPrototypes(this,'circleP',circlePP);
  this.lineP.stroke = 'black';
  //this.lineP['stroke-width'] = 1; 	
}  


item.initialize = function () {
  this.initializeProto();
  this.dimension = 300;
  this.numLines=5000;
  //this.numLines=110;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -10;
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.update();
 circle.show();
 this.lineCenterDistance = 10;
 //this.originatingShapes = [geom.Circle.mk(Point.mk(0,0),40)];
 this.originatingShapes = [geom.LineSegment.mk(Point.mk(0,-80),Point.mk(0,80))];
 this.excludeLineFunctionn = function (sg) {
    let md = sg.middle();
    let ln = md.length();
    return(ln < 18);
  //  return (ln >80) || (ln <40) 
  }
  this.initializeLines();
}	
return item;
});
      

