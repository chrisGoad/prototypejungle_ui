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

rs.singletonFilter = function (i) {
	return true;
}



rs.beforeAddSeg = function (seg) {
}
rs.addWeb = function (pnts) {
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
		// now add the near pairs in the other direction
		for (let i=0;i<cln;i++) {
			let nearsi = nbp[i];
			nearsi.forEach( (j) => {
				if (i < j	) {
				  let nearsj = nbp[j];
				  nearsj.push(i); 
				}
			});
		}
		debugger;
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
		if (0 && this.pairFilter) {
			let ln = nears.length;
			let filter = (j) => {
				let jv = nears[j];
				return this.pairFilter(i,jv);
			}
			let npf = numPassFilter(ln,filter);
		  return npf;
		}
		let sf = this.singletonFilter(i);
		return sf?nears.length:0
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
	
		
	const randomPairs = (ri) => {
		//let ri = cln * (Math.random()/cln);
	//	let [ri,numCandidates] = randomI();
	
	//	if (this.choosePairs) {
			
		let nearsi = nbp[ri];
		let nl = nearsi.length;
		let filter;
	/*	if (this.pairFilter) {
			let filter =  (j) => {
				let nj = nears[j];
				return this.pairFilter(ri,nj)
			}
		}*/
		let nmp = numPassFilter(nl,filter);
		let rj = randomFiltered(nl,filter,nmp);
		let rjv = nearsi[rj];
		nearsi.splice(rj,1);
		// remove the pair going the other direction
		nearsj = nbp[rjv];
		let ii = nearsj.indexOf(ri);
		if ((ii === -1)) {
			debugger;
		} else {
		  nearsj.splice(ii,1);
		}
		return [[ri,rjv]];
	}
	
	let connectSegs = [];
	let candidates = []; // for debugging
	this.numDropped++;
	while (1) {
	//	debugger'	//	
	   let [randI,numCandidates] = randomI();
		if (numCandidates === 0) {
			break;
		}
		let rc = randomPairs(randI);
		if (rc.length === 0) {
			break;
		}
		let  rc0 = rc[0]
		candidates.push(rc0);
		let [ri,rj] = rc0;
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
    if ( !fnd) {
			this.beforeAddSeg(ri,rj);
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
	
		
		
			
			
		