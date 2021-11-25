//active
core.require('/line/line.js','/gen0/GridRandom.js',
function (linePP,GridP) {
  
let rs = GridP;

let wd = 400;

let topParams ={width:wd,height:wd,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.5*wd};

Object.assign(rs,topParams);
debugger;
rs.saveImage = true;
rs.setName('grid0_43');
//rs.width = 400;
//rs.height = 400;
rs.numDrops =5000;
rs.numRows = 40;
rs.numCols = 40;
rs.spatter = 1;

	

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.1;
}  

rs.shapeGenerator = function (rvs,cell) {
  debugger;
	let {shapes,lineP} = this;
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
  let dir = rvs.direction;
  let len = rvs.length;
  let vec0 = Point.mk(Math.cos(dir),Math.sin(dir)).times(len/0.3);
  let vec1 = Point.mk(-Math.sin(dir),Math.cos(dir)).times(len/0.31);
  let end0 = vec0.minus();
  let end1 = vec0;
  line0.setEnds(end0,end1);
  let r = rvs.shade;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
	if (inmiddle) {
		line0.stroke = 'red';
		line0['stroke-width'] = 0.2;
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
	
rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('length',  {step:5,min:20,max:30});
	//this.setupShapeRandomizer('length',  {step:5,min:5,max:10});
	this.setupShapeRandomizer('direction', {step:0.2* Math.PI,min:1.95*Math.PI,max:2*Math.PI});
	this.setupShapeRandomizer('shade', {step:30,min:50,max:250});
  this.initializeGrid();
}	
return rs;
});
 