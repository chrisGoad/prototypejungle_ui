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
	let offX = this.offX = Math.floor((numCols - imXcells)/2);
	let offY = this.offY = Math.floor((numRows - imYcells)/2);
	
	
	//this.numImCols = Math.floor(imWd/sc);
	//this.numImRows = Math.floor(imWd/sc);
}

item.rgbOfCell = function (cell) {
	let {imWd,imHt,imageData} = draw.vars;
	let {pixelsPerCell:pxpc,numRows,numCols,imOffset,offX,offY} = this;

	let {x,y} = cell;
	let {x:iy,y:ix} = cell;
	//let {x:y,y:x} = cell;
	//let {x,y} = cell;
	if ((x < offX) || (x > (numCols - offX)) || (y<offY) || (y>(numRows-offY))) {
	//if ((x < offXY) || (x > (numCols - offX)) || (y<offY) || (y>(numRows-offY))) {
		return 'black';
	}
	//if ((x>=numImCols) || (y>=numImRows)) return 'black';
  const indexOfPixel = function (x,y) {
		return x*imWd*4+y*4;
		//return y*imHt*4+x*4;
	}
	//debugger;
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
	for (let i=0;i<pxpc;i++) {
		for (let j=0;j<pxpc;j++) {
			let idx = indexOfPixel(lowPxX+i,lowPxY+j);
			//let idx = indexOfPixel(lowPxX+i,lowPxY+j);
			let r = imageData[idx];
			let g = imageData[idx+1];
			let b = imageData[idx+2];
			avR += imageData[idx];
			avG += imageData[idx+1];
			avB += imageData[idx+2];
			avO += imageData[idx+3];
		}
	}
	let pxpc2 = pxpc*pxpc;
	avR = Math.floor(avR/pxpc2);
	avG = Math.floor(avG/pxpc2);
	avB = Math.floor(avB/pxpc2);
	avO = Math.floor(avO/pxpc2);
	let rs = `rgb(${avR},${avG},${avB})`;
	return rs;
}
	
	
	
	
	item.shapeGenerator = function (rvs,cell,cnt) {
	//debugger;
	//let imd = draw.vars.imageData;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	let rgb = this.rgbOfCell(cell);
	/*let onSphere = 0;
	corners.forEach( (corner) => {
	  if (corner.category === 'onSphere') {
			onSphere = 1;
		}
	});
		*/
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let polygonScale = 1;
	let sCorners = this.scaleArray(rCorners,polygonScale,polygonScale);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	//if (Math.random() < 0.5) {
	let r = rvs.r;
	let g = rvs.g;
	let b = rvs.b;
		pgon.fill = 'green';
	//	pgon.fill = `rgb(0,${r},0)`
	pgon.fill = rgb;
	//pgon.fill = `rgb(${r},${g},${b})`
	//pgon.fill = `rgb(${r},${r},${r})`
	pgon.show();
	shapes.push(pgon);
	//pgon.show();
	pgon.update();
	return pgon;
}


		
 }})

