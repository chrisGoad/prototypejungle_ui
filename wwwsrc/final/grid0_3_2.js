
//core.require('/gen1/grid0_3.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (constructor)	{ 

core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (constructor,addSetName)	{ 
function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods)	{ 
//let rs = constructor();
rs.setName('grid0_3_2');
addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
let sqd = 100;
let ar = 2;
rs.numCols = ar*sqd;
rs.numRows = sqd;
rs.pointJiggle = 15;

rs.globalParams = {randomizingFactor:0,sizePower:2,maxSizeFactor:4,sizeMap:  {0:1,1:1,2:1,3:1}};
//widthFactor:1,heightFactor:1,genCircles:0,genPolygons:0,
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP['stroke-width'] = 1;
	
;}  
rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP} = this;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	shape.width = 50;
	shape.height = 35;
	shapes.push(shape);
	let fc = this.sizeFactor(cell);
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.4)';
	} else {
		shape.fill = 'rgba(0,0,255,0.4)';
	}
	shape.show();
	return shape;
}
rs.initialize = function () {
	this.initProtos();
	core.root.backgroundColor = 'black'
  this.initializeGrid();
}
return rs;

});

