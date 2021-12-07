
core.require('/shape/rectangle.js','/generators/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
	
rs.setName('grid_quilt_1');


rs.globalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	sizePower:2,
	genCircles:0,
	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
};
		
let newTopParams = {
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:2,	
  numRows : 64,
  numCols : 64,
	backgroundColor : 'white'
}
Object.assign(rs,newTopParams);

	

rs.sizeFactor = function ( cell) {
	let {x,y} = cell;
	let px = this.numPowers(x,2);
	let py = this.numPowers(y,2);
	return Math.min(px,py);
}

rs.colorSetter = function (shape,fc) {
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}
	
rs.initProtos = function () {
	/* core.assignPrototypes(this,'lineP',linePP);
   this.lineP['stroke-width'] = 0;
   this.lineP.stroke = 'red'; */
	 core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0;//0.4;
}


rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
  this.initProtos();
  this.initializeGrid();
}	
return rs;


});

