//polygon
// coded by Olivier Bauer Simon

//regular polygon

core.require(function () {
let item =  svg.Element.mk('<polygon/>');

/* adjustable parameters */
item.fill = "red";
item.stroke = "black";
item['stroke-width'] = 0;
item.width = 10;
item.height = 10;
item.armHeight = 2;
item.strutWidth = 2;
item.rotation = 0;

item.update = function () {
	let {width,height,armHeight,strutWidth,rotation} = this;
  let p2str = function (point,after) {
    return point.x+' '+point.y+after;
  };
	let hw =  0.5*width;
	let hh = 0.5 * height;
	let p = [];
	let rm = geom.rotationMatrix(rotation);
	p.push(Point.mk(hw,-hh).rotate(rm));
	p.push(Point.mk(-hw,-hh).rotate(rm));
	p.push(Point.mk(-hw,hh).rotate(rm));
	p.push(Point.mk(hw,hh).rotate(rm));
	p.push(Point.mk(hw,hh-armHeight).rotate(rm));
	p.push(Point.mk(strutWidth -hw,hh-armHeight).rotate(rm));
	p.push(Point.mk(strutWidth -hw,armHeight-hh).rotate(rm))
	p.push(Point.mk(hw,armHeight-hh).rotate(rm))
  let path = '';
  for (let i = 0; i <8; i++) {
      path += p2str(p[i],' ');
  }
	path+= p2str(p[0],'');
  this.points = path;
}

return item;
});

