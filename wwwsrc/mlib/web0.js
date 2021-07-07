core.require(
function () {

//core.require(function () {
 return function (rs) {

rs.addWeb = function (pnts) {
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
	
	const randomHasNears = () => {
		let nhn = 0;
		let nl = nbp.length;
		nbp.forEach ( (nears) => {
		  if (nears.length > 0) {
				nhn++;
			}
		});
		if (nhn === 0) {
			return undefined
		}
		let rx  = Math.floor(nhn * Math.random());
	//	let ln = nbp.length;
    let nsf = 0;
		for (let i = 0;i<nl;i++) {
			let nears = nbp[i];
			if (nears.length > 0) {
				if (nsf === rx) {
					return i;
				}
				nsf++;
			}
		}
	}
			
		
	const randomCandidate = () => {
		//let ri = cln * (Math.random()/cln);
		let ri = randomHasNears();
		if (ri === undefined) {
			return undefined;
		}
		let nears = nbp[ri];
		let nn = nears.length;
		let rj = Math.floor(nn * Math.random());
		let rjv = nears[rj];
	  if ((typeof ri !== 'number') || (typeof rjv !== 'number')) {
		  debugger;
		}
		//console.log('nears',nears,'rj',rj);
		nears.splice(rj,1);
		//console.log('in C nbp',copyNbp(),'nears',nears,'ri',ri);

		return [ri,rjv];
	}
	let connectSegs = [];
	let candidates = []; // for debugging
	while (1) {
	//	debugger;
		let rc = randomCandidate();
		if (!rc) {
			    
			/*		console.log('candidates',candidates);
					console.log('nbp',nbp);
      debugger;*/
		  let rhn = randomHasNears();
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
	
		
		
			
			
		