
core.require('/gen1/grid0_8.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (template,addSetName)	{ 

	
	  let rs = svg.Element.mk('<g/>');
		addSetName(rs);

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());

	rs.setName('grid0_8_9');

// var 3
let topParams = {randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
//topParams = {randomizeOrder:1,orderByOrdinal:0,width:300,height:300,poinJiggle:3,backgroundColor:'yellow',numRows:96,numCols:96}

Object.assign(grid0,topParams);
Object.assign(grid1,topParams);
//grid1.randomizeOrder = 1;
//grid1.numCols = 64+8; 
//grid1.numRows = 27;

let oo = 0.1;;
let globalParamsT = {
	opacityMap:{0:oo,1:oo,2:1,3:oo,4:oo,5:oo,6:oo},
	widthFactor:2,
	heightFactor:2,
	sizePower:2,
	maxSizeFactor:4,
	genCircles: 0,
	randomizingFactor:0,
	colorMap:{
//0:(r,g,b,opacity) => `rgba(100,100,100,${opacity})`,
0:(r,g,b,opacity) => `rgba(0,150,0,${opacity})`,
1:(r,g,b,opacity) => `rgba(150,150,150,${opacity})`,
2:(r,g,b,opacity) => `rgba(200,200,200,${opacity})`,
//2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`},
sizeMap:{0:2,1:2,2:2,3:3,4:4,5:0,6:0}};
//opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};

let globalParams0 = {}; Object.assign(globalParams0,globalParamsT);
let globalParams1 = {}; Object.assign(globalParams1,globalParamsT);

globalParams1.colorMapp = {
//0:(r,g,b,opacity) => `rgba(100,100,100,${opacity})`,
0:(r,g,b,opacity) => `rgba(150,0,0,${opacity})`,
1:(r,g,b,opacity) => `rgba(150,150,150,${opacity})`,
2:(r,g,b,opacity) => `rgba(200,200,200,${opacity})`,
//2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`};
//globalParams1.widthFactor = 1;
//globalParams1.sizePower = 3;
//globalParams1.maxSizeFactor = 3;


grid1.globalParams = globalParams1;
grid0.globalParams = globalParams0;

let pbr0 = [];
let pbr1 = [];
grid1.paramsByRow = pbr1;
grid0.paramsByRow = pbr0;
let sw = 0.5;
let ew = 2;
const setPbr= function (is1,pbr) {
	let nr = grid1.numRows;
	let nrh = 0.5* nr;
	//let pbr = is1?pbr1:pbr0;
	let v0 = is1?sw:ew;
	let v1 = is1?ew:sw;
	for (let i = 0;i<nrh;i++) {
		let fr = i/nrh;
		pbr[i] = {widthFactor:v1 + fr*(v0-v1)};
	}
	for (let i = nrh;i<nr;i++) {
		let fr = (i-nrh)/nrh;
		pbr[i] = {widthFactor:v0 + fr*(v1-v0)};
	}
}

setPbr(0,pbr0);
//setPbr(1,pbr1);
setPbr(0,pbr1);
debugger;
rs.initialize = function () {
	core.root.backgroundColor = 'black';
	let wd = this.grid0.width;
	this.grid0.initialize();
  this.grid1.theShapeOrder = this.grid0.theShapeOrder;
  this.grid1.inverseShapeOrder = this.grid0.inverseShapeOrder;
	
	this.grid1.initialize();
	let mvp = 0.6;
	this.grid0.moveto(Point.mk(-mvp*wd,0));
	this.grid1.moveto(Point.mk(mvp*wd,0));

}

return rs;

});

