core.require('/gen0/lines2.js',//'/random/addIntersectingLines4.js',
function (addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

let params = {radius:10,segLength:0.1,numLines:10000,
focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

addMethods(rs);

rs.setName('sphere2_0');

//rs.radius = 100;
//rs.segLength // as fraction of radius


rs.finishProtos = function () {
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 0.1;
}  
const randomTheta =  () => Math.random() * Math.PI;
const randomPhi =  () => 2* Math.random() * Math.PI;



rs.randomOnSphere = function () {
	let {radius:r,segLength:ln} = this;
	//debugger;
	let theta = randomTheta();
	let phi = randomPhi();
	let sinTheta = Math.sin(theta);
	let xu = sinTheta * Math.cos(phi);
	let yu = sinTheta * Math.sin(phi);
	let zu =  Math.cos(theta);
	if (zu <= 0) {
		return;
	}
	let ro = (1+ln)*r;
	let e0 = Point3d.mk(r*xu,r*yu,r*zu);
	let e1 = Point3d.mk(ro*xu,ro*yu,ro*zu);
	let sg = Segment3d.mk(e0,e1);
	return sg;
}
	
	

rs.initialize = function () {
	let {dim,focalPoint,focalLength,cameraScaling,numLines} = this;
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  core.root.backgroundColor ='red';
	debugger;
	let sgs = core.ArrayNode.mk();
	let count = 0;
	while (count < numLines) {
		let sg = this.randomOnSphere();
		if (sg) {
			sgs.push(sg);
			count++;
		}
	}
	let shp = Shape3d.mk(sgs);
	rs.set('shape3d',shp);
	rs.initializeLines();
}

return rs;
});