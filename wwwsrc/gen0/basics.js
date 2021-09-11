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

item.addBackground = function () {
	let {backgroundColor:bkc,backgroundPadding:bkp,backgroundPaddingX:bkpx,backgroundPaddingy:bkpy, 
	backgroundWidth,backgroundHeight,
	outerBackgroundColor:obc,outerBackgroundPaddingX:obpx,outerBackgroundPaddingY:obpy,width,height,sign,sigScale,sigColor} =  this;
	if (!bkc) {
		return;
	}
	

	core.assignPrototypes(this,'backgroundRectP',rectPP);
	this.backgroundRectP['stroke-width'] = 0;
	//let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
	
  let bkr = this.set('brect',this.backgroundRectP.instantiate());
	bkr.fill = bkc;
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
	let sig = this.set('sig',this.textP.instantiate())
	sig.show();
	
	let w = bkr.width;
	let h = bkr.height;
	if (sign)  {
		sig.text = 'C.G.';
		sig.moveto(Point.mk(0.45*w,0.45*h));
		sig.stroke = sigColor;
		sig['font-family'] = 'Trattatello';
		sig['font'] = 'fantasy';
		//sig['font-size'] = "30"	;
		sig.setScale(sigScale);
	}
	
	if (obc) {
		let obkr = this.set('obrect',this.backgroundRectP.instantiate());
		obkr.fill = obc;
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



}}); 
 
