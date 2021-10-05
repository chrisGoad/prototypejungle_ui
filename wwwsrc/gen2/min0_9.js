
core.require('/line/line.js','/gen0/min0.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,addBasis,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
rs.setName('min0_9');
let wd= 2000;
let ht = 0.1*wd;

let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*wd,minConnectorLength:ht,maxConnectorLength:2*ht,maxLoops:100000}
let  grid0Params = {width:wd,height:ht,numRows:2,numCols:100}
let  grid1Params = {width:wd,height:ht,numRows:2,numCols:100,pos:Point.mk(0,-5*ht)};


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
	this.lineP['stroke-width'] = 5;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'green';
	this.lineP2['stroke-width'] = 5;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initBasis();
	debugger;
	let pnts0 = this.genGrid(grid0Params);
	let pnts1 = this.genGrid(grid1Params);
	this.addWeb(pnts0);
	debugger;
	this.addWeb(pnts1,this.lineP2);
	this.addSegs();
}


return rs;

});

