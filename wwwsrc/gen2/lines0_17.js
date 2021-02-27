
core.require('/line/line.js','/shape/circle.js','/shape/polygon.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,polygonPP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_17');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
//let topParams = {width:rdim,height:rdim,numLines:20,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:200,backgroundColor:'red',lineDelta:.02,randomDelta:0,
let topParams = {width:rdim,height:rdim,numLines:16,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:200,backgroundColor:'green',backgroundPadding:20,lineDelta:.02,randomDelta:0,
 //markSpeed:100,loadFromPath:1,saveJson:0};
 markSpeed:100,loadFromPath:1,saveJson:0};
Object.assign(rs,topParams);



rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = .07; 	
 // this.lineP['stroke-width'] = 4;	
	 core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP.stroke = 'red';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] = .07; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP.dimension = 4;
  this.circleP['stroke-width'] = .07; 	
}  

//side0.initProtos = initProtos;

const segForJson = function (seg) {
	let {end0,end1} = seg;
	let {x:e0x,y:e0y} = end0;
	let {x:e1x,y:e1y} = end1;
  return [[e0x,e0y],[e1x,e1y]];
}
const segsForJson = function (segs) {
	let rs = [];
	segs.forEach((seg) => {
		let sfj = segForJson(seg);
		rs.push(sfj);
	});
	return rs;
}

const segFromJson = function (jseg) {
	let e0 = jseg[0];
	let e1 = jseg[1];
	let e0x = e0[0];
	let e0y = e0[1];
	let e1x = e1[0];
	let e1y = e1[1];
	let end0 = Point.mk(e0x,e0y);
	let end1 = Point.mk(e1x,e1y);
	let seg = LineSegment.mk(end0,end1);
  return seg;
}
const segsFromJson = function (segs) {
	let rs = [];
	segs.forEach((seg) => {
		let sfj = segFromJson(seg);
		rs.push(sfj);
	});
	return rs;
}

const extendSeg = function (seg,dist) {
	let {end0,end1} = seg;
	let vec = end1.difference(end0);
	let ln = vec.length();
	let hvec = vec.times(0.5);
	let cnt = end0.plus(hvec);
	let dvec = vec.times(0.5 + dist/ln);
	let nend0 = cnt.difference(dvec);
	let nend1 = cnt.plus(dvec);
	let rs = LineSegment.mk(nend0,nend1);
	let eln = rs.length();
	console.log('ln ',ln,' eln ',eln);
	return rs;
}

const extendSegs = function (segs,dist) {
	let rs = segs.map((seg) => {
		let eseg = extendSeg(seg,dist);
		return eseg;
	});
	return rs;
}	

rs.computeValuesToSave = function () {
	let segs = this.initializeLines(null,1);
	let jsegs = segsForJson(segs);
	let vls = [[['savedSegments'],jsegs]];
	this.savedSegments = jsegs;
	return vls;
}



rs.initialize = function () {
	debugger;
	let {markSpeed,numTimeSteps,width,loadFromPath,saveJson} = this;
  this.initProtos();
  core.root.backgroundColor = 'white';// 'green';
  let sdim = 0.5*width - 1;
	let bdim = 0.5*width;
	let cdim = 0.25*width;
	let hTop = LineSegment.mk(Point.mk(-bdim,sdim),Point.mk(bdim,sdim));
	let hBot = LineSegment.mk(Point.mk(-bdim,-sdim),Point.mk(bdim,-sdim));
	let vLeft = LineSegment.mk(Point.mk(-sdim,bdim),Point.mk(-sdim,-bdim));
	let vRight = LineSegment.mk(Point.mk(sdim,bdim),Point.mk(sdim,-bdim));
	/*let hTop = LineSegment.mk(Point.mk(-2*sdim,sdim),Point.mk(2*sdim,sdim));
	let hBot = LineSegment.mk(Point.mk(-2*sdim,-sdim),Point.mk(2*sdim,-sdim));
	let vLeft = LineSegment.mk(Point.mk(-sdim,2*sdim),Point.mk(-sdim,-2*sdim));
	let vRight = LineSegment.mk(Point.mk(sdim,2*sdim),Point.mk(sdim,-2*sdim));*/
	let cross1 = LineSegment.mk(Point.mk(-bdim,cdim),Point.mk(bdim,-cdim));
	let cross2 = LineSegment.mk(Point.mk(-bdim,-cdim),Point.mk(bdim,cdim));
this.sides = [hTop,hBot,vLeft,vRight];
	this.preliminaries();
	//let icross1 = this.intersectSegmentWithRectangle(cross1,this.rect);
	//let icross2 = this.intersectSegmentWithRectangle(cross2,this.rect);
//	if (loadFromPath) {
		const cb = (context) => {
			let jsegs = context.savedSegments;
			let isegs = segsFromJson(jsegs);
			let esegs = extendSegs(isegs,1);
			let segs = esegs.map((seg) => {
  			return context.intersectSegmentWithRectangle(seg,context.rect);
			});
			
			context.segments = segs
			context.iSegments =  context.sides.concat(segs);
			context.addLines();
			context.computeRegions();
			dom.svgDraw();
			//context.findAllIntersections();
		}
		this.saveOrRestore(cb,this);
	//}
	return;
// this.segments = [icross1,icross2];
	this.segments = this.initializeLines(null,1);
	
	this.iSegments =  this.sides.concat(this.segments);

	this.addLines();
  this.findAllIntersections();

}	

