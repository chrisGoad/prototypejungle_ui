
core.require('/line/line.js','/shape/circle.js','/shape/polygon.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,polygonPP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_16');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
//let topParams = {width:rdim,height:rdim,numLines:20,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:200,backgroundColor:'red',lineDelta:.02,randomDelta:0,
let topParams = {width:rdim,height:rdim,numLines:20,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:100,backgroundColor:'red',lineDelta:.02,randomDelta:0,
 markSpeed:100,saveJson:0};
Object.assign(rs,topParams);
/*rs.saveImage = true;
rs.width = 400;
rs.height = 200;
rs.numLines=3000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;*/
//let side0 =  rs.set('side0',svg.Element.mk('<g/>'));
//let side1=  rs.set('side1',svg.Element.mk('<g/>'));


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .07; 	
 // this.lineP['stroke-width'] = 4;	
	 core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] = .07; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP.dimension = 4;
  this.circleP['stroke-width'] = .07; 	
}  

//side0.initProtos = initProtos;


rs.computeValuesToSave = function () {
	let segs = this.initializeLines(null,1);
	let vls = [[['storedSegments'],segs]];
	this.storedSegments = segs;
	return vls;
}


rs.initialize = function () {
	debugger;
	let {markSpeed,numTimeSteps,width} = this;
  this.initProtos();
  core.root.backgroundColor = 'green';
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
	let icross1 = this.intersectSegmentWithRectangle(cross1,this.rect);
	let icross2 = this.intersectSegmentWithRectangle(cross2,this.rect);

// this.segments = [icross1,icross2];
 debugger;
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
			debugger;
			return null;
			//nextIntrNum = nintrIndex + 1;
		} else {
      nextIntrNum = nintrIndex - 1;
		}
	} else {
		if ((nintrIndex - 1) === ( nextIntrs.length - 1)) {
			debugger;
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
		debugger;
				return null;

	}
  return [nextSegNum,nextIntrNum,nreverseEnds];
}

	
rs.findAregion = function (isegNum,iintrNum,reverse) {
	//debugger;
	let {allIntersections, iSegments:segs} = this;
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
		debugger;
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
			debugger;
			return null;
		}
		let p = nintr[0];
		//let p = allIntersections[next[0]][next[1]][0];
		let dist = startPoint.boxcarDistance(p)
		if (dist  < 0.0101) {
			debugger;
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

rs.regionsSame = function (arga,argb) {
	let {center:centera,bounds:boundsa} = arga;
	let {center:centerb,bounds:boundsb} = argb;
	let dist = centera.boxcarDistance(centerb);
	if (dist < 0.1) {
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
				debugger;
				return true;
			}
			let seg = LineSegment.mk(rg[i],rg[i+1]);
			if (!isHV(seg)) return false;
		}
		return true;
	}
rs.findAllRegions = function () {
	
  let {iSegments:segs,allIntersections} = this;	
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
				if (this.regionsSame(arg,rs[k])) {
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
	debugger;
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
rs.step = function ()   {
	debugger;
	  
	  const regionIsBox = (rg) => {
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
		}
	  this.moveLines();
		let fsegs = this.filterSegs(this.segments);
		//this.iSegments = fsegs.concat(this.sides);
		this.iSegments = this.sides.concat(fsegs);
		this.findAllIntersections();
		let regions = this.findAllRegions();
		/*regionSeeds.forEach((seed) => {
			let [segNum,intrNum,reverse] = seed;
			let rg = this.findAregion(segNum,intrNum,reverse);
			regions.push(rg);
		});*/
		let polys = this.polygons;
		let newPolys  = !polys;
		if (newPolys) {
			polys = this.set('polys',core.ArrayNode.mk());
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
				let rgb = `rgb(${r},${g},${b})`;
			//	poly.fill = rgb;
				poly.show();
			} else {
				poly = polys[i];
			}
			let region = arg.region;
			poly.corners = region;
			poly.show();
		  poly.update();
		}
	
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
      

