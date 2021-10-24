//active
core.require('/line/line.js','/gen0/Pgen.js','/gen0/Web.js',function (linePP,Pgen,WebP) {
//core.require('/line/line.js','/gen0/Basics.js','/gen0/PgenWeb.js',function (linePP,Basis,PgenWebP) {
//core.require('/line/line.js','/mlib/basics.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,addBasis,addPointGenMethods,addWebMethods) {

let rs = Pgen;


/*
PgenWebP.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints} = this;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let d = pi.distance(pj);
	return (mnCln < d) && (d < mxCln);
}*/

Pgen.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 3;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'rgb(100,150,250)';
	this.lineP2.stroke = 'blue';
	//this.lineP2.stroke = 'red';
	this.lineP2['stroke-width'] = 3;
}  
//WebP.initProtos();
rs.setName('min0_10');
let wd= 2000;
let ht = 0.2*wd;
let nr  = 2;

let  webParams = {width:wd,height:ht,numRows:2,numCols:100,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxLoops:100000};

Object.assign(WebP,webParams);
let grid0 = rs.set('grid0',WebP.instantiate());
let grid1 = rs.set('grid1',WebP.instantiate());
let grid2 = rs.set('grid2',WebP.instantiate());
let grid3 = rs.set('grid3',WebP.instantiate());
let grid4 = rs.set('grid4',WebP.instantiate());

//let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*wd,minConnectorLength:ht,maxConnectorLength:2*ht,maxLoops:100000}
let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(100,22,22)',backgroundWidth:1.2*wd,backgroundHeight:1.2*wd,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxLoops:100000}
let  gridParams = {width:wd,height:ht,numRows:nr,numCols:150}
/*let  grid0Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,-2*ht)}
let  grid1Params = {width:1*wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,-1*ht)};
let  grid2Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,0*ht)}
let  grid3Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,1*ht)}
let  grid4Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,2*ht)}*/


Object.assign(rs,topParams);

rs.initialize = function () {
	let {grid0,grid1,grid2,grid3,grid4} = this;
  core.root.backgroundColor = 'black';
  core.root.backgroundColor = 'rgb(100,20,20)';
	this.initBasis();
	let pnts = this.genGrid(gridParams);
	grid0.moveto(Point.mk(0,-2*ht));
	grid1.moveto(Point.mk(0,-ht));
	grid3.moveto(Point.mk(0,ht));
	grid4.moveto(Point.mk(0,2*ht));
	this.grid0.addWeb(pnts,this.lineP);
	this.grid1.addWeb(pnts,this.lineP2);
	this.grid2.addWeb(pnts,this.lineP);
	this.grid3.addWeb(pnts,this.lineP2);
	this.grid4.addWeb(pnts,this.lineP);
}


return rs;

});

