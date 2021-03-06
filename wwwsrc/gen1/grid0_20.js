
core.require('/shape/polyline.js','/shape/polygon.js','/shape/circle.js','/line/line.js','/gen0/grid0.js','/gen0/image3.js',
function (polylinePP,polygonPP,circlePP,linePP,addGridMethods,addImageMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
addImageMethods(rs);
//rs.setName('grid0_46');
let topParams = {width:800,height:400,numRows:100,numCols:100,pointJiggle:0,factorX:0.25,factorY:0.05,crossColor:'yellow',threeD:1,interpolateFromStep:100,interval:30,
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100,randomSpeed:0.2,numTimeSteps:100,
whichCount:2,uvCount:8,vFactor:2};

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
	let {shapes,polylineP,polygonP,circleP,lineP,deltaX,deltaY,fcLineX,fcLineY,fcGonX,fcGonY,fcCircle,vFactor,fcTriX,fcTriY,
	fcCrossA0,fcCrossA1,fcCrossLength,numRows,numCols,options,threeD,smooth,randomizerNames:rNames,uvCount,whichCount,cellData} = this;
  let rValues = [];
  rNames.forEach( (nm) => {
     rValues.push(rvs[nm]);
  });
	let {x,y} = cell;
	let allWhich = this.chooseWhich(rvs,cell);
  if (!allWhich) {
    debugger;
    return;
  }
	let {which,freeGons,whichRvs}  = allWhich; 
  whichRvs = whichRvs?whichRvs:0;
  let uVs = []; // values used
  let iCount = whichCount*uvCount;
  let offset = whichRvs*uvCount;
  if (smooth) {
	  for (let i=0;i<iCount;i++) {
      let iv = rValues[i+offset];
      let vv = rValues[i+iCount+offset];
     // let uv = this.evolve(iv,vFactor*vv);
      let uv = this.evolve(iv,vv);
      uVs.push(uv);
    }
	   
  } else {
		for (let i=0;i<iCount;i++) {
			uVs.push(rValues[i+offset]);
    }
  }
	if (which === 'circle'){ 
		let fc= fcCircle * deltaX;
		shape.dimension = fc;
	}
 
	if (which === 'polygon') {      
		let free =freeGons;
	  let fc = free?2:1;
		let fcX = fc*fcGonX * deltaX;
		let fcY = fc*fcGonY * deltaY;
		let corners;
		let ul,ur,lr,ll;
		if (free) {
			ul = Point.mk(fcX*(uVs[0]-0.5),fcY*(uVs[1]-0.5));
			ur = Point.mk(fcX*(uVs[2]-0.5),fcY*(uVs[3]-0.5));
			ll = Point.mk(fcX*(uVs[4]-0.5),fcY*(uVs[5]-0.5));
			lr = Point.mk(fcX*(uVs[6]-0.5),fcY*(uVs[7]-0.5));
	/*	ul = Point.mk(fcX*(uVs[0]-0.5),fcY*uVs[1]);
			ur = Point.mk(fcX*uVs[2],fcY*uVs[3]);
			ll = Point.mk(fcX*uVs[4],fcY*uVs[5]);
			lr = Point.mk(fcX*uVs[6],fcY*uVs[7]);*/
		} else {
			ul = Point.mk(-fcX*uVs[0],-fcY*uVs[1]);
			ur = Point.mk(fcX*uVs[2],-fcY*uVs[3]);
			lr = Point.mk(fcX*uVs[4],fcY*uVs[5]);
			ll = Point.mk(-fcX*uVs[6],fcY*uVs[7]);
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
	if (which === 'triangle') {
    debugger;
    let fcX = fcTriX * deltaX;
		let fcY = fcGonY * deltaY;      
	  let p0 = Point.mk(fcX*uVs[0],fcY*uVs[1]);
	  let p1 = Point.mk(fcX*uVs[2],fcY*uVs[3]);
		let p2 = Point.mk(fcX*uVs[4],fcY*uVs[5]);
    let corners
    if (threeD) {
			let p03d = this.to3dAndBack(cell,p0);
			let p13d = this.to3dAndBack(cell,p1);
			let p23d = this.to3dAndBack(cell,p2);
      corners = [p03d,p13d,p23d];
    } else {
      corners = [p0,p1,p2];
    }
    shape.corners = corners;
  }
  
		
			
	if  (which === 'horizontalLine') { 
	  let idx = x*numCols + y;
    let idxL;
    if (x > 0) {
      idxL = (x-1)*numCols + y;
    }
		let fcX = fcLineX * deltaX;
		let fcY = fcLineY * deltaY;
    let p0x = -fcX;
		p0  = Point.mk(-fcX,(x>0)?cellData[idxL]:(uVs[0]-0.5)*fcY);
		p1  = Point.mk(-0.3333*fcX,(uVs[1]-0.5)*fcY);
		p2  = Point.mk(0.3333 * fcX,(uVs[2]-0.5)*fcLineY);
		p3  = Point.mk(fcX,(uVs[3]-0.5)*fcLineY);
		let thePoints;
		if (threeD) {
			let p03d = this.to3dAndBack(cell,p0);
			let p13d = this.to3dAndBack(cell,p1);
			let p23d = this.to3dAndBack(cell,p2);
			let p33d = this.to3dAndBack(cell,p3);
			if (p03d && p13d && p23d && p33d) {
        cellData[idx] = p33d.y;
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
      cellData[idx] = p3.y;
		}
		shape.thePoints = thePoints;
	} 
	if (which === 'verticalLine') {
    let idx = x*numCols + y;
    let idxL;
    if (y > 0) {
      idxL = x*numCols + y - 1;
    }
		let fcX = fcLineY * deltaX;
		let fcY = fcLineX * deltaY;
		p0  = Point.mk((y>0)?cellData[idxL]:-(uVs[0]-0.5)*fcX,-fcY);

		//p0  = Point.mk(-(uVs[0]-0.5)*fcX,-fcY);
		p1  = Point.mk(-(uVs[1]-0.5)*fcX,-0.33333 * fcY);
		p2  = Point.mk(-(uVs[2]-0.5)*fcX,0.3333*fcY);
		p3  = Point.mk(-(uVs[3]-0.5)*fcX,fcY);
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
      cellData[idx] = p3.x;
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
    console.log('cross',uVs[0],fcCrossA0);
		let a0 = fcCrossA0*uVs[0];
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
  const toColor = (v) => {
    return Math.floor(v*255);
  };
 // let clr = `rgb(${toColor(uVs[0])},${toColor(uVs[1])},${toColor(uVs[2])})`;
 // shape.stroke = clr;
	shape.draw();
  return shape;
}

rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polylineP,polygonP,circleP,lineP} = this;
	let shape;
	let allWhich = this.chooseWhich(rvs,cell);
  if (!allWhich) {
    debugger;
    return;
  }
	let {which}= allWhich;
	if (which === 'circle'){ 
		shape = circleP.instantiate();
		//shape.stroke = color;
	}
	if (which === 'polygon') {
		shape = polygonP.instantiate();
	}
  if (which === 'triangle') {
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
	let {focalPoint,focalLength,cameraScaling,frameSpeed,threeD,timeSpeed,smooth,uvCount,numRows,numCols} = this; // uv = used value count
	this.generatorsDoMoves = threeD;
  this.initProtos();
	  this.setImageParams();
  let rCount = smooth?4*uvCount:2*uvCount;
  for (let i=0;i<rCount;i++) {
		randomizerNames.push('v'+i);
	}
  this.randomizerNames = randomizerNames;
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
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  let cellData = this.cellData = [];
  cellData.length = numRows*numCols;

  this.initializeGrid();
	debugger;
	//let {pixelCount,totalG} = this;
	//let avgG = totalG/pixelCount;
	//console.log('avgG',avgG);
}	

rs.evolve = function (ival,ivel) {
  let {timeStep:ts,vFactor} = this;
  let numValues = 4;
  let vel = Math.floor(ivel*numValues)/numValues;
  vel = vel?vel:1;
 //console.log('vel',vel,'ival',ival);
  let vaf = ival + vFactor*vel*ts;
	let i = Math.floor(vaf);
	if (i%2 === 0) {
		 return vaf - i;
	} else {
		return 1 - (vaf - i);
  }
}

   

rs.step = function ()   { 
  let tp = 'randomGridsForShapes';
  let {interpolateFromStep:its,timeStep,smooth} = this;
	if (!smooth) {
    randomizerNames.forEach((nm) => {
		  this.stepShapeRandomizer(nm);
	  });
  }
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
 