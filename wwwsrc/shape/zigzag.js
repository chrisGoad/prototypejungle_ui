//polygon
// coded by Olivier Bauer Simon

//regular polygon

core.require(function () {
let item =  svg.Element.mk('<polygon/>');

/* adjustable parameters */
item.fill = "red";
item.stroke = "black";
item['stroke-width'] = 0;
item.width = 40;
item.height = 80;
item.zigwidth = 10;
item.numzigs = 2;
item.rotation = 0;


item.update = function () {
	debugger;
	let {width,height,zigwidth:zigw,numzigs,rotation,location} = this;
  let p2str = function (point,after) {
    return point.x+' '+point.y+after;
  };
	let zigh = height/(2*numzigs);
	let izp = width - zigw;
	let hw =  0.5*width;
	let hh =  0.5*height;
	let p = [];
	let rm = geom.rotationMatrix(rotation);
	let y = -hh;
	let x = hw;
	p.push(Point.mk(izp,y).rotate(rm).plus(location));
	for (let i=0;i<numzigs;i++) {
		y += zigh;
		p.push(Point.mk(-hw,y).rotate(rm).plus(location));
		y += zigh;
		p.push(Point.mk(izp,y).rotate(rm).plus(location));

	}
	// now the other sid;
  p.push(Point.mk(hw,y).rotate(rm).plus(location));

	for (let i=0;i<numzigs;i++) {
		y -= zigh;
		p.push(Point.mk(-izp,y).rotate(rm).plus(location));
		y -=  zigh;
		p.push(Point.mk(hw,y).rotate(rm).plus(location));
	}
  let path = '';
	let ln = p.length;
  for (let i = 0; i <ln; i++) {
      path += p2str(p[i],' ');
  }
	path+= p2str(p[0],'');
  this.points = path;
	this.segments = geom.pointArrayToLineSegments(p);
}

return item;
});