rs.findAllIntersections = function () {
	let segs = this.iSegments;
	rs = [];
	let ln = segs.length;
	for (let i=0;i<ln;i++) {
		let seg = segs[i];
		seg.segNumber = i;
		let intrs = seg.allIntersections(segs);
		if (intrs) {
			rs.push(intrs);
		}
	}
	this.allIntersections = rs;
}

// algorithm for finding region: walk around interestion points

rs.findNextIntr = function (segNum,intrNum,reverseEnds) {
	//debugger;
	let {allIntersections, iSegments:segs} = this;
	let seg = segs[segNum];	
	let {end0,end1} = seg;
	let intrs = allIntersections[segNum];
	let intr = intrs[intrNum];
	let [ipnt,nextSeg] = intr; // ok now we've got our starting point
	let {end0:nend0,end1:nend1} = nextSeg;
	let nvec = nend1.difference(nend0);
	let nextSegNum  = nextSeg.segNumber;
	let nextIntrs = allIntersections[nextSegNum];
	// now find the intr on the next segments intersecton list
	let dist = Infinity;
	let ln = nextIntrs.length;
	let nintrIndex = 0;
	for (let i=0;i<ln;i++) {
		let nintr = nextIntrs[i];// the intersection as listed in nextIntrs
		let nsegNum = nintr[1].segNumber;
		if (nsegNum == segNum) {
			nintrIndex = i;
			break;
		}
	/*	let p = nintr[0];
		let bdist = ipnt.boxcarDistance(p);
		if (bdist < dist) {
			dist = bdist;
			closest = i;
		}*/
	}	
	let e0,e1;
	if (reverseEnds) {
		e0 = end1;
		e1 = end0;
	} else {
		e0 = end0;
		e1 = end1;
	}
	let vec = e1.difference(e0);
	let normal = vec.normal(); // counter clockwise
	// now find the intersection on the next seg's listStyleType
	let nreverseEnds = normal.dotp(nvec)  < 0;
	let nextIntrNum;
  if (nreverseEnds) {
		if (nintrIndex === 0) {
			//debugger; // putback
			return null;
			//nextIntrNum = nintrIndex + 1;
		} else {
      nextIntrNum = nintrIndex - 1;
		}
	} else {
		if ((nintrIndex - 1) === ( nextIntrs.length - 1)) {
			//debugger; //putback
			return null;
			//nextIntrIndex = nintrIndex - 1;
		} else {
      nextIntrNum = nintrIndex + 1;
		}
	}
	let theNextIntrs = allIntersections[nextSegNum]
	let theNextIntr = theNextIntrs[nextIntrNum]
	if (!theNextIntr) {
		console.log('null theNextIntr');
		//debugger; //putback
				return null;

	}
  return [nextSegNum,nextIntrNum,nreverseEnds];
}

	
rs.findAregion = function (isegNum,iintrNum,reverse) {
	//debugger;
	let {allIntersections, iSegments:segs,segments} = this;
  let segNum = isegNum;
  let intrNum = iintrNum;
	let seg = segs[segNum];
	let intrs = allIntersections[segNum];
	let intr = intrs?intrs[intrNum]:null;
	if (!intr) {
		if (intrs) {
		   console.log('intr',intr,' max ',intrs.length);
		} else {
			console.log('intrs null segNum',segNum);
		}
		// debugger; putback
		return null;
	}
	let startPoint = intr[0];
	let rs = [startPoint];
	//let reverse = false;
	while (true) {
		let next = this.findNextIntr(segNum,intrNum,reverse);
		if (!next) {
			return null;
		}
		let [nextSegNum,nextIntrNum] = next;
		reverse = next[2];
	//	debugger;
		let nintrs = allIntersections[nextSegNum];
		let nintr = nintrs[nextIntrNum];
		if (!nintr) {
			console.log('nextIntrNum',nextIntrNum,' max ',nintrs.length - 1);
			//debugger; //putback
			return null;
		}
		let p = nintr[0];
		//let p = allIntersections[next[0]][next[1]][0];
		let dist = startPoint.boxcarDistance(p)
		if (dist  < 0.0101) {
			// debugger; //putback
			return rs;
		}
		rs.push(p);
		segNum = nextSegNum;
		intrNum = nextIntrNum;
	}
}

