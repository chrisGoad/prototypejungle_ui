
core.require('/shape/circle.js','/grid/addGridMethods.js',function (circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item,circlePP);
/*adjustable parameters  */
item.initialize = function () {
  this.initializeProto();
  this.initializeGrid();
}	

item.update = function () {
  this.updateGrid();
}
return item;
});
      

