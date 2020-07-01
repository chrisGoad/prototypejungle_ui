
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/grid/addBrokenGrid.js','/grid/dim2dWalker2.js',function (linePP,addMethods,addRandomizer) {
return function () {
debugger;
//let variant;
//variant = 'a'; //white
//variant = 'b'; //red and green
//variant = 'c'; //all colors

let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */

/*
item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red'
  this.lineP['stroke-width'] = .2;  
  core.assignPrototypes(this,'shapeP1',linePP);
}  
*/
item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = this.strokeWidth;
  this.lineP.stroke = this.stroke;
  core.assignPrototypes(this,'shapeP1',linePP);
}  


item.initializeConstructor = function () {
  core.root.backgroundColor ='black';
  this.initializeProto();
  let numLines = this.numLines; // set externally
  this.numRows= this.numLines;
  this.numCols= this.numLines;
  this.width = 200;
  this.height = 200;
  let lines =  this.set('lines',core.ArrayNode.mk());
  let {lineP,numRows,numCols} = this;
  debugger;
  if (this.hvParams) {
    Object.assign(this.hvParams,{lineP,lines});//,quadrangle:quad1,numLines,vertical:true});
    this.addHVLines(this.hvParams);
    return;
  }
  let sc;
  let params = {};
  debugger;
  if (this.thereP || this.redP) {
    sc = this.randomizer = {};
    addRandomizer(sc);
    let dims = {numRows:numLines,numCols:numLines};
    if (this.thereP) {
      this.thereR = sc.genRandomGrid(Object.assign(this.thereP,dims));
      this.missingR = sc.genRandomGrid(Object.assign(this.missingP,dims));
    }
    if (this.redP) {
      this.redR = sc.genRandomGrid(Object.assign(this.redP,dims));
      this.greenR = sc.genRandomGrid(Object.assign(this.greenP,dims));
      this.blueR = sc.genRandomGrid(Object.assign(this.blueP,dims));
    }
  } else {
    let {minThere,maxThere,minMissing,maxMissing} = this;
    params =  {minThere,maxThere,minMissing,maxMissing};
    //params = {minThere:this.minThere,maxThere:this.maxThere,minMissing:this.minMissing,maxMissing:this.maxMissing};
   //Object.assign(params,tParams);
  }
  debugger;
    
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  let quad1 = [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(-hwd,-hht),Point.mk(hwd,-hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  debugger;
  //let lines =  this.set('lines',core.ArrayNode.mk());
  // let {lineP,numRows,numCols} = this;
  Object.assign(params,{lineP,lines,quadrangle:quad1,numLines,vertical:true});
  this.addQuadLines(params);
  params.quadrangle = quad2;
  params.vertical = false;
  this.addQuadLines(params);
}	
return item;
}
});
      

