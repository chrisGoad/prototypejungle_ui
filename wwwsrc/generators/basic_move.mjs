//core.require('/line/line.js','/gen0/Basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addAnimateMethods} from '/mlib/animate.mjs';

let rs = basicsP.instantiate();

//addDropMethods(rs);
//addSegsetMethods(rs);
addAnimateMethods(rs);
rs.setName('basic_move');
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10,numTimeSteps:200}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .3;
}  
rs.addShapes = function (nm,n,dim) {
  let shapes = this.set(nm,core.ArrayNode.mk());
  for (let i=0;i<n;i++) {
    let shape = this.lineP.instantiate()
    let hdim = dim/2;
    shape.setEnds(Point.mk(0,-hdim),Point.mk(0,hdim));
    shapes.push(shape);
    shape.show();
  }
}
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos(); 
  let dim = this.dim =  32*3*2*2;
	this.addBackStripe();
	this.addShapes('s2',4,dim);
	this.addShapes('s3',5,dim);
  this.s2[0].moveto(Point.mk(-dim/2,0));
  this.s2[3].moveto(Point.mk(dim/2,0)); 
  this.s3[0].moveto(Point.mk(-dim/2,0));
  this.s3[4].moveto(Point.mk(dim/2,0));
 // this.s3[3].moveto(Point.mk(this.dim,0));
 }



rs.computePositions = function (i) {
  let {timeStep,last,dim} = this;
  let hdim = dim/2;
  let iv,fc;
  if (i === 2) {
    iv = 32*3;
    fc = 2*2;
  } else if (i === 3) {
    iv = 32*2;
    fc = 2*3;
  }
  let rs  = [];
  if (i === 3) {
    rs.push(Math.max(fc*((timeStep-2*iv/3)%iv),0)-hdim);
  }
  rs.push(Math.max(fc*((timeStep-iv/i)%iv),0)-hdim);
  rs.push(fc*(timeStep%iv)-hdim);
  rs.push(fc*iv-hdim);
  return rs;
}

rs.step = function () {
  let {s2,s3,timeStep} = this;
  let ps2 = this.computePositions(2);
  let ps3 = this.computePositions(3);
  //s2[3].moveto(Point.mk(ps3[3],0));
  //console.log('x0',x0,'x1',x1);
  s2[1].moveto(Point.mk(ps2[0],0));
  s2[2].moveto(Point.mk(ps2[1],0));
  s3[1].moveto(Point.mk(ps3[0],0));
  s3[2].moveto(Point.mk(ps3[1],0));
  s3[3].moveto(Point.mk(ps3[2],0));
 }

rs.stepp = function ()   {
  //debugger;
  let {s2,s3,timeStep} = this;
  let iv2 = 32*3;
  let iv3 = 32*2;
  let fc2 = 2*2;
  let fc3 = 2*3;
  s2[3].moveto(Point.mk(fc2*iv2,0));
  s2[3].moveto(Point.mk(fc3*iv3,0));
  let x0 = fc2*(timeStep%iv2);
  let x1 = Math.max(fc2*((timeStep-iv2/2)%iv2),0);
  console.log('x0',x0,'x1',x1);
  s2[1].moveto(Point.mk(x0,0));
  s2[2].moveto(Point.mk(x1,0));
  x0 = fc2*(timeStep%iv3);
  x1 = Math.max(fc3*((timeStep-iv3/3)%iv3),0);
  let x2 = Math.max(fc3*((timeStep-2*iv3/3)%iv3),0);
  s3[0].moveto(Point.mk(x0,0));
  s3[1].moveto(Point.mk(x1,0));
  s3[2].moveto(Point.mk(x2,0));

}
 
 
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,40,resume);
	
}
export {rs};



