
//core.require('/line/line.js','/shape/circle.js','/random/addIntersectingLines4.js'
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .075; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  this.initializeProto();
  this.width = 400;
  this.height = 200;
  this.numLines=3000;
 // this.numLines=50;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -10;
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
  this.excludeLineFunction = function (sg) {
    let md = sg.middle();
    let ssz = 50;
  //  if ((md.x<-50)||(md.x>50)) {
  //  if ((md.x<-ssz)||(md.x>ssz)||(md.y < -ssz) || (md.y>ssz)) {
   let z = 100;
   if ((md.x>-z)&&(md.x<z)) {
  // if (md.x<5) {
      return true;
    }
  }
  this.initializeLines();
}	
return item;
});
      

