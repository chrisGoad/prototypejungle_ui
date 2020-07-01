// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js',function (linePP) {

//core.require(function () {
  return function (elementPP1,elementPP2) {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {
debugger;
let item =  svg.Element.mk('<g/>');
let isDual = !!elementPP2;

/* adjustable parameters */

item.dimension = 30;
item.dimensionRatio = 0.2;
item.numCircles = 10;
item.numSpokes= 0;
item.lineWidthFactor = .1;
item.jiggle = .2;
item.fill = 'transparent';
item.stroke = 'black';
item.outerStroke = '255,0,0';
item.outerStroke = '0,0,0';
item.innerStroke = '0,0,255';
item.innerStroke = '200,100,200';
item.innerStroke = '0,0,0';
//item.innerStroke = '255,255,255';
//item.outerStroke = '255,255,255';

item['stroke-width']  = 5;
item.centerX = 0; // center offset as a fraction of dimension
item.centerY = 0;
item.stdDeviation = 0.5;
item.doJiggle = true;
item.stepAngles = false;
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
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.3; 
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

let  jiggled;//[ 30,25.9432,24.0876,20.0824,15.5176,13.351,8.7377,6];
let randomSeq;


const jiggle = function (a,j) {
  let ln = a.length;
  if (!randomSeq) {
    randomSeq = [];
    for (let i=0;i<ln;i++) {
      if ((i===0) || (i===(ln-1))) {
        randomSeq.push(1);
      } else {
        randomSeq.push(Math.random());
      }
    }
  }
  let rs = [];
  for (let i=0;i<ln;i++) {
    let v = a[i];
    //rs.push(core.nDigits(v + (randomSeq[i]-0.5)* j,4));
    rs.push(core.nDigits(v * (1 + (randomSeq[i]-0.5)* j),4));
    
  }
  //jiggled = rs;
  return rs;
}
  
  
item.update =  function () {
  debugger;
  let built = this.circlesBuilt;
  let numCircles = this.numCircles; 
  let numSpokes = this. numSpokes;
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
    let dimensions = [];
    let centers = [];
    let colors = [];
    let innerDimension = dim * dimRatio;
    for (let i=0;i<built;i++) {
      let strk = interpolateColor(this.outerStroke,this.innerStroke,i/(built-1));
      colors.push(strk);
      dimensions.push( dim + (innerDimension - dim)*(i/(built-1)));
      centers.push(Point.mk(i *cxi,i * cyi));
    }
    debugger;
    if (this.doJiggle) {
      dimensions = jiggle(dimensions,this.jiggle);
    }
    
    debugger;
    let initialAngleDelta = 360/built;
    let initialAngle = 0;
    for (let i=0;i<built;i++) {
      let c = this['c'+i];
      core.setProperties(c,this,['stroke','stroke-width','fill','stdDeviation']);
      c.stroke = colors[i];      
      c.dimension = dimensions[i];
      c.moveto(centers[i]);
      c.width = c.dimension;
      c.height = c.dimension;
      c.gapInitialAngle = initialAngle;
      if (item.stepAngles) {
        initialAngle += initialAngleDelta;
      }
      c.update();
      c.draw();
     
    } 
    for (let j=0;j<numSpokes;j++) {
       let s = this['s'+j];
       let angle = j*(Math.PI * 2)/numSpokes;
       let pnt = Point.mk(Math.cos(angle),Math.sin(angle)).times(dim/2);
       s.setEnds(Point.mk(0,0),pnt);
       s.update();
    }

    return;
  }
  if (built > numCircles) {
    for (let i=numCircles; i<built;i++) {
      this['c'+i].remove();
      //this['s'+i].remove();

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
      element = (i%2 === 0)?elementP1:elementP2;
    } else {
      element = elementP1;
    }
    let c = this.set('c'+i,element.instantiate().show());
    c.unselectable = true;
    c.__hideInUI = true;
  }
  for (let j=0; j<numSpokes;j++) {
      let spoke = this.set('s'+j,this.lineP.instantiate().show());
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

