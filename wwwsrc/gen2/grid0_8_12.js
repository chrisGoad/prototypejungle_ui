//active
core.require('/shape/rectangle.js','/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,rs)	{ 

	
rs.setName('grid0_8_12');
	
let newGlobalParams  = {
	widthFactor:0.7,
	heightFactor:0.7,
	maxSizeFactor:3,
	szPower:2,
	genPolygons:0,
	sizeMap:  {0:1,1:1,2:1,3:1},
	//sizeMap:  {0:0,1:0,2:0,3:1},
	opacityMap:  {0:0.2,1:0.4,2:0.5,3:0.5},
  colorMap: 
		{
			0:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			1:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			2:  (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
			3:  (r,g,b,opacity) => `rgba(255,255,0,${opacity})`,
		}
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:4,	
  numRows : 64,
  numCols : 64,
//	width:1000,
//	height:1000,
	backgroundColor : 'yellow',
	backStripeColor : 'rgb(2,2,2)' 
	
}
Object.assign(rs,newTopParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
  //core.assignPrototypes(this,'circleP',circlePP);
	//	core.assignPrototypes(this,'polygonP',polygonPP);
}  


rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0;
}

	
	
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
	this.innerInitialize();
}

return rs;


});

