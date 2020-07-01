
core.require('/line/line.js','/shape/circle.js','/grid/addGrid4.js','/grid/dim2dWalker2.js',function (linePP,circlePP,addMethods,addShadeMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
//addShadeMethods(item);

/*adjustable parameters  */


item.ppositionFunction = function (grid,i,j,botx,boty,topy) {
  let {deltaX,numRows,numCols} = grid;
 /* let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let botx = -0.5 * xdim;
  let boty = 0.5 * ydim + yoffset;*/
  let ax = (j/numCols) * deltaX
  let deltaY = (i/numRows) * (boty - topy)/numRows;
  return Point.mk(botx + j*ax, boty - i*deltaY);
}

item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP.stroke = 'rgb(100,100,100)';
  this.blineP.stroke = 'rgb(200,0,0)';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'rgb(250,100,100)';
  let vec = Point.mk((this.width/this.numRows)*0.05,0);
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
  this.numRows= 81;
  this.numRows= 41;
  //let numCols = this.numCols= 81;
  let numCols = this.numCols= 81;
  //let numRows = this.numRows= 41;
  let numRows = this.numRows= 41;
  this.width = 180;
  this.height = 100;
  this.visChance= 1;
  //this.visChance= 1;
  this.pointJiggle =  2;
  this.includeShapes = true;
//  this.includeShapes = false;
  //this.bendCircleRadius = 130;
  //this.bendCircleY = 100;
  this.randomizeWhichColors = 'boundaries';
 // this.randomizeWhichColors = 'none';
  core.root.backgroundColor = 'black';
 /* this.colorRangeL = [0,5.5,-55.5];
  this.colorRangeH = [200,200,50]
  this.colorStep = [15,15,15];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  this.rangeL = [60,60,60];
  this.rangeH = [250,250,250];
  this.maxStep = [2.5,25,25];*/
  let sc = this.randomizer = {};
  addShadeMethods(sc);
   this.shadeGrid = sc.genShadeGrid({numRows:numRows,numCols:numCols+1,
                                    rangeL:[20,20,20],rangeH:[250,250,250],maxStep:[35,35,35]});
  
  let hj = 0.5*this.pointJiggle;
  let jiggleStep = 0.3 * hj;
  this.jiggleX = sc.genRandomGrid(numCols+0,numRows,jiggleStep,-hj,hj);
  this.jiggleY = sc.genRandomGrid(numCols+0,numRows,jiggleStep,-hj,hj);                           
 
  //let sc = this.shadeContainer = {};
  //this.pointRandomizer = sc;
  debugger;
 
 // sc.shades = [];
 /* sc.rangeL = [0,0,0];
  sc.rangeH = [100,100,100];
  sc.maxStep = [20,20,20];
  sc.numRows = this.numRows+1;
  sc.numCols = this.numCols+1;
  debugger;
 
*/
 /*  sc.genShades();
    let sc2 = this.shadeContainer2 = {};
  this.colorRandomizer = sc2;
  sc2.shades = [];
  sc2.rangeL = [100,100,100];
  sc2.rangeL = [60,60,60];
  sc2.rangeH = [200,200,200];
  sc2.maxStep = [20,20,20];
  sc2.numRows = this.numRows;
  sc2.numCols = this.numCols+1;
  debugger;
  addShadeMethods(sc2); */

  this.shade2rgb = function (ic) {
    let [r,g,b] = ic;
   // let c = [r,r,0]; //yellow
   // let c = [r,g,b]; 
   let c = [r,r,r]; //white
    return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])})`;
  }
  // sc2.genShades();
   debugger;
//    this.genShades();

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
      

