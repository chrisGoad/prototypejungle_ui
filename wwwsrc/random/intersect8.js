
//core.require('/line/arc.js','/shape/circle.js','/random/addIntersectingLines4.js',function (linePP,circlePP,addMethods) {
core.require('/line/arc.js','/shape/circle.js','/random/addLinesShapes0.js',function (linePP,circlePP,addMethods) {
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


const seg2line = function (itm,lsg) {
  let {end0,end1} = lsg;
  let e0x = end0.x;
  let e1x = end1.x;
  let tmp;
  if (e0x > e1x) {
    let tmp = end0;
    end0 = end1;
    end1 = tmp;
  }
  end0.y = end1.y;
  let e0y = end0.y;
  let e1y = end1.y;
  let emy  = 0.5*(e0y+e1y);
  let miny = -0.5*(itm.height);
  let radius = 1000 - 8*(emy-miny);
  let line = itm.lineP.instantiate();
  line.sweep = (emy<0)?0:1;
  line.setEnds(end0,end1);
  return line;
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
  this.segmentToLineFunction = seg2line;
  this.initializeLines();
}	
return item;
});
      

