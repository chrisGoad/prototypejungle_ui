
core.require('/line/line.js','/shape/circle.js','/shape/polygon.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,polygonPP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_12b');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
let topParams = {width:rdim,height:rdim,numLines:10,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:50,backgroundColor:'red',lineDelta:.02,randomDelta:0,
 markSpeed:100};
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
	 core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP.stroke = 'white';
  this.polygonP.fill = 'purple';
  this.polygonP['stroke-width'] = .07; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP.dimension = 4;
  this.circleP['stroke-width'] = .07; 	
}  

//side0.initProtos = initProtos;



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
 //	this.segments = [hTop,hBot,vLeft,vRight];
 debugger;
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
  return [nextSegNum,nextIntrNum,nreverseEnds];
}

	
rs.findAregion = function (isegNum,iintrNum,reverse) {
	//debugger;
	let {allIntersections, iSegments:segs} = this;
  let segNum = isegNum;
  let intrNum = iintrNum;
	let seg = segs[segNum];
	let intrs = allIntersections[segNum];
	let intr = intrs[intrNum];
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
		let p = nintr[0];
		//let p = allIntersections[next[0]][next[1]][0];
		let dist = startPoint.boxcarDistance(p)
		if (dist  < 0.001) {
			debugger;
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

rs.filterSegs = function (segs) {
	const excludeVH = function (seg) {
		let {end0,end1} = seg;
		let {x:x0,y:y0} = end0;
		let {x:x1,y:y1} = end1;
		if (Math.abs(x1-x0) < 0.1) {
			return null;
		}
		if (Math.abs(y1-y0) < 0.1) {
			return null;
		}
		return seg;
}
	let nsegs = segs.filter(excludeVH);
	return nsegs;
}

rs.step = function ()   {
	debugger;
	  this.moveLines();
		let fsegs = this.filterSegs(this.segments);
		this.iSegments = fsegs.concat(this.sides);
		this.findAllIntersections();
		let rg = this.findAregion(1,1,false);
		let poly = this.set('poly',this.polygonP.instantiate());
		poly.corners = rg;
		poly.show();
		poly.update();
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
      

