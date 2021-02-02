core.require('/gen0/lines2.js',//'/random/addIntersectingLines4.js',
function (addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

let params = {focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

addMethods(rs);

rs.setName('cube2_0');

rs.dim = 10;

rs.initialize = function () {
	let {dim,focalPoint,focalLength,cameraScaling} = this;
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  core.root.backgroundColor ='white';
	let hdim = dim/2;
	let mhdim = -hdim;
	let b00 = Point3d.mk(mhdim,mhdim,mhdim);
	let b10 = Point3d.mk(hdim,mhdim,mhdim);
	let b01 = Point3d.mk(mhdim,hdim,mhdim);
	let b11 = Point3d.mk(hdim,hdim,mhdim);
  let t00 = Point3d.mk(mhdim,mhdim,hdim);
	let t10 = Point3d.mk(hdim,mhdim,hdim)
	let t01 = Point3d.mk(mhdim,hdim,hdim);
	let t11 = Point3d.mk(hdim,hdim,hdim);
	let bs0 = Segment3d.mk(b00,b10);
	let bs1 = Segment3d.mk(b10,b11);
	let bs2 = Segment3d.mk(b11,b01);
	let bs3 = Segment3d.mk(b01,b00);
	let ts0 = Segment3d.mk(t00,t10);
	let ts1 = Segment3d.mk(t10,t11);
	let ts2 = Segment3d.mk(t11,t01);
	let ts3 = Segment3d.mk(t01,t00);
	let vs0 = Segment3d.mk(b00,t00);
	let vs1 = Segment3d.mk(b10,t10);
	let vs2 = Segment3d.mk(b11,t11);
	let vs3 = Segment3d.mk(b01,t01);	
  let sgs = core.ArrayNode.mk([bs0,bs1,bs2,bs3,ts0,ts1,ts2,ts3,vs0,vs1,vs2,vs3]);
	let xf = Affine3d.mkRotation('x',geom.degreesToRadians(30));
	let shp = Shape3d.mk(sgs,xf);
	rs.set('shape3d',shp);
	rs.initializeLines();
}

return rs;
});