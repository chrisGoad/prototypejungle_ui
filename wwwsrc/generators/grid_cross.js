
//core.require('/gen1/grid0_6.js',
core.require('/line/line.js','/shape/circle.js','/generators/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (linePP,circlePP,rs,addGridMethods,addRandomMethods)	{ 


	rs.setName('grid_sized');
  addGridMethods(rs);
  addRandomMethods(rs);
let nr = 140;
nr = 100;
let wd = 1000;
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:10,delta:(wd*0.8)/nr,backgroundColor:'black',randomizeOrder:1};//'rgb(0,150,255)'};
Object.assign(rs,topParams);

const pointAlongL = function (startPnt,turningPnt,x,ts,lineP,llines) {
  let {x:tx,y:ty} = turningPnt;
  let sx = startPnt.x;
  let d = tx-sx;
  let p;
  if (x <= 0.5) {
    p = Point.mk(sx + 2*d*x,ty);
  } else {
    p = Point.mk(tx,ty - 2*d*(x-0.5));
  }
  let line = lineP.instantiate().show();
  line.setEnds(startPnt,turningPnt);
 // llines.push(line);
  /*if (ts) {
    return turningPnt;
  } else {
    return startPnt;
  }*/
  return p;
}

rs.positionFunction = function (i,j) {
  
  let {width,numRows,delta} = this;
  debugger;
  let ci = numRows - i - 1;
  let hw = 0.5*width;
  let sp = Point.mk(-hw,hw-i*delta);
  let tp = Point.mk(hw-i*delta,hw-i*delta);
  let x = j/(numRows-1)
  let p = pointAlongL (sp,tp,x,(i+j)%2,this.lineP,this.llines);
  return p;
}
    
     
rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP['stroke-width'] = 0;
  circlePP.stroke = 'blue';
  circleP.dimension = 30;
  circleP.fill = 'rgba(255,255,0,0.4)';
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 1;
  lineP.stroke = 'blue';
}
let scale = 15;

rs.shapeGenerator = function (rvs,cell) {
  debugger;
  let {numRows,numCols} = this;
  let hr = numRows/2;
  let hc = numCols/2;
  let {x,y} = cell;
  let cdx = Math.abs((x-hr)/hr);
  let cdy = Math.abs((y-hc)/hc);
  let cdist =  Math.sqrt(cdx*cdx+cdy*cdy);
  
  let level = Math.floor(rvs.level);
  let opacity = level/255;
  //opacity = level/255;
  let {shapes,circleP} = this;
  let shape = this.circleP.instantiate().show();
  shape.dimension = scale*cdist;//+ 5;
  this.shapes.push(shape);
  //shape.fill = `rgba(${level},${level},${level},${opacity})`;
  return shape;
}

rs.initialize = function () {
  this.initProtos();
  this.addBackground();
  this.setupShapeRandomizer('level', {step:30,min:0,max:255});
  this.set('llines',core.ArrayNode.mk());
  this.initializeGrid(); 
}

return rs;


});

