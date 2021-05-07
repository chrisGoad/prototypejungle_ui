
core.require('/line/line.js','/shape/circle.js','/shape/polygon.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,polygonPP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_15f');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
//let topParams = {width:rdim,height:rdim,numLines:20,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:200,backgroundColor:'red',lineDelta:.02,randomDelta:0,
let topParams = {width:rdim,height:rdim,numLines:20,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:200,
backgroundColor:'black',backgroundPadding:20,outerBackgroundColor:'rgb(60,60,60)',
outerBackgroundPaddingX:40,outerBackgroundPaddingY:40,
lineDelta:.02,randomDelta:0,
 markSpeed:100,loadFromPath:0,saveJson:1};
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
  this.lineP['stroke-width'] = .0; 	
	 core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP.stroke = 'white';
  this.polygonP.stroke = 'rgb(0,0,200)';
  this.polygonP.fill = 'rgb(20,20,20)';
  this.polygonP.fill = 'black';
  this.polygonP['stroke-width'] = .17; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'white';
 //this.circleP.fill = 'red';
  //this.circleP.fill = 'blue';
  this.circleP.dimension = 0.4;
  this.circleP['stroke-width'] = 0; 	
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
	let {markSpeed,numTimeSteps,width} = this;
  this.initProtos();
 // core.root.backgroundColor = 'black';
  let sdim = width - 1;
	let bdim = width;
	let hTop = LineSegment.mk(Point.mk(-bdim,sdim),Point.mk(bdim,sdim));
	let hBot = LineSegment.mk(Point.mk(-bdim,-sdim),Point.mk(bdim,-sdim));
	let vLeft = LineSegment.mk(Point.mk(-sdim,bdim),Point.mk(-sdim,-bdim));
	let vRight = LineSegment.mk(Point.mk(sdim,bdim),Point.mk(sdim,-bdim));
	/*let hTop = LineSegment.mk(Point.mk(-2*sdim,sdim),Point.mk(2*sdim,sdim));
	let hBot = LineSegment.mk(Point.mk(-2*sdim,-sdim),Point.mk(2*sdim,-sdim));
	let vLeft = LineSegment.mk(Point.mk(-sdim,2*sdim),Point.mk(-sdim,-2*sdim));
	let vRight = LineSegment.mk(Point.mk(sdim,2*sdim),Point.mk(sdim,-2*sdim));*/

	this.sides = [hTop,hBot,vLeft,vRight];
			this.preliminaries();

 //	this.segments = [hTop,hBot,vLeft,vRight];
 debugger;
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
		//	context.computeRegions();
		  
			dom.svgDraw();
			//context.findAllIntersections();
		}
		this.saveOrRestore(cb,this);
		return;
	this.segments = this.initializeLines(null,1);
	this.iSegments = this.segments.concat(this.sides);
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
    nextIntrNum = nintrIndex - 1;
	} else {
    nextIntrNum = nintrIndex + 1;
	}
	let theNextIntrs = allIntersections[nextSegNum]
	let theNextIntr = theNextIntrs[nextIntrNum]
	if (!theNextIntr) {
		if (this.debugIt) {
			debugger;
		}
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
		if (this.debugIt) {
		  debugger;
		}
		return null;
	}
	let startPoint = intr[0];
	let rs = [startPoint];
	//let reverse = false;
	while (true) {
		let next = this.findNextIntr(segNum,intrNum,reverse);
		let [nextSegNum,nextIntrNum] = next;
		reverse = next[2];
	//	debugger;
		let nintrs = allIntersections[nextSegNum];
		let nintr = nintrs[nextIntrNum];
		if (!nintr) {
			console.log('nextIntrNum',nextIntrNum,' max ',nintrs.length - 1);
		if (this.debugIt) {
      debugger;//d
		}
			return null;
		}
		let p = nintr[0];
		//let p = allIntersections[next[0]][next[1]][0];
		let dist = startPoint.boxcarDistance(p)
		if (dist  < 0.000001) {
		  if (this.debugIt) {
			  debugger; //dd
			}
			return rs;
		}
		rs.push(p);
		segNum = nextSegNum;
		intrNum = nextIntrNum;
	}
}
	
		
		

rs.moveLines = function (delta) {
	//debugger;
	//let {numTimeSteps,timeStep,segments,fractionAlong,markSpeed,segNumber,deltaD} = this;	

	this.moveSegments(delta);

	this.addLines(1);
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

rs.markRegionCenter = function (rg) {
	if (!rg) {
		return null;
	}
	let p = this.regionCenter(rg);
	let mark = this.circleP.instantiate();
	this.marks.push(mark);
	mark.moveto(p);
	mark.show();
	mark.update();
}

rs.step = function ()   {
	debugger;
	  let {timeStep,numTimeSteps,polygonP,lineP} = this;
		let hts = numTimeSteps/2;
		let z = 2* Math.abs(timeStep -  hts)/numTimeSteps;
		let fr;
		if (z > 0.8) {
			fr = 1;
		} else {
			fr = z/0.8;
		}
			
	//let fr = 2* Math.abs(timeStep-hts)/numTimeSteps;
    let c = Math.floor(255* (1-fr));
    //polygonP.fill = `rgb(0,0,${c})`;
  //  polygonP.stroke = `rgb(${c},${c},${c})`;
    polygonP.stroke = 'white';
    polygonP.fill = 'rgb(100,100,100)';
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
		this.iSegments = fsegs.concat(this.sides);
		this.findAllIntersections();
		let regions = [];
		regionSeeds.forEach((seed) => {
			let [segNum,intrNum,reverse] = seed;
			let rg = this.findAregion(segNum,intrNum,reverse);
			regions.push(rg);
		});
		let polys = this.polygons;
		let newPolys  = !polys;
		if (newPolys) {
			polys = this.set('polys',core.ArrayNode.mk());
			this.set('marks',core.ArrayNode.mk());
		}
		let ln = regions.length;
		for (let i=0;i<ln;i++) {
			let poly;
			let rg = regions[i]
			if (1) {
				if (newPolys) {
					poly = this.polygonP.instantiate();
					polys.push(poly);
					poly.show();
				} else {
					poly = polys[i];
				}
				if (rg && !regionIsBox(rg)) {
					poly.corners = rg;
					poly.show();
				} else {
					if (rg) {
						console.log('rg is box',rg);
					}

					poly.hide();
				}
				poly.update();
			}
		this.markRegionCenter(rg);
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
      

