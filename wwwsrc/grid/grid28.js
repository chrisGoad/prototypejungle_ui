
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
  this.lineP.stroke = this.lineProps.stroke;
  this.lineP['stroke-width'] = this.lineProps['stroke-width'];  
  core.assignPrototypes(this,'shapeP1',linePP);
}  


item.initialize = function () {
  core.root.backgroundColor ='black';
  this.initializeProto();
  let numLines = this.numLines; // set externally
  this.numRows= this.numLines;
  this.numCols= this.numLines;
  this.width = 200;
  this.height = 200;
  
  let sc = this.randomizer = {};
  addRandomizer(sc);
  let dims = {numRows:numLines,numCols:numLines};
  debugger;
  this.thereR = sc.genRandomGrid(Object.assign(this.thereP,dims));//{step:thereP.step,min:thereP.min,max:thereP.max}));
  this.missingR = sc.genRandomGrid(Object.assign(this.missingP,dims));//{step:thereP.step,min:thereP.min,max:thereP.max}));
  this.redR = sc.genRandomGrid(Object.assign(this.redP,dims));//{step:thereP.step,min:thereP.min,max:thereP.max}));
  this.greenR = sc.genRandomGrid(Object.assign(this.greenP,dims));//{step:thereP.step,min:thereP.min,max:thereP.max}));
  this.blueR = sc.genRandomGrid(Object.assign(this.blueP,dims));//{step:thereP.step,min:thereP.min,max:thereP.max}));
  //this.thereR = sc.genRandomGrid({numRows:numLines,numCols:numLines,step:thereP.step,min:thereP.min,max:thereP.max});
 /* this.missingR = sc.genRandomGrid({numRows:numLines,numCols:numLines,step:missingP.step,min:missingP.min,max:missingP.max});
  this.redR = sc.genRandomGrid({numRows:numLines,numCols:numLines,step:redP.step,min:redP.min,max:redP.max});
  this.greenR = sc.genRandomGrid({numRows:numLines,numCols:numLines,step:greenP.step,min:greenP.min,max:greenP.max});
  this.blueR = sc.genRandomGrid({numRows:numLines,numCols:numLines,step:blueP.step,min:blueP.min,max:blueP.max})
*/
  //this.rgb2Color = rgb2Color;
 /* switch (variant) {
    case 'a':this.rgb2color = (r,g,b) => `rgb(${r},${r},${r})`;break;
    case 'b':this.rgb2color = (r,g,b) => `rgb(${r},${g},0)`;break;
    case 'c':this.rgb2color = (r,g,b) => `rgb(${r},${g},${b})`;break;
  }*/
 
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  let quad1 = [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(-hwd,-hht),Point.mk(hwd,-hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  debugger;
  let lines =  this.set('lines',core.ArrayNode.mk());
  let {lineP,numRows,numCols} = this;
  let params = {lineP,lines,quadrangle:quad1,numLines,vertical:true};
  this.addQuadLines(params);
  params.quadrangle = quad2;
  params.vertical = false;
  this.addQuadLines(params);
}	
return item;
}
});
      

