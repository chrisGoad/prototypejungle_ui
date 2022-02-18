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
rs.setName('basic_move2');
let wd = 900;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10,numTimeSteps:400}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 1;	
  this.rectP = rectPP.instantiate();
	this.rectP.stroke = 'yellow';
	this.rectP['stroke-width'] = 0.5;
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
  debugger;
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
    //rects.splice(0,1);
    return;
  }   
  let pos = startPos.plus(uvec.times(speed*tmop));
  movingOb.currentPos = (o === 'h')?pos.x:pos.y;
  /*if (pos.y === 0) {
    movingShape.hide();
  } else {
    movingShape.show();
  }*/
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


rs.mkRect = function () {
  let rect = this.rectP.instantiate();
  rect.fill = 'rgba(255,255,255)';
  this.rects.push(rect);
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
  this.set('rectPool',[]);  
  let dim = this.dim =  64*3*2*2;
  let hdim = dim/2;
	this.addBackStripe();
  let hpathSlow = this.mkPath('hpathSlow',left,right,this.lineP);
  let vpathSlow = this.mkPath('vpathSlow',top,bottom,this.lineP);
  let hpathFast = this.mkPath('hpathFast',left,right,this.lineP);
  let vpathFast = this.mkPath('vpathFast',top,bottom,this.lineP);
 // this.shapes.forEach((s) => s.hide());
  //this.mkRect(dim);
 }



rs.moveRects = function () {
  debugger;
  let {rects,dim,hpathFast,hpathSlow,vpathFast,vpathSlow} = this;
  let {movingObs:hFastMovingObs} = hpathFast;
  let {movingObs:hSlowMovingObs} = hpathSlow;
  let {movingObs:vFastMovingObs} = vpathFast;
  let {movingObs:vSlowMovingObs} = vpathSlow;

  if (!rects) {
    rects = this.set('rects',core.ArrayNode.mk());
  }
  let hdim = dim/2;
  let hposArray = [-hdim,hdim];
  let vposArray = [-hdim,hdim];
  hSlowMovingObs.forEach((mvo) => hposArray.push(mvo.currentPos));
  hFastMovingObs.forEach((mvo) => hposArray.push(mvo.currentPos)); 
  vSlowMovingObs.forEach((mvo) => vposArray.push(mvo.currentPos));
  vFastMovingObs.forEach((mvo) => vposArray.push(mvo.currentPos));
  const compare = function (a,b) {
    if (a < b) {return 1};
    if (a === b) {return 0};
    return -1;
  }
  hposArray.sort(compare); // high to low
  vposArray.sort(compare); // high to low
  
  let lnh = hposArray.length - 1;
  let lnv = vposArray.length - 1;
  let rectPool = this.rectPool = []; 
  rects.forEach( (r) => {
    r.hide();
    rectPool.push(r);
  });
  for (let i=0;i<lnh;i++) {
    let hlow = hposArray[i+1];
    let hhigh = hposArray[i]; 
    let x = (hhigh + hlow)/2;
    let wd = hhigh - hlow;
    if (wd === 0) {
      continue;
    }
    for (let j=0;j<lnv;j++) {
      let vlow = vposArray[j+1];
      let vhigh = vposArray[j]; 
      let y = (vhigh + vlow)/2;
      let ht = vhigh - vlow;
      if (ht === 0) {
        continue;
      }
    
      let rln = rectPool.length;
      let rect = (rln)?rectPool.pop():this.mkRect();
      rect.show();
      //let rect = this.mkRect();
      rect.width = .1*wd;
      rect.height = .1*ht;
      rect.moveto(Point.mk(x,y));
      rect.update();
    }
  }
}  
    
  

rs.step = function () {
 debugger;
  let {hpathSlow,hpathFast,vpathSlow,vpathFast,timeStep} = this;
  this.moveObsOnPath(hpathSlow);
  this.moveObsOnPath(vpathSlow);
  this.moveObsOnPath(hpathFast);
  this.moveObsOnPath(vpathFast);
  let ch =0.2;//0.05;;
  let slow = 5;
  let fast = 12;
  fast = 7;
  let stopAt = 150;
  stopAt = 75;
  if ((Math.random() <ch) && (timeStep < stopAt))    this.startObOnPath(hpathSlow,slow);
  if ((Math.random() <ch) && (timeStep < stopAt))  this.startObOnPath(hpathFast,fast); 
   if ((Math.random() <ch) && (timeStep < stopAt)) this.startObOnPath(vpathSlow,slow);
  if ((Math.random() <ch) && (timeStep < stopAt)) this.startObOnPath(vpathFast,fast);
//  if (timeStep%8 === 2)  && ((timeStep > 100) && (timeStep < 200))) this.startObOnPath(vpathSlow,5);
   // this.startObOnPath(hpathFast,10);
  this.moveRects();
 }
  
 
rs.animate = function (resume)  {
	this.animateIt(227,40,resume,0);
	
}
export {rs};



