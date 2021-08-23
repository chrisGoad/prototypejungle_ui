core.require(
function () {

//core.require(function () {
 return function (rs) {


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
}

rs.beforeAddSeg = function (i,j) {
  let {cPoints}  = this;
	let pi = cPoints[i];
	let idir = pi.direction;
	let pj = cPoints[j];
	pj.predecessor = i;
  let jdir = this.direction(pj.difference(pi));
  //console.log('i',i,'j',j,'idir',idir,'jdir',jdir);
	pj.direction = jdir;
	pi.interior = 1;
	pi.onFringe = 0;
	pj.onFringe= 1;
}


rs.singletonFilter  = function (i) {
	
	let pi = this.cPoints[i];
	return pi.onFringe;
	
	return !(i%50);
}

rs.choosePairsAtRandom = function (i) {
	let {cPoints,nearbyPoints,numPairs} = this;
	let nears = this.nearbyPoints[i];
	let rnears = this.realNears(nears);
	let nl = rnears.length;
	if (nl!==nears.length) {
	//	debugger
	}
	if (nl>1 && (numPairs === 2)) {
		let ri0 = this.rnearsIndex2NearsIndex(nears,0);
		let ri1 = this.rnearsIndex2NearsIndex(nears,1);
		return [[i,ri0],[i,ri1]];
	}
	if (nl>0) {
		let ri0 = this.rnearsIndex2NearsIndex(nears,0);
		return [[i,ri0]];
	}
	return [];
	
}

rs.choosePairsMinDivergence = function (i) {
	let {cPoints,nearbyPoints,numPairs=1} = this;
	let nears = this.nearbyPoints[i];
	let rnears = this.realNears(nears);
	let nl = rnears.length;
	if (nl!==nears.length) {
	//	debugger
	}
	let pi = cPoints[i];
	let devs = [];
	let idir = pi.direction;
	let ni;
	let bias =0.0 * Math.PI;
	if (typeof idir === 'number') {
		for (let nic=0;nic < nl;nic++) {
			let j = rnears[nic];
			let pj = cPoints[j];
			let jdir = this.direction(pj.difference(pi));
			//console.log('i',i,'j',j,'idir',idir,'jdir',jdir);
			let dev = Math.abs(bias -  (jdir-idir));
			let rnic = this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,nic)
			if (rnic < 0 ) {
				debugger;
			}
			devs.push([dev,rnic]);

		}
		devs.sort((a,b) => a[0] - b[0]);
		let ln = Math.min(numPairs,devs.length);
		let rs = [];
		for (let di =0 ;di < ln;di++) {
			rs.push([i,devs[di][1]]);
		}
		rs.sort((a,b) => a[1] - b[1]);
		return rs;
		return [[i,devs[0][1]],[i,devs[1][1]]];
	}
	ni = Math.floor (nl* Math.random());
	let rnic = this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,ni)
	return [[i,rnic]];
}


rs.genLine = function (sg) {
	
	let {cPoints,lineExt=0,fringeColor='transparent',lineColor='white'} = this;
	
  let {index0,index1,end0,end1} = sg;
	let p0 = cPoints[index0];
	let p1 = cPoints[index1];
	let line = this.lineP.instantiate();
	let  ext;
  if (p0.onFringe || p1.onFringe) {
	//	return;
		line.stroke = fringeColor;
		ext = -30;
	} else {
		ext = 0;
		line.stroke = lineColor;
	}
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(lineExt));
  }
  line.setEnds(end0,end1);

  return line;
}

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

rs.loopFringeAddition = function (n) {
	debugger;
	let {cPoints,connectSegs,treeColors} = this;
	let lnc;
	if (treeColors) {
		lnc = treeColors.length;
	} else {
	  lnc =0;
	}
  for (let i=0;i<n;i++) {
		if (i < lnc) {
			this.lineColor = treeColors[i];
		}
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

}
});		
	
		