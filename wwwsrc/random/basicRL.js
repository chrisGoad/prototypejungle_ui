// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/random/addRandomLines3.js', function (addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

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
