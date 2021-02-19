core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js','/gen0/image3.js',
function (linePP,polygonPP,addGridMethods,addImageMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_39');
addImageMethods(rs);

let nr = 120;
let dim = 40;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,
sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.5;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.5;
//	this.polygonP['stroke-width'] = 0.005
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
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let sp;
	//let p = Point.mk(i-numRows/2,j-numCols/2);
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


rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	let onSphere = 0;
	corners.forEach( (corner) => {
	  if (corner.category === 'onSphere') {
			onSphere = 1;
		}
	});
		
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let sCorners = this.scaleArray(rCorners,0.5,0.5);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	//if (Math.random() < 0.5) {
	let r = rvs.r;
	let g = rvs.g;
	let b = rvs.b;
	if (onSphere) {
		pgon.fill = 'green';
	//	pgon.fill = `rgb(0,${r},0)`
		pgon.fill = `rgb(${r},${g},${b})`
		pgon.fill = `rgb(${r},${r},${r})`
		pgon.show();
	} else {
	//	pgon.fill = 'red';
		pgon.fill = `rgb(${r},0,0)`
		pgon.hide();
	}
	shapes.push(pgon);
	//pgon.show();
	pgon.update();
	return pgon;
}
	
		*/
	
rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
  this.setImageParams();

  this.setupShapeRandomizer('r', {step:30,min:50,max:250});
  this.setupShapeRandomizer('g', {step:10,min:50,max:250});
  this.setupShapeRandomizer('b', {step:10,min:50,max:250});
 

 //this.genPoints3d();
 debugger;
 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initializeGrid();
}

return rs;
})

