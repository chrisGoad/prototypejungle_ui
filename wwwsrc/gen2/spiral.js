core.require('/shape/rectangle.js','/gen0/Basics.js',function (rectPP,rs) {
let scale = 100;
let topParams = {width:scale,height:scale,backStripeColor:'rgb(2,2,2)',backStripePadding:0.2* scale,backStripeVisible:1};

Object.assign(rs,topParams);

//(1 + 1/gRatio) 

let gRatio = 1.61803398875;
let iRatio = 1/gRatio;
let rect0 = 	geom.Rectangle.mk(Point.mk(0,0),Point.mk(1 + iRatio,1));

const nextRect = function(rect,n) {
	debugger;
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
	return nrect;
}

const mkRects = function (n) {
	let rects = [rect0];
	let cRect = rect0;
	for (let i=1;i<n;i++) {
		let nRect = nextRect(cRect,i-1);
		rects.push(nRect);
		cRect = nRect;
	}
	return rects;
}
	
		
		
rs.initProtos = function () {	
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'white';
	this.rectP['stroke-width'] = 1;
}

let colors = ['white','yellow','cyan','magenta','green']
rs.pushRect = function (rect) {
	let {corner,extent} = rect;
	debugger;
	let rects = this.Rects;
	let {x:ex,y:ey} = extent;
	let pos = corner.plus(extent.times(0.5)).times(scale);
	let nRect = this.rectP.instantiate().show();
	let ln = rects.length;
	let cln = ln%4;
	let clr = colors[cln];
	nRect.stroke = clr;
	nRect.width = scale*ex;
	nRect.height = scale*ey;
	rects.push(nRect);
	nRect.moveto(pos);
}

let numRects = 10;

rs.pushRects = function (rects) {
	let ln = rects.length;
	for (let i=0;i<ln;i++)  {
		this.pushRect(rects[i]);
	}
}
	
rs.initialize = function () {
	this.initProtos();
	this.addBackStripe();
	let rects = mkRects(numRects);
	this.set('Rects',core.ArrayNode.mk()); 
	this.pushRects(rects);
}
return rs;

});
	
	
	
	
	
	
		