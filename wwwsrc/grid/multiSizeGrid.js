
core.require('/grid/addMultiSizeGrid.js',function (addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
item.width = 30;
item.height = 30;
/*adjustable parameters  */
item.initialize = function () {
  //this.initializeGrid([20,10,9,8,7,6,5,4,3,2]);
  this.fractionOfLinesVisible = .99;

  this.initializeGrid([20,10,9,30,30,20,20,4,4]);
}	
return item;
});
      

