//active
//core.require('/shape/rectangle.js','/gen1/grid0_8.js',
core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid0.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {

//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rectPP,rs)	{ 
addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);

rs.setName('grid0_8_12');

let opacity = 1;

rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,genCircles:0,genPolygons:0,
	 //opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	/*  colorMap:{0: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
	            1: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		          2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		          4:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		          5:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            6:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`},
		sizeMap: {0:1,1:1,2:1,3:1,4:1,5:1,6:1},*/
	widthFactor:0.7,
	heightFactor:0.7,
	maxSizeFactor:3,
	sizePower:2,
	genPolygons:0,
  randomizingFactor:0,
  genCircles:0,genPolygons:0,
	sizeMap:  {0:1,1:1,2:1,3:1},
	//sizeMap:  {0:0,1:0,2:0,3:1},
	opacityMap:  {0:0.2,1:0.4,2:0.5,3:0.5},
  colorMap: 
		{
			0:  `rgba(255,200,0.1)`,
			1:  `rgba(255,0,0,0.4)`,
			2:  `rgba(255,255,255,0.5)`,
			3:  `rgba(255,255,0,0.5)`,
		}
};
/*rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,maxSizeFactor:2,genCircles:0,genPolygons:0,
	 opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	  colorMap:{0: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
	            1: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		          2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		          4:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		          5:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            6:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`},
		sizeMap: {0:1,1:1,2:1,3:1,4:1,5:1,6:1},
		};
*/
let wd = 300;
let topParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:1,	
  numRows : 64,
  numCols : 64,
//	width:1000,
//	height:1000,
	backgroundColor : 'yellow',
	backStripeColor : 'rgb(2,2,2)' 
	
}
Object.assign(rs,topParams);
//let topParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:wd,height:wd,backgroundColor:'rgb(200,2,2)',backgroundPadding:0.1*wd,pointJiggle:3,
//ordinalMap: {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7}}



rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
  //core.assignPrototypes(this,'circleP',circlePP);
	//	core.assignPrototypes(this,'polygonP',polygonPP);
}  

/*
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0;
}
*/
	
	
rs.initProtoss = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.polygonP['stroke-width'] = 0.2;
}


rs.initialize = function () {
	debugger;
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

