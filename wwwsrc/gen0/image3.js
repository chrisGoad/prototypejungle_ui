core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function () {

 return function (item) {

item.setImageParams = function () {
	debugger;
	let {numRows,numCols} = this;
	let {imWd,imHt} = draw.vars;
	let sc;
	//let maxImDim = Math.max(imWd,imHt);
	if ((imWd <= numCols) && (imHt <= numRows)) {
		//this.numRows = maxImDim;
		//this.numCols = maxImDim;
		sc = 1;
	} else {
		sc = Math.max(imWd/numCols,imHt/numRows);
	}
	/*let ar = numCols/numRows;
	let imAr = imWd/imHt;
	let sc;
	if (imAr > ar) {
		sc = imWd/numCols;
	} else {
		sc = imHt/numRows;
	}*/
	sc = Math.ceil(sc); // this many pixels are averaged
	this.pixelsPerCell = sc;
	let imXcells = Math.ceil(imWd/sc);
	let imYcells = Math.ceil(imHt/sc);
	let offX = this.offX = Math.ceil((numCols - imXcells)/2);
	let offY = this.offY = Math.ceil((numRows - imYcells)/2);
	
	
	//this.numImCols = Math.floor(imWd/sc);
	//this.numImRows = Math.floor(imWd/sc);
}

item.rgbOfCellNumeric = function (cell) {
	let {imWd,imHt,imageData} = draw.vars;
	let {pixelsPerCell:pxpc,numRows,numCols,imOffset,offX,offY} = this;

	let {x,y} = cell;
	let {x:iy,y:ix} = cell;
	//let {x:y,y:x} = cell;
	//let {x,y} = cell;
	if ((x < offX) || (x > (numCols - offX)) || (y<offY) || (y>(numRows-offY))) {
		return undefined;
	}
	//if ((x>=numImCols) || (y>=numImRows)) return 'black';
  const indexOfPixel = function (x,y) {
		return x*imWd*4+y*4;
		//return y*imHt*4+x*4;
	}
	//	debugger;
	//let lowPxX = (x-offX) * pxpc;
	//let lowPxX = (ix-offX) * pxpc;
	let lowPxX = (ix-offY) * pxpc;
	//let lowPxX = ix * pxpc;
	let lowPxY = (iy-offX) * pxpc;
	//let lowPxY = (iy-offY) * pxpc;
	//let lowPxY = (iy-offY) * pxpc;
	//let lowPxY = iy * pxpc;
	//lowPxY = y * pxpc;
	let avR = 0;
	let avG = 0;
	let avB = 0;
	let avO = 0;
	let ovrf = 2;
	let imln = imageData.length;
	for (let i=0;i<pxpc*ovrf;i++) {
		for (let j=0;j<pxpc*ovrf;j++) {
			let idx = indexOfPixel(lowPxX+i,lowPxY+j);
			if ((idx >=0)&&(idx<imln)) {
			//let idx = indexOfPixel(lowPxX+i,lowPxY+j);
				let r = imageData[idx];
				let g = imageData[idx+1];
				let b = imageData[idx+2];
				if ((typeof r !== 'number') || (typeof g !== 'number') || (typeof r !== 'number')) {
					debugger;
				}
				avR += imageData[idx];
				avG += imageData[idx+1];
				avB += imageData[idx+2];
				avO += imageData[idx+3];
				
			} else {
				debugger;
			}
		}
	}
	let pxpc2 = ovrf*ovrf*pxpc*pxpc;
	avR = Math.floor(avR/pxpc2);
	avG = Math.floor(avG/pxpc2);
	avB = Math.floor(avB/pxpc2);
	avO = Math.floor(avO/pxpc2);
	let rs = [avR,avG,avB];
	return rs;
}

item.rgbOfCell = function (cell) {
	debugger;
	let rgbN = this.rgbOfCellNumeric(cell);
	let [r,g,b] = rgbN;
  let rs = `rgb(${r},${g},${b})`;
	return rs;	
}

	/*
	item.inRegion = function (cell) {
		let {numRows,numCols} = this;
		let {x,y} = cell;
		//let fr = 0.3;
		let fr = 0.195;
		
		let cx = 0.5 * numRows;
		let cy = 0.5 * numCols;
		let p0 = Point.mk(cx,cy);
		let p1 = Point.mk(x,y);
	  let dist = p0.distance(p1);
		
		return dist < fr*numCols;
		
	} 
	
	item.colorGenerator = function (rvs,cell) {
		let inr = this.inRegion(cell);
		if (inr) {
		  let rgb = this.rgbOfCell(cell);
		  return rgb;
		} else {
			return 'purple';
		}
	}
	*/
	item.shapeGenerator = function (rvs,cell,cnt) {
	//debugger;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	let rgb = this.colorGenerator(rvs,cell);
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let polygonScale = 1.1;
	let sCorners = this.scaleArray(rCorners,polygonScale,polygonScale);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	pgon.fill = rgb;
	pgon.show();
	shapes.push(pgon);
	pgon.update();
	return pgon;
}


		
 }})

