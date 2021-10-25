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

// add a stripe around the image, to control the size of the jpg when saved
item.addBackStripe = function () {
	let {backStripeColor:bkc,backStripePadding:bkp,backStripePaddingX:bkpx,backStripePaddingy:bkpy, 
	backStripeWidth,backStripeHeight,width,height,backStripeVisible} =  this;
	if (!bkc) {
		return;
	}
	core.assignPrototypes(this,'backStripeRectP',rectPP);
	this.backStripeRectP['stroke-width'] = 1;
	this.backStripeRectP.fill = 'transparent';
  let bkr = this.set('brect',this.backStripeRectP.instantiate());
	if (backStripeVisible) {
		bkr['stroke-width'] = 10;
		bkr.stroke = 'red';
	} else {
	  bkr.stroke = bkc;
	}
	if (backStripeWidth) {
		bkr.width = backStripeWidth;
		bkr.height = backStripeHeight;
	} else {
		let bkPx = bkpx?bkpx:(bkp?bkp:0.1*width);
		let bkPy = bkpy?bkpy:(bkp?bkp:0.1*height);
		bkr.width = width + bkPx;
		bkr.height = height + bkPy;
	}
  //bkr.width = backStripeWidth?backStripeWidth:width + backStripePadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
}


item.addBackground = function () {
	let {backgroundColor:bkc,width,height} =  this;
	if (!bkc) {
		return;
	}
	core.assignPrototypes(this,'backgroundRectP',rectPP);
	this.backgroundRectP['stroke-width'] = 0;
	this.backgroundRectP.fill = bkc;
	//let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
  let bkr = this.set('backRect',this.backgroundRectP.instantiate());
  bkr.width = width;
	bkr.height = height;
  //bkr.width = backgroundWidth?backgroundWidth:width + backgroundPadding;
//	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
	
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
	if (this.initProtos) {
	  this.initProtos();
	}
	this.addBackground();
  this.set('shapes',core.ArrayNode.mk());

}


}}); 
 
