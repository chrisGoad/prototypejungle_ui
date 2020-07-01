
core.require('/line/line.js','/grid/spatter4.js','/grid/dim2dWalker2.js',
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

item.shapeGenerator = function (shapes,rvs,cell) {
  debugger;
	let col = cell.x;
	let inmiddle = (col > .333* this.numCols) && (col < 0.666* this.numCols);
  let shape = svg.Element.mk('<g/>');
  shapes.push(shape);
  let line0 = this.lineP.instantiate();
  let line1 = this.lineP.instantiate();
  shape.set('line0',line0);
  shape.set('line1',line1);
  line0.show();
  line1.show();
  //let rvs = randomValuesAtCell(cellx,celly);
  let dir = rvs.direction;
  let len = rvs.length;
  let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
  let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
  let end0 = vec0.minus();
  let end1 = vec0;
  line0.setEnds(end0,end1);
  let r = rvs.red;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	if (inmiddle) {
		line0.stroke = 'red';
	} else {
    line0.stroke = rgb;
	}
  line0.update();
  end0 = vec1.minus();
  end1 = vec1;
  line1.stroke = rgb;
  line1.setEnds(end0,end1);
  line1.update();
  return shape;
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
  let rnds = this.randomGrids = {};
  let  rParams = {step:5,min:5,max:10,numRows:this.numRows,numCols:this.numCols};
  rnds.length  = rm.genRandomGrid(rParams);
  let  dParams = {step:0.2* Math.PI,min:1.95*Math.PI,max:2*Math.PI,numRows:this.numRows,numCols:this.numCols};
  rnds.direction  = rm.genRandomGrid(dParams);
  let  cParams = {step:30,min:50,max:250,numRows:this.numRows,numCols:this.numCols};
  rnds.red  = rm.genRandomGrid(cParams);
   
  this.spatter();
}	
return item;
});
 