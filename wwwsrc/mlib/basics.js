//active

core.require('/shape/rectangle.js','/shape/textOneLine.js',function (rectPP,textPP) {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;
  return function (item) {

item.setName = function (name,jsonName) {
	this.name = name;
	core.vars.whereToSave = name;
	let theName = jsonName?jsonName:name;
	this.path = `json/${theName}.json`;
}

item.addSignature = function() {
	let {width,height,sigScale,sigColor,sigX=0.45,sigY=0.45,sigRectX,sigRectY,backgroundWidth:bkw,backgroundHeight:bkh,backgroundPadding:bkp,backgroundPaddingX:bkpx,backgroundPaddingy:bkpy} = this;
	debugger;
	if (!bkw) {
		let bkPx = bkpx?bkpx:bkp;
		let bkPy = bkpy?bkpy:bkp;
		bkw = width + (bkPx?bkPx:0);
		bkh = height + (bkPy?bkPy:0);
	}
	let sigC = this.set('sigC',svg.Element.mk('<g/>'));
	if (sigRectX) {
	  let sigR = sigC.set('sigR', this.sigRectP.instantiate());
	  sigR.show();
		sigR.width = 0.05*width;
	  sigR.height = 0.05*width;
	}
	let sig = sigC.set('sig',this.textP.instantiate())
	sig.show();
	sig.text = 'C.G.';
	sigC.moveto(Point.mk(sigX*bkw,sigY*bkh));
	sig.stroke = sigColor;
	sig['font-family'] = 'Trattatello';
	sig['font'] = 'fantasy';
	//sig['font-size'] = "30"	;
	sig.setScale(sigScale);
}

item.addBackground = function () {
	let {backgroundColor:bkc,backgroundPadding:bkp,backgroundPaddingX:bkpx,backgroundPaddingy:bkpy, 
	backgroundWidth,backgroundHeight,
	outerBackgroundColor:obc,outerBackgroundPaddingX:obpx,outerBackgroundPaddingY:obpy,width,height} =  this;
	if (!bkc) {
		return;
	}
	

	core.assignPrototypes(this,'backgroundRectP',rectPP);
	this.backgroundRectP['stroke-width'] = 1;
	this.backgroundRectP.fill = 'transparent';
	core.assignPrototypes(this,'sigRectP',rectPP);
	this.sigRectP.fill = 'red';
	//let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
	
  let bkr = this.set('brect',this.backgroundRectP.instantiate());
	bkr.stroke = bkc;
	if (backgroundWidth) {
		bkr.width = backgroundWidth;
		bkr.height = backgroundHeight;
	} else {
		let bkPx = bkpx?bkpx:bkp;
		let bkPy = bkpy?bkpy:bkp;
		bkr.width = width + (bkPx?bkPx:0);
		bkr.height = height + (bkPy?bkPy:0);
	}
  //bkr.width = backgroundWidth?backgroundWidth:width + backgroundPadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
		core.assignPrototypes(this,'textP',textPP);
	this.textP['stroke'] = 'white';

	
	
	if (obc) {
		let obkr = this.set('obrect',this.backgroundRectP.instantiate());
		obkr.stroke = obc;
		let obkPx = obkpx?obkpx:obkp;
		let objPy = obkpy?obkpy:obkp;
		obkr.width = width + (bkPx?bkPx:0);
		obkr.height = height + (bkPy?bkPy:0);
		obkr.show();
		/*let rr = rectangleP.instantiate();
		let bpx = obpx?obpx:0;
		let bpy = obpy?obpy:0;
		rr.width = width + bpx;
		rr.height = height + bpy;
		rr.fill = obc;
		this.set('brr',rr);*/
	}
}



item.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}


item.genLine = function (sg,lineP,ext=0) {
  let {end0,end1} = sg;
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
	let theLineP = lineP?lineP:this.lineP;
	
  let line = theLineP.instantiate();
  line.setEnds(end0,end1);
  return line;
}


item.initBasis = function () {
	this.initProtos();
	this.addBackground();
  this.set('shapes',core.ArrayNode.mk());

}


}}); 
 
