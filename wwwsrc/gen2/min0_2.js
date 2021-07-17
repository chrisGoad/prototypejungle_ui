
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
addWebTreeMethods(rs);
//addWebMethods(rs);
rs.setName('min0_2');
let ht= 2000;
ht = 3000;
let nrc=32;
let mcl = 1.6*(ht/nrc);
//nrc = 2;
let  topParams = {width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+100};

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
rs.choosePairs = function (i) {
	let {cPoints,nearbyPoints} = this;
//	debugger;
	this.cprc++;
	if (this.cprc > 100) {
	}
	let nears = this.nearbyPoints[i];
	let nl = nears.length;
	let pi = cPoints[i];
	if (nl >100000) {
		return [[i,1],[i,0]];
	}
	if (nl > 0) {
		return [[i,0]];
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
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
  let {cPoints,connectSegs} = this;

	debugger;
	this.loopFringeAddition(150);
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

