// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/random/addRandomLines3.js','/grid/addMultiSizeGrid.js',
 function (squareP,linePP,circlePP,addRandomLineMethods,addGridMethods) {
  debugger;
let item = svg.Element.mk('<g/>');


item.initializeRandomLineProtos = function (lines) {
  core.assignPrototypes(lines,'lineP',linePP);
  lines.lineP.stroke = 'red';
  lines.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(lines,'circleP',circlePP);
  lines.circleP.stroke = 'red';
  lines.circleP['stroke-width'] = 0.5;
}  


 item.set('square',squareP.instantiate());
 //item.set('randomLines',randomLines.instantiate());
// item.set('grid',grid.instantiate());

item.initialize = function () {
  debugger;
 // th	is.randomLines.initialize();
  let randomLines = item.set('randomLines',svg.Element.mk('<g/>'));

  this.initializeRandomLineProtos(randomLines);
  let grid = this.set('grid',svg.Element.mk('<g/>'));
  addGridMethods(grid);
  addRandomLineMethods(randomLines);
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
  randomLines.set('lines1',core.ArrayNode.mk());
  randomLines.addTheLines();
  randomLines.setScale(0.27);
  //this.randomLines.moveto(Point.mk(0,-1.4));


}
 return item;
});
