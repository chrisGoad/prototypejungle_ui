
core.require('/grid/addMultiSizeGrid.js',function (addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */
item.initialize = function () {
  item.fractionOfLinesVisible = .3;
  item.addTheShapes = false;
  this.initializeGrid([20,10,9,30]);
}	
return item;
});
      

