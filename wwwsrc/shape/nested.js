// bulls eye


core.require('/shape/circle.js',function (elementPP) {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {

let item =  svg.Element.mk('<g/>');

/* adjustable parameters */
item.dimension = 30;
item.numCircles = 2;
item.lineWidthFactor = 1;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width']  = 5;
item.centerX = 0; // center offset as a fraction of dimension
item.centerY = 0;
/* end adjustable parameters */

item.circlesBuilt = 0;
item.role = 'spot';
item.resizable = true;


item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP',elementPP);
  elementPP.stroke = 'black';
}

item.update =  function () {
  debugger;
  let built = this.circlesBuilt;
  let numCircles = this.numCircles; 
  this['stroke-width'] = (this.dimension * this.lineWidthFactor)/(this.numCircles * 4);
  if (built === numCircles) {
    let cxi = (this.dimension * this.centerX)/numCircles;
    let cyi = (this.dimension * this.centerY)/numCircles;
    for (let i=0;i<built;i++) {
      let c = this['c'+i];
      core.setProperties(c,this,['stroke','stroke-width','fill']);
    //  c.r = (this.dimension * (built-i))/(2*built);
      c.dimension = (this.dimension * (built-i))/built;
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
  for (let i=built; i<numCircles;i++) {
   // let c = this.set('c'+i,svg.Element.mk('<circle/>'));
    let c = this.set('c'+i,this.elementP.instantiate().show());
    c.neverselectable = true;
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
});

