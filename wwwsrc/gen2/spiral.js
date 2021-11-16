core.require('/shape/rectangle.js','/line/line.js','/line/arc.js','/gen0/Basics.js','/mlib/animation.js',function (rectPP,linePP,arcPP,rs,addAnimationMethods) {
addAnimationMethods(rs);
let scale = 100;
let topParams = {width:scale,height:scale,backStripeColor:'rgb(2,2,2)',backStripePadding:0.9* scale,backStripeVisible:0};

Object.assign(rs,topParams);




const toPathPart = function (seg) {
  let {end0,end1,radius} = seg;
   const p2str = function (point) {
    return `${core.nDigits(point.x,5)} ${core.nDigits(point.y,5)}`;
  }
  if (radius) {
		let {end0,end1,radius,sweep} = this;
		let vec = end1.difference(end0);
		let mid = end0.plus(vec.times(0.5));
		let nvec = vec.normalize();
		let center = mid.plus(nvec.times(radius));  
		let rs = (end0?`M ${p2str(end0)} `:'')+` ${radius} ${radius} 0 0 ${sweep} ${p2str(end1)}`;
		return rs;
  } else {
    let rs = (end0?`M ${p2str(end0)} `:'')+`L A ${radius} ${p2str(end1)}`;
    return rs;
  }
}
const mkPath = function (segs) { 
  let pth = '';
  segs.forEach((seg) => {
    let pp = toPathPart(seg);
    pth += pp;
  });
  return pth;
}
let movedShape = svg.Element.mk('<path/>');
movedShape.stroke = 'white';
movedShape['stroke-width'] = 1;

//let pbp = [[36.060223,-107.961584],[36.060255,-107.961585],[36.060275,-107.961344],[36.060256,-107.961337],[36.060275,-107.961344],[36.060295,-107.960715],[36.060637,-107.960851],[36.060858,-107.961129],[36.061039,-107.962005],[36.060220,-107.962447]];
let pbpr = [[223,-1584],[255,-1585],[275,-1344],[256,-1337],[275,-1344],[295,-715],[637,-851],[858,-1129],[1039,-2005],[220,-2447]];

const mkSeg = function (pr) {
   return {'end1':Point.mk(pr[0],pr[1])};
}

let pbsegs = pbpr.map(mkSeg);

let pbpath = mkPath(pbsegs)

//let arcseg1 = {'end0':Point.mk(-100,0),'end1':Point.mk(0,0);radius:200);

    
  


rs.offset = Point.mk(-1.4*scale,-0.72*scale);
//(1 + 1/gRatio) 

let gRatio = 1.61803398875;
let iRatio = 1/gRatio;
let rect0 = 	geom.Rectangle.mk(Point.mk(0,0),Point.mk(1 + iRatio,1));

let numRects = 10;
let rfactor = 1;
numRects = 20;

		
rs.initProtos = function () {	
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'white';
	this.rectP['stroke-width'] = 0.02;
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
  let arcP = this.set('arcP',arcPP.instantiate()).hide();
	this.arcP.stroke = 'white';
	this.arcP['stroke-width'] = .3;
}

const nextRect = function(rect,n) {
	//debugger;
	let {corner,extent} = rect;
	let {x:cx,y:cy} = corner;
	let {x:ex,y:ey} = extent;
	let ornt = n%4;
	let nex,ney,ncx,ncy;
	if (ornt === 0) {
		ncx = cx + ey;
		ncy = cy;
		nex = ey * iRatio;
		ney = ey;
	} else if (ornt === 1) {
		ncx = cx;
		ncy = cy + ex;
		nex = ex;
		ney = ex * iRatio;
	} else if (ornt === 2) {
		ncx = cx;
		ncy = cy
		nex = ey * iRatio;
		ney = ey;
	} else  if (ornt === 3){
		ncx = cx;
		ncy = cy;
		nex = ex;
		ney = ey * (1-iRatio);
	}
	let ncorner = Point.mk(ncx,ncy);
	let nextent = Point.mk(nex,ney);
	let nrect = geom.Rectangle.mk(ncorner,nextent);
  //let cidx = n%4;
  //let acorner = nrect.cornerOf(nrect,cidx);
	return nrect;
}
/*
const cornerOff = function (rect,n) {
  let {corner,extent} = rect;
 // debugger;
  let tr = rect.getTranslation();
  let {x:ex,y:ey} = extent;
  let {x:cx,y:cy} = corner;
  let lc;
  if (n === 0) {
    lc = corner;
  } else if (n === 1) {
    lc = Point.mk(cx + ex,cy);
  } else if   (n ===2) {
    lc = corner.plus(extent);
  } else {
    lc = Point.mk(cx,cy+ey)
  }
  return lc.plus(tr);
}
*/
const mkRects = function (n) {
	let rects = [rect0];
 // let corners = [cornerOf(rect0,3)];
	let cRect = rect0;
	for (let i=1;i<n;i++) {
		let nRect = nextRect(cRect,i-1);
    //let [nRect,nCorner] = rc;
		rects.push(nRect);
		//corners.push(nCorner);
		cRect = nRect;
	}
	return rects;
}


const cornerOf = function (rect,n) {
 // debugger;
  let {width:wd,height:ht} = rect;
  let tr = rect.getTranslation();
  let hw = 0.5*wd;
  let hh = 0.5*ht;
  let lc;
  if (n === 0) {
    lc = Point.mk(-hw,-hh);
  } else if (n === 1) {
    lc = Point.mk(hw,-hh);
  } else if   (n ===2) {
    lc = Point.mk(hw,hh);
  } else {
    lc = Point.mk(-hw,hh);
  }
  return lc.plus(tr);
}
  		

const mkCorners = function (rects,n) {
	let corners = [cornerOf(rects[0],3)];
 // let corners = [cornerOf(rect0,3)];
	for (let i=1;i<n;i++) {
		let corner = cornerOf(rects[i],(i+3)%4);
    //let [nRect,nCorner] = rc;
		corners.push(corner);
		//corners.push(nCorner);
	}
	return corners;
}
	
		



  		

let colors = ['white','yellow','cyan','magenta','green']
rs.pushRect = function (rect) {
	let {corner,extent} = rect;
//	debugger;
	let rects = this.Rects;
  let idx = rects.length
  let lines = this.Lines;
	let {x:ex,y:ey} = extent;
	let pos = corner.plus(extent.times(0.5)).times(scale);
	let nRect = this.rectP.instantiate().show();
	let cln = idx%4;
	let clr = colors[cln];
	nRect.stroke = clr;
	nRect.width = scale*ex;
	nRect.height = scale*ey;
	rects.push(nRect);
	nRect.moveto(pos.plus(this.offset));
}


rs.pushRects = function (rects,corners) {
	let ln = rects.length;
	for (let i=0;i<ln;i++)  {
		this.pushRect(rects[i]);
	}
}

rs.showCorners = function (corners) {
  let ln = corners.length;
  let lines = this.Lines;
  for (let i=0;i<(ln-1);i++) {
    let c0 = corners[i];
    let c1 = corners[i+1];
    let line = this.lineP.instantiate().show();
    lines.push(line);
    line.setEnds(c0,c1);
  }
}
let sqrt2 = Math.sqrt(2);

const arcRadius = function (corners,n) {
  let c0 = corners[n]
  let c1 = corners[n+1];
  return c0.distance(c1)/sqrt2;
}

rs.addArc = function (corners,n) {
  let c0 = corners[n]
  let c1 = corners[n+1];
  let radius = arcRadius(corners,n);
//c0.distance(c1)/sqrt2;
  let arc = this.arcP.instantiate().show();
  arc.end0 = c0;
  arc.end1 = c1;
  arc.radius = radius;
  arc.sweep = 1;
  this.Arcs.push(arc);
}

rs.addArcs = function (corners) {
  let ln = corners.length;
  for (let i=0;i<(ln-1);i++) {
    this.addArc(corners,i);
  }
}


const scaleAtArcStart = function (n) {
  return Math.pow(iRatio,n);
}
rs.posAlongSpiral = function (n,v) {
  let sc0 = scaleAtArcStart(n);
  let sc1 = scaleAtArcStart(n+1);
  let sc = sc0 + (sc1-sc0)  *v;
  let corners = this.corners;
  let c0 = corners[n]
  let c1 = corners[n+1];
  let radius0 = arcRadius(corners,n);
  let radius1 = arcRadius(corners,n+1);
  let radius = radius0 + (radius1 - radius0) * v;
  let nrm = 0.5*Math.PI * (n%4);
  let vc = Point.mk(Math.cos(nrm),Math.sin(nrm)).times(radius0);
  let center = c0.plus(vc); 
  //return center;
  let nrmv = Math.PI + (nrm + 0.5*Math.PI*v);
  let rs = center.plus(Point.mk(Math.cos(nrmv),Math.sin(nrmv)).times(radius0*rfactor));  
  return geom.Transform.mk(rs,sc,nrmv*(180/Math.PI));
  //return {position:rs,direction:nrmv*(180/Math.PI)}
}
	
rs.initialize = function () {
	this.initProtos();
	this.addBackStripe();
	let rects = mkRects(numRects);
	this.set('Rects',core.ArrayNode.mk()); 
	this.set('Lines',core.ArrayNode.mk()); 
	this.set('Arcs',core.ArrayNode.mk()); 
	this.set('corners',core.ArrayNode.mk()); 
	this.pushRects(rects); 
  debugger;
  let corners = mkCorners(this.Rects,numRects);
  this.corners = corners;
  //this.showCorners(corners);
  this.addArcs(corners);
  let moved =  svg.Element.mk('<g/>');
  this.set('moved',moved);
  let mRect = this.rectP.instantiate().show();
  mRect.width = 0.1 * scale
  mRect.height= 0.4 * scale
  mRect.fill = 'red';
  moved.set('rect',mRect);
  mRect.moveto(Point.mk(-0.1*scale,0));
  debugger;
  let xf = this.posAlongSpiral(0,0);
  let sc = xf.scale; 
  moved.transform = xf;
  this.numTimeSteps = 40 * (numRects -1);
  let trns = dom.svgMain.contents.transform;
  console.log('sc',sc);
  this.initialScale = 1.5*(trns.scale);
  

}

let cArc = 0;
let posInArc =0;



rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	let mvd = this.moved;
  let xf = this.posAlongSpiral(cArc,posInArc);
  let sc = xf.scale;
  
  let iscale = this.initialScale;
  let trns = dom.svgMain.contents.transform;
 // dom.svgMain.setZoom(trns,iscale/sc);
 // let sc = scaleAtArcStart(cArc)
  //let xf = geom.mkTranslation(position);
  mvd.transform = xf;
 // mvd.setRotation(direction);
  //mvd.setScale(scaleAtArcStart(cArc));
  posInArc += 0.025;
  if (posInArc >= 0.999) {
    posInArc = 0;
    cArc++;
  }	
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,40,resume);
}
return rs;

});
	
	
	
	
	
	
		