core.require('/shape/rectangle.js','/line/line.js','/line/arc.js','/gen0/Basics.js','/mlib/animation.js',function (rectPP,linePP,arcPP,top,addAnimationMethods) {
let scale = 100;
let topParams = {width:scale,height:scale,backStripeColor:'rgb(2,2,2)',backStripePadding:0.9* scale,backStripeVisible:0};


top.setName('spiral');
let rs = svg.Element.mk('<g/>').show();
top.set('rs',rs);
Object.assign(rs,topParams);
addAnimationMethods(top);
//inner.moveto(Point.mk(60,20));

const toPathPart = function (seg) {
  debugger;
  let {end0,end1,radius} = seg;
   const p2str = function (point) {
    return `${core.nDigits(point.x,5)} ${core.nDigits(point.y,5)}`;
  }
  if (radius) {
    let sweep = 1;
		/*let vec = end1.difference(end0);
		let mid = end0.plus(vec.times(0.5));
		let nvec = vec.normalize();
		let center = mid.plus(nvec.times(radius));  */
		//let rs = (end0?`M ${p2str(end0)} `:'')+` ${radius} ${radius} 0 0 ${sweep} ${p2str(end1)} `;
		//let rs = `A ${radius} ${radius} 0 1 0 ${p2str(end1)} `;

		//let rs = `A ${radius} ${radius} 0 0 0 ${p2str(end1)} `;
		let rs = `A ${radius} ${radius} 0 0 1 ${p2str(end1)} `;
		//let rs = `A ${radius} ${radius} 0 1 0 ${p2str(end1)} `;
		//let rs = `A ${radius} ${radius} 0 1 1 ${p2str(end1)} `;
		return rs;
  } else {
    let rs = end0?`M ${p2str(end0)} `:`L ${p2str(end1)} `;
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
let innerShape1 = svg.Element.mk('<path/>');
innerShape1.stroke = 'white';
innerShape1.fill = 'yellow';
innerShape1['stroke-width'] = 5;
let innerShape2 = svg.Element.mk('<path/>');
innerShape2.stroke = 'red';
innerShape2.fill = 'transparent';
//innerShape2.fill = 'yellow';
innerShape2['stroke-width'] = 5;
let innerShape3 = svg.Element.mk('<g/>');

let backRect = rectPP.instantiate().show();
backRect.fill = 'transparent';
backRect['stroke-width'] = 2;
backRect.stroke = 'red';
backRect.width =10;
backRect.width =200;
backRect.height =200;
top.set('backRect',backRect);
backRect.moveto(Point.mk(-60,-22));


//let pbp = [[36.060223,-107.961584],[36.060255,-107.961585],[36.060275,-107.961344],[36.060256,-107.961337],[36.060275,-107.961344],[36.060295,-107.960715],[36.060637,-107.960851],[36.060858,-107.961129],[36.061039,-107.962005],[36.060220,-107.962447]];
//let pbpr = [[223,-1584,'first'],[255,-1585],[275,-1344],[256,-1337],[275,-1344],[295,-715,1],[637,-851],[858,-1129],[1039,-2005],[220,-2447],[223,-1584]];
//let pbpr = [[223,-1584,'first'],[255,-1585],[275,-1344],[256,-1337],[275,-1344],[295,-715,1000],[637,-851],[858,-1129],[1039,-2005],[220,-2447],[223,-1584]];
//let pb = [[223,-1584,'first'],[220,-2447],[1039,-2005,1000],[858,-1129,1000],[637,-851],[295,-715,1000],[275,-1344],[256,-1337,1000],[275,-1585],[255,-1585],[223,-1584]];
let pbpr = 
[[223,-1584,'first'],[220,-2447],[1039,-2005,1000],[858,-1129,1000],[637,-851],[295,-715,1000],[261,-1335],[275,-1338],[275,-1343],[255,-1585],[223,-1584]];
//let semiCircle = [[223,-1584,'first'],[220,-2447],[256,-1337,1000],[223,-1584]];
let semipr = [[223,-1584,'first'],[223,-1584],[223,-258,600],[223,-1584]];

const mkSeg = function (pr,offset) {
      let first = pr[2] === 'first';
      let radius = pr[2];
      let pnt = Point.mk(pr[0],pr[1]).plus(offset);
     // let pnt = Point.mk(pr[0],pr[1]).difference(Point.mk(223,-1584));
      let pnt0;
      if (radius && !first) {
        pnt0 = Point.mk(pr[3],pr[4]);
      }

      let rs = first?{'end0':pnt}:(radius?{'end0':pnt0,'end1':pnt,'radius':radius}:{'end1':pnt});
      return rs;
}


//let pbsegs = pbpr.map(mkSeg);
let pbsegs = pbpr.map((pr) => {return mkSeg(pr,Point.mk(-233,1584))});
let semisegs = semipr.map((pr) => {return mkSeg(pr,Point.mk(-233,1584))});
//debugger;
let pbpath = mkPath(pbsegs);
let semipath = mkPath(semisegs);
//let arcseg1 = {'end0':Point.mk(-100,0),'end1':Point.mk(0,0);radius:200);

    
  innerShape1.d = pbpath;
 // movedShape.transform = geom.Transform.mk(Point.mk(-14,0),0.1,*(180/Math.PI));
  innerShape1.transform = geom.Transform.mk(Point.mk(-43,0),0.05,0);
  innerShape1.transform = geom.Transform.mk(Point.mk(-60,0),0.07,0);
  innerShape1.transform = geom.Transform.mk(Point.mk(-60,0),0.07,0);
  innerShape1.transform = geom.Transform.mk(Point.mk(-100,0),0.11,0);
  //innerShape1.transform = geom.Transform.mk(Point.mk(-60,0),0.08,0);
  let movedShape =  svg.Element.mk('<g/>');
 movedShape.set('innner1',innerShape1);

  innerShape2.d = semipath;
  innerShape2.transform = geom.Transform.mk(Point.mk(-95,-90),0.14,0);
 //movedShape.set('innner2',backRect);
  movedShape.set('innner2',innerShape2);
 // movedShape.set('inner3',innerShape3);
  innerShape3.transform = geom.Transform.mk(Point.mk(-60,0),0.07,0);
  //marker.moveto(Point.mk(-233,1584));




rs.offset = Point.mk(-1.4*scale,-0.72*scale);
//(1 + 1/gRatio) 

let gRatio = 1.61803398875;
let iRatio = 1/gRatio;
let rect0 = 	geom.Rectangle.mk(Point.mk(0,0),Point.mk(1 + iRatio,1));

let numRects = 4;
let rfactor = 1;
numRects = 7;

		
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

let cArc = 0;
let posInArc =0.75;

rs.initialize = function () {
	this.initProtos();
//	this.addBackStripe();
	let rects = mkRects(numRects);
	this.set('Rects',core.ArrayNode.mk()); 
	this.set('Lines',core.ArrayNode.mk()); 
	this.set('Arcs',core.ArrayNode.mk()); 
	this.set('corners',core.ArrayNode.mk()); 
	this.pushRects(rects); 
 // debugger;
  let corners = mkCorners(this.Rects,numRects);
  this.corners = corners;
  //this.showCorners(corners);
  this.addArcs(corners);
  //this.set('moved',moved);
  let moved = this.set('moved',movedShape);
  
  /*let mRect = this.rectP.instantiate().show();
  mRect.width = 0.1 * scale
  mRect.height= 0.4 * scale
  mRect.fill = 'red';
  moved.set('rect',mRect);
  mRect.moveto(Point.mk(-0.1*scale,0));*/
  debugger;
  let xf = this.posAlongSpiral(cArc,posInArc);
  let sc = xf.scale; 
  moved.transform = xf;
  this.numTimeSteps = 40 * (numRects -1);
  let trns = dom.svgMain.contents.transform;
  console.log('sc',sc);
  this.initialScale = 1.5*(trns.scale);
  

}

top.initialize = function () {
  this.rs.initialize();
}
rs.step = function ()   {
	debugger;
	//this.stepShapeRandomizer('shade');
  let {timeStep,numTimeSteps} = this.__parent;
 /* if (timeStep >= (numTimeSteps-20)) {
     console.log('RESTART');
     cArc  = 0;
     posInArc = 0;
     this.timeStep = 0;
     this.frameNumber = 0;
  }*/
  let mvd = this.moved;

  if (timeStep <15) {
    return;
  } 

	//let mvd = this.moved;
  let xf = this.posAlongSpiral(cArc,posInArc);
  debugger;
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
    if (cArc === 5) {
      this.__parent.paused = true;
    }
  }	
}
top.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume);
}

top.step = function () {
  this.rs.step();
}

top.animateItt = function (nts,intv,resume) {
  debugger;
  this.rs.animateIt(nts,intv,resume);
}
return top;

});
	
	
	
	
	
	
		