
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/shape/rectangle.js','/line/line.js','/grid/addArcGrid.js',function (rectanglePP,linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .4;  
  //core.assignPrototypes(this,'shapeP1',linePP);
  core.assignPrototypes(this,'rectangleP',rectanglePP);
  //this.rectangleP.stroke = 'transparent';
  this.rectangleP.fill = 'rgb(0,0,10)';
  this.rectangleP.width = 10;
  this.rectangleP.height = 20;
  
  this.rectangleP['stroke-width'] = 0;  
}  

item.initialize = function () {
//  core.root.backgroundColor ='rgb(0,0,100)';
  core.root.backgroundColor ='rgb(70,0,0)';
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
  let hwd = 0.5*wd;
  let hht = 0.5*ht;
  let quad1 = [Point.mk(-hwd,-hht),Point.mk(0,-hht),Point.mk(-hwd,0),Point.mk(hwd,0)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(-hwd,hht),Point.mk(hwd,hht)];
 // let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(0,hht),Point.mk(0,hht)];
 // let quad3 =  [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(0,0),Point.mk(0,0)];
  let quad4 = [quad3[0],quad3[2],quad3[1],quad3[3]];
  let quad5 =  [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(0,2*hht),Point.mk(hwd,2*hht)];
 // let quad3 =  [Point.mk(-hwd,0),Point.mk(hwd,0),Point.mk(0,hht),Point.mk(0,hht)];
 // let quad3 =  [Point.mk(-hwd,-hht),Point.mk(hwd,-hht),Point.mk(0,0),Point.mk(0,0)];
  let quad6 = [quad5[0],quad5[2],quad5[1],quad5[3]];
  debugger;
  let lines =  this.set('lines',core.ArrayNode.mk());
  this.addQuadLines(this.lineP,lines,quad1,this.numLines,8,0,4,0);
  this.addQuadLines(this.lineP,lines,quad2,this.numLines,8,0,4,0);
 // return;
 let fc = 2;
   this.addQuadLines(this.lineP,lines,quad3,this.numLines,8,0,10,0);
  this.addQuadLines(this.lineP,lines,quad4,this.numLines,8,0,10,0);
  // this.addQuadLines(quad5,this.numLines,8,0,40,0);
   this.addQuadLines(this.lineP,lines,quad5,this.numLines,8,0,4,0);
 // this.addQuadLines(quad6,this.numLines,8,0,40,0);
  this.addQuadLines(this.lineP,lines,quad6,this.numLines,8,0,4,0);
  const addRect  = (n,xp) => {
    let rect = this.set('rect'+n,this.rectangleP.instantiate());
    rect.moveto(Point.mk(xp,0.5*hht));
 // rect.width = 70;
 // rect.height = 30;
    rect.update();
    rect.show();
  }
  for (let i=-2;i<3;i++) {
   addRect(i+10,i * 30);
  }
 
  
}	
return item;
});
      

