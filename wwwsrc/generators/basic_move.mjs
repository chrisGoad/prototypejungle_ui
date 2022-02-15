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
let wd = 900;

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

const MovingOb = core.ObjectNode.mk();
const Path = core.ObjectNode.mk();

MovingOb.mk = function (path,speed) {
  let rs = MovingOb.instantiate();
  Object.assign(rs,{path:path,speed:speed});
  return rs;
}

//properties of a Path: startPos,endPos,shapeProto,shapePool,movingObs,startShape,endShape,length,uvec
rs.mkPath = function (nm,startPos,endPos,shapeProto) {
  let rs = Path.instantiate();
  rs.name = nm;
  Object.assign(rs,{startPos:startPos,endPos:endPos,shapeProto:shapeProto,shapePool:[],movingObs:[]});
  let startShape = shapeProto.instantiate();
  let endShape = shapeProto.instantiate();
  this.set(nm+'Start',startShape);
  this.set(nm+'End',endShape);
  this.initializeShape(nm,startShape);
  this.initializeShape(nm,endShape);
  this[nm] = rs;
  startShape.moveto(startPos);
  endShape.moveto(endPos);
  startShape.show();
  endShape.show();
  let vec = endPos.difference(startPos);
  rs.length = vec.length();
  rs.uvec = vec.normalize();
  return rs;
}


rs.shapeCount = 0;
rs.startObOnPath = function (path,speed) {
  debugger;
  let {timeStep,shapes,dim} = this;
  if (!shapes) {
  	shapes = this.set('shapes',core.ArrayNode.mk());
  }
  let movingOb = MovingOb.mk(path,speed);
  movingOb.startTime = timeStep;
  let {shapePool,shapeProto,movingObs} = path;
  let shape;
  if (shapePool.length === 0) {
     shape = shapeProto.instantiate();
     this.initializeShape(path.name,shape);
     shapes.push(shape);
  } else {
    shape = shapePool.pop();
  } 
  shape.show();
  movingOb.movingShape = shape;
  movingOb.currentPos = -dim/2;
  movingObs.push(movingOb);
}

const removeFromArray = function (ar,el) {
  let idx = ar.indexOf(el);
  if (idx >= 0) {
     ar.splice(idx,1);
     return ar;
  }
  debugger;
}

rs.moveObOnPath = function (movingOb) {
  //debugger;
  let {timeStep,hrects,vrects} = this;
  let {movingShape,path,startTime,speed} = movingOb;
  let {startPos,endPos,length,uvec,movingObs,shapePool} = path;
  let tmop = timeStep - startTime;
  let distTraveled = tmop*speed;
  let o = path.name[0];
  let rects = o==='h'?hrects:vrects;
  if (distTraveled  >= length) {
    movingShape.hide();
    removeFromArray(movingObs,movingOb);
    shapePool.push(movingShape);
    rects.splice(0,1);
    return;
  }   
  let pos = startPos.plus(uvec.times(speed*tmop));
  movingOb.currentPos = (o === 'h')?pos.x:pos.y;
  movingShape.moveto(pos);
  movingShape.update();
}

rs.moveObsOnPath = function (path) {
  path.movingObs.forEach( (mvob) => this.moveObOnPath(mvob));
}

  

let dim = rs.dim =  64*3*2*2;
let hdim = dim/2;
let left = Point.mk(-hdim,0);
let right = Point.mk(hdim,0);
let top = Point.mk(0,-hdim);
let bottom = Point.mk(0,hdim);

rs.firstRectH = 1;
rs.firstRectV = 1;

rs.mkRect = function (ornt) {
  let {firstRectH,firstRectV,timeStep} = this;
  let rect = this.rectP.instantiate();
  if (ornt === 'h') {
    rect.height =  this.dim;
  } else {
    rect.width = this.dim;
  }
  const rshade = () => Math.floor(254*Math.random());
 // const rcolor = () => `rgba(${rshade()},${rshade()},${rshade()},0.4)`;
// const rcolor = () =>  Math.random()>0.5?'rgba(255,0,0,0.5)':'rgba(0,0,255,0.5)';
  const rcolor = () => {
    let whiteish = 'rgba(255,255,255,0.5)';
    let blackish = 'rgba(0,0,0,0.5)';
    if ((ornt == 'h') && firstRectH)  {
      this.firstRectH = 0;
      return  whiteish;
   } 
   if ((ornt == 'v') && firstRectV)  {
      this.firstRectV = 0;
      return whiteish;
   }
  if ((timeStep >= 348)|| (timeStep === 198))  {
     return blackish;
  }
   return Math.random()>0.5?whiteish:blackish;
   //'rgba(255,255,,0.5)';
  }
  rect.fill = rcolor();
  this[ornt+'rects'].push(rect);
  rect.show();
  return rect;
}
     
     

rs.initializeShape = function (pathName,shape) {
  let hdim = 0.5*this.dim;
  let o = pathName[0];
  let pnt0 = (o === 'h')?top:left;
  let pnt1 = (o === 'h')?bottom:right;
  shape.setEnds(pnt0,pnt1);
}
  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initProtos();
  this.set('rects',core.ArrayNode.mk());  
  let dim = this.dim =  64*3*2*2;
  let hdim = dim/2;
	this.addBackStripe();
  let hpathSlow = this.mkPath('hpathSlow',left,right,this.lineP);
  let vpathSlow = this.mkPath('vpathSlow',top,bottom,this.lineP);
  let hpathFast = this.mkPath('hpathFast',left,right,this.lineP);
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
  if  ((timeStep > 100)) this.moveObsOnPath(vpathSlow);
  if ((timeStep%8 === 2) && (timeStep <350)) {
    this.startObOnPath(hpathSlow,5);
  }
    if ((timeStep%8 === 2)  && ((timeStep > 100) && (timeStep < 200))) this.startObOnPath(vpathSlow,5);
 
  this.moveRects(hpathSlow);
  if (timeStep > 100) this.moveRects(vpathSlow);
  return;
  if (timeStep === 350) {
     let movingObs = vpathSlow.movingObs;
     movingObs.forEach( (mvo) => {
       mvo.startTime = mvo.startTime+51;
     });
  }
 }
  
 
rs.animate = function (resume)  {
	this.animateIt(502,20,resume,0);
	
}
export {rs};