rs.regionBounds = function (rg) {
	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;
	rg.forEach( (p) => {
	  let {x,y} = p;
		minX = x<minX?x:minX;
		minY = y<minY?y:minY;
		maxX = x>maxX?x:maxX;
		maxY = y>maxY?y:maxY;
	});
	let bnds = {minX,minY,maxX,maxY};
	return bnds;
}

rs.boundsMaxDim = function (bnds) {
	let {minX,minY,maxX,maxY} = bnds;
	return Math.max(maxX-minX,maxY-minY);
}

		
	
rs.regionCenter = function (rg) {
	let ln = rg.length;
	let rs = Point.mk(0,0);
	for (let i=0;i<ln;i++) {
		let p = rg[i];
		rs = rs.plus(p);
	}
	let cnt = rs.times(1/ln);
	return cnt;
}

rs.annotateRegion = function (region) {
	let center = this.regionCenter(region);
	let bounds  = this.regionBounds(region);
	return {center,bounds,region};
}

rs.regionsSame = function (arga,argb,dist) {
	let {center:centera,bounds:boundsa} = arga;
	let {center:centerb,bounds:boundsb} = argb;
	let bdist = centera.boxcarDistance(centerb);
	if (bdist < dist) {
		return true;
	}
}


const isHV = function (seg) {
	let {end0,end1} = seg;
	let {x:x0,y:y0} = end0;
	let {x:x1,y:y1} = end1;
	if (Math.abs(x1-x0) < 0.001) {
		return true;
	}
	if (Math.abs(y1-y0) < 0.001) {
		return true;
	}
	return false;
}
const regionIsBox = (rg) => {
		let rs = true;
		let ln = rg.length;
		for (let i=0;i<ln;i++) {
			if ((!rg[i]) || (!rg[i+1])) {
				// debugger; // putback
				return true;
			}
			let seg = LineSegment.mk(rg[i],rg[i+1]);
			if (!isHV(seg)) return false;
		}
		return true;
	}
rs.findAllRegions = function () {
	
  let {iSegments:segs,allIntersections,segments} = this;	
	debugger;
	let ln = segs.length;
	let rs = [];
	for (let i=0;i<ln;i++) {
		let intrs = allIntersections[i];
		let iln = intrs.length;
	//	for (let j =1;j<iln-1;j++) {
		for (let j =0;j<iln;j++) {
			let rg = this.findAregion(i,j,false);
			if ((!rg) || regionIsBox(rg)) {
				continue;
			}
			let arg = this.annotateRegion(rg);
			let rln = rs.length;
			let keep = true;
			for (let k=0;k<rln;k++) {
				if (this.regionsSame(arg,rs[k],0.1)) {
					keep = false;
					break;
				}
			}
			if (keep) {
				rs.push(arg);
			}
		}
	}
	return rs;
}
					
		

rs.moveLines = function (delta) {
	//debugger;
	//let {numTimeSteps,timeStep,segments,fractionAlong,markSpeed,segNumber,deltaD} = this;	

	this.moveSegments(delta);

	this.addLines(1);
}
rs.filterSegs = function (segs) {
	const excludeVH = function (seg) {
	  if (isHV(seg)) {
			return null;
		}
		return seg;
  }
	let nsegs = segs.filter(excludeVH);
	return nsegs;
}

//let regionSeeds = [[0,0,false],[0,3,false]];
const mkSeeds = function (n) {
	let rs = [];
	let sintr = 1;
	for (let i=0;i<4;i++) {
		rs.push([n,sintr,false]);
		sintr+=2;
	}
	return rs;
}
const mkAllSeeds = function () {
	//debugger;
	let rs = [];
	for (let i = 0;i<20;i++) {
		let seeds = mkSeeds(i);
	  rs = rs.concat(seeds);
	}
	return rs;
}
let regionSeeds = mkAllSeeds();
/*
let regionSeeds = [
[1,1,false],[1,3,false],[1,5,false],
[2,1,false],[2,3,false],[2,5,false],
[3,1,false],[3,3,false],[3,5,false],
[3,1,false],[3,3,false],[3,5,false]];
*/
/* return an array of regions in which corresponding regions are at the same index;*/

