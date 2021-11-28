
core.require('/shape/circle.js','/gen0/Basics.js','/mlib/grid0.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
function (circlePP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {

//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rectPP,rs)	{ 
addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);

//core.require('/gen1/grid0_8.js','/gen1/layeredGrid1.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rs,layeredSetup)	{ 

	
rs.setName('grid0_8_14');
//layeredSetup(rs);

let opa = 0.8;

rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,maxSizeFactor:4,genPolygons:0,
	 opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	  colorMap:{0: `rgba(0,255,0,${opa}`,
	  //colorMap:{0: (r,g,b,opacity) => 'white',//`rgba(${r},0,0,${opacity})`,
	            1: `rgba(255,0,0,${opa})`,
		          2:`rgba(255,255,255,${opa})`,
	            3:`rgba(0,0,255,0.5)`,
		          4:`rgba(0,0,255,1)`,
		          5:`rgba(0,0,255,${opa})`,
	            6:`rgba(255,255,255,${opa})`},
		sizeMap: {0:1,1:1,2:2,3:2,4:4,5:1,6:1},
    genCircles:1
};
		
let topParams = {
  /*ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 1,
	randomizeOrder : 0,*/
  pointJiggle:2,	
  numRows : 96,
  numCols : 96,
	width:300,
	height:300,
	backgroundColor : 'black',
  orderByOrdinal:1,
  ordinalMap:[0,1,2,3,4,5]
}
Object.assign(rs,topParams);

	
	
rs.initProtos = function () {
	//this.rectP.stroke = 'rgba(0,0,0,.8)';
	core.assignPrototypes(this,'circleP',circlePP);

	this.circleP.stroke = 'rgba(0,0,0,.8)';

	this.circleP['stroke-width'] = 1;
	//this.rectP['stroke-width'] = 0..2;
}


rs.initialize = function () {
	debugger;
  this.sizeFactor({x:1,y:1});
  this.sizeFactor({x:2,y:2});
  this.sizeFactor({x:4,y:4});
  this.sizeFactor({x:8,y:8});
  core.root.backgroundColor = 'black'
	this.initProtos();
/*	let backRect = this.set('backRect',this.rectP.instantiate().show());
	backRect.width = this.width;
	backRect.height = this.height;
	this.backgroundPadding = 0.1*this.height;
	backRect.fill = 'yellow';*/
	this.initializeGrid();
}

return rs;


});

