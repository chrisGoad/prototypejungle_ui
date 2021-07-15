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
//	debugger;
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


rs.singletonFilter  = function (i) {
	
	let pi = this.cPoints[i];
	return pi.onFringe;
	
	return !(i%50);
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
	let {cPoints,connectSegs} = this;
  for (let i=0;i<n;i++) {
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
	
		