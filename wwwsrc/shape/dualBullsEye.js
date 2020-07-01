// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/shape/circle.js','/shape/regularPolygon.js','/shape/buildBullsEye.js', function (circle,polygon,builder) {
  debugger;
 return builder(circle,polygon);
});
