core.require(function () {
  return function (item,shape) {

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


const scalarRandomStep0 = function (current, step,rangeL,rangeH) {
  let ub = Math.min(current+step,rangeH);
  let lb = Math.max(current-step,rangeL);
  return Math.floor(lb + Math.random() * (ub - lb));
}

const scalarRandomStep = function (current, step,rangeL,rangeH) {
  let [r,g,b] = current;
  let [stepR,stepG,stepB] = step;
  let [redL,greenL,blueL] = rangeL;
  let [redH,greenH,blueH] = rangeH;
  const genRan = function (cv,step,min,max) {
    let ub = Math.min(cv+step,max);
    let lb = Math.max(cv-step,min);
    let rs =  Math.floor(lb + Math.random() * (ub - lb));
    return rs;
  }
  let rsR = genRan(r,stepR,redL,redH);
  let rsG = genRan(g,stepG,greenL,greenH);
  let rsB = genRan(b,stepB,blueL,blueH);
  return [rsR,rsG,rsB];
}



const dim2RandomStep = function (current0, current1, step,rangeL,rangeH) {
  let [r0,g0,b0] = current0;
  let [r1,g1,b1] = current1;
  let [stepR,stepG,stepB] = step;
  let [redL,greenL,blueL] = rangeL;
  let [redH,greenH,blueH] = rangeH;
  const genRan = function (cv0,cv1,step,min,max) {
    let ub = Math.min(cv0+step,cv1+step,max);
    let lb = Math.max(cv0-step,cv1-step,min);
    let rs =  Math.floor(lb + Math.random() * (ub - lb));
    return rs;
  }
  let rsR = genRan(r0,r1,stepR,redL,redH);
  let rsG = genRan(g0,g1,stepG,greenL,greenH);
  let rsB = genRan(b0,b1,stepB,blueL,blueH);
  return [rsR,rsG,rsB];
}

const dim2RandomStep0 = function (current1,current2, step,rangeL,rangeH) {
  let ub = Math.min(current1+step,current2+step,rangeH);
  let lb = Math.max(current1-step,current2-step,rangeL);
  return Math.floor(lb + Math.random() * (ub - lb));
}

item.genPixel = function (pos,color) {
   let dim = this.pixelDim;
   let rs = this.pixelP.instantiate();
   rs.width = dim+1;
   rs.height = dim+1;
   rs.fill = color;
   this.pixels.push(rs);
   rs.moveto(pos);
   rs.show();
   rs.update();
   return rs;
}
   

const indexFor = function (h,i,j) {
  return i*h+j;
}

 /* 
item.genGrid0 = function () {
  let {widthInPixels:w,heightInPixels:h,pixelDim:dim,maxStep,range,colors} = this;
  let [rangeLow,rangeHigh] = range;
  let lx = -0.5*w*dim;
  let ly = -0.5*h*dim;
  let i = 0;
  let j = 0;
  let c = Math.floor(0.5 * (rangeLow+rangeHigh));
  while (j < h) {
    let pos = Point.mk(lx+i*dim,ly+j*dim);
    let idx = indexFor(h,i,j);
    colors[idx] = c;
    let color = `rgb(${c},${c},${c}`;
    this.genPixel(pos,color);
    c = scalarRandomStep(c, maxStep,rangeLow,rangeHigh);
    j++;
  }
  i = 1;
  while (i < w) {
    let goingUp = i%2 === 1;
    j = goingUp?h-1:0;
    //while ((goingUp && (j>=0)) ||  ((!goingUp) && (j < h)) {
    while ((j>=0) && (j < h)) {
       let pos = Point.mk(lx+i*dim,ly+j*dim);
       let idx = indexFor(h,i,j);
       if ((goingUp && (j===h-1)) || ((!goingUp) && (j === 0))) {
         let lftidx = indexFor(h,i-1,goingUp?h-1:0);
         c = scalarRandomStep(colors[lftidx],maxStep,rangeLow,rangeHigh);
       
       } else {
         let lftidx = indexFor(h,i-1,j)
         let upidx = indexFor(h,i,goingUp?j+1:j-1)
         c = dim2RandomStep(colors[lftidx],colors[upidx],maxStep,rangeLow,rangeHigh);
         
       }
       colors[idx] = c;
      // let color = `rgb(${c},${c},${c}`;
       let color = `rgb(${c},${c},100)`;
       this.genPixel(pos,color);
       j = goingUp?j-1:j+1;
    }
    i++;
  }
}
*/

item.genGrid0 = function () {
  let {widthInPixels:w,heightInPixels:h,pixelDim:dim,maxStep,range,colors} = this;
  let [rangeLow,rangeHigh] = range;
  let lx = -0.5*w*dim;
  let ly = -0.5*h*dim;
  let i = 0;
  let j = 0;
  let c = Math.floor(0.5 * (rangeLow+rangeHigh));
  while (j < h) {
    let pos = Point.mk(lx+i*dim,ly+j*dim);
    let idx = indexFor(h,i,j);
    colors[idx] = c;
    let color = `rgb(${c},${c},${c}`;
    this.genPixel(pos,color);
    c = scalarRandomStep0(c, maxStep,rangeLow,rangeHigh);
    j++;
  }
  i = 1;
  while (i < w) {
    let goingUp = i%2 === 1;
    j = goingUp?h-1:0;
    //while ((goingUp && (j>=0)) ||  ((!goingUp) && (j < h)) {
    while ((j>=0) && (j < h)) {
       let pos = Point.mk(lx+i*dim,ly+j*dim);
       let idx = indexFor(h,i,j);
       if ((goingUp && (j===h-1)) || ((!goingUp) && (j === 0))) {
         let lftidx = indexFor(h,i-1,goingUp?h-1:0);
         c = scalarRandomStep0(colors[lftidx],maxStep,rangeLow,rangeHigh);
       
       } else {
         let lftidx = indexFor(h,i-1,j)
         let upidx = indexFor(h,i,goingUp?j+1:j-1)
         c = dim2RandomStep0(colors[lftidx],colors[upidx],maxStep,rangeLow,rangeHigh);
         
       }
       colors[idx] = c;
      // let color = `rgb(${c},${c},${c}`;
       let color = `rgb(${c},${c},100)`;
       this.genPixel(pos,color);
       j = goingUp?j-1:j+1;
    }
    i++;
  }
}


item.genShades1 = function () {
  let {widthInPixels:w,heightInPixels:h,pixelDim:dim,maxStep,rangeL,rangeH,colors,combo} = this;
  let [redL,greenL,blueL] = rangeL;
  let [redH,greenH,blueH] = rangeH;
  let lx = -0.5*w*dim;
  let ly = -0.5*h*dim;
  let i = 0;
  let j = 0;
  let c = [Math.floor(0.5*(redL+redH)),Math.floor(0.5*(greenL+greenH)),Math.floor(0.5*(blueL+blueH))];
  while (j < h) {
    let pos = Point.mk(lx+i*dim,ly+j*dim);
    let idx = indexFor(h,i,j);
    colors[idx] = c;
    let rgb = color2rgb(c,combo);
    this.genPixel(pos,rgb);
    c = scalarRandomStep(c, maxStep,rangeL,rangeH);
    j++;
  }
  i = 1;
  while (i < w) {
    let goingUp = i%2 === 1;
    j = goingUp?h-1:0;
    //while ((goingUp && (j>=0)) ||  ((!goingUp) && (j < h)) {
    while ((j>=0) && (j < h)) {
       let pos = Point.mk(lx+i*dim,ly+j*dim);
       let idx = indexFor(h,i,j);
       if ((goingUp && (j===h-1)) || ((!goingUp) && (j === 0))) {
         let lftidx = indexFor(h,i-1,goingUp?h-1:0);
         c = scalarRandomStep(colors[lftidx],maxStep,rangeL,rangeH);
       
       } else {
         let lftidx = indexFor(h,i-1,j)
         let upidx = indexFor(h,i,goingUp?j+1:j-1)
         c = dim2RandomStep(colors[lftidx],colors[upidx],maxStep,rangeL,rangeH);
         
       }
       colors[idx] = c;
      // let color = `rgb(${c},${c},${c}`;
       if (this.genGrid) {
        let rgb = color2rgb(c,combo);
        this.genPixel(pos,rgb);
       }
       j = goingUp?j-1:j+1;
    }
    i++;
  }
}


/*
item.genGrid1 = function () {
  let {widthInPixels:w,heightInPixels:h,pixelDim:dim} = this;
  let lx = -0.5*w*dim;
  let ly = -0.5*h*dim;
  for (i=0;i<w;i++) {
    for(j=0;j<h;j++) {
      let pos = Point.mk(lx+i*dim,ly+j*dim);
      let c = Math.floor(Math.random() * 255);
      let color = `rgb(${c},${c},${c}`;
      this.genPixel(pos,color);
    }
  }
}

*/ 
  
}
});