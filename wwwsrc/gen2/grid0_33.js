core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function (linePP,polygonPP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_32');
let nr = 40;
let dim = 40;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,quadDim:100,
sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.1;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.05;
	this.polygonP.fill = 'red';
	
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	//if (!(end0.onSphere) && (!end1.onSphere)) {
	//	return;
	//}
	let {blineP,lines} = this;
	let line = blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
	line.show();
	return line;
}



rs.genPoint3d = function (i,j) {
	
	let p = this.sidesPositionFunction(this,i,j);
	return p;
}
/*
rs.genPoints3d = function () {
	let {numRows,numCols} = this;
	let points3d = this.set("points3d",[]);
	for (let i = 0;i<=numRows;i++) {
		for (let j=0;j<=numCols;j++) {
			let p = this.genPoint3d(i,j);
			points3d.push(p);
		}
	}
}
*/

rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	/*let onSphere = 0;
	corners.forEach( (corner) => {
	  if (corner.category === 'onSphere') {
			onSphere = 1;
		}
	});
		*/
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let sCorners = this.scaleArray(rCorners,0.5,0.5);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	//if (Math.random() < 0.5) {
	let r = rvs.r;
	let g = rvs.g;
	let b = rvs.b;
		pgon.fill = 'green';
	//	pgon.fill = `rgb(0,${r},0)`
	pgon.fill = `rgb(${r},${g},${b})`
	pgon.fill = `rgb(${r},${r},${r})`
	pgon.show();
	shapes.push(pgon);
	//pgon.show();
	pgon.update();
	return pgon;
}


		
	
rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling,quadDim:dim} = this;
 this.initProtos();
  this.setupShapeRandomizer('r', {step:30,min:50,max:250});
  this.setupShapeRandomizer('g', {step:10,min:50,max:250});
  this.setupShapeRandomizer('b', {step:10,min:50,max:250});
	let hdim = dim/2;
  let qs = [Point3d.mk(-hdim,-hdim,0),Point3d.mk(-hdim,hdim,0),Point3d.mk(hdim,-hdim,0),Point3d.mk(hdim,hdim,0)];
 /* let q01 = Point3d.mk(-hdim,hdim,0);
  let q10 = Point3d.mk(hdim,-hdim,0);
  let q11 = Point3d.mk(hdim,hdim,0);*/
	let xf = Affine3d.mkRotation('x',geom.degreesToRadians(30));
	let qsx = qs.map((p) => xf.apply(p));
	let [q00,q01,q10,q11] =  qsx;
	let warp = 50;
	let qm10 = q10.plus(Point3d.mk(0,0,warp));
	let qm11 = q11.plus(Point3d.mk(0,0,-warp));
/*	let q00 = qsx[0];
	let q01 = qsx[1];
	let q11 = qsx[1];
	let q11 = qsx[1];*/
  this.sideA = (fr) => this.linearInterpolator(q00,q01,fr);
  this.sideB = (fr) => this.linearInterpolator(qm10,qm11,fr);
 //this.genPoints3d();
 debugger;
 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initializeGrid();
}

return rs;
})

