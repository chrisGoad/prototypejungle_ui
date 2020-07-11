//shadedCircle
// this code implements the blurred  circle element in the shape catalog
core.require(function () {
debugger;	
let item = svg.Element.mk('<g/>');
let defs = svg.Element.mk('<defs/>');
item.set('defs',defs);
let filter = svg.Element.mk('<filter/>');
item.defs.set('filter',filter);
let blur = svg.Element.mk('<feGaussianBlur/>');
filter.set('blur',blur);
let rect = svg.Element.mk('<rect/>');
item.set("__contents",rect);
rect.fill = 'transparent';

/* adjustable parameters */
item.dimension = 100;
item.stroke = 'black';
item.stdDeviation=5;
item.filterWidth = 100;
item.filterHeight = 100;
item.width = 100;
item.height = 100;
/* end adjustable parameters */

item.role = 'vertex'; // in a network diagram, this can play the role of vertex
item.resizable = true;


item.__contents.neverselectable = true;

let count = 0;
item.update = function () {
	debugger;
  let rect = this.__contents;
  let filter = this.defs.filter;
  let id = 'g'+(count++);
  filter.id = id;
	filter.width = this.filterWidth;
	filter.height = this.filterHeight;
  filter.blur.stdDeviation = this.stdDeviation;
	filter.blur.in = "SourceGraphic";
	rect.width = this.width;
	rect.height = this.height;
  rect.filter = 'url(#'+id+')';
	
}
 
// Needed for positioning connectors (eg arrows) running to or from this item
graph.installCirclePeripheryOps(item);

//ui.hide(item,['fill','r','__contents','filter']);
return item;
});
