
core.require('/ngen1/grid0_deco.js','/gen0/Basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (template,basicP)	{ 

	
	  let rs = basicP.instantiate();

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());
	let grid2= rs.set('grid2',template.instantiate());

	rs.setName('grid0_8_9');

// var 3
let topParams = {randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
//topParams = {randomizeOrder:1,orderByOrdinal:0,width:300,height:300,poinJiggle:3,backgroundColor:'yellow',numRows:96,numCols:96}

Object.assign(grid0,topParams);
Object.assign(grid1,topParams);
Object.assign(grid2,topParams);
//grid1.randomizeOrder = 1;
grid2.numCols = 64+8; 
//grid1.numRows = 27;

let oo = 0.1;
let b = 255;
let r = 255;
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
0:`rgba(0,150,0,${oo})`,
1:(r,g,b,oo) => `rgba(150,150,150,${oo})`,
2:`rgba(200,200,200,${oo})`,
//2:`rgba(255,255,255,${oo})`,
3:`rgba(0,${b},${b},${oo})`,
//3:`rgba(0,255,255,${oo})`,
4:`rgba(0,0,${r},${oo})`,
5:`rgba(0,0,0,${oo})`,
6:`rgba(${r},${r},0,${oo})`},
sizeMap:{0:2,1:2,2:2,3:3,4:4,5:0,6:0}};
//opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};

let globalParams0 = {}; Object.assign(globalParams0,globalParamsT);
let globalParams1 = {}; Object.assign(globalParams1,globalParamsT);
/*
globalParams1.colorMapp = {
//0:`rgba(100,100,100,${opacity})`,
0:`rgba(150,0,0,${opacity})`,
1:`rgba(150,150,150,${opacity})`,
2:`rgba(200,200,200,${opacity})`,
//2:`rgba(255,255,255,${opacity})`,
3:`rgba(0,${b},${b},${opacity})`,
4:`rgba(0,0,${r},${opacity})`,
5:`rgba(0,0,0,${opacity})`,
6:`rgba(${r},${r},0,${opacity})`};
*/
//globalParams1.widthFactor = 1;
//globalParams1.sizePower = 3;
//globalParams1.maxSizeFactor = 3;


grid2.globalParams = globalParams1;
grid1.globalParams = globalParams1;
grid0.globalParams = globalParams1;

let pbr0 = [];
let pbr1 = [];
let pbr2 = [];
grid2.paramsByRow = pbr2;
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
setPbr(0,pbr2);
debugger;
rs.initialize = function () {
	core.root.backgroundColor = 'black';
	let wd = this.grid0.width;
	this.grid0.initialize();
  this.grid1.theShapeOrder = this.grid0.theShapeOrder;
  this.grid1.inverseShapeOrder = this.grid0.inverseShapeOrder;
	
	this.grid1.initialize();
	this.grid2.initialize();
	let mvp = 1.1;
	this.grid0.moveto(Point.mk(-mvp*wd,0));
	this.grid2.moveto(Point.mk(0,0));
	this.grid1.moveto(Point.mk(mvp*wd,0));

}

return rs;

});

