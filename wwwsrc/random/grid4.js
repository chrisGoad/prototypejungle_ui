// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/shape/circle.js','/random/addRandomLines3.js', 
 function (linePP,circlePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0.5;
}  


item.initializeProto = function () {
  //core.assignPrototypes(this,'blineP',linePP);
  //this.blineP.stroke = 'yellow';
  //this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'red';
  let vec = Point.mk((this.width/this.numRows)*0.4,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .5;
  core.assignPrototypes(this,'shapeP2',circlePP);
  this.shapeP2.stroke = 'red';
  this.shapeP2.dimension = (this.width/this.numRows)*0.8;
  this.shapeP2['stroke-width'] = .5; 	
}   	


item.initialize = function () {
  debugger;
  core.root.backgroundColor = 'rgb(150, 43, 43)';
  let numRows = this.numRows = 50;
  let numCols = this.numCols = 50;this.numRows= 50;
  this.numCols= 50;
  this.width = 100;
  this.height = 100;
  this.initializeProto();
  this.chanceShapeIsVisible = 1;
  this.pointJiggle = 0;
  this.shapeOp = function (shp) {
    debugger;
    console.log('shapeOp');
    this.directLineRandomly(shp,.5);
  }
  this.includeShapes = true;
  this.includeCellBoundaries = false;
  this.randomizeWhichLineColors = 'niether';
  this.chanceShape2IsVisible = 0.15;
  //core.root.backgroundColor = 'black';
  this.initializeGrid();
  //core.root.backgroundColor = 'grey';
  this.initializeProtos();
 
  //let hnr = 0.5*numRows;
  //let hnc = 0.5*numCols;
  let maxd = 0.5 * this.xDelta;
  for (let i = 0;i<numRows;i++){
    for (let j = 0;j<numCols;j++) {
      let shp = this.shapeAt(i,j);
      let center = this.cellCenter(i,j);
      let dist = center.length();
   
      if (dist > maxd) {
        shp.hide();
      } else {
        let opacity = 1 - dist/maxd;
        let clr;
        if (opacity < 0.7) {
          clr = 'rgba(255,255,255,'+opacity+')';
        } else {
          clr = 'rgba(0,0,0,'+opacity+')';
        }
        
        //let clr = 'rgba(255,0,0,'+opacity+')';
        //let clr = 'rgba(255,255,255,'+opacity+')';
        shp.stroke = clr;
        shp.fill = clr;
      }
    }
  }  
}
 return item;
});
