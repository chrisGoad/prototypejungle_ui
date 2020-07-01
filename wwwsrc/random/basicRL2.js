// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/shape/circle.js','/random/addRandomLines3.js', 
 function (linePP,circlePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0.5;
}  
item.initialize = function () {
  debugger;
  this.initializeProtos();
  let lines1 = this.set('lines1',core.ArrayNode.mk());
  let {numRows,numCols} = this;
    let n = numRows*numCols;  

  this.addTheLines();
  
}
 return item;
});
