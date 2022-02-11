//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addAnimateMethods} from '/mlib/animate.mjs';

let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
addAnimateMethods(rs);
rs.setName('drop_move');
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10,numTimeSteps:100}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .3;
}  

rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
} 

rs.genSegments = function (p) {
  let {minSeparation:sep} = this;
  let {length,angle} = this.segParams();
  let seg = this.genSegment(p,length,angle);
  let ln = this.genLine(seg);
  let eseg = this.genSegment(p,length+sep,angle);
  return [[eseg],[ln]];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addBackStripe();
	this.initializeDrop(0);
  let ln = this.shapes.length
     console.log('numshapes',ln);
  this.numShapesHistory = [ln];
  //this.addRandomSegments();
 this.addNrandomSegments(2000000);
}

rs.moveLine = function (line) {
  let {end0,end1} = line;
  let vec = end1.difference(end0).normalize();
  let nvec = vec.normal().times(.8)
  let nend0 = end0.plus(nvec);
  let nend1 = end1.plus(nvec);
  end0.copyto(nend0);
  end1.copyto(nend1);
  line.update();
  line.show();
}

rs.moveLines  = function () {
  let {shapes} = this;
  let ln = shapes.length;
  for (let i=0;i<ln;i++) {
    let shp = shapes[i]
    this.moveLine(shp);
  }
}

rs.fadeOldShapes = function (fhlg) { //fhlg = fromHowLongAgo
  let {timeStep,shapes,numShapesHistory} = this;
 // debugger;
  const fadeShapes = (i,w) => {
    // console.log ('fadeShapes',i,w);
    let ns0 = numShapesHistory[i];
    let ns1 = numShapesHistory[i+1];
    for (let i = ns0;i<ns1;i++) {
      let sh = shapes[i];
      sh['stroke-width'] = w;
    }
  }
  let ln = numShapesHistory.length - 1;
  let sfd = ln - fhlg;
  if (sfd <0) {
    return;
  }
  this.ignoreBefore = numShapesHistory[sfd];

  let ow = 0.3;
  for (let i = 0; i < fhlg;i++) {
    let w = (i/fhlg)*ow;
    fadeShapes(i+sfd,w);
  }
 }
    


rs.step = function ()   {
   debugger;
   if (this.timeStep < 90) {
     this.moveLines();
   }
  return;
  let numDropped = this.addNrandomSegments(20);
     let {shapes,numShapesHistory,segments} = this;
   let ln = shapes.length;
   console.log('numshapes',ln,'numsegs',segments.length);
   numShapesHistory.push(ln);
   this.fadeOldShapes(8);
   return;

	this.stepShapeRandomizer('v');
  let fr =  1- ts/nts;///+0.1;
   this.updateStripes(nc,'vertical',0,fr*wd/50);
   this.updateStripes(nc,'horizontal',0,fr*ht/50);


 }
 
 
rs.animate = function (resume)  {
  debugger;
	this.animateIt(this.numTimeSteps,20,resume);
	
}
export {rs};



