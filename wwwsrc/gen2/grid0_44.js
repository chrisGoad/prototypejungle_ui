// active

//core.require('/shape/blurredCircle.js',function (elementPP) {
//core.require('/line/line.js','/shape/circle.js','/grid/addGrid3.js', 
core.require('/line/line.js','/shape/circle.js','/gen0/Basics.js','/mlib/grid0.js', '/mlib/topRandomMethods.js',
 function (linePP,circlePP,item,addGridMethods,addRandomMethods) {
  debugger;
//let item = svg.Element.mk('<g/>');

addGridMethods(item);
addRandomMethods(item);
item.setName('grid0_44');

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
item.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,lineLength} = this;
	let line0 = this.shapeP1.instantiate();
	shapes.push(line0);
	let dir = 2*Math.PI * Math.random();
  //line0.show();
	//shapes.set(idx,line0);
  this.setLineEnds(line0,lineLength,dir);
	return line0;
}

 /*item.shapeGenerator = function (rvs,cell,cnt) {
    //let rs = (Math.random() < 0.5)?grid.shapeP1.instantiate():grid.shapeP2.instantiate();
		let {shapes} = this;
    let shape = this.shapeP1.instantiate();
    shapes.push(shape);
    this.directLineRandomly(shape,.5);
    shape.update();
    shape.show();
    return shape;
  }*/
	let wd = 100;
let params = {backStripeColor:'rgb(152,45,45)',backStripePadding:0.1*wd,backStripeVisible:0};
Object.assign(item,params);

item.initialize = function () {
  debugger;
 core.root.backgroundColor = 'rgb(150, 43, 43)';
 // core.root.backgroundColor = 'black';
  let numRows = this.numRows = 50;
  let numCols = this.numCols = 50;
  this.width = 100;
  this.height = 100;
  this.initializeProtos();
	this.lineLength =   this.width/this.numRows*1;
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
