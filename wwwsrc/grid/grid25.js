
//core.require('/line/line.js','/shape/circle.js','/grid/addGrid4.js','/grid/addShades.js',function (linePP,circlePP,addMethods,addShadeMethods) {
core.require('/line/line.js','/shape/circle.js','/grid/addGrid4.js','/grid/dim2dWalker.js',function (linePP,circlePP,addMethods,addShadeMethods) {
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
  let numCols = this.numCols= 41;
  let numRows = this.numRows= 41;
  this.width = 180;
  this.height = 100;
  this.visChance= 0.4;
  //this.visChance= 1;
  this.pointJiggle = 3;
  this.includeShapes = true;
//  this.includeShapes = false;
  //this.bendCircleRadius = 130;
  //this.bendCircleY = 100;
  this.randomizeWhichColors = 'boundaries';
 // this.randomizeWhichColors = 'none';
  core.root.backgroundColor = 'black';
  this.colorRangeL = [0,5.5,-55.5];
  this.colorRangeH = [200,200,50]
  this.colorStep = [15,15,15];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  this.rangeL = [60,60,60];
  this.rangeH = [250,250,250];
  this.maxStep = [2.5,25,25];
  let sc = this.randomizer = {};
  addShadeMethods(sc);
  /*let n = this.numRows * this.numCols;
  this.jiggleX = [];
  this.jiggleY = [];
  this.jiggleX.length = n;
  this.jiggleY.length = n;
  
  sc.numRows = this.numRows+1;
  sc.numCols = this.numCols+1;*/
  debugger;
  let hj = 0.5*this.pointJiggle;
  let jiggleStep = 0.3 * hj;
  this.jiggleX = sc.genRandomGrid(numCols+1,numRows+1,jiggleStep,-hj,hj);
  this.jiggleY = sc.genRandomGrid(numCols+1,numRows+1,jiggleStep,-hj,hj);                           
  this.shade2rgb = function (ic) {
    let [r,g,b] = ic;
   let c = [r,r,0]; //yellow
   //let c = [r,g,b]; //yellow
   //let c = [r,r,r]; //white
    return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])})`;
  } 
  this.shadeGrid = sc.genShadeGrid({numRows:numRows,numCols:numCols,bias:0,
                                    rangeL:[60,60,60],rangeH:[200,200,200],maxStep:[20,20,20]});
  
  debugger;

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
      

