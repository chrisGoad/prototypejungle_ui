// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {

core.require(function () {
  return function (elementPP1,elementPP2) {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {
debugger;
let item =  svg.Element.mk('<g/>');

let isDual = !!elementPP2;
/* adjustable parameters */
item.dimension = 30;
item.innerDimension = 10;
item.numCircles = 2;
item.lineWidthFactor = 1;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width']  = 5;
item.centerX = 0; // center offset as a fraction of dimension
item.centerY = 0;
item.stdDeviation = 0.5;
/* end adjustable parameters */

item.circlesBuilt = 0;
item.role = 'spot';
item.resizable = true;


item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP1',elementPP1);
  this.elementP1.stroke = 'black';
  this.elementP1.stdDeviation = this.stdDeviation;
  if (isDual) {
    core.assignPrototypes(this,'elementP2',elementPP2);
    this.elementP2.stroke = 'black';
    this.elementP2.stdDeviation = this.stdDeviation; 
  }
}  


item.update =  function () {
  debugger;
  let built = this.circlesBuilt;
  let numCircles = this.numCircles; 
  this['stroke-width'] = (this.dimension * this.lineWidthFactor)/(this.numCircles * 4);
  if (built === numCircles) {
    let cxi = (this.dimension * this.centerX)/numCircles;
    let cyi = (this.dimension * this.centerY)/numCircles;
    let dimRatio = (this.dimension - this.innerDimension)/(this.dimension);
    for (let i=0;i<built;i++) {
      let c = this['c'+i];
      core.setProperties(c,this,['stroke','stroke-width','fill']);
    //  c.r = (this.dimension * (built-i))/(2*built);
      c.dimension = (this.dimension * (built-dimRatio*i))/built;
      debugger;
      c.moveto(Point.mk(i *cxi,i * cyi));
      c.width = c.dimension;
      c.height = c.dimension;
      c.update();
      c.draw();
    } 
    return;
  }
  if (built > numCircles) {
    for (let i=numCircles; i<built;i++) {
      this['c'+i].remove();
    }
    this.circlesBuilt = numCircles;
    this.update();
    return;
  }
  let elementP1 = this.elementP1;
  let elementP2 = isDual?this.elementP2:null;
  for (let i=built; i<numCircles;i++) {
   // let c = this.set('c'+i,svg.Element.mk('<circle/>'));
    let element;
    if (isDual) {
      element = (i%2 === 1)?elementP1:elementP2;
    } else {
      element = elementP1;
    }
    let c = this.set('c'+i,element.instantiate().show());
    c.unselectable = true;
    c.__hideInUI = true;
  }
  this.circlesBuilt = numCircles;
  this.update();
}

// used to compute where connections (eg arrows) terminate on this shape's periphery
graph.installCirclePeripheryOps(item);

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,ui.stdTransferredProperties,own);
}


return item;
}});

