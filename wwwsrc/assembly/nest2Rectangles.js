// bulls eye


core.require('/assembly/nest2.js','/shape/rectangle.js',function (nestP,elementPP) {
//core.require('/shape/regularPolygon.js',function (elementPP) {
//core.require('/shape/lozenge.js',function (elementPP) {
debugger;
let item =  nestP.instantiate();


item.initializePrototype = function () {
  core.assignPrototypes(this,'elementP',elementPP);
}


return item;
});

