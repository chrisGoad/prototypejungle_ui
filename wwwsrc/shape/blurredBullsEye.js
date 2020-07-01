// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/shape/blurredCircle.js','/shape/buildBullsEye.js', function (circle,builder) {
 return builder(circle);
});
