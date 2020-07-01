
core.require('/line/line.js','/grid/spatter.js','/grid/dim2dWalker2.js',
function (linePP,addSpatterMethods,addRandomMethods) {
  
let item = svg.Element.mk('<g/>');

item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgba(0,0,0,1)';
  this.lineP.fill = 'rgba(0,0,200)';
  this.lineP['stroke-width'] = 0;
  this.lineP['stroke-width'] = 0.2;
  this.lineP.dimension = 4;
}  

item.shapeGenerator = function (shapes,len,dir0,dir1,color) {
  debugger;
  let shape = svg.Element.mk('<g/>');
  shapes.push(shape);
  let line0 = this.lineP.instantiate();
  let line1 = this.lineP.instantiate();
  shape.set('line0',line0);
  shape.set('line1',line1);
  line0.show();
  line1.show();
  let vec0 = Point.mk(Math.cos(dir0),Math.sin(dir0)).times(len/0.3);
  let vec1 = Point.mk(-Math.sin(dir1),Math.cos(dir1)).times(len/0.31);
  let end0 = vec0.minus();
  let end1 = vec0;
  line0.setEnds(end0,end1);
  line0.stroke = color;
  line0.update();
  end0 = vec1.minus();
  end1 = vec1;
  line1.setEnds(end0,end1);
  line1.stroke = color;
  line1.update();
  return shape;
  }
  
item.rgb2color = function (r,g,b) {
    return `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  }
item.initialize = function () {
  debugger;
  this.initializeProto();
  core.root.backgroundColor = 'black';
  this.width = 400;
  this.height = 400;
  this.numDrops =5000;
  addSpatterMethods(this);
  let rm = this.randomizer = {};
  addRandomMethods(rm);
  this.numRows = 40;
  this.numCols = 40;
 // let  rParams = {step:0.1,min:0,max:1,numRows:this.rDivisions,numCols:this.rDivisions};
  let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols:this.numCols};
  this.sizes  = rm.genRandomGrid(rParams);
  //let  dParams = {step:0.2* Math.PI,min:1.95*Math.PI,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
  let  dParams = {step:0.2* Math.PI,min:1.95*Math.PI,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
  this.directions0  = rm.genRandomGrid(dParams);
  this.directions1  = this.directions0;//rm.genRandomGrid(dParams);
  let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
  this.redR  = rm.genRandomGrid(cParams);
  this.greenR  = rm.genRandomGrid(cParams);
  this.blueR  = rm.genRandomGrid(cParams);
   
  this.spatter();
}	
return item;
});
 