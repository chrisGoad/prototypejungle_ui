// bulls eye


//core.require(function () {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {
core.require('/shape/rectangle.js',function (elementPP) {
debugger;
let item =  svg.Element.mk('<g/>');

/* adjustable parameters */
//item.dimension = 30;
item.dimensionRatio = 0.9; // ratio of inner to outer dimension

item.fill = 'transparent';
item.stroke = 'black';
item.innerStroke = 'same';
item['stroke-width']  = 2;
item.centerX = 0; // center offset as a fraction of dimension
item.centerY = 0;
/* end adjustable parameters */
item.width = 40;
item.height = 30;

item.role = 'vertex';
item.resizable = true;
item.peripheryType = 'rectangle';



item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP',elementPP);
}

item.initialize = function () {
  this.set('outer',this.elementP.instantiate().show());
  this.set('inner',this.elementP.instantiate().show());
  this.outer.unselectable = true;
  this.inner.unselectable = true;
}

item.update =  function () {
  this.outer.stroke = this.stroke;
  this.outer.fill = this.fill;
  this.inner.role = 'spot';
  this.outer.role = 'spot';
  if (this.innerStroke === 'same') {
    this.inner.stroke = this.stroke;
  } else {
    this.inner.stroke = this.innerStroke;
  }
  this.outer.width = this.width;
  this.outer.height =  this.height;
  let maxDim = Math.max(this.width,this.height);
  let inset = maxDim * (1 - this.dimensionRatio);
  this.inner.width = this.width - inset;
 // this.inner.width = (this.dimensionRatio) * (this.width);
  //this.inner.height= (this.dimensionRatio) * (this.height);
  this.inner.height= this.height - inset;
  if (this.dimension) {
    this.inner.dimension = (this.dimensionRatio) * (this.dimension);
  }
  this.outer.update();
  this.inner.update();
  
}

// used to compute where connections (eg arrows) terminate on this shape's periphery
graph.installPeripheryOps(item);

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,ui.stdTransferredProperties,own);
}


return item;
});

