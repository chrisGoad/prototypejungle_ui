
//core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP) {
core.require('/gen0/basics.js','/gen0/topRandomMethods.js','/shape/cGon.js','/shape/rectangle.js',
function (addBasicMethods,addRandomMethods,cgonPP,rectPP) {

//core.require(function () {
 return function (rs) {
	// debugger;
//let item = svg.Element.mk('<g/>');
//addAnimationMethods(rs);
addBasicMethods(rs);
addRandomMethods(rs);

rs.initProtos = function () {
	core.assignPrototypes(this,'cgonP',cgonPP);
	core.assignPrototypes(this,'rectP',rectPP);
	//return;
	//this.lineP.stroke = 'white';
	//this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  
  
}});

      
