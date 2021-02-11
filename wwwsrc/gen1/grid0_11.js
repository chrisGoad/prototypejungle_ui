
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/shape/polygon.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,polygonPP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);

//let sqd = 128;
let sqd = 48;
sqd = 16;
let ar = 2;
/* in 0_8, parameters can be associated with cells */
rs.paramsByCell = null;
rs.paramsByRow = null;
rs.paramsByCol = null;

rs.getParam = function (cell,prop) {
	let {paramsByCell,paramsByRow,paramsByCol,globalParams,numRows} = this;
	let {x,y} = cell;
	let params,propv;
	//debugger;
	if (paramsByCell) {
		params = this.paramsByCell(cell);
	} else if (paramsByRow) {
		 let ln = paramsByRow.length;
		 if (y < ln) {
			 params = paramsByRow[y];
		 }
	}
	if (params) {
		propv = params[prop]
	}
	if (propv) {
		return propv;
	}
	return globalParams[prop]
}

rs.getParams = function (cell,props) {
	let ps  = {};
	props.forEach((prop) => {
		let pv = this.getParam(cell,prop);
		ps[prop] = pv;
	});
	return ps;
}
		
			 
		

rs.globalParams = {randomizingFactor:0,sizePower:2,widthFactor:1,heightFactor:1,maxSizeFactor:2,genCircles:0,genPolygons:0,
	 opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.4,5:0.4,6:0.4},
	  colorMap:{0: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
	            1: (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		          2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		          4:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		          5:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	            6:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`},
		sizeMap: {0:1,1:1,2:1,3:1,4:1,5:1,6:1},
		};

let topParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,
ordinalMap: {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7}}

Object.assign(rs,topParams);
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	
		core.assignPrototypes(this,'circleP',circlePP);
		core.assignPrototypes(this,'polygonP',polygonPP);
}  


rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0;
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
rs.numPowers = function (n,p) {
	return numPowers(n,p);
}

rs.sizeFactor = function ( cell) {
	let numRows = this.numRows;
	let {x,y} = cell;
	if ((x===63) && (y===63)) {
		debugger;
	}
	let szPower = this.getParam(cell,'sizePower');
	let maxSizeFactor = this.getParam(cell,'maxSizeFactor');
	//let px = numPowers(x+1,szPower);
	let px = numPowers(x,szPower);
	let sf;
	if (numRows === 1) {
		sf = Math.min(px,maxSizeFactor);
	} else {
  	//let py = numPowers(y+1,szPower);
  	let py = numPowers(y,szPower);
	  sf =  Math.min(px,py,maxSizeFactor);
	}
	console.log('x',x,'sf',sf);
	return sf;
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
	let colorMap = this.getParam(cell,'colorMap');
	let opacityMap = this.getParam(cell,'opacityMap');
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
	if (shape.setFill) {
		shape.setFill(fill);
	} else {
	  shape.fill = fill;
	}
	//console.log(fill);
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
	let {numCols,numRows,deltaX,deltaY} = this;
	let {x,y} = cell;
	if ((x===40) && (y===2000)) {
//		debugger;
	}
	let propVs = this.getParams(cell,['randomizingFactor','sizeMap','sizePower','widthFactor','heightFactor']);
	let {randomizingFactor,sizeMap,sizePower,widthFactor,heightFactor} = propVs;
	
  let fc = this.sizeFactor(cell);
	console.log('cell',cell.x,cell.y,'fc',fc);
	let szf = sizeMap[fc]
  let numPy = numPowers(cell.y,sizePower);
	let szfy = sizeMap[numPy];
	//if ((!ranRows) || (ranRows.indexOf(cell.y)>-1)) {
	if (randomizingFactor) {
		console.log('szf',szf,'szfy',szfy,'numPy',numPy);
		//debugger;
		let hszf = 1.0*szf;
	  szf = Math.max(hszf,szf*(1-randomizingFactor)   + szfy*randomizingFactor * Math.random());
	}
	let wf = widthFactor;
	let hf = heightFactor;
	/*if (widthFactorLeft) {
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
	} */
	//return {x:szf * wf * deltaX,y:szf*hf*deltaY,fc:fc};
	return {x:szf * wf,y:szf*hf,fc:fc};
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

rs.setDims = function (shape,width,height) {
	if (shape.setDims) {
		shape.setDims(width,height);
	} else {
		shape.width = width;
		shape.height = height;
	}
}

rs.shapeUpdater = function (shape,rvs,cell,center) {
	let {shapes,rectP,circleP,deltaX,deltaY,numRows,numCols,sizeValues,width,height} = this;
	let propVs = this.getParams(cell,['randomizingFactor','genCircles','sizeMap','widthFactor','heightFactor','genCircles','genPolygons']);
	let {randomizingFactor,sizeMap,widthFactor,heightFactor,genCircles,genPolygons} = propVs;
	let sz;
	if ((cell.x === 29)&& (cell.y === 15)) {
	//	debugger;
	}
	if (sizeValues) {
		sz = this.lookupSize(cell);
	} else {
		sz = this.computeSize(cell);
	}
	if (sz.x === 0) {
		shape.hide();
		return;
	}
	if (genPolygons) {
		let corners = this.cellCorners(cell);
		let mcnt = center.minus();
		let rCorners = this.displaceArray(corners,mcnt);
		let sCorners = this.scaleArray(rCorners,sz.x,sz.y);
		shape.corners = sCorners;
	  this.colorSetter(shape,sz.fc,cell);
		shape.update();
		return shape;
	}
//	let cellCenterX = (-0.5*width) + (cell.x +0.5)* deltaX;
	let cellCenterX = center;
	let corners = this.cellCorners(cell);
  let c0 = corners[0];
	let c1 = corners[1];
	let c2 = corners[2];
	let c3= corners[3];
	let deltaX = Math.abs(c0.x - c1.x);
	let deltaY = Math.abs(c0.y - c3.y);
//	let cellLeftX = cellCenterX - 0.5*sz.x;
//	let gridLeftX= -0.5*width;
	let fszx = deltaX * (sz.x);
	let nshape;
/*	if (cellLeftX < gridLeftX) {
		let chopX = gridLeftX - cellLeftX;
		fszx = deltaX * (sz.x) - 2*chopX;
	}
	let cellRightX = cellCenterX + 0.5*deltaX* (sz.x);
	let gridRightX= 0.5*width;
  if (cellRightX > gridRightX) {
		let chopX = cellRightX - gridRightX;
		fszx = deltaX*(sz.x) - 2*chopX;
	}	*/
	if (genCircles) {
		shape.dimension = deltaX * (sz.x);
	} else {
		this.setDims(shape,fszx,deltaY*(sz.y));
	}
	 // shape.width = fszx;
	 // shape.height= sz.y;
	//}
	this.colorSetter(shape,sz.fc,cell);
	if (nshape) {
		nshape.update();
	} else {
	  shape.update();
	}
	return nshape;
}

rs.shapeGenerator = function (rvs,cell,center) {
	let {shapes,rectP,circleP,polygonP} = this;
	let genCircles = this.getParam(cell,'genCircles');
	let genPolygons = this.getParam(cell,'genPolygons');
	let shape = genCircles?circleP.instantiate():
	    (genPolygons?polygonP.instantiate():rectP.instantiate());
	shapes.push(shape);
	shape.show();
	//this.shapeUpdater(shape,rvs,cell,center);
	return shape;
}




rs.innerInitialize = function () {
	this.initProtos();
	this.finishProtos();
	/*if (this.backgroundColor) {
		let bkr;
		if (this.outerRadius) {
			
			bkr = this.set('backGround',this.circleP.instantiate());
			bkr.show();
			bkr.dimension = 2*this.outerRadius;
    } else {
			
			bkr = this.set('rect',this.rectP.instantiate());
			bkr.width = this.width;
			bkr.height = this.height;
		}
		bkr.show();
		bkr.fill = this.backgroundColor;
		bkr['stroke-width'] = 0;
	}*/
	if (this.saveJson  || this.loadFromPath) {
		this.outerInitialize();
	} else {
	  this.initializeGrid();
	}
}



rs.initialize = rs.innerInitialize;

rs.toFun = function (v) {
	return () => v;
}
return rs;

});
