
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/shape/rectangle.js','/shape/circle.js','/line/line.js','/grid/addArcGrid.js',function (rectanglePP,circlePP,linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP1',linePP);
  this.lineP1.stroke = 'white';
  this.lineP1['stroke-width'] = .4;  
    core.assignPrototypes(this,'lineP2',linePP);
  this.lineP2.stroke = 'rgb(200,255,255)';
  this.lineP2.stroke = 'red';
  this.lineP2['stroke-width'] = .4;  
  //core.assignPrototypes(this,'shapeP1',linePP);
  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'rgb(0,0,10)';
  this.rectangleP.width = 10;
  this.rectangleP.height = 20;
  this.rectangleP['stroke-width'] = 0;  
   core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'rgb(50,50,50)';
  this.circleP.fill = 'rgb(35,35,150)';
  this.circleP.fill = 'rgb(10,10,10)';
  this.circleP.dimension = 50;
  this.circleP['stroke-width'] = 0;  
}  

item.initialize = function () {
//  core.root.backgroundColor ='rgb(0,0,100)';
  core.root.backgroundColor ='rgb(70,0,0)';
  core.root.backgroundColor ='rgb(0,0,0)';
  this.initializeProto();
  this.numLines = 60;
  this.numRows= 100;
  this.numCols= 100;
  this.width = 200;
  this.height = 200;
  this.maxThere = 8;
  this.minThere = 0;
  this.maxMissing = 20;
  this.minMissing = 0;
 
   this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  let {height:ht,width:wd} = this;
  let owd = 200;
  let oht = 200;
  let iwd = 130;
  let iht = 130;
  let hwd = 0.5*owd;
  let hht = 0.5*oht;
  let quad1 = [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(-hwd,hht),Point.mk(hwd,hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  hwd = 0.5*iwd;
  hht= 0.5*iht;
  let quad3 = [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(-hwd,hht),Point.mk(hwd,hht)];
  let quad4 = [quad3[0],quad3[2],quad3[1],quad3[3]];
 //let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(-hwd,hht),Point.mk(hwd,hht)];
 // let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(0,hht),Point.mk(0,hht)];
 // let quad3 =  [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(0,0),Point.mk(0,0)];
  //let quad4 = [quad3[0],quad3[2],quad3[1],quad3[3]];
 // let quad5 =  [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(0,2*hht),Point.mk(hwd,2*hht)];
 // let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(0,hht),Point.mk(0,hht)];
 // let quad3 =  [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(0,0),Point.mk(0,0)];
 // let quad6 = [quad5[0],quad5[2],quad5[1],quad5[3]];
  let lines1 =  this.set('lines1',core.ArrayNode.mk());
  let nl1 = 40;
 this.addQuadLines(this.lineP1,lines1,quad1,nl1,3,0,8,6);
 debugger;
  this.addQuadLines(this.lineP1,lines1,quad2,nl1,3,0,8,6);
 // return;
 // return;
 /*let fc = 2;
   this.addQuadLines(quad3,this.numLines,8,0,10,0);
  this.addQuadLines(quad4,this.numLines,8,0,10,0);
  // this.addQuadLines(quad5,this.numLines,8,0,40,0);
   this.addQuadLines(quad5,this.numLines,8,0,4,0);
 // this.addQuadLines(quad6,this.numLines,8,0,40,0);
  this.addQuadLines(quad6,this.numLines,8,0,4,0);*/
    let rect = this.set('rect',this.rectangleP.instantiate());
  rect.width = iwd;
  rect.height = iht;
    rect.update();
    rect.show();
      let lines2 =  this.set('lines2',core.ArrayNode.mk());
  let nl2 = 20;
    this.addQuadLines(this.lineP2,lines2,quad3,nl2,6,0,8,6);
  this.addQuadLines(this.lineP2,lines2,quad4,nl2,6,0,8,6);
      let circle = this.set('circle',this.circleP.instantiate());
  circle.update();
  circle.show();
 
 
  
}	
return item;
});
      

