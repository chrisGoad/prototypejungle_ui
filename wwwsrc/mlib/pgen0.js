core.require(
function () {
	 return function (rs) {


rs.genRings = function (params) {
	let {numRings,radius,randomFactor = 0} = params;
	let pnts = [];
	let dr = radius/numRings;
	let da = (2*Math.PI/numRings)
  let rnd = 100;
	let r = radius;
  for (let i = 0;i<numRings;i++) {
		let angle = 0;

		for (let j = 0;j<numRings;j++) {
			let rr = r + randomFactor*(Math.random()-0.5);
			let p = Point.mk( Math.cos(angle)*rr,Math.sin(angle)*rr);
			pnts.push(p);
			angle += da;
		}
		r -= dr;
	}
  return pnts;
}
/*
rs.genGrid = function (params) {
	let {width,height,numRows,numCols} = params;
	let dx = width/numCols;
	let dy = height/numRows;
	let cx = -0.5*width;
	let rs  = [];
	for (let i = 0;i<numCols;i++) {
		let cy = -0.5*height;
		for (let j=0;j<numRows;j++) {
			let p = Point.mk(cx,cy);
			rs.push(p);
			cy += dy;
		}
	  cx += dx;
	}
	return rs;
}

*/



const interpolate = function (v0,v1,fr) {
	let d  = v1-v0;
	if (d===0) {
		return v0;
	}
	let rs = v0+fr*d;
	return rs;
}
	

const interpolatePoints = function (end0,end1,fr) {
	let v = end1.difference(end0);	
	let rs = end0.plus(v.times(fr));
	return rs;
}
	
rs.genGrid = function (params) {
	let {width,height,numRows,numCols,left:ileft,right:iright,k=1} = params;
	let rs  = [];
	debugger;
  if (ileft) {
		left = ileft;
		right = iright
	} else {
		let hw = 0.5*width;
		let hh = 0.5*height;
		let ul = Point.mk(-hw,-hh);
		let ll = Point.mk(-hw,hh);
		let ur = Point.mk(hw,-hh);
		let lr = Point.mk(hw,hh);
		left = geom.LineSegment.mk(ul,ll);
		right = geom.LineSegment.mk(ur,lr);
	}
	let {end0:left0,end1:left1} = left;
	let {end0:right0,end1:right1} = right;
	//the constant k: the first two points are 1/numCols apart and the last are k*j/numRows 
	// but this leads to a length of greater than the distance from end0 to end1 so we need to scale by kf
	let tln = 0;
	let lns = [];
	for (let i=0;i<numCols;i++) {
		let cd = (1/numCols) * interpolate(1,k,i/(numCols-1));
		lns.push(tln);
		tln += cd;
	}
	let kf = 1/tln;
	for (let j=0;j<=numRows;j++) {
		let end0 = interpolatePoints(left0,left1,j/numRows);
		let end1 = interpolatePoints(right0,right1,j/numRows);
		for (let i=0;i<numCols;i++) {
			let p = interpolatePoints(end0,end1,kf * lns[i]);
			rs.push(p);
		}
		rs.push(end1);
	}
	return rs;
}


rs.placeShapesAtPoints = function (pnts,shapeP) {
	this.set('shapes',core.ArrayNode.mk());
	pnts.forEach( (p) => {
		let shape = shapeP.instantiate();
		shape.show();
		this.shapes.push(shape);
		shape.moveto(p);
	});
}

	
return rs;

}});
