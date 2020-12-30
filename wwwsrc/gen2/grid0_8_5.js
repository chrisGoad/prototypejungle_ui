
core.require('/gen1/grid0_8.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (template,addSetName)	{ 

	
	  let rs = svg.Element.mk('<g/>');
		addSetName(rs);

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());

	rs.setName('grid0_8_5');

// var 3
let topParams = {randomizeOrder:0,orderByOrdinal:1,width:300,height:300,poinJiggle:0,backgroundColor:'black',numRows:30,numCols:30}
//topParams = {randomizeOrder:1,orderByOrdinal:0,width:300,height:300,poinJiggle:3,backgroundColor:'yellow',numRows:96,numCols:96}

Object.assign(grid0,topParams);
Object.assign(grid1,topParams);
grid1.backgroundColor = 'yellow';

let oo = 0.4;
let globalParamsT = {
	opacityMap:{0:oo,1:oo,2:oo,3:oo,4:oo,5:oo,6:oo},
	widthFactor:2,
	heightFactor:1,
	sizePower:2,
	maxSizeFactor:13,
	genCircles: 0,
	randomizingFactor:0,
	colorMap:{
0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`},
sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};

let globalParams0 = {}; Object.assign(globalParams0,globalParamsT);
let globalParams1 = {}; Object.assign(globalParams1,globalParamsT);

globalParams1.colorMap = {
1:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
0:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
3:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
2:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`,
//4:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`};
globalParams1.sizePowerr = 4;
//globalParams1.sizeMap = {0:1.5,1:1,2:3,3:2,4:4,5:0,6:0};
globalParams1.sizeMap = {0:1.5,1:1,2:3,3:2,4:0,5:0,6:0};


grid1.globalParams = globalParams1;
grid0.globalParams = globalParams1;

let pbr = [];
grid1.paramsByRow = pbr;
grid0.paramsByRow = pbr;
let sw = 1;
let ew = 4;
const setPbr = function () {
	let nr = grid1.numRows;
	for (let i = 0;i<nr;i++) {
		let fr = i/nr;
		pbr[i] = {widthFactor:sw + fr*(ew-sw)};
	}
}
//setPbr();
debugger;
rs.initialize = function () {
	core.root.backgroundColor = 'black';
	let wd = this.grid0.width;
	this.grid0.initialize();
	this.grid1.initialize();
	let mvp = 0.6;
	this.grid0.moveto(Point.mk(-mvp*wd,0));
	this.grid1.moveto(Point.mk(mvp*wd,0));

}

return rs;

});

