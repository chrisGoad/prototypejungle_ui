core.require('/gen0/animation.js','/gen0/basics.js','/gen0/topRandomMethods.js',
function (addAnimationMethods,addBasicMethods,addRandomMethods) {

//core.require(function () {
 return function (rs) {
	// debugger;
//let item = svg.Element.mk('<g/>');
//addAnimationMethods(rs);
addBasicMethods(rs);
addRandomMethods(rs);


rs.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}


rs.genLine = function (sg,ext=0) {
  let {end0,end1} = sg;
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);
  return line;
}

rs.genRingsss = function (params) {
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

rs.initBasis = function () {
	this.set('shapes',core.ArrayNode.mk());
	this.initProtos();
}

return rs;

}
});		


