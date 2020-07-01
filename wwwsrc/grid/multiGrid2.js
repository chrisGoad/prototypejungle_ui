
core.require('/grid/addMultiSizeGrid3.js',function (addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */
item.initialize = function () {
  item.fractionOfLinesVisible = 1;
  this.initializeGrid([20,10,9,30]);
}	
return item;
});
      

