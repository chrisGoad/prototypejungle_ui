
core.require('/shape/polyline.js','/shape/polygon.js','/shape/circle.js','/line/line.js','/gen0/grid0.js','/gen0/image3.js',
function (polylinePP,polygonPP,circlePP,linePP,addGridMethods,addImageMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
addImageMethods(rs);
//rs.setName('grid0_46');
let topParams = {width:800,height:400,numRows:100,numCols:100,pointJiggle:0,factorX:0.25,factorY:0.05,crossColor:'yellow',threeD:1,interpolateFromStep:100,interval:30,
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100,randomSpeed:0.2,numTimeSteps:100};

Object.assign(rs,topParams);
	

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.2;
  this.lineP.stroke = 'white';
	core.assignPrototypes(this,'polylineP',polylinePP);
  this.polylineP['stroke-width'] = 1;
  this.polylineP.stroke = 'blue';
	core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP['stroke-width'] = 1;
  this.polygonP.stroke = 'yellow';
  this.polygonP.fill = 'blue';
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP['stroke-width'] = 1;
  this.circleP.stroke = 'yellow';
  this.circleP.fill = 'red';
	this.finishProtos();
}  

rs.finishProtos = function () {
}


rs.colorGenerator = function (rvs,cell) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${g},${b})`;
	return rgb;
}

rs.totalG = 0;
rs.pixelCount = 0;
rs.chooseFromImage = function (rvs,cell) {
//	debugger;
	let rgbN = this.rgbOfCellNumeric(cell);
	console.log('chi',cell,rgbN);
	if (!rgbN) {
		return;
	}
	let [r,g,b] = rgbN;
	let ttl = r+g+b;
	if (ttl > 348) {
		return 'polygon';
	} else {
		return 'horizontalLine';
	}
	this.totalG += ttl;
	this.pixelCount++;
	if ((!this.totalG) || (!this.pixelCount)) {
		debugger;
	}
}


rs.toPoint3d = function (cell,ip) {
	
	let {numRows,numCols,sphereCenter,sphereDiameter,deltaX,deltaY} = this;
	let {x,y} = cell;
	
	let sp;
  let cellCenter = Point.mk(deltaX*(x-numCols/2),deltaY*(y-numRows/2));
	let p = cellCenter.plus(ip);
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		return sp;
	} else {
		return null;
	}
}

rs.to3dAndBack = function (cell,p) {
	let {camera} = this;
	let p3d = this.toPoint3d(cell,p);
	if (p3d) {
		let rs = camera.project(p3d);
		return rs;
	}
	return null;
}


rs.chooseWhich = function () {
	let options = this.options;
		let numPos = options.length;
	let chnc = 1/numPos;
	let whichI = Math.floor(Math.random()*numPos);
	let which = options[whichI];
  return which;
}	
rs.shapeUpdater = function (shape,rvs,cell) {
	let {shapes,polylineP,polygonP,circleP,lineP,deltaX,deltaY,fcLineX,fcLineY,fcGonX,fcGonY,fcCircle,
	fcCrossA0,fcCrossA1,fcCrossLength,numRows,numCols,options,threeD,smooth} = this;
	let {i00,i01,i02,i03,i04,i05,i06,i07,i08,i10,i11,i12,i13,i14,i15,i16,i17,i18,
       v00,v01,v02,v03,v04,v05,v06,v07,v08,v10,v11,v12,v13,v14,v15,v16,v17,v18} = rvs;
	let {x,y} = cell;
	//let cfi = this.chooseFromImage(rvs,cell);
	let cfi;
	//let fcx = 1/4;
	//let fcy = 1/20;]
	//debugger;
//	let shape;
	let allWhich = this.chooseWhich(rvs,cell);
  if (!allWhich) {
    debugger;
    return;
  }
	let {which,freeGons,whichRvs}  = allWhich; 
  let i0,i1,i2,i3,i4,i5,i6,i7,i8,v0,v1,v2,v3,v4,v5,v6,v7,v8,r0,r1,r2,r3,r4,r5,r6,r7,r8;
	if (!whichRvs) {
     i0 = i00;i1 = i01;i2 = i02;i3 = i03;i4 = i04;i5 = i05;i6 = i06;i7 = i07;i8 = i08;
     v0 = v00;v1 = v01;v2 = v02;v3 = v03;v4 = v04;v5 = v05;v6 = v06;v7 = v07;v8 = v08;
  } else if (whichRvs === 1) {
    // debugger;
     i0 = i10;i1 = i11;i2 = i12;i3 = i13;i4 = i14;i5 = i15;i6 = i16;i7 = i17;i8 = i18; 
     v0 = v10;v1 = v11;v2 = v12;v3 = v13;v4 = v14;v5 = v15;v6 = v16;v7 = v17;v8 = v18;
  }
  
	//let whichAndColor = this.chooseWhich(rvs,cell);6
	//let {which,color} = whichAndColor;
	
	if (cfi) {
    which = cfi;
	}
	//console.log('which',which);
  
	if (which === 'circle'){ 
		let fc= fcCircle * deltaX;
		//shape = circleP.instantiate();
		//shape.stroke = color;
		shape.dimension = fc;
	}
  debugger;
  if (smooth) {
    r0 = this.evolve(i0,v0); r1 = this.evolve(i1,v1); r0 = this.evolve(i2,v2); r3 = this.evolve(i3,v3);
    r0 = this.evolve(i4,v4); r5 = this.evolve(i5,v5); r6 = this.evolve(i6,v6); r0 = this.evolve(i7,v7);
	} else { 
		r0=i0;r1=i1;r2=i2;r3=i3;r4=i4;r5=i5;r6=i6;r7=i7;r8=i8;
	}
	if (which === 'polygon') {      
		//let fc=1;
  
    
		let free =freeGons;
	//	let isFc = fc !== 1;
	  let fc = free?2:1;
		let fcX = fc*fcGonX * deltaX;
		let fcY = fc*fcGonY * deltaY;
		let corners;
		let ul,ur,lr,ll;
		if (free) {
			ul = Point.mk(fcX*r0,fcY*r1);
			ur = Point.mk(fcX*r2,fcY*r3);
			ll = Point.mk(fcX*r4,fcY*r5);
			lr = Point.mk(fcX*r6,fcY*r7);
		} else {
			ul = Point.mk(-fcX*r0,-fcY*r1);
			ur = Point.mk(fcX*r2,-fcY*r3);
			lr = Point.mk(fcX*r4,fcY*r5);
			ll = Point.mk(-fcX*r6,fcY*r7);
		}
		if (threeD) {
			let ul3d = this.to3dAndBack(cell,ul);
			let ur3d = this.to3dAndBack(cell,ur);
			let lr3d = this.to3dAndBack(cell,lr);
			let ll3d = this.to3dAndBack(cell,ll);
			if (ul3d && ur3d && lr3d && ll3d) {
				//shape = polygonP.instantiate();
				corners = [ul3d,ur3d,lr3d,ll3d];
			} else {
				shape.hide();
			 return null;
			} 
	  } else {
		//	shape = polygonP.instantiate();
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
		let thePoints;
		if (threeD) {
			let p03d = this.to3dAndBack(cell,p0);
			let p13d = this.to3dAndBack(cell,p1);
			let p23d = this.to3dAndBack(cell,p2);
			let p33d = this.to3dAndBack(cell,p3);
			if (p03d && p13d && p23d && p33d) {

				//shape = polylineP.instantiate();
				//shape.stroke = color;
				thePoints = [p03d,p13d,p23d,p33d];
			} else {
				shape.hide();
				return null;
			}
		}	else {
			//shape = polylineP.instantiate();
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
				//shape = polylineP.instantiate();
				thePoints = [p03d,p13d,p23d,p33d];
		  } else {
				shape.hide();
			  return null;
			}
		} else {
			//shape = polylineP.instantiate();
			thePoints = [p0,p1,p2,p3];
		}
		shape.thePoints = thePoints;
	}
  if (which === 'cross') {
	//	debugger;
		let fcAngle0 = fcCrossA0 * Math.PI;
		let fcAngle1 =  fcCrossA1 * Math.PI;
		let len = fcCrossLength * deltaX;
		const updateLine =  (ln,a) => {
			let c = Math.cos(a);
			let s = Math.sin(a);
			let n = Point.mk(c,s);
			let e0 = n.times(-0.5*len);
			let e1 = n.times(0.5*len);
			//let ln = lineP.instantiate();
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
		//shape =  svg.Element.mk('<g/>');
		let a0 = fcAngle0*r0;
		let a1 = a0  + 0.5*Math.PI;
		let line0 = shape.line0;
		let line1 = shape.line1;
		updateLine(line0,a0);
		updateLine(line1,a1);
		//let line1 = mkLine(a1);
		//line0.stroke = color;
		//line1.stroke = color;
		line0.show();
		line1.show();
		line0.update();
		line1.update();
		//shape.set('line0',line0);
		//shape.set('line1',line1);
	}
		

		

//	shapes.push(shape);
	if (shape.update) {
		shape.update();
	}
	shape.show();
	shape.draw();
  return shape;
}

rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polylineP,polygonP,circleP,lineP} = this;
	//let {r0,r1,r2,r3,r4,r5,r6,r7,r8} = rvs;
	//let {x,y} = cell;
	//let cfi = this.chooseFromImage(rvs,cell);
	//debugger;
	let cfi;
	//let fcx = 1/4;
	//let fcy = 1/20;]
//	debugger;
	let shape;
	let allWhich = this.chooseWhich(rvs,cell);
  if (!allWhich) {
    debugger;
    return;
  }
	let {which}= allWhich;
	//let whichAndColor = this.chooseWhich(rvs,cell);
	//let {which,color} = whichAndColor;
	
	if (cfi) {
    which = cfi;
	}
	//console.log('which',which);
  
	if (which === 'circle'){ 
		shape = circleP.instantiate();
		//shape.stroke = color;
	}
	if (which === 'polygon') {
		shape = polygonP.instantiate();
	}
			
	if (which === 'horizontalLine') { 
		shape = polylineP.instantiate();
	}
	if (which === 'verticalLine') { 
		shape = polylineP.instantiate();
	} 
  if (which === 'cross') {
		shape =  svg.Element.mk('<g/>');
		let line0 = lineP.instantiate();
		let line1 = lineP.instantiate();
		shape.set('line0',line0);
		shape.set('line1',line1);
	}
  if (shape) {
	  shapes.push(shape);
  }
  return shape;
}

let randomizerNames = [];
	
rs.initialize = function () {
  debugger;
	let {focalPoint,focalLength,cameraScaling,frameSpeed,threeD,timeSpeed,smooth} = this;
	this.generatorsDoMoves = threeD;
  this.initProtos();
	  this.setImageParams();
  for (let i=0;i<9;i++) {
		randomizerNames.push('i0'+i);
		randomizerNames.push('i1'+i);
    if (smooth) {
			randomizerNames.push('v0'+i);
			randomizerNames.push('v1'+i);
    }
    
	}
  //core.root.backgroundColor = 'black';
	let rmin = 0;
	let rmax = 1;
	let rstep = frameSpeed;
	//let tstep = 0.1;
	let tstep = timeSpeed;
	//let rstep = 0;
	randomizerNames.forEach((nm) => {
		this.setupShapeRandomizer(nm, {stept:tstep,step:rstep,min:rmin,max:rmax});
	});
 // this.saveInitialRandomState();
/*	this.setupShapeRandomizer('r0',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r1',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r2',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r3',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r4',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r5',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r6',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r7',  {tstep,step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r8',  {tstep,step:2*rstep,min:rmin,max:rmax});*/
	 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');

  this.initializeGrid();
	debugger;
	let {pixelCount,totalG} = this;
	let avgG = totalG/pixelCount;
	console.log('avgG',avgG);
}	

rs.evolve = function (iv,v) {
  let {ts:timeStep} = this;
  let vaf = iv + v*ts;
	let i = Math.floor(vaf);
	if (i%2 === 0) {
		 return vaf - i;
	} else {
		return 1 - (vaf - i);
  }
}

   

rs.step = function ()   { 
 // debugger;
  let tp = 'randomGridsForShapes';
  let {interpolateFromStep:its,timeStep} = this;
	randomizerNames.forEach((nm) => {
		this.stepShapeRandomizer(nm);
	});
  if (its && (timeStep === its)) {
    this.saveRandomState(tp,'From');
    this[tp].nowInterpolating = 1;
  }
  if (its && (timeStep === 0)) {
    this.saveRandomState(tp,'To');
  }
     
  this.updateGrid();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,this.interval,resume);
	
}
return rs;
});
 