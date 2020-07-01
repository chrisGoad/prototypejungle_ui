// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {

core.require(function () {
  return function (elementPP) {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {
debugger;
let item =  svg.Element.mk('<g/>');

/* adjustable parameters */

item.dimension = 30;
item.dimensionRatio = 0.2;
item.numCircles = 2;
item.lineWidthFactor = 1;
item.fill = 'transparent';
item.stroke = 'black';
item.outerStroke = '255,0,0';
item.outerStroke = '0,0,0';
item.innerStroke = '0,0,255';
item.innerStroke = '200,100,200';
item['stroke-width']  = 5;
item.centerX = 0; // center offset as a fraction of dimension
item.centerY = 0;
item.stdDeviation = 0.5;
/* end adjustable parameters */

item.circlesBuilt = 0;
item.role = 'spot';
item.resizable = true;


item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP',elementPP);
  elementPP.stroke = 'black';
  elementPP.stdDeviation = this.stdDeviation;
}

let interpolateColor = function (c0,c1,i) {
  let sc0 = c0.split(',');
  let r0 = parseInt(sc0[0]);
  let g0 = parseInt(sc0[1]);
  let b0 = parseInt(sc0[2]);
  let sc1 = c1.split(',');
  let r1 = parseInt(sc1[0]);
  let g1 = parseInt(sc1[1]);
  let b1 = parseInt(sc1[2]);
  let ri = r0 + (r1-r0)*i;
  let gi = g0 + (g1-g0)*i;
  let bi = b0 + (b1-b0)*i;
  return `rgb(${ri},${gi},${bi})`;
}
  
item.update =  function () {
  debugger;
  let built = this.circlesBuilt;
  let numCircles = this.numCircles; 
  this['stroke-width'] = (this.dimension * this.lineWidthFactor)/(this.numCircles * 4);
  /*let center = this.set('center',this.elementP.instantiate().show());
  center.fill = 'black';
  center.dimension = 0.5*this.innerDimension;
  center.width = center.height = center.dimension;*/
  if (built === numCircles) {
    let cxi = (this.dimension * this.centerX)/numCircles;
    let cyi = (this.dimension * this.centerY)/numCircles;
   // let dimRatio = (this.dimension - this.innerDimension)/(this.dimension);
    let dimRatio = this.dimensionRatio;
    let dim = this.dimension;
    debugger;
    for (let i=0;i<built;i++) {
      let c = this['c'+i];
      core.setProperties(c,this,['stroke','stroke-width','fill','stdDeviation']);
      let strk = interpolateColor(this.outerStroke,this.innerStroke,i/(built-1));
      c.stroke = strk;
    //  c.r = (this.dimension * (built-i))/(2*built);
      let innerDimension = dim * dimRatio;
      
     //	 c.dimension = this.dimension * (built-dimRatio*i))/built;
      c.dimension = innerDimension + (dim - innerDimension)*(i/(built-1));
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
  for (let i=built; i<numCircles;i++) {
   // let c = this.set('c'+i,svg.Element.mk('<circle/>'));
    let c = this.set('c'+i,this.elementP.instantiate().show());
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

