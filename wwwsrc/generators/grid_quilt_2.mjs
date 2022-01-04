//active
//core.require('/shape/rectangle.js','/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid0.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
//function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods) {


import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
import {rs as addParamsByCellMethods} from '/mlib/ParamsByCell.mjs';
let rs = basicsP.instantiate();
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (rectPP,rs)	{ 
addRandomMethods(rs);
addGridMethods(rs);
addParamsByCellMethods(rs);

rs.setName('grid_quilt_2');

let opacity = 1;

rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,genCircles:0,genPolygons:0,
	widthFactor:0.7,
	heightFactor:0.7,
	maxSizeFactor:3,
	sizePower:2,
	genPolygons:0,
  randomizingFactor:0,
  genCircles:0,genPolygons:0,
	sizeMap:  {0:1,1:1,2:1,3:1},
  colorMap: 
		{
			0:  `rgba(255,200,0.4)`,
			1:  `rgba(255,0,0,0.4)`,
			2:  `rgba(255,255,255,0.4)`,
			3:  `rgba(255,255,0,0.4)`,
		}
};

let wd = 300;
let topParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:1,	
  numRows : 64,
  numCols : 64,
	width:1000,
	height:1000,
	backgroundColor : 'yellow',
//	backStripeColor : 'rgb(2,2,2)' 
}
Object.assign(rs,topParams);

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
}  

rs.initialize = function () {
	debugger;
  core.root.backgroundColor = 'black'
	this.initProtos();
  this.addBackground();// interesting effect by removing this
	this.initializeGrid();
}

export {rs};


