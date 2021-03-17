
core.require('/shape/polyline.js','/shape/polygon.js','/shape/circle.js','/line/line.js','/gen0/grid0.js','/gen0/image3.js',
function (polylinePP,polygonPP,circlePP,linePP,addGridMethods,addImageMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
addImageMethods(rs);
rs.setName('grid0_46');
let topParams = {width:800,height:400,numRows:100,numCols:100,pointJiggle:0,factorX:0.25,factorY:0.05,crossColor:'yellow'};

Object.assign(rs,topParams);
	

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.2;
  this.lineP.stroke = 'yellow';
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

rs.chooseWhich = function () {
	let options = this.options;
		let numPos = options.length;
	let chnc = 1/numPos;
	let whichI = Math.floor(Math.random()*numPos);
	let which = options[whichI];
  return which;
}	
rs.shapeGenerator = function (rvs,cell) {
	let {shapes,polylineP,polygonP,circleP,lineP,deltaX,deltaY,fcLineX,fcLineY,fcGonX,fcGonY,fcCircle,
	fcCrossA0,fcCrossA1,fcCrossLength,numRows,numCols,options} = this;
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
		
		let ul = Point.mk(-fcX*r0,-fcY*r1);
		let ur = Point.mk(fcX*r2,-fcY*r3);
		let lr = Point.mk(fcX*r4,fcY*r5);
		let ll = Point.mk(-fcX*r6,fcY*r7);
		/*
		let ur = Point.mk(urx,-ury).times(deltaX/200);		
		let lr = Point.mk(lrx,lry).times(deltaX/200);
		let ll = Point.mk(-llx,lly).times(deltaX/200);
		let col = cell.x;*/
	//	debugger;
    shape = polygonP.instantiate();
		//shape.stroke = color;
		shape.corners = [ul,ur,lr,ll];
	} 
	if  (which === 'horizontalLine') { 
		let fcX = fcLineX * deltaX;
		let fcY = fcLineY * deltaY;
		p0  = Point.mk(-fcX,(r0-0.5)*fcY);
		p1  = Point.mk(-0.3333*fcX,(r1-0.5)*fcY);
		p2  = Point.mk(0.3333 * fcX,(r2-0.5)*fcLineY);
		p3  = Point.mk(fcX,(r3-0.5)*fcLineY);
		shape = polylineP.instantiate();
		//shape.stroke = color;
		shape.thePoints = [p0,p1,p2,p3];
	} 
	if (which === 'verticalLine') {
		let fcX = fcLineY * deltaX;
		let fcY = fcLineX * deltaY;
		p0  = Point.mk(-(r0-0.5)*fcX,-fcY);
		p1  = Point.mk(-(r1-0.5)*fcX,-0.33333 * fcY);
		p2  = Point.mk(-(r2-0.5)*fcX,0.3333*fcY);
		p3  = Point.mk(-(r2-0.5)*fcX,fcY);
		shape = polylineP.instantiate();
		//shape.stroke = color;
		shape.thePoints = [p0,p1,p2,p3];
	}
  if (which === 'cross') {
	//	debugger;
		let fcAngle0 = fcCrossA0 * Math.PI;
		let fcAngle1 =  fcCrossA1 * Math.PI;
		let len = fcCrossLength * deltaX;
		const mkLine = function (a) {
			let c = Math.cos(a);
			let s = Math.sin(a);
			let n = Point.mk(c,s);
			let e0 = n.times(-0.5*len);
			let e1 = n.times(0.5*len);
			let ln = lineP.instantiate();
			ln.setEnds(e0,e1);
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
  this.initProtos();
	  this.setImageParams();

  core.root.backgroundColor = 'black';
	let rmin = 0;
	let rmax = 1;
	let rstep = 0.2;
	this.setupShapeRandomizer('r0',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r1',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r2',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r3',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r4',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r5',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r6',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r7',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('r8',  {step:2*rstep,min:rmin,max:rmax});
	
  this.initializeGrid();
	debugger;
	let {pixelCount,totalG} = this;
	let avgG = totalG/pixelCount;
	console.log('avgG',avgG);
}	
return rs;
});
 