core.require(function () {
  return function (item) {	

//i = "initial" c = "convergence"
item.adjustForConvergence = function (iValue,lb,ub,i,j) {
	
	if (!this.convergenceFactor) {
		return iValue;
	}
  let cFactor = this.convergenceFactor(i,j);
	if (cFactor === 1) {
		debugger;
	}
  let cValue = this.convergenceValue(i,j);
	let rs,target;
	if (cValue > iValue) {
		target = Math.min(cValue,ub);
		rs = iValue + cFactor * (target - iValue);
	} else {
		target = Math.max(cValue,lb);
		rs = iValue + cFactor * (target - iValue);
	}
	return rs;
}


item.randomStep = function (x,y,istepx,istepy,imin,imax,i,j) {
	let min,max,stepx,stepy,lb,ub,rs;
	let rp = this.walkParams;
	if (rp) {
		let params = rp(i,j);
		min = params.min;
		max = params.max;
		stepx = params.stepx;
		if (stepx) {
			stepx = params.stepx;
			stepy = params.stepy;
		} else {
			stepx = stepy = params.step;
	  }
	} else {
		stepx = istepx;
		stepy = istepy;
		min = imin;
		max = imax;
	}
	if (y !==  undefined) {
	  if (min === max) { //just march towards this target 
			let rstepx = Math.random() * stepx;
			let rstepy = Math.random() * stepy;
      ub = Math.min(x+rstepx,y+rstepy);
      lb = Math.max(x-rstepx,y-rstepy);
			if (ub < max) {
				rs = ub;
			} else if (min < lb) {
				rs = lb;
			} else {
				rs = max;
			}
		  return rs;
		}
		ub = Math.min(x+stepx,y+stepy,max);
    lb = Math.max(x-stepx,y-stepy,min);
    rs =  lb + Math.random() * (ub - lb);
		return rs;
	}
	if (min === max) { //just march towards this target without randomization
		ub = x+stepx;
		lb = x-stepx;
		if (ub < max) {
			rs = ub;
		} else if (min < lb) {
			rs = lb;
		} else {
			rs = max;
		}
		return rs;
	}
	ub = Math.min(x+stepx,max);
	lb = Math.max(x-stepx,min);
	rs =  lb + Math.random() * (ub - lb);
  return rs;
}

item.scalarRandomStep = function (c,step,min,max,i,j) {
	return this.randomStep(c,undefined,step,undefined,min,max,i,j);
}




item.dim2randomStep = function (x, y, stepx,stepy,min,max,i,j) { 
	return this.randomStep(x,y,stepx,stepy,min,max,i,j);
}

   

item.indexFor = function (numRows,i,j) {
	
  let idx = (this.backwards)?numRows*(numRows - i - 1) + j:i*numRows+j;//(numRows - i -1);
  return idx;
}



 // the bias function, if any, takes as input grid,i,j  
 // and returns two numbers: {weight,value} the weight to assign to random, and the value of the bias 


item.valueAt = function (grid,i,j) {
  let {numRows,numCols,biasFun} = grid;
  let rv =  grid.values[this.indexFor(numRows,i,j)];
  if (biasFun) {
    let bfv = biasFun(grid,i,j);
    let {weight,value} = bfv;
    return weight * rv + (1 - weight)*value;
  } else {
    return rv;
  }
}
   
    
item.genRandomGrid = function (params) {
  let {numCols,numRows,step,stepx:istepx,stepy:istepy,min,max,biasFun,constantFirstRow:cFr,backwards,convergenceFactor,convergenceValue,walkParams} = params;
	let stepx,stepy;
	if (walkParams) {
		let wparams = walkParams(0,0);
		min = wparams.min;
		max = wparams.max;
		step = wparams.step;
		stepx = wparams.stepx;
		stepy = wparams.stepy;
	}
	if (typeof step === 'number') {
		stepx = stepy = step;
	} else {
		stepx  = istepx;
		stepy  = istepy;
	}
	//let cFr = this.constantFirstRow;
	this.backwards = backwards;
	this.walkParams = walkParams;
  //let {numCols:w,numRows:h} = this;
  let values = [];
  //let rs = {numCols:numCols,numRows:numRows,values:values,biasFun};
  let rs = {numCols,numRows,values,biasFun};
  let n = numCols * numRows;
  values.length = n;
	
  let i = 0;
  let j = 0;
	let c;
	if (cFr) {
		c = cFr;
	} else {
    c = 0.5*(min+max);
	}
  //let c = 20;
  while (j < numRows) {
    let idx = this.indexFor(numRows,i,j);
    values[idx] = c;
		if (!cFr) {
      c = this.scalarRandomStep(c,stepx,min,max,i,j);
		}
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
         c = this.scalarRandomStep(values[lftidx],stepx,min,max,i,j);
         //c = c+20;//scalarRandomStep(values[lftidx],step,min,max);
       
       } else {
         let lftidx = this.indexFor(numRows,i-1,j)
         let upidx = this.indexFor(numRows,i,goingUp?j-1:j+1)
         c = this.dim2randomStep(values[lftidx],values[upidx],stepx,stepy,min,max,i,j);
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
  let {redP,greenP,blueP,numRows,numCols} = params;
  /*this.red = [];
  this.green = [];
  this.blue = [];
  let n = this.numRows * this.numCols;
  this.red.length = n;
  this.green.length = n;
  this.blue.length = n;*/
  let rs = {numRows:numRows,numCols:numCols};
  let dims = {numCols,numRows};
  
  rs.red = this.genRandomGrid(Object.assign(redP,dims));//.values;
  rs.green = this.genRandomGrid(Object.assign(greenP,dims));//.values;
  rs.blue = this.genRandomGrid(Object.assign(blueP,dims));//.values;
  return rs;
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
  let {redP,greenP,blueP,numRows,numCols,pixelDim} = params;
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
      let r = this.valueAt(shades.red,i,j);
      let g = this.valueAt(shades.green,i,j);
      let b = this.valueAt(shades.blue,i,j);
      //let shd = this.shadeAt(shades,i,j);
      let rgb = this.color2rgb(r,g,b);
      this.genPixel(p,rgb,pixelDim);
    }
  }
}





}   
});