
core.require('/gen0/animation.js','/line/line.js',function (addAnimationMethods,linePP) {

//core.require(function () {
 return function (item) {
	 addAnimationMethods(item);

/*adjustable parameters  */

item.width = 200;
item.height = 200;




item.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  

item.addSides = function (rect) {
	let hw,hh;
	let {corner,extent} = rect;
	hw = (extent.x)/2;
	hh = (extent.y)/2;
	let {x:cx,y:cy} = corner;
	let {x:ex,y:ey} = extent;
  let UL = Point.mk(cx,cy)
  let UR = Point.mk(cx+ex,cy)
  let LL = Point.mk(cx,cy+ey)
  let LR  = Point.mk(cx+ex,cy+ey)
	/* let UL = Point.mk(-hw,hh)
  let UR = Point.mk(hw,hh)
  let LL = Point.mk(-hw,-hh)
  let LR  = Point.mk(hw,-hh)*/
  rect.topSide = geom.LineSegment.mk(UL,UR);
	rect.rightSide = geom.LineSegment.mk(UR,LR);
  rect.bottomSide = geom.LineSegment.mk(LR,LL);
  rect.leftSide = geom.LineSegment.mk(LL,UL);
}



item.addLine = function (i,lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  if (!lsg) {
    debugger; // keep
  }
 
  let seg2line = this.segmentToLineFunction;
  let line;
  if (seg2line) {
    line = seg2line(this,lsg);
  } else {
    line = this.lineP.instantiate();
    let {end0,end1} = lsg;
    line.setEnds(end0,end1);
  }
	if (lsg.origin && lsg.origin.stroke) {
		line.stroke = lsg.origin.stroke;
	}
  //this.lines.set(i,line);
	if (!this.lines) {
		this.set('lines',core.ArrayNode.mk());
	}
  this.lines.push(line);
  line.update();
  line.show();
}



item.addLines = function () {
  let segs = this.segments;
  let num = segs.length;
  for (let i=0;i<num;i++) {
		let seg = segs[i];
		if (!seg.hideMe) {
      this.addLine(i,segs[i]);
		}
  }
}

// assumes item.segments3d or item.segments
item.updateLines = function (newSegs) {
	this.initProtos();
  let {segments,shape3d,camera} = this;
	let rect,circle;
	if (!newSegs) {
   	segments.length = 0;
	}
	lines.remove();
	this.set('lines',core.ArrayNode.mk());

	//}
	let prj = camera.project(shape3d);
	prj.forEach( (seg) => segments.push(seg));
  this.addLines();
}

item.initializeLines = function (irect) {
	this.set('lines',core.ArrayNode.mk());
	this.set('segments',core.ArrayNode.mk());
	this.updateLines();
}



}});

