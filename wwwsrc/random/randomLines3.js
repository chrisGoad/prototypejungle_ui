// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/random/addRandomLines4.js', 
 function (linePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  core.assignPrototypes(this,'diagLineP',linePP);
  this.diagLineP.stroke = 'red';
  this.diagLineP.stroke = 'black';
  this.diagLineP['stroke-width'] = 0.2;
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.2;
}  
item.initialize = function () {
  debugger;
  this.initializeProtos();
  this.showEveryDiag = 1;
  this.cross = 1;
  let numRC = 20;
  this.numRows = numRC;
  this.numCols = numRC;
  this.width = 100;
  this.height = 100;
  this.lineLengthRatio = 1;
  let lines = this.set('lines',core.ArrayNode.mk());
  let n = numRC*numRC
  lines.length = n;
  //let dir = 0.75 * Math.PI;
  let dir = this.cross?0.25 * Math.PI:0.75*Math.PI;
  for (let i=0;i<numRC;i++) {
    if (this.showEveryDiag || (i%2 === 0)) {
      this.addLine(lines,this.diagLineP,i,i,dir);
    }
  }
//  dir = 0.25 * Math.PI;
  dir = this.cross?0.75 * Math.PI:0.25 * Math.PI;
  for (let i=0;i<numRC;i++) {
  //  this.addLine(this.diagLineP,i,numRC-i,dir);
    if (this.showEveryDiag  || i%2 === 0) {
      this.addLine(lines,this.diagLineP,i,numRC-i,dir);
    }
  }   
  this.addTheLines(lines,this.lineP);
  //this.addTheLines();
  
}
 return item;
});
