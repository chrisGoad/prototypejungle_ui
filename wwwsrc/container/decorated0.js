
core.require('/box/decorated0.js','/container/container.js',function (borderPP,containerP) {

let item = containerP.instantiate();

/*adjustable parameters  */
item.width = 35;
item.height = 35;
item.stroke = 'black';
item['stroke-width'] = 2;
item.fill = 'transparent';
/* end adjustable parameters */

item.set('borderProperties',core.lift(['fill','stroke','stroke-width']));
item.installBorder(borderPP);

graph.installRectanglePeripheryOps(item);

return item;
});

