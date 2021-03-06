
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);

//let sqd = 128;
let sqd = 48;
sqd = 16;
let ar = 2;


	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,
	 opacity1:0.4,opacity2:0.4,opacity3:0.4,opacity4:0.4,randomizeOrder:1,widthFactor:3,heightFactor:.7,backgroundColor:'yellow',randomizingFactor:0,sizePower:3,
	 opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	  colorMap:{0: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
	            1: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		          2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		          4:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		          5:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            6:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`},
		sizeMap: {0:1,1:1,2:1,3:1,4:1,5:1,6:1},
		ordinalMap: {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7}
		};

Object.assign(rs,gParams);
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	
		core.assignPrototypes(this,'circleP',circlePP);
}  


rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}


const numPowers = function(n,p) {
	if (n === 0) {
		return 0;
	}
	if (n === p) { 
	  return 1;
	}
	if (n%p === 0) {
		return 1 + numPowers(n/p,p);
	}
	return 0;
}

rs.sizeFactor = function ( cell) {
	let numRows = this.numRows;
	let {x,y} = cell;
	let szPower = this.sizePower;
	let px = numPowers(x,szPower);
	if (numRows === 1) {
		return px;
	}
	let py = numPowers(y,szPower);
	return Math.min(px,py);
}

/*
rs.colorSetter = function (shape,fc) {
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}
*/

rs.colorSetter = function (shape,fc,cell) {
	let {colorMap,opacityMap} = this;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	//console.log('fc' , fc);
	r = 225;
	g = 170;
	b = 170;
	let colorF = colorMap[fc];
	let opacity = opacityMap[fc];
	let fill = colorF(r,g,b,opacity,cell);
	shape.fill = fill;
	//console.log(fill);
	return;
  if (fc <= 1) {
		fill = color1(r,g,b,opacity1);
	} else if (fc ===2) {
		fill = color2(r,g,b,opacity2);
	} else if (fc ===3) {
		fill = color3(r,g,b,opacity3);
	} else if (fc ===4) {
		fill = color4(r,g,b,opacity4);
	} else {
		fill = 'magenta';
	}
  console.log('fill',fill);
				//shape.fill = `rgba(${r},0,0,${op0})`;
	/*} else if (fc === 2) {
			shape.fill = 'rgba(255,255,255,0.4)';
  } else if (fc === 3) {
		shape.fill = `rgba(0,${b},${b},${opacity3})`;
	} else if (fc === 4) {
	shape.fill = 'rgba(255,255,255,0.4)';
	} */
	//fill = 'transparent';
	 shape.fill = fill;
}


rs.ordinalGenerator = function (cell) {
	let fc = this.sizeFactor(cell);
	return this.ordinalMap[fc];
}

const interpolate = function (low,high,fr) {
	return low + fr * (high - low);
}	

//let ranRows = undefined;//[8,16];
rs.computeSize = function (cell) {
	let {randomizingFactor,sizeMap,sizePower,numCols,numRows,deltaX,deltaY,widthFactor,heightFactor,widthFactorLeft,widthFactorRight,heightFactorTop,heightFactorBottom,ranRows} = this;
  let fc = this.sizeFactor(cell);
//	console.log('cell',cell.x,cell.y);
	let szf = sizeMap[fc];
  let numPy = numPowers(cell.y,sizePower);
	let szfy = this.sizeMap[numPy];
	//szf = szf  + randomizingFactor* (Math.random()-0.5) * szf;
	//if (fc >1) {
	if ((!ranRows) || (ranRows.indexOf(cell.y)>-1)) {
		console.log('szf',szf,'szfy',szfy,'numPy',numPy);
		debugger;
		let hszf = 1.0*szf;
	  szf = Math.max(hszf,szf*(1-randomizingFactor)   + szfy*randomizingFactor * Math.random());
	}
	let wf,hf;
	if (cell.x > (numCols - 5)) {
		//debugger;
	}
	if (widthFactorLeft) {
		let fr = cell.x/(numCols-1);
		wf = interpolate(widthFactorLeft,widthFactorRight,fr);
	} else {
		wf = widthFactor;
	} 
	if (heightFactorTop) {
		let fr = cell.y/(numRows-1);
		hf = interpolate(heightFactorTop,heightFactorBottom,fr);
	} else {
		hf = heightFactor;
	} 
	return {x:szf * wf * deltaX,y:szf*hf*deltaY,fc:fc};
}

rs.lookupSize = function (cell) {
	let {numRows,sizeValues} = this;
	let {x,y} = cell;
	let indx = x*numRows + y;
	return sizeValues[indx];
}

rs.computeSizes = function () {
	let {numRows,numCols} = this;
	let numvals = numRows*numCols;
	let vls = [];
	for (let i=0;i<numCols;i++) {
	   for (let j=0;j<numRows;j++) {
			 let cell={x:i,y:j};
			 let sz = this.computeSize(cell);
			 vls.push(sz);
	  }
	}
	return vls;
}


rs.computeValuesToSave = function () {
	let vl = this.computeSizes();
	let vls = [[['sizeValues'],vl]];
	this.sizeValues = vl;
	return vls;
}
	
rs.shapeUpdater = function (shape,rvs,cell) {
	let {shapes,rectP,circleP,deltaX,deltaY,numRows,numCols,widthFactor,widthFactorLeft,widthFactorRight,heightFactor,
	    heightFactorTop,heightFactorBottom,genCircles,opacity0,opacity,sizeMap,randomizingFactor,sizeValues} = this;
	let sz;
	if (sizeValues) {
		sz = this.lookupSize(cell);
	} else {
		sz = this.computeSize(cell);
	}
	if (genCircles) {
		shape.dimension = sz.x;
	} else {
	  shape.width = sz.x;
	  shape.height= sz.y;
	}
	this.colorSetter(shape,sz.fc,cell);
	shape.update();
	return shape;
	let fc = this.sizeFactor(cell);
	/*if (typeof fc === 'number') {
		if (Math.random() < this.randomizingFactor) {
			fc = Math.floor(Math.random()*4);
		}
	}*/
	let szf = sizeMap[fc];
	szf = szf  + randomizingFactor* (Math.random()-0.5) * szf;
	let wf,hf;
	if (cell.x > (numCols - 5)) {
		//debugger;
	}
	if (widthFactorLeft) {
		let fr = cell.x/(numCols-1);
		wf = interpolate(widthFactorLeft,widthFactorRight,fr);
	} else {
		wf = widthFactor;
	} 
	if (heightFactorTop) {
		let fr = cell.y/(numRows-1);
		hf = interpolate(heightFactorTop,heightFactorBottom,fr);
	} else {
		hf = heightFactor;
	} 
  if (genCircles) {
		shape.dimension = szf * wf*deltaX;
	} else {
	  shape.width = szf * wf * deltaX;
	  shape.height= szf * hf * deltaY;
	}
	this.colorSetter(shape,fc,cell);
	shape.update();
	return shape;
}

rs.shapeGenerator = function (rvs,cell) {
	let {shapes,rectP,circleP,deltaX,deltaY,widthFactor,heightFactor,genCircles,opacity0,opacity,sizeMap} = this;
	let shape = genCircles?circleP.instantiate():rectP.instantiate();
	shapes.push(shape);
	shape.show();
	this.shapeUpdater(shape,rvs,cell);
	return shape;
	let fc = this.sizeFactor(cell);
	debugger;
	if (typeof fc === 'number') {
		if (Math.random() < 0.5) {
			fc = Math.floor(Math.random*4);
		}
	}
	let szf = sizeMap[fc];
  if (genCircles) {
		shape.dimension = szf * widthFactor*deltaX;
	} else {
	  shape.width = szf * widthFactor * deltaX;
	  shape.height= szf * heightFactor * deltaY;
	}
	shapes.push(shape);
	this.colorSetter(shape,fc);
	shape.show();
	return shape;
}




rs.innerInitialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	this.finishProtos();
	if (this.backgroundColor) {
	  let bkr = this.set('rect',this.rectP.instantiate());
	  bkr.show();
	  bkr.width = this.width;
	  bkr.height = this.height;
		bkr.fill = this.backgroundColor;
		bkr['stroke-width'] = 0;
	}
	if (this.saveJson  || this.loadFromPath) {
		this.outerInitialize();
	} else {
	  this.initializeGrid();
	}
}



rs.initialize = rs.innerInitialize;

return rs;

});

