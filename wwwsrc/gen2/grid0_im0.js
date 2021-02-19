core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function (linePP,polygonPP,addGridMethods) {


rs.setImageParams = function () {
	debugger;
	let {numRows,numCols} = this;
	let {imWd,imHt} = draw.vars;
	let ar = numCols/numRows;
	let imAr = imWd/imHt;
	let sc;
	if (imAr > ar) {
		sc = imWd/numCols;
	} else {
		sc = imHt/numRows;
	}
	sc = Math.ceil(sc); // this many pixels are averaged
	this.pixelsPerCell = sc;
	this.numImCols = Math.floor(imWd/sc);
	this.numImRows = Math.floor(imWd/sc);
}

rs.rgbOfCell = function (cell) {
	let {imWd,imHt,imageData} = draw.vars;
	let {pixelsPerCell:pxpc,numImRows,numImCols} = this;
	let {x:y,y:x} = cell;
	if ((x>=numImCols) || (y>=numImRows)) return 'black';
  const indexOfPixel = function (x,y) {
		return x*imWd*4+y*4;
	}
	let lowPxX = x * pxpc;
	let lowPxY = (imHt-y) * pxpc;
	lowPxY = y * pxpc;
	let avR = 0;
	let avG = 0;
	let avB = 0;
	let avO = 0;
	for (let i=0;i<pxpc;i++) {
		for (let j=0;j<pxpc;j++) {
			let idx = indexOfPixel(lowPxX+i,lowPxY+j);
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
	
	
	
	
	rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
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


		
return rs;
})

