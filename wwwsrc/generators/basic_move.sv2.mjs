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
let wd = 200;

let topParams = {width:wd,height:wd,dropTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10,numTimeSteps:400}

Object.assign(rs,topParams);


rs.initProtos = function () {
	this.lineP = linePP.instantiate();
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .3;	
  this.rectP = rectPP.instantiate();
	this.rectP.stroke = 'yellow';
	this.rectP['stroke-width'] = .3;
  this.rectP.width = 100;
  this.rectP.height= 100;
}  
rs.addRects = function (nm,n,dim) {
  let ornt = nm[0];
  let shapes = this.set(nm,core.ArrayNode.mk());
  for (let i=0;i<n;i++) {
    let shape = this.rectP.instantiate();
     if (ornt === 'v') {
       shape.height =  dim;
     } else {
       shape.width = dim;
     }
     const rshade = () => Math.floor(254*Math.random());
     const rcolor = () => `rgba(${rshade()},${rshade()},${rshade()},0.4)`;
     shape.fill = rcolor();
     shapes.push(shape);
     shape.hide();
  }
}
     
     

rs.addShapes = function (nm,n,dim) {
  let shapes = this.set(nm,core.ArrayNode.mk());
  for (let i=0;i<n;i++) {
    if ((n === 7) && ((i===0) || (i===4))) {
      shapes.push(null);
      continue;
    } else {
      let shape = this.lineP.instantiate()
      let hdim = dim/2;
      let ornt = nm[0];
      if (ornt === 'h') {
        shape.setEnds(Point.mk(0,-hdim),Point.mk(0,hdim));
      } else {
        shape.setEnds(Point.mk(-hdim,0),Point.mk(hdim,0));
      }
      shapes.push(shape);
      shape.show();
    }
  }
}
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initProtos(); 
  let dim = this.dim =  32*3*2*2;
  let hdim = dim/2;
	this.addBackStripe();
	this.addShapes('h2',6,dim);
	this.addShapes('v2',6,dim);
	this.addShapes('h3',7,dim);
	this.addShapes('v3',7,dim);
  this.addRects('vr',10,dim);
  let left = Point.mk(-hdim,0);
  let top = Point.mk(0,-hdim);
  let right = Point.mk(hdim,0);
  let bottom = Point.mk(0,hdim);
  this.h2[0].moveto(left);
  this.v2[0].moveto(top);
  this.h2[4].moveto(right); 
  this.v2[4].moveto(bottom); 
//  this.s3[0].moveto(Point.mk(-dim/2,0));
 // this.s3[4].moveto(Point.mk(dim/2,0));
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
  rs.push(-hdim);
  if (i === 3) {
    rs.push(Math.max(fc*((timeStep-2*iv/3)%iv),0)-hdim);
  }
  rs.push(Math.max(fc*((timeStep-iv/i)%iv),0)-hdim);
  rs.push(fc*(timeStep%iv)-hdim);
  rs.push(fc*iv-hdim);
  rs.push(hdim);
  const compare = function (a,b) {
    if (a < b) {return -1};
    if (a === b) {return 0};
    return 1;
  }
  let aa = [43,100,210]
  aa.sort(compare);
	  rs.sort(compare);
  if (i===3) {
    console.log(rs[0],rs[1],rs[2],rs[3],rs[4]);
  }
  return rs;
}

rs.moveRect = function (nm,psa,n) {
  debugger;
  let ra = this[nm][n];
  let hdim = (this.dim)/2;
  if (n >(psa.length - 1)) {
    debugger;
  }
  let pslow = psa[n];
  let pshigh = psa[n+1];
  //if (pslow > pshigh) {
  //  pshigh = hdim;
 // }
  let pslownn = Math.max(-hdim,pslow);
  /*if (pshigh <= -hdim) {
    ra.hide();
    return;
  } else {
    ra.show();
  }   */ 
  let vrwh = pshigh - pslow;
  let vrp = (pshigh + pslow)/2;
  console.log('n',n,'pslow',pslow,'pshigh',pshigh,'vrp',vrp,'vrhw',vrwh);
  if (vrwh === 0) {
    ra.hide();
  } else {
    ra.show();
    ra.moveto(Point.mk(vrp,0));
    ra.width = vrwh;
    ra.update();
  }
}
  

rs.step = function () {
 // debugger;
  let {h2,h3,v2,v3,vr,hrtimeStep} = this;
  let ps2 = this.computePositions(2);
  let ps3 = this.computePositions(3);
 /* let all = ps2.concat(ps2,ps3);
  all.sort();
  let vrw0 = ps2[1] - ps2[0];
  let vrp0 = (ps2[1] + ps2[0])/2;
  vr[0].moveto(Point.mk(vrp0,0));
  vr[0].width = vrw0;*/
  //this.moveRect('vr',ps2,0);
  //this.moveRect('vr',ps2,1);
  //ps3.sort();
  for (let i=0;i<5;i++) {  
    this.moveRect('vr',ps3,i);
    if (i<4) {
      this.moveRect('vr',ps2,i);
    }
  }
  
  //s2[3].moveto(Point.mk(ps3[3],0));
  //console.log('x0',x0,'x1',x1);
  for (let i=1;i<3;i++) {
    h2[i*2-1].moveto(Point.mk(ps2[i],0));
    v2[i*2-1].moveto(Point.mk(0,ps2[i]));  
    h2[i*2].moveto(Point.mk(ps3[i],0));
    v2[i*2].moveto(Point.mk(0,ps3[i]));
  }
  h2[5].moveto(Point.mk(ps3[3],0));
  v2[5].moveto(Point.mk(0,ps3[3]));
 /*     v2[1].moveto(Point.mk(0,ps2[i]));

  h2[2].moveto(Point.mk(ps2[1],0));
  v2[2].moveto(Point.mk(0,ps2[1]));
  h3[1].moveto(Point.mk(ps3[0],0));
  v3[1].moveto(Point.mk(0,ps3[0]));
  h3[2].moveto(Point.mk(ps3[1],0));
  v3[2].moveto(Point.mk(0,ps3[1]));
  h3[3].moveto(Point.mk(ps3[2],0));
  v3[3].moveto(Point.mk(0,ps3[2]));*/
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
	this.animateIt(this.numTimeSteps,100,resume);
	
}
export {rs};



