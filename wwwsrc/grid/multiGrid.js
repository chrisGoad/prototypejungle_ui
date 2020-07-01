
core.require('/grid/addGrid2.js',function (addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */
item.initialize = function () {
  this.initializeGrid();
}	
return item;
});
      

