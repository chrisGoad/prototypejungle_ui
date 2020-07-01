//shadedCircle
// this code implements the blurred  circle element in the shape catalog
core.require(function () {
debugger;	
let item = svg.Element.mk('<g/>');

let filter = svg.Element.mk('<filter/>');
item.set('filter',filter);
let blur = svg.Element.mk('<feGaussianBlur/>');
filter.set('blur',blur);
let circle = svg.Element.mk('<circle/>');
item.set("__contents",circle);
circle.fill = 'transparent';

/* adjustable parameters */
item.dimension = 100;
item.stroke = 'black';
item.stdDeviation=5;

/* end adjustable parameters */

item.role = 'vertex'; // in a network diagram, this can play the role of vertex
item.resizable = true;


item.__contents.neverselectable = true;

let count = 0;
item.update = function () {
  let circle = this.__contents;
  let filter = this.filter;
  let id = 'g'+(count++);
  filter.id = id;
  filter.blur.stdDeviation = this.stdDeviation;
  circle.filter = 'url(#'+id+')'
  circle.r = 0.5 * this.dimension;
}
 
// Needed for positioning connectors (eg arrows) running to or from this item
graph.installCirclePeripheryOps(item);

//ui.hide(item,['fill','r','__contents','filter']);
return item;
});
