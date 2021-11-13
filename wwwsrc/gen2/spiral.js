core.require('/shape/rectangle.js','/line/line.js','/gen0/Basics.js',function (rectPP,linePP,rs) {
let scale = 100;
let topParams = {width:scale,height:scale,backStripeColor:'rgb(2,2,2)',backStripePadding:0.9* scale,backStripeVisible:0};

Object.assign(rs,topParams);

rs.offset = Point.mk(-0.8*scale,-0.5*scale);
//(1 + 1/gRatio) 

let gRatio = 1.61803398875;
let iRatio = 1/gRatio;
let rect0 = 	geom.Rectangle.mk(Point.mk(0,0),Point.mk(1 + iRatio,1));

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
	
		
		
rs.initProtos = function () {	
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'white';
	this.rectP['stroke-width'] = 0.2;
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
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

let numRects = 10
numRects = 10;

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
    
	
rs.initialize = function () {
	this.initProtos();
	this.addBackStripe();
	let rects = mkRects(numRects);
	this.set('Rects',core.ArrayNode.mk()); 
	this.set('Lines',core.ArrayNode.mk()); 
	this.set('corners',core.ArrayNode.mk()); 
	this.pushRects(rects); 
  debugger;
  let corners = mkCorners(this.Rects,numRects);
  this.showCorners(corners);
}
return rs;

});
	
	
	
	
	
	
		