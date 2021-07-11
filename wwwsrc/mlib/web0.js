core.require(
function () {

//core.require(function () {
 return function (rs) {

rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints} = this;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let d = pi.distance(pj);
	return (mnCln < d) && (d < mxCln);
}



rs.addWeb = function (pnts,fringe) {
	let {shortenBy=10} = this;
	debugger;
	let cPoints = this.cPoints = pnts;
	let nbp = this.nearbyPoints = [];
  
	const computeNears = () => {
		let {cPoints,nearbyPoints:nbp} = this;
		let cln = cPoints.length;
		for (let i=0;i<cln;i++) {
			let nears = [];
			for (let j=0;j<cln;j++) {
				if (i>=j) {
					continue;
				}
				if (this.pairFilter(i,j)) {
					nears.push(j);
				}
			}
			nbp.push(nears);
		}
	}
	
	computeNears();
	//console.log('cPoints',cPoints);

	

	
	const copyNbp = function () {
		let rs = [];
		nbp.forEach((nears) => {
		  rs.push(nears.concat());
		});
		return rs;
	}

					//	console.log('initial nbp',copyNbp());
  debugger;

	const numPassFilter = function (total,filter) {
		if (!filter) {
			return total;
		}
		let rs = 0;
		for (let i=0;i<total;i++) {
			if (filter(i)) {
				rs++;
			}
		}
		return rs;
	}

	const randomFiltered = function (total,filter,numPass) {
		let rnv = Math.floor(numPass*Math.random());
		if (!filter) {
			return rnv;
		}
		let cnt = 0;
		for (let i=0;i<total;i++) {
			if (filter(i)) {
				if (cnt === rnv) {
					return i;
				}
				cnt++;
			}
		}
	}
		
	
	const isCandidateForI  =  (i) => { // returns the number of candidates for j
		let nears = nbp[i];
		if (!nears) {
			debugger;
		}
		if (this.pairFilter) {
			let ln = nears.length;
			let filter = (j) => {
				let jv = nears[j];
				return this.pairFilter(i,jv);
			}
			let npf = numPassFilter(ln,filter);
		  return npf;
		}
		return nears.length;
	}
	
	const randomI = () => { // returns [i,numCandidates for j]
	  let ln  = nbp.length;
    let filter = (i) => {
			return isCandidateForI(i);
		};
		let npf = numPassFilter(ln,filter);
		if (npf === 0) {
			return [0,0];
		}
		let rf = randomFiltered(ln,filter,npf);
		let nc = isCandidateForI(rf);
		return [rf,nc];
	}
	
		
	const randomPair = () => {
		//let ri = cln * (Math.random()/cln);
		let [ri,numCandidates] = randomI();
		if (numCandidates === 0) {
			return undefined
		}
		let nears = nbp[ri];
		let nl = nears.length;
		let filter;
	/*	if (this.pairFilter) {
			let filter =  (j) => {
				let nj = nears[j];
				return this.pairFilter(ri,nj)
			}
		}*/
		let nmp = numPassFilter(nl,filter);
		let rj = randomFiltered(nl,filter,nmp);
		let rjv = nears[rj];
		nears.splice(rj,1);
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
		//  let rhn = randomI();
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
		 debugger;
		let ssg = sg.lengthen(-shortenBy);
	  let line = this.genLine(ssg);
		
    this.installLine(line);		
	});	
}	
		

}
});		
	
		
		
			
			
		