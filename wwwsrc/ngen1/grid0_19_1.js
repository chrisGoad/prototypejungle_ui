core.require('/shape/polyline.js','/shape/polygon.js','/shape/circle.js','/line/line.js','/gen0/Basics.js','/mlib/grid.js','/mlib/sphere.js',
function (polylinePP,polygonPP,circlePP,linePP,rs,addGridMethods,addSphereMethods) {
//core.require('/gen1/grid0_19.js',
//function (rs) {
 addGridMethods(rs);
 addSphereMethods(rs);

 rs.setName('grid0_19_1');
 let bkdim = 1200;
 //let topParams = {width:800,height:400,numRows:100,numCols:100,pointJiggle:0,factorX:0.25,factorY:0.05,crossColor:'yellow',threeD:0,
//sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100,randomSpeed:0.2};

let topParams = {width:40,height:40,numRows:40,numCols:40,pointJiggle:0,fcLineX:.25,fcLineY:.25,fcGonX:.5,fcGonY:.5,fcCircle:0.7,randomSpeed:0.2,
backgroundWidth:bkdim,backgroundHeight:bkdim,backgroundColor:'rgb(5,5,5)',threeD:1,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['polygon','verticalLine','horizontalLine','cross'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(rs,topParams);
	
rs.initProtos = function () {
	let threeD = this.threeD;
	core.assignPrototypes(this,'lineP',linePP);

	this.lineP['stroke-width'] = threeD?1:.1;
	core.assignPrototypes(this,'polylineP',polylinePP);

	this.polylineP['stroke-width'] = threeD?1.75:.175;
	this.polylineP.stroke = 'white';
		core.assignPrototypes(this,'polygonP',polygonPP);

	this.polygonP['stroke-width'] = threeD?1:0.1;
	this.polygonP.fill = 'transparent';
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	

rs.chooseWhich = function (rvs, cell) {
	let {numRows:nr,numCols:nc} = this;
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let p = Point.mk(x,y);
	let cntr = Point.mk(hnc,hnr);
	let dist = p.distance(cntr);
  let inPupil = dist < 10;
	if (!inPupil) {
		//return 'cross';
		return 'polygon';
	} else {
		return Math.random()<0.5?'verticalLine':'horizontalLine';
	}

}
rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polylineP,polygonP,circleP,lineP,deltaX,deltaY,fcLineX,fcLineY,fcGonX,fcGonY,fcCircle,
	fcCrossA0,fcCrossA1,fcCrossLength,numRows,numCols,options,threeD} = this;
	let {r0,r1,r2,r3,r4,r5,r6,r7,r8} = rvs;
	let {x,y} = cell;
	//let cfi = this.chooseFromImage(rvs,cell);
	debugger;
	let cfi;
	//let fcx = 1/4;
	//let fcy = 1/20;]
//	debugger;
	let shape;
	let which = this.chooseWhich(rvs,cell);
	//let whichAndColor = this.chooseWhich(rvs,cell);
	//let {which,color} = whichAndColor;
	
	if (cfi) {
    which = cfi;
	}
	console.log('which',which);
  
	if (which === 'circle'){ 
		let fc= fcCircle * deltaX;
		shape = circleP.instantiate();
		//shape.stroke = color;
		shape.dimension = fc;
	}
	if (which === 'polygon') {
		let fcX = fcGonX * deltaX;
		let fcY = fcGonY * deltaY;
		let corners;
		let ul = Point.mk(-fcX*r0,-fcY*r1);
		let ur = Point.mk(fcX*r2,-fcY*r3);
		let lr = Point.mk(fcX*r4,fcY*r5);
		let ll = Point.mk(-fcX*r6,fcY*r7);
		if (threeD) {
			let ul3d = this.to3dAndBack(cell,ul);
			let ur3d = this.to3dAndBack(cell,ur);
			let lr3d = this.to3dAndBack(cell,lr);
			let ll3d = this.to3dAndBack(cell,ll);
			if (ul3d && ur3d && lr3d && ll3d) {
				shape = polygonP.instantiate();
				corners = [ul3d,ur3d,lr3d,ll3d];
			} else {
			 return null;
			} 
	  } else {
			shape = polygonP.instantiate();
			corners = [ul,ur,lr,ll];
		}
		shape.corners = corners;
	}
			
	if  (which === 'horizontalLine') { 
		let fcX = fcLineX * deltaX;
		let fcY = fcLineY * deltaY;
		p0  = Point.mk(-fcX,(r0-0.5)*fcY);
		p1  = Point.mk(-0.3333*fcX,(r1-0.5)*fcY);
		p2  = Point.mk(0.3333 * fcX,(r2-0.5)*fcLineY);
		p3  = Point.mk(fcX,(r3-0.5)*fcLineY);
		let thePoins;
		if (threeD) {
			let p03d = this.to3dAndBack(cell,p0);
			let p13d = this.to3dAndBack(cell,p1);
			let p23d = this.to3dAndBack(cell,p2);
			let p33d = this.to3dAndBack(cell,p3);
			if (p03d && p13d && p23d && p33d) {

				shape = polylineP.instantiate();
				//shape.stroke = color;
				thePoints = [p03d,p13d,p23d,p33d];
			} else {
				return null;
			}
		}	else {
			shape = polylineP.instantiate();
			thePoints = [p0,p1,p2,p3];
		}
		shape.thePoints = thePoints;
	} 
	if (which === 'verticalLine') {
		let fcX = fcLineY * deltaX;
		let fcY = fcLineX * deltaY;
		p0  = Point.mk(-(r0-0.5)*fcX,-fcY);
		p1  = Point.mk(-(r1-0.5)*fcX,-0.33333 * fcY);
		p2  = Point.mk(-(r2-0.5)*fcX,0.3333*fcY);
		p3  = Point.mk(-(r2-0.5)*fcX,fcY);
		let thePoints;
		if (threeD) {
			let p03d = this.to3dAndBack(cell,p0);
			let p13d = this.to3dAndBack(cell,p1);
			let p23d = this.to3dAndBack(cell,p2);
			let p33d = this.to3dAndBack(cell,p3);
			if (p03d && p13d && p23d && p33d) {
				shape = polylineP.instantiate();
				thePoints = [p03d,p13d,p23d,p33d];
		  } else {
			  return null;
			}
		} else {
			shape = polylineP.instantiate();
			thePoints = [p0,p1,p2,p3];
		}
		shape.thePoints = thePoints;
	}
  if (which === 'cross') {
	//	debugger;
		let fcAngle0 = fcCrossA0 * Math.PI;
		let fcAngle1 =  fcCrossA1 * Math.PI;
		let len = fcCrossLength * deltaX;
		const mkLine =  (a) => {
			let c = Math.cos(a);
			let s = Math.sin(a);
			let n = Point.mk(c,s);
			let e0 = n.times(-0.5*len);
			let e1 = n.times(0.5*len);
			let ln = lineP.instantiate();
			if (threeD) {
				let e03d = this.to3dAndBack(cell,e0);
				let e13d = this.to3dAndBack(cell,e1);
        ln.setEnds(e03d,e13d);
			} else {
				ln.setEnds(e0,e1);
			}
			ln.show();
			return ln;
		}
		shape =  svg.Element.mk('<g/>');
		let a0 = fcAngle0*r0;
		let a1 = a0  + 0.5*Math.PI;
		let line0 = mkLine(a0);
		let line1 = mkLine(a1);
		//line0.stroke = color;
		//line1.stroke = color;
		line0.show();
		line1.show();
		line0.update();
		line1.update();
		shape.set('line0',line0);
		shape.set('line1',line1);
	}
	shapes.push(shape);
	if (shape.update) {
		shape.update();
	}
	shape.show()
  return shape;
}

rs.initialize = function () {
	debugger;
	let {focalPoint,focalLength,cameraScaling,randomSpeed,threeD} = this;
	this.initProtos();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');

	this.initializeGrid();
}

return rs;
});
 