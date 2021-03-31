//polygon


core.require(function () {
let item =  svg.Element.mk('<polyline/>');

/* adjustable parameters */
item.stroke = "black";
item['stroke-width'] = 1;

item.role = 'spot';
item.points = [];

item.update = function () {
	//debugger;
	let {thePoints} = this;
  thePoints.forEach((p) => {
    if (isNaN(p.x) || isNaN(p.y)) {
       debugger;
    }
  });
	let ln = thePoints.length;
	if (!ln) {
		return;
	}
  let p2str = function (point,after) {
    return point.x+','+point.y+after;
  };
	let path = '';
	for (let i=0;i<ln;i++) {
		let point = thePoints[i];
		let pstr = p2str(point,i===(ln-1)?'':' ');
		path += pstr;
	}
  this.points = path;
}

return item;
});

