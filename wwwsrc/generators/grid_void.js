core.require('/shape/rectangle.js','/generators/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {

addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
rs.setName('grid_void');

let gpOuter  = {
	randomizingFactor:0,
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:3,
	sizePower:2,
	sizeMap:  {0:1,1:1,2:2,3:4},
	opacityMap:  {0:0,1:0.4,2:0.4,3:1},
  colorMap: 
		{
			0:  'transparent',
			1:  'rgba(255,0,0,0.4)',
			2:  'rgba(255,255,255,0.4)',
			3:  'black'
		}
};

rs.paramsByCell = function (cell) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	let cx = numCols/2;
	let cy = numRows/2;
	let maxd = Math.sqrt(cx*cx + cy*cy);
	let xdc = x - cx;
	let ydc = y - cy;
	let cd = Math.sqrt(xdc*xdc + ydc*ydc);
	let df = cd/maxd;
	let yf = y/numRows;
	let lwf = 0;
	let hwf = 1.2;
	let wf = lwf + df * (hwf-lwf);
	gpOuter.widthFactor = wf
	gpOuter.heightFactor = wf
	return gpOuter;
}
	

rs.globalParams = {genCircles:0,genPolygons:0,randomizingFactor:0};

let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:1,	
  numRows : 96,
  numCols : 96,
	backgroundColor : 'red',
	backStripeColor: 'rgb(2,2,2)',
	backStripePadding:15,
	backStripeVisible:1
}
Object.assign(rs,newTopParams);

	
	
rs.initProtos = function () {
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}


rs.initialize = function () {
	debugger;
		this.initProtos();
  this.addBackground();
	this.initializeGrid();
  //central square
  let rect = this.set('rect',this.rectP.instantiate()).show();
  let rdim = 10;
	rect.width = rdim;
	rect.height = rdim;
	rect.fill = 'black';
}

return rs;


});

