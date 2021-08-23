
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebTreeMethods(rs);
//addWebMethods(rs);
rs.setName('min0_4');
let ht= 2000;
ht = 3000;
let hht = ht/2;
let qht = ht/24;
let nrc=64;
//nrc = 32;
//nrc = 4;
let mcl = 1.6*(ht/nrc);
mcl = 2.6*(ht/nrc);
//nrc = 2;
let  topParams = {width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+100,numPairs:2,fringeColor:'gray',left:geom.LineSegment.mk(Point.mk(-hht,-hht),Point.mk(-hht,hht)), right: geom.LineSegment.mk(Point.mk(hht,hht),Point.mk(hht,-hht))};

Object.assign(rs,topParams);
/*
rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
  let pi = cPoints[i];
  let pj = cPoints[j];
	let d = pi.distance(pj);
	if ((d<mnCln) || (d>mxCln)) {
		return false;
	}
	if ((pi.x === pj.x) || (pi.y === pj.y)) {
		return false;
	}
	return true;
}

rs.restrictRange = function (idir) {
	let dir = idir;
	while (dir > Math.PI){
	 dir = dir - 2*Math.PI;
	}
	while (dir < -Math.PI){
	 dir = dir + 2*Math.PI;
	}
	return dir;
}
rs.direction = function (p) {
	rs = Math.atan2(p.y,p.x);
  return this.restrictRange(rs);
}*/
rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;
/*function (i) {
	let {cPoints,nearbyPoints} = this;
//	debugger;
	this.cprc++;
	if (this.cprc > 100) {
	}
	let nears = this.nearbyPoints[i];
	let rnears = this.realNears(nears);
	let nl = rnears.length;
	let pi = cPoints[i];
	
	if (nl >10000) {
    let nidx0  = this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,0);
    let nidx1  = this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,1);

		return [[i,nidx0],[i,nidx1]];
	}
	if (nl > 0) {
		debugger;
		let nidx  = this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,0);

		//let nidx  = this.rnearsIndex2NearsIndex(nears,0);
		let idx0 = rnears[0];
		let nidx0 = nears.indexOf(idx0);
		return [[i,nidx]];
	}
	return [];
	let minDev = Infinity;
	let idir = pi.direction;
	let ni;
	let bias =0.0 * Math.PI;
	if ( idir) {
		for (let nic=0;nic < nl;nic++) {
			let j = nears[nic];
			let pj = cPoints[j];
			let jdir = this.direction(pj.difference(pi));
			//console.log('i',i,'j',j,'idir',idir,'jdir',jdir);
			let dev = Math.abs(bias -  (jdir-idir));
			if (dev < minDev) {
				minDev = dev;
				ni = nic;
			}
		}
		if (ni === undefined) {
			return [];
		}
	} else {
	  let nl = nears.length;
	  ni = Math.floor (nl* Math.random());
	}
	console.log('minDev',minDev);
	return [[i,ni]];
}
	
			


rs.genLine = function (sg,ext=0) {
	
	let {cPoints} = this;
	
  let {index0,index1,end0,end1} = sg;
	let p0 = cPoints[index0];
	let p1 = cPoints[index1];
	if (p0.onFringe || p1.onFringe) {
		//line.stroke = 'red';
		ext = 0.5
	}
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);

  return line;
}
*/
/*
rs.beforeAddSeg = function (i,j) {
  let {cPoints}  = this;
	let pi = cPoints[i];
	let idir = pi.direction;
	let pj = cPoints[j];
	pj.predecessor = i;
  let jdir = this.direction(pj.difference(pi));
  console.log('i',i,'j',j,'idir',idir,'jdir',jdir);
	pj.direction = jdir;
	pi.interior = 1;
	pi.onFringe = 0;
	pj.onFringe= 1;
}
*/

/*
rs.singletonFilter  = function (i) {
	let pi = this.cPoints[i];
	return pi.onFringe;
	
	return !(i%50);
}
*/


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP.stroke  = 'white';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	//circleP.fill = 'red';
	
}  
/*
rs.selectNonFringe = function () {
	let {cPoints,maxFringeTries} = this;
	let ln = cPoints.length;
	for (let i=0;i<maxFringeTries;i++)  {
	  let ri = Math.floor(ln*Math.random());
		let pi = cPoints[ri];
		if (!(pi.onFringe || pi.interior)) {
			return ri;
		}
	}
	return -1;
}
	*/
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
//	return;
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
  let {cPoints,connectSegs} = this;

	debugger;
	//this.loopFringeAddition(10);
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

