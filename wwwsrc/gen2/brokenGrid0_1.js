
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/gen0/brokenGrid0.js',function (linePP,addMethods) {
debugger;
let variant;
//variant = 'a'; //white
//variant = 'b'; //red and green
variant = 'c'; //all colors

let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = .2;  
  core.assignPrototypes(this,'shapeP1',linePP);
}  

item.initialize = function () {
	debugger;
  core.root.backgroundColor ='black';
  this.initializeProto();
  let numLines = this.numLines = 600;
  this.numRows= this.numLines;
  this.numCols= this.numLines;
  this.width = 200;
  this.height = 200;
 // this.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});

  this.setupShapeRandomizer('thereR',{step:5,min:3,max:35,numRows:numLines,numCols:numLines});
  this.setupShapeRandomizer('missingR',{step:8,min:3,max:35,numRows:numLines,numCols:numLines});
  this.redR = this.setupShapeRandomizer('redR',{step:25,min:100,max:250,numRows:numLines,numCols:numLines});
  this.greenR =this.setupShapeRandomizer('greenR',{step:25,min:100,max:250,numRows:numLines,numCols:numLines});
  this.blueR =this.setupShapeRandomizer('blueR',{step:25,min:100,max:250,numRows:numLines,numCols:numLines});
	
  /*this.thereR = sc.genRandomGrid(numLines,numLines,5,3,35);
  this.missingR = sc.genRandomGrid(numLines,numLines,8,3,35);
  this.redR = sc.genRandomGrid(numLines,numLines,25,100,250);
  this.greenR = sc.genRandomGrid(numLines,numLines,25,100,250);
  this.blueR = sc.genRandomGrid(numLines,numLines,25,100,250);*/
  switch (variant) {
    case 'a':this.rgb2color = (r,g,b) => `rgb(${r},${r},${r})`;break;
    case 'b':this.rgb2color = (r,g,b) => `rgb(${r},${g},0)`;break;
    case 'c':this.rgb2color = (r,g,b) => `rgb(${r},${g},${b})`;break;
  }
 
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  let quad1 = [Point.mk(-hwd,hht),Point.mk(hwd,hht),Point.mk(-hwd,-hht),Point.mk(hwd,-hht)];
  let quad2 = [quad1[0],quad1[2],quad1[1],quad1[3]];
  debugger;
  let lines =  this.set('lines',core.ArrayNode.mk());
  let {lineP,numRows,numCols} = this;  
	//let params1 = {lineP:this.lineP,lines,numLines:100,maxThere:15,minThere:1,maxMissing:13,minMissing:5,minSep:1,vertical:0};

	
  let params = {lineP,lines,quadrangle:quad1,numLines,vertical:true,maxThere:15,minThere:1,maxMissing:13,minMissing:5,minSep:1};
  this.addQuadLines(params);
  params.quadrangle = quad2;
  params.vertical = false;
  this.addQuadLines(params);
}	
return item;
});
      

