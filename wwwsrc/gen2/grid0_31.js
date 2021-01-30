core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function (linePP,polygonPP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_31');
let nr = 40;
let dim = 400;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.5;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.5;
	this.polygonP.fill = 'red';
	
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let {blineP,lines} = this;
	let line = blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
	line.show();
	return line;
}


rs.genPoint3d = function (i,j) {
	let {numRows,numCols,sphereCenter,sphereDiameter,randomGridsForBoundaries} = this;
	debugger;
	let rvs = this.randomValuesAtCell(randomGridsForBoundaries,i,j);
  let z = rvs.z;
	console.log('z',z);
	let sp;
	let p = Point.mk(i-numRows/2,j-numCols/2);
	let p3d = p.to3d();
	p3d.z = z;
  return p3d;
}

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
	if (onSphere) {
		pgon.fill = 'green';
	} else {
		pgon.fill = 'red';
	}
	shapes.push(pgon);
	pgon.show();
	pgon.update();
	return pgon;
}
	
		
	
rs.initialize = function () {
 let {focalPoint,focalLength} = this;
 this.initProtos();
 debugger;
 this.setupBoundaryRandomizer('z', {step:1,min:5,max:10});

 this.genPoints3d();
 debugger;
 this.camera = geom.Camera.mk(focalPoint,focalLength,100,'z');
 this.initializeGrid();
}

return rs;
})

