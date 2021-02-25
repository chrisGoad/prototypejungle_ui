core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js','/gen0/image3.js',
function (linePP,polygonPP,addGridMethods,addImageMethods) {

return function (rs) {

addGridMethods(rs);
addImageMethods(rs);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP.stroke = 'black';
	this.blineP['stroke-width'] = 1.5;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.5;
	this.polygonP['stroke-width'] = 0;
	this.polygonP.fill = 'red';
	if (this.finishProtos) {
		this.finishProtos();
	}
	
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell,ornt) {
	let {x,y} = cell;
	if (this.inRegion(cell)) {
		return;
	}
	//if (( (x%2 === 1) && (ornt === 'vertical'))  ||  ((y%2 === 1) && (ornt==='horizontal'))) {
	if (( (x%4 !== 0) && (ornt === 'vertical'))  ||  ((y%4 !== 1) && (ornt==='horizontal'))) {
		return;
	}
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

	rs.inRegion = function (cell,fr) {
		let {numRows,numCols} = this;
		let {x,y} = cell;
		//let fr = 0.3;
		//let fr = 0.195;
		//let fr = 
		let cx = 0.5 * numRows;
		let cy = 0.5 * numCols;
		let p0 = Point.mk(cx,cy);
		let p1 = Point.mk(x,y);
	  let dist = p0.distance(p1);
		
		return dist < fr*numCols;
		
	} 
	
	rs.colorGenerator = function (rvs,cell) {
		let {pupilFraction:fri,coronaFraction:fro,irisColor,coronaColor} = this;
		let inri = this.inRegion(cell,fri);
		let inrO = fro?this.inRegion(cell,fro):fro;
		let rgb;
		if (inri) {
		  rgb = this.rgbOfCell(cell);
		} else if (inrO) {
			rgb = irisColor;
		} else {
			rgb = coronaColor;
		}
		return rgb;
	}	
rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
// core.root.backgroundColor = 'white';
 this.initProtos();
  this.setImageParams();
/*
  this.setupShapeRandomizer('r', {step:30,min:50,max:250});
  this.setupShapeRandomizer('g', {step:10,min:50,max:250});
  this.setupShapeRandomizer('b', {step:10,min:50,max:250});
 */

 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initializeGrid();
}

return rs;
}})

