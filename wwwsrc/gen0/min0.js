core.require('/gen0/animation.js','/gen0/basics.js','/gen0/topRandomMethods.js',
function (addAnimationMethods,addBasicMethods,addRandomMethods) {

//core.require(function () {
 return function (rs) {
	// debugger;
//let item = svg.Element.mk('<g/>');
//addAnimationMethods(rs);
addBasicMethods(rs);
addRandomMethods(rs);


rs.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}


rs.genLine = function (sg,ext=0) {
  let {end0,end1} = sg;
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);
  return line;
}



rs.initBasis = function () {
	this.initProtos();
	this.addBackground();
  this.set('shapes',core.ArrayNode.mk());

}

return rs;

}
});		


