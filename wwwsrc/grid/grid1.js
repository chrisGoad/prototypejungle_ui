
core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js',function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'white';
  let vec = Point.mk((this.width/this.numRows)*0.15,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .2; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(1,1,1)';//'red';
//  this.circleP.fill = 'red';
  this.circleP.dimension = 5;
}  

item.initialize = function () {
  this.initializeProto();
  this.numRows= 41;
  this.numCols= 41;
  this.width = 180;
  this.height = 100;
  this.visChance= 0.4;
  this.pointJiggle = 0.5;
  this.includeShapes = true;
  //this.bendCircleRadius = 130;
  //this.bendCircleY = 100;
  this.randomizeWhichColors = 'both';
  core.root.backgroundColor = 'black';
  this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [15,15,15];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  this.initializeGrid();
  return; //remaining lines are for sizing for mpix
  let c1 = this.set('c1',this.circleP.instantiate()).show();
  let c2 = this.set('c2',this.circleP.instantiate()).show();
  let howfarx = 0.5*this.width +20;
  let howfary = 0.5*this.height +20;
  //c1.moveto(Point.mk(- howfarx,0));
  //c2.moveto(Point.mk(howfarx,0));
  c1.moveto(Point.mk(0,-howfary));
  c2.moveto(Point.mk(0,howfary));
  
}	
return item;
});
      

