// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/shape/circle.js','/shape/buildBullsEye2.js', function (circlePP,addMethods) {
  debugger;
  let item = svg.Element.mk('<g/>');
item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP1',circlePP);
  this.elementP1.stroke = 'black';
  this.elementP1.stdDeviation = this.stdDeviation;
  //core.assignPrototypes(this,'lineP',linePP);
  //this.lineP.stroke = 'black';
  //this.lineP['stroke-width'] = 0.3; 
}  
 addMethods(item);
 item.numCircles = 5;
 item.doJiggle = true;
 return item;
});
