
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as bendP} from '/generators/grid_bend.mjs';
import {rs as fanP} from '/generators/grid_fan.mjs';
//core.require('/generators/grid_bend.js','/shape/circle.js','/generators/grid_fan.js',
//function (circlePP,rectPP,basicP,addGridMethods,bendP)	{ 


debugger;
let rs = basicP.instantiate();
//let rs = svg.Element.mk('<g/>');
rs.setName('grid_bends');

let nr = 140;
//nr = 20;
let wd = 1000;
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:10,delta:(wd*0.8)/nr,backgroundColor:'blue',randomizeOrder:1,fromLeft:1,up:0};

rs.addGrid = function (nm,fromLeft,turnUp) {
  debugger;
  let g = bendP.instantiate();
    Object.assign(g,topParams);
  g.backgroundColor = 'black';
  g.fromLeft = fromLeft;
  g.turnUp = turnUp;
  this.set(nm,g);
  g.initialize();
  return g;
}

/*
const pointAlongL = function (startPnt,endPnt,x) {
  let vec = endPnt.difference(startPnt);
  let p = startPnt.plus(vec.times(x));
  console.log('p ',p.x,p.y);
  return p;
}


const fanPositionFunction = function (grid,i,j) {
  let {width,height,numRows,delta,fromLeft,up} = grid;
  if ((i===1) &&(j===1)) {
    debugger;
  }
  let ci = numRows - i - 1;
  let hw = 0.5*width;
  let hh = 0.5*height;
  let sp = (fromLeft)?(up?Point.mk(-hw,hh):Point.mk(-hw,-hh)):(up?Point.mk(hw,hh):Point.mk(hw,-hh));
  let np = (fromLeft)?(up?Point.mk(hw,hh):Point.mk(hw,-hh)):(up?Point.mk(-hw,hh):Point.mk(-hw,-hh));
  let lep = (fromLeft)?(up?Point.mk(hw,-hh):Point.mk(hw,hh)):(up?Point.mk(-hw,-hh):Point.mk(-hw,hh));
  let vec = lep.difference(np);
  let ep = np.plus(vec.times(i/(numRows-1)));
  console.log('i j',i,j);
  let p = pointAlongL(sp,ep,j/(numRows-1));
  return p;
}
*/

     
rs.initProtos = function () {	
  let rectP = this.set('rectP',rectPP.instantiate()).hide();
  rectP['stroke-width'] = 0;
//  rectP.stroke = 'blue';
//  rectP.stroke = 'black';
  let wd = 200;
  rectP.width = wd;
  rectP.height = wd;
 // rectP.fill = 'rgba(255,255,0,1)';
  rectP.fill = 'blue';
 // rectP.fill = 'black';
 
}   

/*     
const bothInitProtos = function (grid) {	
  let circleP = grid.set('circleP',circlePP.instantiate()).hide();
  circleP['stroke-width'] = 0;
  circlePP.stroke = 'blue';
  circleP.dimension = 30;
  circleP.fill = 'rgba(255,255,0,0.4)';
 
}   
let scale = 10;


const bothShapeGenerator = function (grid,rvs,cell) {
  debugger;
  let {numRows,numCols} = grid;
  let hr = numRows/2;
  let hc = numCols/2;
  let {x,y} = cell;
  let cdx = Math.abs((x-hr)/hr);
  let cdy = Math.abs((y-hc)/hc);
  let cdist =  Math.sqrt(cdx*cdx+cdy*cdy);
  
  let level = Math.floor(rvs.level);
  let opacity = level/255;
  let {shapes,circleP} = grid;
  let shape = grid.circleP.instantiate().show();
  shape.dimension = scale*cdist;//+ 5;
  grid.shapes.push(shape);
  return shape;
}


const bothInitialize = function (grid) {
  grid.initProtos();
  grid.addBackground();
  grid.setupShapeRandomizer('level', {step:30,min:0,max:255});
  grid.set('llines',core.ArrayNode.mk());
  grid.initializeGrid(); 
}
 */
 
rs.addFan = function (nm,fromLeft,up) {
  debugger;
  let f = fanP.instantiate();
    Object.assign(f,topParams);

  f.fromLeft = fromLeft;
  f.up = up;
   f.height = 0.78*f.width;
  f.width = 0.78*f.width;
  f . backgroundColor = 'blue';
  this.set(nm,f);
  f.initialize();
  return f;
  }
/*
rs.addFan = function (nm,fromLeft,up) {
  debugger;
  let f = basicP.instantiate();
  addGridMethods(f);;
  Object.assign(f,topParams);
  f . backgroundColor = 'blue';
  f.fromLeft = fromLeft;
  f.up = up;
  f.height = 0.78*f.width;
  f.width = 0.78*f.width;
  this.set(nm,f);
  f.positionFunction = (i,j) => fanPositionFunction(f,i,j);
  f.shapeGenerator = (rvs,cell) => bothShapeGenerator(f,rvs,cell);
  bothInitialize(f);
  return f;
}
*/

rs.initialize = function () {
  //this.addBackground();
  debugger;
  core.root.backgroundColor = 'blue';
  this.initProtos();
  let fwd  = topParams.width;
  let mv = 0.4*fwd;
  Object.assign(this,{'width':1.85*fwd,'height':1.85*fwd,backStripeColor:'rgb(2,2,255)',backStripeVisible:0});
  let g00 = this.addGrid('g00',0,0);
  g00.moveto(Point.mk(-mv,-mv));
  let g01 = this.addGrid('g01',1,1);
   g01.moveto(Point.mk(mv,mv));
  let f01 = this.addFan('f01',0,1);
  f01.moveto(Point.mk(1.24*mv,-1.24*mv));
  let f10 = this.addFan('f10',1,0);
  f10.moveto(Point.mk(-1.24*mv,1.24*mv));
    let rect = this.set('rect',this.rectP.instantiate().show());
   /* let rect2 = this.set('rect2',this.rectP.instantiate().show());
    rect2.fill = 'black';
    let r2wd = 100;
    rect2.width = r2wd;
    rect2.height= r2wd;*/
  this.addBackStripe();



}

export {rs};

