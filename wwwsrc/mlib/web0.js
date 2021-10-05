core.require(
function () {

// parameters: maxLoops, cPoints (initWeb(pnts), called by addWeb copies pnts into cPoints)
// used in pairFilter only: minConnnectorLength,maxConnectorLength
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
rs.initWeb = function (pnts) {
	let {cPoints,nearbyPoints,connectSegs} = this;
	//if (!cPoints) {
		this.cPoints = pnts;
	//}
	if (!nearbyPoints) {
		this.nearbyPoints = [];
	}
	if (!connectSegs) {
		this.connectSegs = [];
	} else {
		this.numSegs = connectSegs.length;
	}
}
/*
const interpolate = function (v1,v2,f) {
	return v1 + (v2-v1)*f;
}
const interpolateColor = function (c0,c1,f) {
	let [r0,g0,b0] =c0;
	let [r1,g1,b1] =c1;
	let  r = interpolate(r0,r1,f);
	let  g = interpolate(g0,g1,f);
	let  b = interpolate(b0,b1,f);
	let rs = `rgb(${r},${g},${b})`;
	console.log('rs',rs);
	return rs;
}
*/
rs.addSegs = function (fromIndex=0) {
	debugger;
//	let fromIndex = this.numSegs?this.numSegs:fromIndexi;
	let {connectSegs,shortenBy=10} = this;
  let ln = connectSegs.length;
	for (let i=fromIndex;i<ln;i++) {
		if (i===(ln-1)) {
//			debugger;
		}
		let sg = connectSegs[i];
		let ssg = sg.lengthen(shortenBy);
		ssg.index0 = sg.index0;
		ssg.index1 = sg.index1;
	  let line = this.genLine(ssg,0,sg.lineP);
		let {end0,end1} = ssg;
		if (this.colorFromPoint) {
			line.stroke = this.colorFromPoint(end0);
		}
		/*let c0 = [250,0,0];
		let c1 = [0,0,250];
		line . stroke = interpolateColor(c0,c1,i/(ln-1));*/
    this.installLine(line);		
	}
}	

rs.removeFromNears = function (i,ni) {
	let {nearbyPoints:nbp} = this;
	let nearsi = nbp[i];
	let j = nearsi[ni];
	nearsi[ni] = -(j+1);
}
	

// actual nears are encoded by n+1 removed by -(n+1)
rs.encodeNear = (i) => i;
rs.decodeNear = (i) => i;

rs.realNears = (nears) => {
	return nears.filter((i) => i>=0);
}
rs.rnearsIndex2NearsIndex = function (nears,ri) {
	let nl = nears.length;
	let cnt = 0;
	for (let i=0;i<nl;i++) {
		let iv = nears[i];
		if (iv >= 0) {
			if (cnt === ri) {
				return i;
			}
			cnt++;
		}
	}
	error('unexpected');
}
rs.rnearsIndex2NearsIndexViaIndexOf = function (nears,rnears,ri) {
  let v = rnears[ri];
	let rs = nears.indexOf(v);
	if (rs === -1) {
		console.log('unexpected');
		debugger;
	}
	return rs;
}
		
	
	
rs.addWeb = function (pnts,lineP) {	
	if (pnts) {
		this.initWeb(pnts);
	}
	/*let lineP;
	if (params && params.lineP) {
		lineP = params.lineP;
	}*/
	let {cPoints,nearbyPoints,connectSegs,shortenBy=10,maxLoops = 10000} = this;
	//debugger;initial
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
					nears.push(this.encodeNear(j));
				}
			}
			nbp.push(nears);
		}
		// now add the near pairs in the other direction
		for (let i=0;i<cln;i++) {
			let nearsi = nbp[i];
			nearsi.forEach( (j) => {
			  let dj = this.decodeNear(j);
				if (i < dj	) {
				  let nearsj = nbp[dj];
				  nearsj.push(this.encodeNear(i)); 
				}
			});
		}
		//debugger;
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
				let jv = this.decodeNear(nears[j]);
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
	
const removeFromNears = function (i,ni) {
	let nearsi = nbp[i];
	let j = nearsi[ni];
	nearsi[ni] = -(j+1);
}

		
	const randomPairs = (i) => {
		//let i = cln * (Math.random()/cln);
	//	let [i,numCandidates] = randomI();
	
		if (this.choosePairs) {
		/*	let cp = this.choosePairs(i);
			let pp = cp.map((ii) => {
				return [i,ii];
			});
			return pp;
		}*/
		  let cp = this.choosePairs(i);
			if (cp === undefined) {
				debugger;
			}
			let rss = cp.map( (pr) => {
				let [i,ni] = pr;
				let nears = nbp[i];;
				let j = this.decodeNear(nears[ni]);
				removeFromNears(i,ni);
				return [i,j];
			});
      //console.log('rss',rss);
			return rss;
		}
		let nearsi = nbp[i];
		let rnearsi = this.realNears(nearsi);
	  let nl = rnearsi.length;
		if (nl === 0) {
			return [];
		}
		let rni = Math.floor(Math.random()*nl);
		//let nl = nearsi.length;
		let j = rnearsi[rni];
		let ni = this.rnearsIndex2NearsIndexViaIndexOf(nearsi,rnearsi,rni);
		//let j = this.decodeNear(nearsi[ni]);
		this.removeFromNears(i,ni);
		/*nearsi.splice(rj,1);
		// remove the pair going the other direction
		nearsj = nbp[rjv];
		let ii = nearsj.indexOf(i);
		if ((ii === -1)) {
			debugger;
		} else {
		  nearsj.splice(ii,1);
		}*/
		return [[i,j]];
	}
	
	//let connectSegs = [];
	let candidates = []; // for debugging
	this.numDropped++;
	for (let ii=0;ii<maxLoops;ii++)  {
	//	debugger'	//	
	   let [randI,numCandidates] = randomI();
		if (numCandidates === 0) {
			debugger;
			break;
		}
		let rc = randomPairs(randI);
	//	console.log('rc',rc)
		if (rc.length === 0) {
		//	debugger;
			continue;
		}
		rc.forEach( (rp) => {
			candidates.push(rp); // for debugging
			let [ri,rj] = rp;
			let rip = cPoints[ri];
			let rjp = cPoints[rj];
			if ((!rip) || (!rjp)) {
				debugger;
			}
			let rseg  = geom.LineSegment.mk(rip,rjp).lengthen(-10);
			if (lineP) {
				rseg.lineP = lineP;
			}
			//debugger;
			let {end0,end1} = rseg;
			end0.gridc = rip.gridc;
			end1.gridc = rjp.gridc;
			//let rseg  = geom.LineSegment.mk(rip,rjp);
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
			//	debugger;
				this.beforeAddSeg(ri,rj);
				rseg.index0 = ri;
		    rseg.index1 = rj;
				connectSegs.push(rseg);
				this.numDropped++;
			}
		});
	}
	//debugger;
  //if (pnts) {
	//	this.addSegs();
	//}
	return;
	/* connectSegs.forEach((sg) => Fbugger;
		let ssg = sg.lengthen(-shortenBy);
		ssg.index0 = ri;
		ssg.index1 = rj;
		
	  let line = this.genLine(ssg);
		
    this.installLine(line);		
	});	*/
}	
		

}
});		
	
		
		
			
			
		