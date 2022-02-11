//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addAnimateMethods} from '/mlib/animate.mjs';

let rs = basicsP.instantiate();

addDropMethods(rs);
addSegsetMethods(rs);
addAnimateMethods(rs);
rs.setName('drop_rain');
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(4,4,4)',backStripePadding:wd*0.2,backStripeVisible:0,minSeparation:10,numTimeSteps:80}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .3;	
  this.circleP = circlePP.instantiate();
	this.circleP.stroke = 'plum';
	//this.circleP.stroke = 'mediumpurple';
	//this.circleP.fill = 'rgba(128,0,128,0.5)'
	this.circleP['stroke-width'] = .3;
}  

rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}

rs.segParams = function () {
  let r = Math.random();
  let np = 8;
  let angle = Math.floor(r*np)* (Math.PI/np)
 // let length = 2 + Math.floor(r*np)*4;
  let length = 6;
  return {angle,length};
} 

rs.genSegments = function (p) {
  let {minSeparation:sep} = this;
  let {length,angle} = this.segParams();
  let vec0 = Point.mk(Math.cos(angle),Math.sin(angle)).times(length/2);
  let vec1 = Point.mk(Math.cos(angle+Math.PI/2),Math.sin(angle+Math.PI/2)).times(length/2);
  let p00 = p.difference(vec0);
  let p01 = p.plus(vec0); 
  let p10 = p.difference(vec1);
  let p11 = p.plus(vec1);
  let seg0 = geom.LineSegment.mk(p00,p01);
  let seg1 = geom.LineSegment.mk(p10,p11);
  
//  let seg0 = this.genSegment(p,length+sep,angle);
//  let seg1 = this.genSegment(p,length+sep,angle+Math.PI/2);
  let ln0 = this.genLine(seg0);
  let ln1 = this.genLine(seg1);
  let circ = this.circleP.instantiate();
  circ.dimension = length;
  circ.moveto(p);
  const rshade = () => Math.floor(Math.random()*244);
  const rcolor = () => `rgb(${rshade()},${rshade()},${rshade()})`;
  //circ.stroke = rcolor();
 // let eseg = this.genSegment(p,length+sep,angle);
  return [[seg0,seg1],[circ]];
  //return [[seg0,seg1],[ln0,ln1]];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addBackStripe();
	this.initializeDrop(0);
  let ln = this.shapes.length
  let sln = this.segments.length
     console.log('numshapes',ln);
  this.numShapesHistory = [ln];
  this.numSegsHistory = [sln];
  this.addNrandomSegments(20);
}



rs.fadeOldShapes = function (fhlg) { //fhlg = fromHowLongAgo
  let {timeStep,shapes,numShapesHistory,numSegsHistory} = this;
 // debugger;
  const fadeShapes = (i,w,o) => {
    // console.log ('fadeShapes',i,w);
    let ns0 = numShapesHistory[i];
    let ns1 = numShapesHistory[i+1];
    for (let i = ns0;i<ns1;i++) {
      let sh = shapes[i];
      sh['stroke-width'] = w;
     // sh.fill = `rgba(128,0,128,${o})`;
      sh.dimension = 1.2*sh.dimension;
    }
  }
  let ln = numShapesHistory.length - 1;
  let sfd = ln - fhlg;
  if (sfd <0) {
    return;
  }
  this.ignoreBefore = numSegsHistory[sfd];

  let ow = 0.3;
  let oo = 0.1;
  for (let i = 0; i < fhlg;i++) {
    let w = (i/fhlg)*ow;
    let o = (i/fhlg)*oo;
    fadeShapes(i+sfd,w,o);
  }
 }
    


rs.step = function ()   {
//	debugger;
 // let numDropped = this.addNrandomSegments(20);
  let {timeStep} = this;
  let numDropped = this.addNrandomSegments(40);
     let {shapes,numShapesHistory,numSegsHistory,segments} = this;
   let ln = shapes.length;
   let sln = segments.length;
   console.log('numshapes',ln,'numsegs',segments.length);
   numShapesHistory.push(ln);
   numSegsHistory.push(sln);
   this.fadeOldShapes(8);
   //this.saveVideo = timeStep >10;
   return;

	this.stepShapeRandomizer('v');
  let fr =  1- ts/nts;///+0.1;
   this.updateStripes(nc,'vertical',0,fr*wd/50);
   this.updateStripes(nc,'horizontal',0,fr*ht/50);


 }
 
 
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume,10);
	
}
export {rs};