rs.correlateRegions = function (before,after) {
	debugger;
	let rs = [];
	let lnb = before.length;
	let lna = after.length;
	rs.length = lna;
	for (let i=0;i<lna;i++) {
		let rga = after[i];
		for (let j=0;j<lnb;j++) {
			let rgb = before[j];
			if (rgb && this.regionsSame(rga,rgb,5)) {
				rs[j] = rga;
				after[i] = null;
				break;
			} 
		}
	}
	/* ok, now after only contains new regions that could not be identified, 
	and rs has nulls for befores that could not be identified */
	let cNullIndex = -1;
	const findNextNull = function () {
		for (let i=cNullIndex+1;i<lna;i++) {
			let rga = rs[i];
			if (!rga) {
			 return i;
			}
		}
		return null;
	}
	cNullIndex = findNextNull();
	for (let i=0;i<lna;i++) {
		let rga = after[i];
		if (rga) {
			if (cNullIndex !== null) {
				rs[cNullIndex] = rga;
				cNullIndex = findNextNull();
			} else {
				debugger; // shouldn't happen
				rs.push(rga);
			}
		}
	}
	return rs;
}
		
	
	
		
	
rs.computeRegions = function () {
	debugger;
  let fsegs = this.filterSegs(this.segments);
	//this.iSegments = fsegs.concat(this.sides);
	this.iSegments = this.sides.concat(fsegs);
	this.findAllIntersections();
	let lastRegions = this.regions;
	let nextRegions = this.findAllRegions();
	let regions;
	if (lastRegions) {
	  regions = this.correlateRegions(lastRegions,nextRegions);
	} else {
		regions = nextRegions;
	}
	this.regions = regions;
	let polys = this.polygons;
	let newPolys  = !polys;
	if (newPolys) {
		polys = this.polygons = this.set('polys',core.ArrayNode.mk());
	}
	let ln = regions.length;
	let pln = polys.length;
	for (let i=0;i<ln;i++) {
		let poly;
		let arg = regions[i];
		if (i>=pln) {
			poly = this.polygonP.instantiate();
			polys.push(poly);
			let r = Math.floor(255*Math.random());
			let g = Math.floor(255*Math.random());
			let b = Math.floor(255*Math.random());
			let rgb = `rgb(${r},${r},${r})`;
			let rm = i%3;
			let fill;
			if (rm === 0) {
				fill = 'black';
			} else if (rm == 1) {
				fill = 'gray';
			} else {
				fill = 'white';
			}
			poly.fill = fill;
			//poly.fill = (i%2 === 0)?'white':'black';
			poly.show();
		} else {
			poly = polys[i];
		}
		if (arg) {
		  let region = arg.region;
		  poly.corners = region;
		  poly.show();
		  poly.update();
		} else {
			poly.hide();
			//poly.update();
		}

	}
	for (let i=ln+1;i<pln;i++) {
		let poly = polys[i];
		poly.hide();
	}
	
}

	
rs.step = function ()   {
	debugger;
	  
	  /*const regionIsBox = (rg) => {
			let rs = true;
			let ln = rg.length;
			for (let i=0;i<ln;i++) {
				if ((!rg[i]) || (!rg[i+1])) {
					debugger;
					return true;
				}
				let seg = LineSegment.mk(rg[i],rg[i+1]);
				if (!isHV(seg)) return false;
			}
			return true;
		}*/
	  this.moveLines();
		let segments = this.segments;
		debugger;
		this.computeRegions();
		
		
	
}
		
		


	

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume);
}
	


//side0.initialize = initialize;
/*
const initSide = function (side) {
	addMethods(side);
  Object.assign(side,sideParams);
	side.initProtos = initProtos;
	side.initialize= initialize;
}

initSide(side0);
initSide(side1);

rs.initialize = function () {
	//debugger;
	side0.initialize(Affine3d.mkRotation('y',0.25*Math.PI));
side1.initialize(Affine3d.mkTranslation(Point3d.mk(100,0,0)).times(Affine3d.mkRotation	('y',0.25*Math.PI)));
}
*/
return rs;
});
      

