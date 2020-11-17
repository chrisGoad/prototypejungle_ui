core.require('/shape/rectangle.js'
function (rectPP)	{ 
  let rs = svg.Element.mk('<g/>');

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);	
}  
rs.initialize = function () {
	let r = this.rectP.instantiate();
	rs.set('r',r);
}
return rs;
});
