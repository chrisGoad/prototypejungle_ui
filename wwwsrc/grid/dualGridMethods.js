//core.require('/shape/circle.js',function (atPP) {let item =  svg.Element.mk('<g/>');

core.require(function () {
  return function (item,elementPP1,elementPP2) {

debugger;

/*adjustable parameters  */

item.numRows= 7;
item.numCols= 7;
item.deltaX =  70;
item.deltaY = item.deltaX;
item.elementDim = 30;
item.expandFactor=1.0;
item.sizeFactor = 0.7;
item.randomFactor = 0;//.2;
item.randomSize = false;
item.jiggle = true;
item.numElements = 0;
item.dimension = 35;
item.initialDim = 30;
item.finalDim = 20;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

// properties to be transferred to the element
item.set('elementProperties',core.lift(['fill','stroke','stroke-width']));

const randomInI = function (low, high) {
  return low + Math.random() * (high-low);
}

const randomColor = function (lR,hR,lG,hG,lB,hB) {
   let rs = `rgb(${randomInI(lR,hR)},${randomInI(lG,hG)},${randomInI(lB,hB)})`;
   console.log(rs);
   return rs;
}

item.initializeProto= function () {
  debugger;
  core.assignPrototypes(this,'elementP',elementPP);
  elementPP.stroke = 'black';
  elementPP.dimension = this.dimension;

}

 
const genRandom = function (itm) {
   let rnd = 1 + itm.randomFactor * (0.2* Math.random()-0.1);
   return rnd * itm.sizeFactor * itm.deltaX;
}



item.setDim = function (dim) {
  let el = this.elements[0];
  let elementP = Object.getPrototypeOf(el);
  //let elementP = this.elementP;
  elementP.dimension = dim;
}

item.incrementDim = function () {
  let el = this.elements[0];
  let elementP = Object.getPrototypeOf(el);
  //let elementP = this.elementP;
  let dim = elementP.dimension;
  elementP.dimension = 1.1 * dim;
}



item.decrementDim = function () {
  let elementP = this.elementP;
  let dim = elementP.dimension;
  elementP.dimension = (1/1.1) * dim;
}
item.adjustSizes = function () {
  let {numRows,numCols} = this;
  let initDim = this.elementDim;
  let finalDim = initDim * this.expandFactor;
  for (let i=0;i<numRows;i++) {
    for (let j=0;j<numCols;j++) {
      let idx = i*numCols + j;
      let element = this.elements[idx];
   
      let dim = initDim + i*(finalDim-initDim)/(numRows-1);
      element.dimension = dim;
      element.update();
    }
  }
}

item.initializeGrid = function () {
  debugger;
  let {numRows,numCols,deltaX,deltaY,sizeFactor,randomSize,jiggle,numElements} = this;
/*  = this.numRows;
  let numCols = this.numCols;
  let deltaX = this.deltaX;
  let deltaY = this.deltaY;
  let sizeFactor = this.sizeFactor;
  let randomSize = this.randomSize;*/
  let sz = numRows * numCols;
  let elements = this.elements;
  let elementP = this.elementP;
  if (!elements ) {
    elements = core.ArrayNode.mk();
    this.set('elements',elements);
  }
  let ln = elements.length;
  if (ln < sz) {
    for (let i=ln;i<sz;i++) {
      let el = elementP.instantiate().show();
      elements.push(el);
      /*el.stroke = randomColor(150,250,0,0,0,0);
      if (el.initialize) {
        el.initialize();
      }*/
    }
  } else if (ln > sz) {
    debugger;
    for (let i=ln-1; i>=sz;i--) {
      elements[i].remove();
    }
  }
  // row major order
 
  for (let i=0;i<numRows;i++) {
    for (let j=0;j<numCols;j++) {
      let idx = i*numCols + j;
      let element = this.elements[idx];
      let sz;
      if (randomSize) {
      //  let rnd = 1 + randomFactor * (0.2* Math.random()-0.1);
    //    console.log('random',rnd);
        sz = genRandom(this);
      } else {
        sz = sizeFactor * deltaX;
      }
      //element.dimension = this.dimension;
      let jx,jy;
      if (jiggle) {
        jx = genRandom(this);
        jy = genRandom(this);
      } else {
        jx = 0;
        jy = 0;
      }
     // element.dimension = sz;
      element.__update();
      element.moveto(Point.mk(j*deltaX+jx,i*deltaY+jy));
    }
  }
}

item.updateGrid = function () {
  let {numRows,numCols,deltaX,deltaY,sizeFactor,randomSize,jiggle,numElements} = this;
/*  = this.numRows;
  let numCols = this.numCols;
  let deltaX = this.deltaX;
  let deltaY = this.deltaY;
  let sizeFactor = this.sizeFactor;
  let randomSize = this.randomSize;*/
  let sz = numRows * numCols;
  let elements = this.elements;
  elements.forEach(function (el) {
    el.__update();
  });
}
  


item.elementAt = function (i,j) {
  let idx = j*this.numCols + i;
  return this.elements[idx];
}
/*
item.installGridMethods = function (grid,elementPP) {
  grid.initializePrototype = function () {
    core.assignPrototypes(this,'elementP',elementPP);
  }
  grid.stdUpdate = this.gridUpdate;
  grid.update = this.gridUpdate;
  grid.elementAt = this.elementAt;
}


*/

}});


