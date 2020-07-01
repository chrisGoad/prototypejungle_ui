OBSOLETE core.require(function () {
  return function (item) {
/*
const color2rgb = function (ic,combo) {
  let [r,g,b] = ic;
  let c;
  if (combo === 'none') {
    c = [r,g,b];
  } else if (combo === 'white') {
     c = [r,r,r];
  } else if (combo === 'yellow') {
    c = [r,r,0];
  } else if (combo === 'magenta') {
    c = [r,0,r];
  } else if (combo === 'cyan') {
    c = [0,g,g];
  }
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}

*/



const scalarRandomStep = function (c,step,min,max) {
  let ub = Math.min(c+step,max);
  let lb = Math.max(c-step,min);
  let rs =  lb + Math.random() * (ub - lb);
  return rs;
}


const dim2randomStep = function (x, y, step,min,max) {
  let ub = Math.min(x+step,y+step,max);
  let lb = Math.max(x-step,y-step,min);
  let rs =  lb + Math.random() * (ub - lb);
  //let rs = (irs > 0.5*(min+max))?Math.min(max,irs+bias):Math.max(min,irs-bias);
  if (isNaN(rs)) {
    debugger;
  }
  return rs;
}

   

item.indexFor = function (numRows,i,j) {
  let idx = i*numRows+j;
  return idx;
}

item.valueAt = function (grid,i,j) {
  let numRows = grid.numRows;
  return grid.values[this.indexFor(numRows,i,j)];
}
    

 

item.genRandomGrid = function (numCols,numRows,step,min,max) {
  //let {numCols:w,numRows:h} = this;
  let values = [];
  let rs = {numCols:numCols,numRows:numRows,values:values};
  let n = numCols * numRows;
  values.length = n;
  let i = 0;
  let j = 0;
  let c = 0.5*(min+max);
  //let c = 20;
  while (j < numRows) {
    let idx = this.indexFor(numRows,i,j);
    values[idx] = c;
    c = scalarRandomStep(c, step,min,max);
    j++;
  }
  i = 1;
  while (i < numCols) {
    let goingUp = i%2 === 0; //means  j is going up
    //j = goingUp?numRows-1:0;
    j = goingUp?0:numRows-1;
    //c = i*30;
    //while ((goingUp && (j>=0)) ||  ((!goingUp) && (j < numRows)) {
    let firstJ = true;
    while ((j>=0) && (j < numRows)) {
       let idx = this.indexFor(numRows,i,j);
      // if ((goingUp && (j===numRows-1)) || ((!goingUp) && (j === 0))) {
       if (firstJ){
         let lftidx = this.indexFor(numRows,i-1,goingUp?0:numRows-1);
         c = scalarRandomStep(values[lftidx],step,min,max);
         //c = c+20;//scalarRandomStep(values[lftidx],step,min,max);
       
       } else {
         let lftidx = this.indexFor(numRows,i-1,j)
         let upidx = this.indexFor(numRows,i,goingUp?j-1:j+1)
         c = dim2randomStep(values[lftidx],values[upidx],step,min,max);
         
       }
       values[idx] = c;
      // let color = `rgb(${c},${c},${c}`
       j = goingUp?j+1:j-1;
       firstJ = false;
    }
    i++;
  }
  return rs;
}

item.genShadeGrid = function (params) {
  let {rangeL,rangeH,maxStep,numRows,numCols} = params;
  /*this.red = [];
  this.green = [];
  this.blue = [];
  let n = this.numRows * this.numCols;
  this.red.length = n;
  this.green.length = n;
  this.blue.length = n;*/
  var rs = {numRows:numRows,numCols:numCols}
  rs.red = this.genRandomGrid(numCols,numRows,maxStep[0],rangeL[0],rangeH[0]).values;
  rs.green = this.genRandomGrid(numCols,numRows,maxStep[1],rangeL[1],rangeH[1]).values;
  rs.blue = this.genRandomGrid(numCols,numRows,maxStep[2],rangeL[2],rangeH[2]).values;
  return rs;
}


item.shadeAtIndex = function (grid,idx) {
  return [Math.floor(grid.red[idx]),Math.floor(grid.green[idx]),Math.floor(grid.blue[idx])];
}

item.shadeAt = function (grid,i,j) {
  let idx = this.indexFor(grid.numRows,i,j);
  return this.shadeAtIndex(grid,idx);
}

/* so far, this file has only been container of functions. Now it's a holder for pixels too. */


item.genPixel = function (pos,color,dim) {
   let rs = this.pixelP.instantiate();
   this.setPixelDim(rs,dim);
   //rs.width = dim+1;
   //rs.height = dim+1;
   rs.fill = color;
   rs.stroke = color;
   this.pixels.push(rs);
   rs.moveto(pos);
   rs.show();
   rs.update();
   return rs;
}
   
item.genPixels = function (params) {
  let {rangeL,rangeH,maxStep,numRows,numCols,pixelDim} = params;
  let shades = this.genShadeGrid(params);
  this.set('pixels',core.ArrayNode.mk());
  let width = pixelDim * numCols;
  let height = pixelDim * numRows;
  let lx = -0.5*width;
  let ly = -0.5*height;
  let deltaX = width/(numCols-1);
  let deltaY = height/(numRows-1);
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let p = Point.mk(lx + i*deltaX,ly +j*deltaY);
      let shd = this.shadeAt(shades,i,j);
      let rgb = this.shade2rgb(shd);
      this.genPixel(p,rgb,pixelDim);
    }
  }
}





}   
});