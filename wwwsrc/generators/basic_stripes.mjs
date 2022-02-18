//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addAnimateMethods} from '/mlib/animate.mjs';

let rs = basicsP.instantiate();

//addDropMethods(rs);
//addSegsetMethods(rs);
addAnimateMethods(rs);
rs.setName('basic_move');
let wd = 300;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10,numTimeSteps:400}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 0;	
  this.rectP = rectPP.instantiate();
	this.rectP.stroke = 'yellow';
	this.rectP['stroke-width'] = 0;
  this.rectP.width = 100;
  this.rectP.height= 100;
}  

// a MovingOb has the form {path,speed,startTime,movingShape,currentPos} 


  

let dim = rs.dim =  64*3*2*2;
let hdim = dim/2;
let left = Point.mk(-hdim,0);
let right = Point.mk(hdim,0);
let top = Point.mk(0,-hdim);
let bottom = Point.mk(0,hdim);
let numStripes = 400;
 //numStripes = 10;
let stripeWidth = dim/numStripes;

rs.mkRect = function (ornt) {
  let rect = this.rectP.instantiate();
  if (ornt === 'v') {
    rect.width = stripeWidth; 
    rect.height =  dim;
  } else {
    rect.height = stripeWidth;
    rect.width = dim;
  }
  const rshade = () => Math.floor(254*Math.random());
  //const rcolor = () => `rgba(${rshade()},${rshade()},${rshade()},0.4)`;
   const rcolor = () =>  Math.random()>0.5?'rgba(0,0,0,0.5)':'rgba(255,255,255,0.5)';
  const rcolorr = () => {
    let r = Math.random();
    return  r>0.6666?'rgba(0,0,0,0.5)':(r<0.3333?'rgba(255,255,255,0.5)':'rgba(255,255,0,0.5)');
   }
  rect.fill = rcolor();
  this.rects.push(rect);
  rect.show();
  return rect;
}
     
     

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initProtos();
  this.set('rects',core.ArrayNode.mk());  
  let hdim = dim/2;
	this.addBackStripe();
  for (let i=0;i<numStripes;i++) {
    let vrect = this.mkRect('v');
    vrect.moveto(Point.mk(i*stripeWidth+0.5*stripeWidth-hdim,0)); 
    let hrect = this.mkRect('h');
    hrect.moveto(Point.mk(0,i*stripeWidth+0.5*stripeWidth-hdim));
  }
  
  //this.mkRect(dim);
 }



rs.moveRects = function (path) {
  debugger;
  let {movingObs} = path;
  let {vrects,hrects,dim} = this;
  let o = path.name[0];
  if (!vrects) {
    vrects = this.set('vrects',core.ArrayNode.mk());
    hrects = this.set('hrects',core.ArrayNode.mk());
  }
  let rects = (o === 'h')?hrects:vrects;
  let rln = rects.length;
  let hdim = dim/2;
  let posArray = [-hdim,hdim];
  movingObs.forEach((mvo) => posArray.push(mvo.currentPos));
  const compare = function (a,b) {
    if (a < b) {return 1};
    if (a === b) {return 0};
    return -1;
  }
  posArray.sort(compare); // high to low
  
  let lnm1 = posArray.length - 1;
  let rcnt = 0;
  for (let i=0;i<lnm1;i++) {
    let low = posArray[i+1];
    let high = posArray[i]; 
    let vrwh = high - low;
    let p = (high + low)/2;
    let wh = high - low;
    if (wh === 0) {
      continue;
    }
    let rect = (i<rln)?rects[i]:this.mkRect(o);
    if (o === 'h') {
      rect.width = wh;
      rect.moveto(Point.mk(p,0));    
    } else {
      rect.height = wh;
      rect.moveto(Point.mk(0,p));
    }
      
    rect.update();
  }
}  
    
  

rs.step = function () {
 debugger;
  let {hpathSlow,hpathFast,vpathSlow,timeStep} = this;
  this.moveObsOnPath(hpathSlow);
 // if  ((timeStep < 300)|| (timeStep >350)) this.moveObsOnPath(vpathSlow);
  if  ((timeStep > 100)) this.moveObsOnPath(vpathSlow);
//  this.moveObsOnPath(hpathFast);
  if ((timeStep%8 === 2) && (timeStep <350)) {
    this.startObOnPath(hpathSlow,5);
  }
    if ((timeStep%8 === 2)  && ((timeStep > 100) && (timeStep < 200))) this.startObOnPath(vpathSlow,5);
   // this.startObOnPath(hpathFast,10);
 
  this.moveRects(hpathSlow);
  //if ((timeStep < 300)|| (timeStep >350)) this.moveRects(vpathSlow);
  if (timeStep > 100) this.moveRects(vpathSlow);
  //this.moveRects(hpathFast);
  return;
  if (timeStep === 350) {
     let movingObs = vpathSlow.movingObs;
     movingObs.forEach( (mvo) => {
       mvo.startTime = mvo.startTime+51;
     });
  }
 }
  
 
rs.animate = function (resume)  {
	this.animateIt(500,20,resume,0);
	
}
export {rs};



