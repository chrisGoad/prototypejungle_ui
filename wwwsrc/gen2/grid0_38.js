core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function (linePP,polygonPP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_38');
let nr = 120;
let dim = 40;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,quadDim:100,
sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.1;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.05;
	this.polygonP['stroke-width'] = 0.0;
	this.polygonP.fill = 'red';
	
}  

rs.boundaryLineGeneratorr = function (end0,end1,rvs,cell) {
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

rs.setImageParams = function () {
	debugger;
	let {numRows,numCols} = this;
	let {imWd,imHt} = draw.vars;
	let ar = numCols/numRows;
	let imAr = imWd/imHt;
	let sc;
	if (imAr > ar) {
		sc = imWd/numCols;
	} else {
		sc = imHt/numRows;
	}
	sc = Math.ceil(sc); // this many pixels are averaged
	this.pixelsPerCell = sc;
	this.numImCols = Math.floor(imWd/sc);
	this.numImRows = Math.floor(imWd/sc);
}

rs.rgbOfCell = function (cell) {
	let {imWd,imHt,imageData} = draw.vars;
	let {pixelsPerCell:pxpc,numImRows,numImCols} = this;
	let {x:y,y:x} = cell;
	if ((x>=numImCols) || (y>=numImRows)) return 'black';
  const indexOfPixel = function (x,y) {
		return x*imWd*4+y*4;
	}
	let lowPxX = x * pxpc;
	let lowPxY = (imHt-y) * pxpc;
	lowPxY = y * pxpc;
	let avR = 0;
	let avG = 0;
	let avB = 0;
	let avO = 0;
	for (let i=0;i<pxpc;i++) {
		for (let j=0;j<pxpc;j++) {
			let idx = indexOfPixel(lowPxX+i,lowPxY+j);
			let r = imageData[idx];
			let g = imageData[idx+1];
			let b = imageData[idx+2];
			avR += imageData[idx];
			avG += imageData[idx+1];
			avB += imageData[idx+2];
			avO += imageData[idx+3];
		}
	}
	let pxpc2 = pxpc*pxpc;
	avR = Math.floor(avR/pxpc2);
	avG = Math.floor(avG/pxpc2);
	avB = Math.floor(avB/pxpc2);
	avO = Math.floor(avO/pxpc2);
	let rs = `rgb(${avR},${avG},${avB})`;
	return rs;
}
	
	
	
	
	rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	//let imd = draw.vars.imageData;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	let rgb = this.rgbOfCell(cell);
	/*let onSphere = 0;
	corners.forEach( (corner) => {
	  if (corner.category === 'onSphere') {
			onSphere = 1;
		}
	});
		*/
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let polygonScale = 1;
	let sCorners = this.scaleArray(rCorners,polygonScale,polygonScale);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	//if (Math.random() < 0.5) {
	let r = rvs.r;
	let g = rvs.g;
	let b = rvs.b;
		pgon.fill = 'green';
	//	pgon.fill = `rgb(0,${r},0)`
	pgon.fill = rgb;
	//pgon.fill = `rgb(${r},${g},${b})`
	//pgon.fill = `rgb(${r},${r},${r})`
	pgon.show();
	shapes.push(pgon);
	//pgon.show();
	pgon.update();
	return pgon;
}


		
	
rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling,quadDim:dim} = this;
 this.initProtos();
 this.setImageParams();
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
	let warp = 150;
	//warp = 20;
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

