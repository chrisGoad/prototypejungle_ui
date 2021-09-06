
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebTreeMethods(rs);
//addWebMethods(rs);
rs.setName('min0_5');
let ht= 2000;
ht = 3000;
let nrc=64;
nrc = 50;
nrc = 26;
//nrc = 16;
let mcl = 1.6*(ht/nrc);
mcl = 50
//mcl =100;
let minc = 20;
//mcl = 50;
//mcl = 3.6*(ht/nrc);
//nrc = 2;
let cellsz = ht/nrc;

let  topParams = {backgroundColor:'yellow',width:ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+minc,numPairs:2,fringeColor:'blue',missingCols:1,missingRows:1,jiggle:0.0*cellsz};
let source, target;

console.log('cellsz',cellsz);
Object.assign(rs,topParams);

rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP['stroke-width'] = 7;
	lineP.stroke  = 'white';
	//lineP.stroke  = 'blue';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	//circleP.dimension = 100;
	circleP.fill = 'transparent';
	circleP.fill = 'red';
	 let circleP2 = this.set('circleP2',circlePP.instantiate()).hide();
	circleP2.dimension = 500;
	circleP2.fill = 'black';
	circleP2.fill = 'rgb(0,0,50)';
	circleP2.fill = 'rgb(0,100,250)';
	circleP2.fill = 'black';
	
	
}  

const interpolate = function (v1,v2,f) {
	return v1 + (v2-v1)*f;
}
/*

rs.inDiamond = function (p) {
	let width = this.width;
	let bd = p.boxcarDistance(Point.mk(0,0));
  return bd < 0.5 * width;
}


const inSquare = function (p,hw) {
	return (-hw < p.x) && (p.x < hw) && (-hw < p.y) && (p.y < hw);
	
}

 let {width,height} = this;
	let hw = 0.5* width;
	let hh = 0.5* height;
	*/
rs.inUL = function (p) {
	let {x,y} = p;
  return (x  < 0) && (y <0);
}
rs.inUR = function (p) {
	let {x,y} = p;
  return (x  > 0) && (y <0);
}

rs.inLL = function (p) {
	let {x,y} = p;
  return (x  < 0) && (y > 0);
}
rs.inLR = function (p) {
	let {x,y} = p;
  return (x  > 0) && (y > 0);
}


rs.quadrant = function (p) {
	//console.log('gridc',p.gridc.x,p.gridc.y);
	let {x,y} = p;
  if ((x  < 0) && (y <0)) {
		return 'UL';
	}
	if ((x  > 0) && (y <0)) {
		return 'UR';
	}
  if ((x  < 0) && (y > 0)) {
		return 'LL';
	}
	if ((x  > 0) && (y > 0)) {
		return 'LR';
	} else {
		return 'gap';
	}
}

rs.point2GridCoords = function (p) {
	//debugger;
 let {width:w,numCols:nrc} = this;
 let cellsz = w/nrc;
 let hw = 0.5*w;
 let ul = Point.mk(-hw,-hw);
 let v = p.difference(ul);
 let {x,y} = v;
 return Point.mk(Math.floor(x/cellsz),Math.floor(y/cellsz));
}

rs.quadrantULgpoint = function (q) {
	let {width:w,numCols:nrc} = this;
  let nrcp1 = nrc/2+1;
	if (q ==='UL') {
		return Point.mk(0,0);
	}
	if (q ==='UR') {
		return Point.mk(nrcp1,0);
	}
	if (q ==='LL') {
		return Point.mk(0,nrcp1);
	}
	if (q ==='LR') {
		return Point.mk(nrcp1,nrcp1);
	}
	
}	
 
rs.inQuadrantOuter = function (q,p) {
	let {numCols:nrc,stage} = this;
	
	if (stage === 1) {
		debugger;
	}
	let ul = this.quadrantULgpoint(q);
	if (!ul) {
		 console.log('ZZZZ',q,p);
		 debugger;
	}
	let rp = p.difference(ul);
	//console.log('q',q,'p',p.x,p.y,'ul',ul.x,ul.y);
	let lst  = Math.floor(nrc/2)-1;
	let {x,y} = rp;
	if ((x<2) || ((lst-x) < 2)) {
		return true;
	}
	if ((y<2) || ((lst-y) < 2)) {
		return true;
	}
}

	
/*
const inCircle = function (p,d) {
	let dist = p.distance(Point.mk(0,0));
	return dist < d;
	
}
rs.colorFromPoint = function (p) {
	let w = this.width;
//	if (inSquare(p,0.1  * w)) {
	if (inCircle(p,0.2  * w)) {
		return 'rgb(0,100,250)';
	}
	//if (this.inDiamond(p)&&inSquare(p,0.7 * 0.5 * w)) {
	if (inSquare(p,0.7 * 0.5 * w)) {
		return 'red';
	}
	if (this.inDiamond(p)) {
		return 'gray';
		return 'blue';
	} 
  //return 'rgb(0,100,250)'
  //return 'blue'
	return 'transparent';
	return 'white';
	
}*/
rs.source = 'UL'
rs.target = 'LR';
rs.nontargets = ['UR','LL'];

