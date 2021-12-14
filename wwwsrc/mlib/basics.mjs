//active

import {rs as rectPP} from '/shape/rectangle.mjs';
//import {rs as rectPP} from '/shape/rectangle.js','/shape/textOneLine.js',function (rectPP,textPP) {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;a
const rs = function (item) {

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
	debugger;
	let {backStripeColor:bkc,backStripePadding:bkp,backStripePaddingX:bkpx,backStripePaddingy:bkpy, 
	backStripeWidth,backStripeHeight,width,height,backStripeVisible,backStripePos:pos} =  this;
	if (!bkc) {
		return;
	}
	//core.assignPrototypes(this,'backStripeRectP',rectPP);
	this.backStripeRectP = rectPP.instantiate();
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
	if (pos) {
		bkr.moveto(pos);
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
	//core.assignPrototypes(this,'backgroundRectP',rectPP);
  this.backgroundRectP = rectPP.instantiate();

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


item.installLine = function (line) {
  let lines =  this.lines;
	if (!lines) {
		lines = this.lines =this.set('lines',core.ArrayNode.mk());
	}
  lines.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}

item.initBasis = function () {
	if (this.initProtos) {
	  this.initProtos();
	}
	this.addBackground();
	this.addBackStripe();
//  this.set('shapes',core.ArrayNode.mk());

}

// a utility
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
item.numPowers = function (n,p) {
	return numPowers(n,p);
}
//cells and coordinates, based on width,height,numRows, numCols

item.point2cell = function (p) {
    let {width,height,numRows,numCols} = this;
    let {x,y} = p;
    let hw = 0.5*width;
    let hh = 0.5*height;
    let cx = Math.floor((x -hw)/numCols);
    let cy = Math.floor((y -hh)/numRows);
    return {x:cx,y:cy};
}
}
export {rs};
 
