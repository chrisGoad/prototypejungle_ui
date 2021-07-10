core.require(
function () {
	 return function (rs) {


rs.genRings = function (params) {
	debugger;
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



rs.placeShapesAtPoints = function (pnts,shapeP) {
	this.set('shapes',core.ArrayNode.mk());
	pnts.forEach( (p) => {
		let shape = shapeP.instantiate();
		shape.show();
		this.shapes.push(shape);
		this.shapes.push(shape);
		shape.moveto(p);
	});
}

	
return rs;

}});
