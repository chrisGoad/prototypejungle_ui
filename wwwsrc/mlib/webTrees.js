

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