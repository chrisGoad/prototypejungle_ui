
core.require(
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function ()	{ 
  return function (rs) {

	
//Object.assign(gp,newGlobalParams);
	
let newTopParams = {
	sphereCenter:Point3d.mk(0,0,-30),
	sphereDiameter:35,
	focalPoint:Point3d.mk(0,0,50),
	focalLength:10,
	cameraScaling:100
}
Object.assign(rs,newTopParams);




rs.genPoint3d = function (i,j) {
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let sp;
	let p = Point.mk(deltaX*(i-numCols/2),deltaY*(j-numRows/2));
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		return sp;
	} else {
		return p.to3d();
	}
}

//const randomTheta =  () => 0.25 * Math.PI;//Math.random() * Math.PI;
const randomTheta =  () => Math.random() * Math.PI;
const randomPhi =  () => 2* Math.random() * Math.PI;

const randomCoords = function () {
	let theta = randomTheta();
	let fractionToKeep = Math.sin(theta);
	if (fractionToKeep < 0.2*Math.PI) {
		return;
	}
	if (Math.random() < fractionToKeep) {
		let  phi = randomPhi();
		return {theta,phi};
	} else {
		return null;
	}
}

rs.pointOnSphere = function (theta,phi) {
	let {radius:r,segLength:ln} = this;
	//debugger;
	let sinTheta = Math.sin(theta);
	let xu = sinTheta * Math.cos(phi);
	let yu = sinTheta * Math.sin(phi);
	let zu =  Math.cos(theta);
	if (0 && (zu <= 0)) {
		return;
	}
	let p = Point3d.mk(r*xu,r*yu,r*zu);
  return p;
}

rs.randomPointOnSphere = function () {
	let {radius:r,segLength:ln} = this;
	//debugger;
	let theta = randomTheta();
	let phi = randomPhi();
	return this.pointOnSphere(theta,phi);
	let sinTheta = Math.sin(theta);
	let xu = sinTheta * Math.cos(phi);
	let yu = sinTheta * Math.sin(phi);
	let zu =  Math.cos(theta);
	if (0 && (zu <= 0)) {
		return;
	}
	let p = Point3d.mk(r*xu,r*yu,r*zu);
  return p;
}

/*
rs.randomSegOnSphere = function () {
	let {radius,segLength,fixedSpin} = this;
	debugger;
	let rc = randomCoords();
	if (!rc) {
		return null;
	}
	let {theta,phi} =rc;
	if (Math.cos(theta) < 0) {
		return;
	}
	let unitLong = Math.sin(theta);
	let spin = fixedSpin?fixedSpin:Math.random() *  Math.PI;
	let unitTheta = segLength/radius;
	let deltaTheta = 0.5*unitTheta*Math.sin(spin);
	let unitPhi = unitTheta/Math.sin(theta);
	let deltaPhi = 0.5*unitPhi*Math.cos(spin);
	let e0 = this.pointOnSphere(theta+deltaTheta,phi + deltaPhi);
	let e1 = this.pointOnSphere(theta-deltaTheta,phi - deltaPhi);
	let dist = (e1.difference(e0)).length();
	console.log(' dist ',dist);
	let rs = Segment3d.mk(e0,e1);
	return rs;
}
	*/

rs.segOnSphere = function (theta,phi,spin) { // segment centered on the point with the given polar coords
	let {radius,segLength,fixedSpin} = this;
	//debugger;
	if (Math.cos(theta) < 0) {
		return;
	}
	let unitLong = Math.sin(theta);
	//let spin = fixedSpin?fixedSpin:Math.random() *  Math.PI;
	let unitTheta = segLength/radius;
	let deltaTheta = 0.5*unitTheta*Math.sin(spin);
	let unitPhi = unitTheta/Math.sin(theta);
	let deltaPhi = 0.5*unitPhi*Math.cos(spin);
	let e0 = this.pointOnSphere(theta+deltaTheta,phi + deltaPhi);
	let e1 = this.pointOnSphere(theta-deltaTheta,phi - deltaPhi);
	let dist = (e1.difference(e0)).length();
	console.log(' dist ',dist);
	let rs = Segment3d.mk(e0,e1);
	return rs;
}
	
rs.randomSegOnSphere = function () {
	let rc = randomCoords();
	if (!rc) {
		return null;
	}
	let {theta,phi} =rc;
	return this.segOnSphere(theta,phi);
}

rs.genRandomPolars = function (n) {
	this.thetas = [];
	this.phis = [];
	let cnt = 0;
	debugger;
	while (cnt < n) {
		let rc = randomCoords();
		if (rc) {
			let {theta,phi} = rc;
			if (Math.cos(theta) >=0) {
				this.thetas.push(theta);
				this.phis.push(phi);
			  cnt++;
			}
		}
	}
}

rs.genSegsFromPolars = function (sgs) {
	let {thetas,phis,fixedSpin} = this;
	let n = thetas.length;
	for (let i=0;i<n;i++) {
		let sg = this.segOnSphere(thetas[i],phis[i],fixedSpin);
		if (sg) {
			sgs.push(sg);
			
		}
	 sg = this.segOnSphere(thetas[i],phis[i],fixedSpin + 0.5*Math.PI);
		if (sg) {
			sgs.push(sg);
			
		}
	}
}
		
				
	
	
	
	

	




}});

