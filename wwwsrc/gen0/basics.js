core.require('/shape/rectangle.js',function (rectPP) {
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
	if (!this.backgroundColor) {
		return;
	}
	core.assignPrototypes(this,'backgroundRectP',rectPP);
	this.backgroundRectP['stroke-width'] = 0;
	let {backgroundRectP,backgroundWidth,backgroundHeight,backgroundPadding,backgroundColor,width,height} = this;
	
  let bkr = this.set('brect',this.backgroundRectP.instantiate());
	bkr.fill = backgroundColor;
  bkr.width = backgroundWidth?backgroundWidth:width + backgroundPadding;
	bkr.height = backgroundHeight?backgroundHeight:height + backgroundPadding;
	bkr.show();
}


}}); 
 
