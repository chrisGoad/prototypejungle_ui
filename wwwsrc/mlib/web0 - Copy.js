core.require(
function () {

//core.require(function () {
 return function (rs) {

rs.pairFilter = function (i,j) {
	return true;
}


rs.addWeb = function (pnts,fringe) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,shortenBy=10} = this;
	debugger;
	let cPoints = this.cPoints = pnts;
	let nbp = this.nearbyPoints = [];
	
	//console.log('cPoints',cPoints);
  let cln = cPoints.length;
	for (let i=0;i<cln;i++) {
		let nears = [];
		for (let j=0;j<cln;j++) {
			if (i>=j) {
				continue;
			}
			let pi = cPoints[i];

			let pj = cPoints[j];
			let d = pi.distance(pj);
			if ((mnCln < d) && (d < mxCln)) {
				nears.push(j);
			}
		}
		nbp.push(nears);
	}
	

	
	const copyNbp = function () {
		let rs = [];
		nbp.forEach((nears) => {
		  rs.push(nears.concat());
		});
		return rs;
	}

					//	console.log('initial nbp',copyNbp());
  debugger;
	
const isCandidateForI  =  (i) => { // returns the number of candidates for j
	let nears = nbp[i];
	let ln = nears.length;
	let nmj = 0;
	for (let j=0;j<ln;j++) {
		if (this.pairFilter(i,j)) {
			nmj++;
		}
	}	
	return nmj;
}
	const randomI = () => { // returns [i,numCandidates for j]
		let numCandidates= 0;
		let nl = nbp.length;
		for (let i=0;i<nl;i++) {
			if (isCandidateForI(i)) {
			  numCandidates++;
			}
		}
		if (numCandidates === 0) {
			return [0,0]
		}
		let rx  = Math.floor(numCandidates * Math.random());
	//	let ln = nbp.length;
    let nsf = 0;
		for (let i = 0;i<nl;i++) {
			let nmj = isCandidateForI(i);
			if (nmj) {
				if (nsf === rx) {
				  return [i,nmj];
				}
				nsf++;
			}
		}
	}
	
		
	const randomPair = () => {
		//let ri = cln * (Math.random()/cln);

		let [ri,numCandidates] = randomI();
		if (numCandidates === 0) {
			return undefined;
		}
		let nears = nbp[ri];
		let nl = nears.length;
		let rj = Math.floor(numCandidates * Math.random());
		let rjv;
    let cnt = 0;
//		for (let j=0;j<numCandidates;j++) {
		for (let j=0;j<nl;j++) {
			 let nj = nears[j];
			 if (this.pairFilter(ri,nj)) {
				 if (cnt == rj) {
					 rjv = nj;
					 break;
				 } 
				 cnt++;
			 }
		}
	  if ((typeof ri !== 'number') || (!rjv !== 'number')) {
		  debugger;
		}
		//console.log('nears',nears,'rj',rj);
		nears.splice(rj,1);
		//console.log('in C nbp',copyNbp(),'nears',nears,'ri',ri);

		return [ri,rjv];
	}
	let connectSegs = [];
	let candidates = []; // for debugging
	this.numDropped++;
	while (1) {
	//	debugger;
		let rc = randomPair();
		if (!rc) {
			    
			/*		console.log('candidates',candidates);
					console.log('nbp',nbp);
      debugger;*/
		  let rhn = randomI();
			break;
		}
		candidates.push(rc);
		let [ri,rj] = rc;
		let rip = cPoints[ri];
		let rjp = cPoints[rj];
		if ((!rip) || (!rjp)) {
		  debugger;
		}
		let rseg  = geom.LineSegment.mk(rip,rjp).lengthen(-10);
		let lnc = connectSegs.length;
		let fnd = 0;
		for (let i = 0;i<lnc;i++) {
			let csg = connectSegs[i];
			if (rseg.intersects(csg)) {
        fnd = 1;
        break;
			}
		}
    if (0 || !fnd) {
      connectSegs.push(rseg);
			this.numDropped++;
		}
	}
	debugger;

	 connectSegs.forEach((sg) => {
		ssg = sg.lengthen(-shortenBy);
	  let line = this.genLine(ssg);
		
    this.installLine(line);		
	});	
}	
		

}
});		
	
		
		
			
			
		