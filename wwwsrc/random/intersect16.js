
core.require('/line/arc.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP.stroke = 'rgb(230,230,230)';
  this.lineP.radius = 150;
  this.lineP['stroke-width'] = .025; 	
   core.assignPrototypes(this,'circleP',circlePP);
  //this.lineP['stroke-width'] = 1; 	
}  


item.initialize = function () {
  this.initializeProto();
  this.dimension = 200;
  this.numLines=5000;
  //this.numLines=110;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -45;
 // this.angleMax = 45;
  //this.numLines=200;
  core.root.backgroundColor = 'rgb(24, 24, 69)';
 // core.root.backgroundColor = 'black';
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.stroke = 'white';
 circle.stroke = 'transparent';
 circle.update();
 circle.show();
 this.excludeLineFunction = function (sg) {
    let md = sg.middle();
    let ln = md.length();
    return(ln > 40);
  //  return (ln >80) || (ln <40) 
  }
 
 //this.lineCenterDistance = 40;
  //lines.originatingShapes = [geom.Circle.mk(Point.mk(-100,-200),100),geom.Circle.mk(Point.mk(100,-200),100)];
  this.originatingShapes = [geom.Circle.mk(Point.mk(-100,-200),100),geom.Circle.mk(Point.mk(100,-200),100)];

  this.initializeLines();
}	
return item;
});
      

