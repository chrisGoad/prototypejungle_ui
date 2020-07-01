// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/shape/rectangle.js','/random/basicRL.js','/grid/multiSizeGrid.js',
 function (squareP,randomLines,grid) {
  debugger;
let item = svg.Element.mk('<g/>');


 item.set('square',squareP.instantiate());
 item.set('randomLines',randomLines.instantiate());
 item.set('grid',grid.instantiate());

item.initialize = function () {
  debugger;
 // th	is.randomLines.initialize();
  this.grid.width = 60;
  this.grid.height = 60;
  this.grid.initializeGrid([20,10,9,30]);
  //   this.grid.initializeGrid([20,10,40,30]);

  this.square.fill = 'blue';
 this.square.width = 30;
 this.square.height = 30;
 this.square.stroke = 'transparent';
  
  this.square.update();
  this.square.show();
  this.randomLines.initialize();
  this.randomLines.setScale(0.27);
  //this.randomLines.moveto(Point.mk(0,-1.4));


}
 return item;
});
