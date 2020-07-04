core.require('/shape/square.js','/container/container.js',function (borderPP,containerP) {
let item = containerP.instantiate();

/*adjustable parameters  */
item.dimension = 35;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

item.role = 'vertex';

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['fill','stroke','stroke-width']));
item.installBorder(borderPP);

graph.installRectanglePeripheryOps(item);

return item;
});