rs.displacementQ = function (source,target) {
let {width:w,numCols:nrc} = this;
 let cellsz = w/nrc;
	let hw = 0.5*w + cellsz;
	if ((source === 'UL') && (target ==='UR')) {
		return Point.mk(hw,0);
	}
	if ((source === 'UL') && (target ==='LL')) {
		return Point.mk(0,hw);
	}
	if ((source === 'UL') && (target ==='LR')) {
		return Point.mk(hw,hw);
	}
}
	

rs.addSegs = function (fromIndex=0) {
	let {connectSegs,shortenBy=10,width:w,source,target,nontargets,stage} = this;
	let hw = 0.5*w+cellsz;
	let displacement = Point.mk(hw,hw);
	const render = (sg) => {
	//	debugger;
		
		let ssg = sg.lengthen(shortenBy);
		ssg.index0 = sg.index0;
		ssg.index1 = sg.index1;
	  let line = this.genLine(ssg);
		let {end0,end1} = ssg;
		if (this.colorFromPoint) {
			line.stroke = this.colorFromPoint(end0);
		}
    this.installLine(line);
	}		
		 
	
  let ln = connectSegs.length;
	let cend0,cend1,csg;
	for (let i=fromIndex;i<ln;i++) {
		if (i===(ln-1)) {
//			debugger;
		}
		let sg = connectSegs[i];
		let {end0,end1} = sg;
		debugger;
		//if (this.inUL(end0) && this.inUL(end1) && (this.inQuadrantOuter('UL',end0.gridc) || this.inQuadrantOuter('UL',end1.gridc))) {
		//if (this.inQuadrantOuter('UL',end0.gridc) && this.inQuadrantOuter('UL',end1.gridc)) {
		if (this.stage === 0) {	
      		
			let iqo = this.inQuadrantOuter(source,end0.gridc) || this.inQuadrantOuter(source,end1.gridc);		
			nontargets.forEach( (nt) => {
				displacement = this.displacementQ(source,nt);
				if (!displacement) {
					console.log('!!!');
					debugger;
				}
				cend0 = end0.plus(displacement);
				cend1 = end1.plus(displacement);
				csg = geom.LineSegment.mk(cend0,cend1);
				render(csg);
		  });
			if (iqo) {
				displacement = this.displacementQ(source,target);
				cend0 = end0.plus(displacement);
				cend1 = end1.plus(displacement);
				csg = geom.LineSegment.mk(cend0,cend1);
				connectSegs.push(csg);
				render(csg);
			};
		}
		//debugger;
		render(sg);
	}
}	

rs.stage = 0;
rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,height,cPoints,stage,target} = this;
	//debugger;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let ij = this.point2GridCoords(pi);
  //console.log('i',i,'j',j,ij.x,ij.y);
  //console.log('i',i,'j',j,ij.x,ij.y);

	let qi = this.quadrant(pi);
	//console.log('qi',qi);
	let qj = this.quadrant(pj);
	if (qi !== qj) {
		return;
	}
	if (qi  === 'LR') {
//		console.log('qig',pi.gridc.x,pi.gridc.y);
	}
	
   

	let d = pi.distance(pj);
	mnCln = 50;
//	if (inSquare(pi,0.1*width)) {
 /* if (this.inUL(pi)) {
		mnCln = cellsz * 1.1;
		mxCln = mnCln + 0.5*cellsz;
	} else if (this.inUR(pi)) {
	  mnCln = cellsz * 1.1;
		mxCln = mnCln + 0.5*cellsz;
		//mnCln = 50;
		//mxCln = mnCln + 40;
  } else if (this.inLL(pi)) {
		mnCln = cellsz * 1.1;
		mxCln = mnCln + 0.5cellsz;
	*/
	//let q = this.quadrant(pi);
	let activeQuadrants;
	if (stage===0) {
	  activeQuadrants = {'UL':1};
		if (!activeQuadrants[qi]) {
			return false;
		}

	} else {
		activeQuadrants = {'LR':1}
		if (!activeQuadrants[qi]) {
		  return false;
		}
		//debugger;
		let iqo = this.inQuadrantOuter(target,pi.gridc) && this.inQuadrantOuter(target,pj.gridc);		
		if (!iqo) {
			console.log('iqo',iqo);
		}
    if (iqo) {
			return false;
		}
	}
  mnCln = 1.1*cellsz;
  mnCln = 1.1*cellsz;
  mxCln = mnCln + cellsz;
  mxCln = mnCln + 2*cellsz;
	
	//debugger;
	let rs = (mnCln < d) && (d < mxCln);
	if (rs) {
	//	debugger;
	}
	return rs;
}


rs.initialize = function () {
  core.root.backgroundColor = 'black';
  core.root.backgroundColor = 'rgb(50,50,50)';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
//	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
	this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
	let {cPoints,connectSegs} = this;
  let ln = connectSegs.length;
	this.stage = 1;
	debugger;
	//return;
	this.addWeb();
	this.addSegs(ln);
	//this.set('cc',this.circleP2.instantiate()).show();
	return;

//debugger;
	this.loopFringeAddition(0);
	return;
	for (let i=0;i<150;i++) {
		let nf = this.selectNonFringe();
		if (nf > -1) {
			let pf = cPoints[nf];
			pf.onFringe = 1;
			let sgl = connectSegs.length;
			this.addWeb();
			this.addSegs(sgl);
		} else {
			return;
		}
	}
}


return rs;

});

