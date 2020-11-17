core.require('/shape/rectangle.js',
function (rectPP)	{ 
  let rs = svg.Element.mk('<g/>');

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);	
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
}  
rs.initialize = function () {
	this.initProtos();
	let bsz = 25;
	let mkR  = (nm,p) => {
	  let r = this.rectP.instantiate();
	  r.width = bsz;
	  r.height = bsz;
	  this.set(nm,r);
	  r.update();
	  r.show();
		r.moveto(p);
		return r;
	}
	let d = 15;
	let ul = mkR('ul',Point.mk(-d,-d));
	let ur = mkR('ur',Point.mk(d,-d));
	let ll = mkR('ll',Point.mk(-d,d));
	let lr = mkR('lr',Point.mk(d,d));
	let br = this.rectP.instantiate();
	br . width = 2*d - 5;
	br . height = 2*d - 5;
	this.set('big',br);
	br.fill = 'gray';
	br.update();
	br.show();
	
}
return rs;
});
