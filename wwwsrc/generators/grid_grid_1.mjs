
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
addRandomMethods(rs);
  
let wd = 400;
let nr = 20;
let topParams = {width:wd,height:wd,numRows:nr,numCols:nr,pointJiggle:10,innerRows:5};

Object.assign(rs,topParams);

rs.genEltDescription = function (n) {
  // let {innerRows,deltaX,rectP1,rectP2,innerPresent1,innerPresent2,saveState,whichElts,whichShape1,whichShape2} = this;
   let {innerRows,deltaX,rectP1,rectP2,eltDState1,eltDState2,saveState} = this;
   let eltDState = n===1?eltDState1:eltDState2;
   let innerShapePs = [];// core.ArrayNode.mk();
   let positions = this.genInnerGridPositions();
   let innerPresent = saveState?[]:eltDState[1];
   let whichShape;   
   if (saveState) {
     whichShape =  Math.random() < 0.5?1:2;
   } else {
     whichShape = eltDState[0];
   }
   let rectP = (whichShape === 1)?rectP1:rectP2;
   for (let i=0;i<innerRows;i++) {
     for (let j=0;j<innerRows;j++) {
         let present = saveState?(Math.random() < 0.7):innerPresent[i*innerRows + j];
         let ip =present?rectP:null;
         innerPresent.push(present?1:0);
         innerShapePs.push(ip);;
     }
   }
   return {shapePs:innerShapePs,positions:positions,eltDState:[whichShape,innerPresent]}
 }

rs.decider = function (rvs,cell) {
  return Math.random() < 0.5;
}

rs.whichElts = [];

rs.shapeCount = 0;
rs.shapeGenerator = function (rvs,cell) {
	let {eltDescription1,eltDescription2,shapes,whichElts,saveState,shapeCount} = this;
  let shape = svg.Element.mk('<g/>');
  
  if (saveState) {
    if (this.decider(rvs,cell)) {
     rs.whichElts.push(1);
     this.instantiateDescriptionInto(shape,eltDescription1);
    } else {
     whichElts.push(2);
     this.instantiateDescriptionInto(shape,eltDescription2);
    }
  } else {
    let idx = this.cellToIndex(cell);
    if (whichElts[idx] === 1) {
      this.instantiateDescriptionInto(shape,eltDescription1);
    } else {
      this.instantiateDescriptionInto(shape,eltDescription2);
    } 
    this.shapeCount = shapeCount+1;  
  }
  shapes.push(shape);
	shape.show()
  return shape;
}

rs.computeState  = function () {
   return [["whichElts",this.whichElts],["eltDState1",this.eltDState1],["eltDState2",this.eltDState2]];
   //["innerPresent2",this.innerPresent2],["whichShape1",this.whichShape1],["whichShape2",this.which];
}


rs.initialize = function () {
  debugger;
  if (this.initializeInstance) {
    this.initializeInstance();
  }
  let {numRows,width,innerRows,saveState} = this;
  let deltaX = this.deltaX = width/numRows;
  let innerWidth = this.innerWidth =  deltaX/innerRows;
  this.initProtos();
  
  if (saveState) {
    let eltD1 = this.eltDescription1 = this.genEltDescription(1);
    let eltD2 = this.eltDescription2 = this.genEltDescription(2);
    this.eltDState1 = eltD1.eltDState;
    this.eltDState2 = eltD2.eltDState;
   /* this.innerPresent1 = eltD1.innerPresent;
    this.innerPresent2 = eltD2.innerPresent;
    this.whichShape1  = eltD2.whichShape1;
    this.whichShape2  = eltD2.whichShape2;*/
    this.initializeGrid();
    this.saveTheState();
  } else {
    this.getTheState(() => {
      debugger;
      this.eltDescription1 = this.genEltDescription(1);
      this.eltDescription2 = this.genEltDescription(2);
      this.initializeGrid();
    });
  }
}

export {rs};

 