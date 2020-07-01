// bulls eye

//core.require('/shape/gapCircle.js',function (elementPP) {
core.require('/shape/gapCircle.js','/shape/buildBullsEye.js', function (circle,builder) {
 return builder(circle);
});
