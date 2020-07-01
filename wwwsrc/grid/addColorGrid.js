
core.require(function () {
  return function (item,shape) {
/*adjustable parameters  */

item.numRows= 31;
item.numRows = 11;
item.numCols = 11;
item.width = 100;
item.height = 100;
item.deltaX = 5;
item.deltaY = 2;
item.colorRangeL = [100,100,100];
item.colorRangeH = [200,200,200]
item.colorStep = [25,15,10];
item.colorStart = [150,150,150];


  
  

let points = [];
let colors = [];

//points have coords (0 <= i <= numRows,0 <= j <= numCols),  index =  j*(numRows+1) + i;
//cells have coords (0 <= i < numRows,0 <= j < numCols),  index =  j*numRows + i;

item.pcoordToIndex  = function (p) {
  return p.x * (this.numRows+1)+p.y;
}

item.pcoordToPoint  = function (p) {
  let c = this.pcoordToIndex(p);
  return this.points[c];
}	

item.pcoordToColor  = function (p) {
  let c = this.pcoordToIndex(p);
  return this.colors[c];
}

item.cellCoordToIndex  = function (p) {
  return p.x * (this.numRows)+p.y;
}

item.cellCornerPcoords = function (cell) {
  let {x,y} = cell;
  let UL = Point.mk(x,y);
  let UR= Point.mk(x+1,y);
  let LL = Point.mk(x,y+1);
  let LR = Point.mk(x+1,y+1);
  return [UL,UR,LL,LR];
  
}

item.cellCornerPoints = function (cell) {
  let coords = this.cellCornerPcoords(cell);
  return coords.map((p) => this.pcoordToPoint(p));
}



item.cellCornerColors = function (cell) {
  let coords = this.cellCornerPcoords(cell);
  return coords.map((p) => this.pcoordToColor(p));
}


item.color2rgb = function (c) {
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}


const interpolateColor  = function (x,xs,xe,cs,ce) {
  let fr = (x-xs)/(xe - xs);
  let c0 = cs[0] + fr*(ce[0] - cs[0]);
  let c1 = cs[1] + fr*(ce[1] - cs[1]);
  let c2 = cs[2] + fr*(ce[2] - cs[2]);
  if (c2 > 100) {
    debugger;
  }
  return [c0,c1,c2];
}

item.addColor = function (c,c1) {
  let r = Math.max(0,Math.min(c[0] + c1[0],255));
  let g = Math.max(0,Math.min(c[1] + c1[1],255));
  let b = Math.max(0,Math.min(c[2] + c1[2],255));
  return [r,g,b];
}

const scalarRandomStep = function (current,step,withinRangeL,withinRangeH) {
  let r = current + step * Math.random();
  if (step > 0) {
     if (r > withinRangeH) {
       r = withinRangeH - (r  - withinRangeH);
       step = -step;
     } 
  } else {
    if (r < withinRangeL) {
       r = withinRangeL + (withinRangeL -r);
       step = -step;
     } 
  }
  return [r,step];
}

item.randomWalkStep = function () {
  let [red,redStep] = scalarRandomStep(this.randomColor[0],this.colorStep[0],this.colorRangeL[0],this.colorRangeH[0]);
  let [green,greenStep] = scalarRandomStep(this.randomColor[1],this.colorStep[1],this.colorRangeL[1],this.colorRangeH[1]);
  let [blue,blueStep] = scalarRandomStep(this.randomColor[2],this.colorStep[2],this.colorRangeL[2],this.colorRangeH[2]);
  this.randomColor[0] = red;
  this.randomColor[1] = red;
  this.randomColor[2] = blue;
  this.colorStep[0] = redStep
  this.colorStep[1] = greenStep;
  this.colorStep[2] = blueStep;
}

item.randomColorWalk = function () {
  let {colors,colorStart} = this;
  this.set('randomColor',core.ArrayNode.mk(colorStart));
  let n = colors.length;
  for (i = 0;i<n;i++) {
    colors.set(i,core.ArrayNode.mk(this.randomColor));
    this.randomWalkStep();
  }
}
  
  
  
item.interpolateColor1 = function (p,cell) {
  let cornerPoints = this.cellCornerPoints(cell);
  let cornerColors = this.cellCornerColors(cell);
  let UL = cornerPoints[0];
  let UR = cornerPoints[1];
  let LL = cornerPoints[2];
  let LR = cornerPoints[3];
  let ULC = cornerColors[0];
  let URC = cornerColors[1];
  let LLC = cornerColors[2];
  let LRC = cornerColors[3];
  // first interpolate on vertical sides
  let left = interpolateColor(p.y,UL.y,LL.y,ULC,LLC);
  let right = interpolateColor(p.y,UR.y,LR.y,URC,LRC);
  
  // now intepolate between these side points
  let rs = interpolateColor(p.x,UL.x,UR.x,left,right);
  return rs;
}
    
item.inWhichCell = function (p) {
  let {x,y} = p;
  let {width,height,numRows,numCols} = this;
  let hwd = -0.5*width;
  let hht = -0.5*height;
  let cx = Math.min(Math.floor((x-hwd)*numCols/width),numCols-1);
  let cy = Math.min(Math.floor((y-hht)*numRows/height),numRows-1);
  return Point.mk(cx,cy);
}

item.interpolateColor = function (p) {
  let cell = this.inWhichCell(p);
  return this.interpolateColor1(p,cell);
}


const defaultPositionFunction = function (grid,i,j) {
  let {deltaX,deltaY,width,height} = grid;
 /* let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let botx = -0.5 * xdim;
  let boty = 0.5 * ydim + yoffset;*/
  return Point.mk(-0.5*width + j*deltaX,-0.5*height+ i*deltaY);
}

const genPointsFunction0 = function (grid) {
  let {numRows,numCols,width,height,positionFunction,points,ywander,deltaX} = grid;
  let pf = positionFunction?positionFunction:defaultPositionFunction;
  //let cy = grid.bendCircleY;
  for (let j = 0;j <= numCols; j++) {
    for (let i = 0;i <= numRows; i++) {
      let p = pf(grid,i,j);
      points.push(p);
    }
  }
}
      
const genColorsFunction0 = function (grid) {
  let {numRows,numCols} = grid;    
  grid.colors.length = (numRows+1) * (numCols+1);
}


item.initializeGrid = function () {
  let ywander = this.ywander;
  let {points,colors,numRows,numCols,width,height,genPointsFunction,genColorsFunction} = this;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  colors = this.set('colors',core.ArrayNode.mk()); 
  this.deltaX = width/numCols;
  this.deltaY = height/numRows;
  let gp = genPointsFunction?genPointsFunction:genPointsFunction0;
  let gc = genColorsFunction?genColorsFunction:genColorsFunction0;
  gp(this);
  gc(this);

}
}
});

      

