
core.require('/shape/circle.js','/shape/rectangle.js','/gen0/grid0.js',
function (circlePP,rectPP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.saveImage = 0;
rs.setName('spatter_1');
rs.width = 800;
  rs.height = 800;
  rs.numDrops =3000;
	rs.numRects = 10;
  rs.numRows = 20;
  rs.numCols = 20;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'rgba(0,0,0,1)';
  this.circleP.fill = 'rgba(0,0,200)';
  this.circleP['stroke-width'] = 0;
  this.circleP['stroke-width'] = 1;
  this.circleP.dimension = 4;
	 core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.stroke = 'rgba(0,0,0,1)';
  this.rectP.fill = 'rgba(0,0,200)';
  this.rectP['stroke-width'] = 0;
  this.rectP['stroke-width'] = 1;
}  

rs.count = 0;
rs.spatterGenerator =  function (rvs,cell,pnt) {
	let {shapes,circleP,rectP,count,rects} = this;
//item.setLenDir = function (shape,len,dir) {
	let dim = rvs.dimension;
	let genRect = (rects.indexOf(count) >= 0);
	let shape;
	if (genRect) {
		shape = this.rectP.instantiate();
		shape.width = dim;
		shape.height = dim;
	} else {
    shape = this.circleP.instantiate();
    shape.dimension = dim;
	}
	shapes.push(shape);
	let r = rvs.shade;
  let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  shape.fill = rgb;
  shape.update();
	rs.count = count+1;
  return shape;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
	let {numRects,numDrops} = this;
	this.rects = [];
	
	for (let i=0;i<numRects;i++) {
		let rn = Math.floor(Math.random() * (numDrops-1));
		this.rects.push(rn);
	}
  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('shade',{step:35,min:50,max:250});
	this.setupShapeRandomizer('dimension',{step:5,min:1,max:30});
  this.initializeGrid();
}	
return rs;
});
 