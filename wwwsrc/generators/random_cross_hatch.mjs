//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
import {rs as addAnimateMethods} from '/mlib/animate.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);	
addAnimateMethods(rs);	
rs.setName('random_cross_hatch');
let rdim = 1;
rs.initProtos = function () {
	rs.rectP  = rectPP.instantiate();
	rs.rectP.fill = 'red';
	rs.rectP.fill = 'white';
	//rs.rectP.fill = 'rgba(55,55,55,0.6)';
	//rs.rectP.fill = 'red';
	rs.rectP['stroke-width'] = 0;
	rs.rectP.width = rdim;
	rs.rectP.height = rdim;
  rs.blineP  = linePP.instantiate();
  rs.blineP['stroke-width'] = 0.4;
  rs.blineP.stroke = 'cyan';
  rs.blineP.stroke = 'white';

}  

rs.mkStripe = function (i,j,ornt,minWd,maxWd) {
debugger;
   let {width:wd,height:ht,numRows:nr,numCols:nc} = this;
  let deltaX = wd/nc;
  let deltaY = ht/nr;
  let delta = maxWd;
  let v = ornt === 'vertical';
  let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,j);
  let rv = rvs.v;//*0.001;
  console.log('i',i,'j',j,'rv',rv);
  let dim = Math.max(rv*delta,0);
  //let dim = maxWd;
  let stripe = this.rectP.instantiate();
  stripe.width = v?(minWd + dim):deltaX;
  stripe.height = v?deltaY:(minWd + dim);
  let xp = (i/nc) * wd-0.5*wd;
  let yp = (j/nr) * ht-0.5*ht
  let pos =  Point.mk(xp,yp);
  //let pos = v? Point.mk((i/nc) * wd-0.5*wd,Point.mk((j/nr)*ht - 0.5*ht):Point.mk((i/nc) * wd-0.5*wd,(j/nr) * ht-0.5*ht)
  this.set((v?'v':'h')+'stripe'+i+'_'+j,stripe);
  stripe.moveto(pos);
  stripe.fill = 'white';
 // this.updateStripes(n,ornt,minWd,maxWd);
 }
    
rs.mkStripes = function (minWd,maxWd) {
  let {numRows:nr,numCols:nc} = this;
  for (let i=0;i<nc;i++) {
   for (let j=0;j<nr;j++) {
     this.mkStripe(i,j,'horizontal',minWd,maxWd);
     this.mkStripe(i,j,'vertical',minWd,maxWd);
   }
  }
 this.updateStripes(minWd,maxWd);
}
         
        

 

rs.updateStripe = function (i,j,ornt,minWd,maxWd) {
debugger;
   let {width:wd,height:ht,numRows:nr,numCols:nc} = this;
  // console.log('maxWd',maxWd);
  let deltaX = wd/nc;
  let deltaY = ht/nr;
  let delta = maxWd;// - minWd;
  let v = ornt === 'vertical';
  let rw = v?0:1;
  let stripe = this[(v?'v':'h')+'stripe'+i+'_'+j];
 // let rvs = this.randomValuesAtCell(this.randomGridsForShapes,i,j);
  let rvs = this.randomValuesAtCell(this.randomGridsForShapes,v?j:i,rw);  
  let rv = rvs.v;
  let dim = Math.max(rv*maxWd,0);
  console.log('i',i,'j',j,'rv',rv);

  //let dim = maxWd;
  stripe.width = v?(minWd + dim):deltaX;
  stripe.height = v?deltaY:(minWd + dim);
  
 
  //let pos = v? Point.mk((i/n) * wd-0.5*wd,0):Point.mk(0,(i/n) * ht-0.5*ht)
  //stripe.moveto(pos);
}


rs.updateStripes = function (minWd,maxWd) {
  let {numRows:nr,numCols:nc} = this;
  for (let i=0;i<nc;i++) {
   for (let j=0;j<nr;j++) {
     this.updateStripe(i,j,'horizontal',minWd,maxWd);
     this.updateStripe(i,j,'vertical',minWd,maxWd);
   }
  }
}
    

let nmr = 20;
let wd = 200;
let topParams;

topParams = {numRows:nmr,numCols:nmr,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:40,backStripePadding:0.15*wd,numTimeSteps:100};


Object.assign(rs,topParams);


rs.initialize = function () {
  debugger;
  let {width:wd,height:ht,numRows:nr,numCols:nc} = this;

  this.initProtos();
  core.root.backgroundColor = 'black';
  let frmin =-0.003;
  let frmax =0.005;;
  let fr  = 0.001;
  //this.setupShapeRandomizer('v',{step:10,stept:10,min:0,max:100});
 // this.setupShapeRandomizer('v',{step:fr*10,stept:fr*10,min:-fr*100,max:0.9*fr*100});
  //this.setupShapeRandomizer('v',{step:fr*10,stept:fr*10,min:-frmin*100,max:0.9*frmax*100});
  this.setupShapeRandomizer('v',{step:.20,stept:.10,min:-1,max:1});
  //this.setupShapeRandomizer('v',{step:fr*10,stept:fr*10,min:-fr*100,max:0.9*fr*100});
   let fc = 0.2;
  this.mkStripes(0,fc*wd/nr);

this.addBackStripe();
}



rs.step = function ()   {
	debugger;
     let {width:wd,height:ht,numCols:nc,timeStep:ts,numTimeSteps:nts} = this;

	this.stepShapeRandomizer('v');
  let fr =  1- ts/nts;///+0.1;
   this.updateStripes(0,fr*wd/50);
   this.updateStripes(0,fr*ht/50);


 }
 
 
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume);
	
}
export {rs};


