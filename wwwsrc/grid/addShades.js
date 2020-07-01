core.require(function () {
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



item.genPixel = function (pos,color) {
   let dim = this.pixelDim;
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
   

item.indexFor = function (i,j) {
  return i*(this.numRows)+j;
}

item.shadeAt = function (i,j) {
  return this.shades[this.indexFor(i,j)];
}
    

 

item.genShades = function () {
  let {numCols:w,numRows:h,pixelDim:dim,maxStep,rangeL,rangeH,shades,combo} = this;
  let [redL,greenL,blueL] = rangeL;
  let [redH,greenH,blueH] = rangeH;
  let lx = -0.5*w*dim;
  let ly = -0.5*h*dim;
  let i = 0;
  let j = 0;
  let c = [Math.floor(0.5*(redL+redH)),Math.floor(0.5*(greenL+greenH)),Math.floor(0.5*(blueL+blueH))];
  while (j < h) {
    let idx = this.indexFor(i,j);
    shades[idx] = c;
    if (this.pixels) {
      let pos = Point.mk(lx+i*dim,ly+j*dim);
      let rgb = this.shade2rgb(c);
      this.genPixel(pos,rgb);
    }
    c = scalarRandomStep(c, maxStep,rangeL,rangeH);
    j++;
  }
  i = 1;
  while (i < w) {
    let goingUp = i%2 === 1;
    j = goingUp?h-1:0;
    //while ((goingUp && (j>=0)) ||  ((!goingUp) && (j < h)) {
    while ((j>=0) && (j < h)) {
       let idx = this.indexFor(i,j);
       if ((goingUp && (j===h-1)) || ((!goingUp) && (j === 0))) {
         let lftidx = this.indexFor(i-1,goingUp?h-1:0);
         c = scalarRandomStep(shades[lftidx],maxStep,rangeL,rangeH);
       
       } else {
         let lftidx = this.indexFor(i-1,j)
         let upidx = this.indexFor(i,goingUp?j+1:j-1)
         c = dim2RandomStep(shades[lftidx],shades[upidx],maxStep,rangeL,rangeH);
         
       }
       shades[idx] = c;
      // let color = `rgb(${c},${c},${c}`;
       if (this.pixels) {
        let pos = Point.mk(lx+i*dim,ly+j*dim);
        let rgb = this.shade2rgb(c);
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