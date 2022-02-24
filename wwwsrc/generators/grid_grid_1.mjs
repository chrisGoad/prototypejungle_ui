
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
	
rs.genEltDescription = function () {
   let {innerRows,deltaX,rectP1,rectP2} = this;
   let innerShapePs = [];// core.ArrayNode.mk();
   let positions = this.genInnerGridPositions();
   let rectP = (Math.random() < 0.5)?rectP1:rectP2;   
   for (let i=0;i<innerRows;i++) {
     for (let j=0;j<innerRows;j++) {
         innerShapePs.push(Math.random() < 0.7?rectP:null);;
     }
   }
   return {shapePs:innerShapePs,positions:positions}
 }

rs.decider = function (rvs,cell) {
  return Math.random() < 0.5;
}
  
rs.shapeGenerator = function (rvs,cell) {
	let {eltDescription1,eltDescription2,shapes} = this;
  debugger;
  let shape = svg.Element.mk('<g/>');
  if (this.decider(rvs,cell)) {
     this.instantiateDescriptionInto(shape,eltDescription1);
  } else {
     this.instantiateDescriptionInto(shape,eltDescription2);
  }
  shapes.push(shape);
	shape.show()
  return shape;
}

rs.initialize = function () {
  debugger;
  if (this.initializeInstance) {
    this.initializeInstance();
  }
  let {numRows,width,innerRows} = this;
  let deltaX = this.deltaX = width/numRows;
  let innerWidth = this.innerWidth =  deltaX/innerRows;
  this.initProtos();
  this.eltDescription1 = this.genEltDescription();
  this.eltDescription2 = this.genEltDescription();
  this.initializeGrid();
}

export {rs};

 