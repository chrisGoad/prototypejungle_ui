//polygon
// coded by Olivier Bauer Simon

//regular polygon

core.require(function () {
let item =  svg.Element.mk('<polygon/>');

/* adjustable parameters */
item.fill = "transparent";
item.stroke = "black";
item['stroke-width'] = 1;

item.role = 'spot';
item.corners = [];

item.update = function () {
	let {corners} = this;
	let ln = corners.length;
	if (!ln) {
		return;
	}
  let p2str = function (point,after) {
    return point.x+' '+point.y+after;
  };
	let path = '';
	for (let i=0;i<=ln;i++) {
		let corner = (i===ln)?corners[0]:corners[i];
		path =+ p2str(corner,' '_'
	}
  this.points = path;
}

return item;
});

