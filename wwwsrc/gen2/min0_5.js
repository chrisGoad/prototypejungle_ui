
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebTreeMethods(rs);
//addWebMethods(rs);
rs.setName('min0_5');
let ht= 2000;
ht = 3000;
let nrc=64;
//nrc = 8;
let mcl = 1.6*(ht/nrc);
mcl = 50
//mcl =100;
let minc = 20;
//mcl = 50;
//mcl = 3.6*(ht/nrc);
//nrc = 2;
let  topParams = {width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+minc,numPairs:2,fringeColor:'blue'};

Object.assign(rs,topParams);

rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP.stroke  = 'white';
	//lineP.stroke  = 'blue';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	
}  

const interpolate = function (v1,v2,f) {
	return v1 + (v2-v1)*f;
}

rs.inDiamond = function (p) {
	let width = this.width;
	let bd = p.boxcarDistance(Point.mk(0,0));
  return bd < 0.5 * width;
}


const inSquare = function (p,hw) {
	return (-hw < p.x) && (p.x < hw) && (-hw < p.y) && (p.y < hw);
	
}
rs.colorFromPoint = function (p) {
	let w = this.width;
		if (inSquare(p,0.7 * 0.5 * w)) {
		return 'red';
	}
	if (this.inDiamond(p)) {
		return 'gray';
		return 'blue';
	} 
  return 'rgb(0,100,250)'
  return 'blue'
	return 'white';
	
}
rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,height,cPoints} = this;
	debugger;
	let pi = cPoints[i];
	let pj = cPoints[j];
	//let f = 0.35;
	//let ww = f*width;
//let hh = f*height;
	let d = pi.distance(pj);
	let bd = pi.boxcarDistance(Point.mk(0,0));
	//let fr = bd/(1.0*width);
	//mxCln = 50 + interpolate(20,50,fr);
	//let ff = 0.75;
	//if (bd < 0.5 * width) {
	if (this.inDiamond(pi)) {
	//if ((-ww < pi.x) && (pi.x < ww) && (-hh < pi.y) && (pi.y < hh)) {
		mnCln = 50;
		mxCln = mnCln + 20;
	} else {
		mnCln = 50;
		mxCln = mnCln + 50;
	}
	
	//	console.log('bd',bd,'fr',fr,'mxCln',mxCln);

	return (mnCln < d) && (d < mxCln);
}


rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
//	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
	return;
  let {cPoints,connectSegs} = this;

	debugger;
	this.loopFringeAddition(0);
	return;
	for (let i=0;i<150;i++) {
		let nf = this.selectNonFringe();
		if (nf > -1) {
			let pf = cPoints[nf];
			pf.onFringe = 1;
			let sgl = connectSegs.length;
			this.addWeb();
			this.addSegs(sgl);
		} else {
			return;
		}
	}
}


return rs;

});

