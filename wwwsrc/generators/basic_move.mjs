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

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:1,minSeparation:10,numTimeSteps:400}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 0.5;	
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
  debugger;
  let {timeStep} = this;
  let {movingShape,path,startTime,speed} = movingOb;
  let {startPos,endPos,length,uvec,movingObs,shapePool} = path;
  let tmop = timeStep - startTime;
  let distTraveled = tmop*speed;
  if (distTraveled  >= length) {
    movingShape.hide();
    removeFromArray(movingObs,movingOb);
    shapePool.push(movingShape);
    return;
  }   
  let pos = startPos.plus(uvec.times(speed*tmop));
  movingOb.currentPos = pos.x;
  movingShape.moveto(pos);
  movingShape.update();
}

rs.moveObsOnPath = function (path) {
  path.movingObs.forEach( (mvob) => this.moveObOnPath(mvob));
}

  

let dim = rs.dim =  32*3*2*2;
let hdim = dim/2;
let left = Point.mk(-hdim,0);
let right = Point.mk(hdim,0);


rs.mkRect = function (wh) {
  let rect = this.rectP.instantiate();
  rect.height =  dim;
  const rshade = () => Math.floor(254*Math.random());
  const rcolor = () => `rgba(${rshade()},${rshade()},${rshade()},0.4)`;
  rect.fill = rcolor();
  this.rects.push(rect);
  rect.show();
  return rect;
}
     
     

rs.initializeShape = function (pathName,shape) {
  let hdim = 0.5*this.dim;
  shape.setEnds(Point.mk(0,-hdim),Point.mk(0,hdim));
}
  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initProtos();
  this.set('rects',core.ArrayNode.mk());  
  let dim = this.dim =  32*3*2*2;
  let hdim = dim/2;
	this.addBackStripe();
  let hpathSlow = this.mkPath('hpathSlow',left,right,this.lineP);
  let hpathFast = this.mkPath('hpathFast',left,right,this.lineP);
  this.mkRect(dim);
 }



rs.moveRects = function (path) {
  debugger;
  let {movingObs} = path;
  let {rects,dim} = this;
  if (!rects) {
    rects = this.set('rects',core.ArrayNode.mk());
  }
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
    let rect = (i<rln)?rects[rcnt]:this.mkRect();
    rcnt++
    rect.width = wh;
    rect.moveto(Point.mk(p,0));
    rect.update();
  }
}  
    
  

rs.step = function () {
 debugger;
  let {hpathSlow,hpathFast,timeStep} = this;
  this.moveObsOnPath(hpathSlow);
  this.moveObsOnPath(hpathFast);
  if (timeStep%8 === 0) {
    this.startObOnPath(hpathSlow,5);
    this.startObOnPath(hpathFast,10);
  }
  this.moveRects(hpathSlow);
  this.moveRects(hpathFast);
 }
  
 
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume);
	
}
export {rs};



