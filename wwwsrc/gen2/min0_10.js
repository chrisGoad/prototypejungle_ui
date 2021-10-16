
core.require('/line/line.js','/gen0/min0.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,addBasis,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
rs.setName('min0_10');
let wd= 2000;
let ht = 0.2*wd;
let nr  = 2;

//let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*wd,minConnectorLength:ht,maxConnectorLength:2*ht,maxLoops:100000}
let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundWidth:1.2*wd,backgroundHeight:1.2*wd,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxLoops:100000}
let  grid0Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,-2*ht)}
let  grid1Params = {width:1*wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,-1*ht)};
let  grid2Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,0*ht)}
let  grid3Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,1*ht)}
let  grid4Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,2*ht)}


Object.assign(rs,topParams);


rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints} = this;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let d = pi.distance(pj);
	return (mnCln < d) && (d < mxCln);
}
rs.initProtos = function () {	
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

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  //core.root.backgroundColor = 'blue';
	this.initBasis();
	this.addBackground();
	debugger;
	let pnts0 = this.genGrid(grid0Params);
	let pnts1 = this.genGrid(grid1Params);
	let pnts2 = this.genGrid(grid2Params);
	let pnts3 = this.genGrid(grid3Params);
	let pnts4 = this.genGrid(grid4Params);
	this.addWeb(pnts0,this.lineP);
	debugger;
	this.addWeb(pnts1,this.lineP2);
	this.addWeb(pnts2,this.lineP);
	this.addWeb(pnts3,this.lineP2);
	this.addWeb(pnts4,this.lineP);
//	this.addSegs();
}


return rs;

});

