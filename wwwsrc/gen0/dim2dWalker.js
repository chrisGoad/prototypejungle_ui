core.require(function () {
  return function (item) {	


//item.randomStep = function (iCorrelated,x,y,istepx,istepy,imin,imax,i,j) {
	// pv = previous value from t-1
item.randomStep = function (iCorrelated,x,y,pv,istepx,istepy,istept,imin,imax,i,j) {
	let min,max,stepx,stepy,lb,ub,rs,correlated;
	let firstT = (pv === undefined);
	let rp = this.walkParams;
	if (rp) {
		let params = rp(i,j);
		//correlated = !params.noCorrelation;
		let pcor = params.correlated;
	  correlated = pcor || (pcor === undefined);
		min = params.min;
		max = params.max;
		if (correlated) {
			stepx = params.stepx;
			if (stepx) {
				stepx = params.stepx;
				stepy = params.stepy;
			} else {
				stepx = stepy = params.step;
			}
		}
	} else {
		correlated = iCorrelated;
		stepx = istepx;
		stepy = istepy;
		stept = istept;
		min = imin;
		max = imax;
	}
	if (!correlated) {
		rs =  min + Math.random() * (max - min);
    return rs;
	}
  let sumSteps,sumVals;
	if (y !==  undefined) { // 2d case
	  if (firstT) {
			sumSteps = stepx+stepy;
			sumVals = x+y;
			ub = 0.5 * (sumVals+sumSteps);
			lb = 0.5 * (sumVals-sumSteps);
		
		} else {
		  sumSteps = stepx+stepy+stept;
			sumVals = x+y+pv;
			ub = 0.333333 * (sumVals+sumSteps); // an average
			lb = 0.333333 * (sumVals-sumSteps);
		}
			
	} else {
		if (firstT) {
		  ub = x + stepx;
		  lb = x - stepx;
		} else {
			sumSteps = stepx + stept;
			sumVals = x + pv;
			ub = 0.5 * (sumVals+sumSteps);
			lb = 0.5 * (sumVals-sumSteps);
		}
	}
	if (min > ub) {  //just march towards this target
		rs = ub;
	} else if (max < lb) {
		rs = lb;
	} else {
		ub = Math.min(ub,max);
		lb = Math.max(lb,min);
		rs =  lb + Math.random() * (ub - lb);
	}
	return rs;
}
	
item.scalarRandomStep = function (correlated,c,pv,step,stept,min,max,i,j) {
	return this.randomStep(correlated,c,undefined,pv,step,undefined,stept,min,max,i,j);
}




item.dim2randomStep = function (correlated,x, y,pv, stepx,stepy,stept,min,max,i,j) { 
	return this.randomStep(correlated,x,y,pv,stepx,stepy,stept,min,max,i,j);
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
	//debugger;
  let {prevValues,numCols,numRows,step,stepx:istepx,stepy:istepy,stept,min,max,biasFun,constantFirstRow:cFr,
	     backwards,convergenceFactor,convergenceValue,walkParams,correlated:pcor} = params;
	let stepx,stepy,corrrelated;
	if (walkParams) {
		let wparams = walkParams(0,0);
	  let pcor = wparams.correlation;
		correlated = pcor || (pcor === undefined);		
		min = wparams.min;
		max = wparams.max;
		step = wparams.step;
		stepx = wparams.stepx;
		stepy = wparams.stepy;
	} else {
		correlated = pcor || (pcor === undefined);
	}
	if (typeof step === 'number') {
		stepx = stepy = step;
	} else {
		stepx  = istepx;
		stepy  = istepy;
	}
	this.backwards = backwards;
	this.walkParams = walkParams;
  let values = [];
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
	let pv;
  while (j < numRows) {
    let idx = this.indexFor(numRows,i,j);
		if (prevValues) {
			pv = prevValues[idx];
		} else {
			pv = undefined;
		}
    values[idx] = c;
		if (!cFr) {
      c = this.scalarRandomStep(correlated,c,pv,stepx,stept,min,max,i,j);
		}
		j++;
  }
  i = 1;
  while (i < numCols) {
    let goingUp = i%2 === 0; //means  j is going up
    j = goingUp?0:numRows-1;
    let firstJ = true;
	
    while ((j>=0) && (j < numRows)) {
				let idx = this.indexFor(numRows,i,j);
				if (prevValues) {
				 pv = prevValues[idx];
				} else {
				 pv = undefined;
				}
				if (firstJ){
					let lftidx = this.indexFor(numRows,i-1,goingUp?0:numRows-1);
					c = this.scalarRandomStep(correlated,values[lftidx],pv,stepx,stept,min,max,i,j);       
				} else {
					let lftidx = this.indexFor(numRows,i-1,j)
					let upidx = this.indexFor(numRows,i,goingUp?j-1:j+1)
					c = this.dim2randomStep(correlated,values[lftidx],values[upidx],pv,stepx,stepy,stept,min,max,i,j);
				}
				values[idx] = c;
				j = goingUp?j+1:j-1;
				firstJ = false;
    }
    i++;
  }
	rs.params = params;
  return rs;
}


}   
});