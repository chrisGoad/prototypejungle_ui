// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js', 
 function (linePP,circlePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  //core.assignPrototypes(this,'blineP',linePP);
  //this.blineP.stroke = 'yellow';
  //this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'green';
  let vec = Point.mk((this.width/this.numRows)*1,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .2;
  core.assignPrototypes(this,'shapeP2',circlePP);
  this.shapeP2.stroke = 'red';
  this.shapeP2.dimension = (this.width/this.numRows)*0.6;
  this.shapeP2['stroke-width'] = 0;; 	
}   	


item.initialize = function () {
  debugger;
 core.root.backgroundColor = 'rgb(150, 43, 43)';
 // core.root.backgroundColor = 'black';
  let numRows = this.numRows = 50;
  let numCols = this.numCols = 50;
  this.width = 100;
  this.height = 100;
  this.initializeProtos();
  this.chanceShapeIsVisible = 1;
  this.pointJiggle = 0;
  this.shapeOppp = function (shp) {
    console.log('shapeOp');
    this.directLineRandomly(shp,.5);
  }
  this.includeShapes = true;
  this.includeCellBoundaries = false;
  this.randomizeWhichLineColors = 'niether';
  this.chanceShape2IsVisible = 0.2;
  this.lineShapeLength = 4;
  //core.root.backgroundColor = 'black';
  this.shapeGenerationFunction = function (grid,shapes,idx) {
    //let rs = (Math.random() < 0.5)?grid.shapeP1.instantiate():grid.shapeP2.instantiate();
    let rs = grid.shapeP1.instantiate();
    shapes.set(idx,rs);
    grid.directLineRandomly(rs,.5);
    rs.update();
    rs.show();
    return rs;
  }
  this.initializeGrid();
  //core.root.backgroundColor = 'grey';
//return; 
  //let hnr = 0.5*numRows;
  //let hnc = 0.5*numCols;
  debugger;
  let maxd = 0.5 * this.width;
  for (let i = 0;i<numRows;i++){
    for (let j = 0;j<numCols;j++) {
      debugger;
      let shp = this.shapeAt(i,j);
      let center = this.centerPnt(i,j);
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
      //    clr = 'rgba(255,0,0,'+opacity+')';
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
