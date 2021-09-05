
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
nrc = 50;
nrc = 25;
let mcl = 1.6*(ht/nrc);
mcl = 50
//mcl =100;
let minc = 20;
//mcl = 50;
//mcl = 3.6*(ht/nrc);
//nrc = 2;
let  topParams = {backgroundColor:'yellow',width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+minc,numPairs:2,fringeColor:'blue'};

let cellsz = ht/nrc;
console.log('cellsz',cellsz);
Object.assign(rs,topParams);

rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP['stroke-width'] = 7;
	lineP.stroke  = 'white';
	//lineP.stroke  = 'blue';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	 let circleP2 = this.set('circleP2',circlePP.instantiate()).hide();
	circleP2.dimension = 500;
	circleP2.fill = 'black';
	circleP2.fill = 'rgb(0,0,50)';
	circleP2.fill = 'rgb(0,100,250)';
	circleP2.fill = 'black';
	
	
}  

const interpolate = function (v1,v2,f) {
	return v1 + (v2-v1)*f;
}
/*

rs.inDiamond = function (p) {
	let width = this.width;
	let bd = p.boxcarDistance(Point.mk(0,0));
  return bd < 0.5 * width;
}


const inSquare = function (p,hw) {
	return (-hw < p.x) && (p.x < hw) && (-hw < p.y) && (p.y < hw);
	
}

 let {width,height} = this;
	let hw = 0.5* width;
	let hh = 0.5* height;
	*/
rs.inUL = function (p) {
	let {x,y} = p;
  return (x  < 0) && (y <0);
}
rs.inUR = function (p) {
	let {x,y} = p;
  return (x  > 0) && (y <0);
}

rs.inLL = function (p) {
	let {x,y} = p;
  return (x  < 0) && (y > 0);
}
rs.inLR = function (p) {
	let {x,y} = p;
  return (x  > 0) && (y > 0);
}


	
/*
const inCircle = function (p,d) {
	let dist = p.distance(Point.mk(0,0));
	return dist < d;
	
}
rs.colorFromPoint = function (p) {
	let w = this.width;
//	if (inSquare(p,0.1  * w)) {
	if (inCircle(p,0.2  * w)) {
		return 'rgb(0,100,250)';
	}
	//if (this.inDiamond(p)&&inSquare(p,0.7 * 0.5 * w)) {
	if (inSquare(p,0.7 * 0.5 * w)) {
		return 'red';
	}
	if (this.inDiamond(p)) {
		return 'gray';
		return 'blue';
	} 
  //return 'rgb(0,100,250)'
  //return 'blue'
	return 'transparent';
	return 'white';
	
}*/

rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,height,cPoints} = this;
	//debugger;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let d = pi.distance(pj);
	mnCln = 50;
//	if (inSquare(pi,0.1*width)) {
  if (this.inUL(pi)) {
		mnCln = cellsz * 1.1;
		mxCln = mnCln + 0.5*cellsz;
	} else if (this.inUR(pi)) {
	  mnCln = cellsz * 1.1;
		mxCln = mnCln + cellsz;
		//mnCln = 50;
		//mxCln = mnCln + 40;
  } else if (this.inLL(pi)) {
		mnCln = cellsz * 1.1;
		mxCln = mnCln + cellsz;
	
	} else {
		mnCln = 1.6*cellsz;
    mxCln = mnCln + cellsz;
  }
	let rs = (mnCln < d) && (d < mxCln);
	if (rs) {
		debugger;
	}
	return rs;
}


rs.initialize = function () {
  core.root.backgroundColor = 'black';
  core.root.backgroundColor = 'rgb(50,50,50)';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
//	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
	//this.set('cc',this.circleP2.instantiate()).show();
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

