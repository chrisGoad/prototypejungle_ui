
//core.require('/shape/circle.js','/gen1/grid0_8.js',
core.require('/shape/circle.js','/gen0/GridLinesRandom.js','/mlib/ParamsByCell.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (circlePP,rs,addParamsByCellMethods)	{ 
  debugger;
  addParamsByCellMethods(rs);
  let numRows = 64;
	let ht = 1000;
	
	let topParams = {numRows:numRows,numCols:numRows,width:1.5*ht,height:ht,randomizeOrder:1,orderByOrdinal:0,backgroundColor:'blue',backgroundPadding:0.05*ht};
	//topParams = {numRows:numRows,numCols:numRows,width:1000,height:1000,randomizeOrder:1,orderByOrdinal:0,backgroundColor:'blue',numTimeSteps:50};
	Object.assign(rs,topParams);
	debugger;
	rs.setName('grid0_8_3');
	rs.paramsByRow = [];
	
const setParamsByRow = function () {
	let hr = numRows/2;
	let pbr = rs.paramsByRow;
	for (let i=0;i<numRows;i++)  {
	//	if	(i<hr) {
		if	(i%8 === 4) {
			pbr[i] = {'sizePower':3};
		}
	}
}

setParamsByRow();
			
			

rs.initProtos = function () {	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'white';
  this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 2;  
}

		
		
	
rs.finishProtoss = function () {
	debugger;
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 2;
}

	let oo = 0.3;
	let globalValues = {opacityMap:{0:oo,1:oo,2:oo,3:oo,4:oo,5:oo,6:oo},
	widthFactor:1,
	heightFactor:1,
	sizePower:2,
	maxSizeFactor:5,
	genCircles: 1,
  sizeMap:{0:1,1:2,2:4,3:8,4:0,5:0,6:0},
 // sizeMap:{0:1,1:1,2:2,3:3,4:0,5:0,6:0},
	colorMap:{
	0:rs.toFun('white'),
	1:rs.toFun('white'),
	2:rs.toFun('white'),

	3:rs.toFun('white'),

	4:(r,g,b,opacity) => `rgba(0,0,255,${opacity})`,

	5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
	6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`}};
	debugger;
rs.globalParams = globalValues;
//Object.assign(rs.globalParams,globalValues);
rs.step = function ()   {
	//debugger;
	let theShapeOrder = this.theShapeOrder;
	
	this.shapes.remove();
	this.set('shapes',core.ArrayNode.mk());
	this.perturbArray(theShapeOrder,20);
  this.inverseShapeOrder = this.invertMap(theShapeOrder); 
 
	this.addShapes();
	this.draw();
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}
rs.initialize = function () {
	debugger;
	this.initProtos();
	this.initializeGrid();
}
debugger;
return rs;

});

