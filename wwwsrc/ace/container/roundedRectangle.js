core.require('/shape/roundedRectangle.js','/container/container.js',function (borderPP,containerP) {

let item = containerP.instantiate();

/*adjustable parameters  */
item.width = 35;
item.height = 25;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

item.role = 'vertex';
item.set('borderProperties',core.lift(['fill','stroke','stroke-width']));

item.installBorder(borderPP);

item.controlPoints = function () {
  return this.border.controlPoints();
}

item.updateControlPoint = function (idx,pos) {
  this.border.updateControlPoint(idx,pos);
}

graph.installRectanglePeripheryOps(item);

return item;
});
