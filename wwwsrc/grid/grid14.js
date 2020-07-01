
core.require('/line/line.js','/shape/rectangle.js','/grid/addGrid3.js',function (linePP,rectanglePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'white';
  this.blineP['stroke-width'] = .04;  
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 1;;  
   core.assignPrototypes(this,'rlineP',linePP);
  this.rlineP.stroke = 'white';
  this.rlineP['stroke-width'] = 0.3;
}  

item.initialize = function () {
  this.initializeProto();
  this.numRows= 50;
  this.numRows= 50;
  this.numCols = 150;
  this.numCols = 50;
 // this.numRows= 2;
//  this.numCols= 4;
  this.width = 600;
  this.width = 100;
  this.height = 200;
  this.height = 100;
  this.deltaX = this.numCols/this.width;
  this.deltaY = this.numRows/this.height;
  this.visChance= 1;
  this.pointJiggle = 0.5;
  this.includeShapes = false;
  this.includeCellBoundaries = 1;
  core.root.backgroundColor = 'black';
  this.chanceAshapeIsVisible =0.05;
  this.fadeIn = false;
  this.lineShapeLength = undefined;
  this.ywander = 0;
  this.randomizeWhichColors = 'boundaries';
  this.randomizeWhichColors = 'neither';
 // this.randomizeWhichColors = 'both';
   this.colorRangeL = [0,0,100];
   this.colorRangeL = [100,100,100];
  this.colorRangeH = [255,250,250]
 // this.colorRangeH = [0,0,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [0,0,50];
  this.colorStart = [100,0,0];
  this.colorCombo = 'white';
  this.pointJiggle = 0;
  this.includeLetters = 1;
  this.letterWidth = 4;
  this.letterHeight = 4;
  this.fractionInked = 0.4;
  this.lettersPerWord = 5;
   
  this.initializeGrid();
}	
return item;
});
      

