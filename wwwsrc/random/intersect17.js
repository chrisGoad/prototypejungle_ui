
core.require('/line/arc.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
//core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP.stroke = 'rgb(230,230,230)';
  this.lineP.stroke = 'white';
  this.lineP.radius = 100;
  this.lineP.sweep = 0;
  this.lineP['stroke-width'] = .015; 	
 // this.lineP['stroke-width'] = 1; 	
   core.assignPrototypes(this,'circleP',circlePP);
  //this.lineP['stroke-width'] = 1; 	
}  


item.initialize = function () {
  this.initializeProto();
//  this.dimension = 200;
  this.numLines=2000;
 // this.numLines=110;
  this.width = 400;
  this.height = 200;
 // this.angleMin = -90;
 // this.angleMax = 90;
  this.angleMin = 70;
  this.angleMax = 90;
  //this.numLines=200;
  core.root.backgroundColor = 'black';
 // core.root.backgroundColor = 'black';
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.stroke = 'white';
 circle.stroke = 'transparent';
 circle.update();
 circle.show();
 this.excludeLineFunctionnnn = function (sg) {
    let md = sg.middle();
    let ln = md.length();
    return(ln > 40);
  //  return (ln >80) || (ln <40) 
  }
  this.segmentToLineFunction =  (lines,sg) => {
    debugger;
    let line = lines.lineP.instantiate();
    let {end0,end1} = sg;
    line.setEnds(end0,end1);
    line.sweep = Number(sg.whichCircle === 1)
    return line;
  }
 
 //this.lineCenterDistance = 40;
  this.originatingShapes = [geom.Circle.mk(Point.mk(-20,-20),10),geom.Circle.mk(Point.mk(20,-20),10)];

  this.initializeLines();
}	
return item;
});
      

