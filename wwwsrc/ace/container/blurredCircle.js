//shaded circle
core.require('/shape/blurredCircle.js','/container/container.js',function (borderPP,containerP) {
let item = containerP.instantiate();

/*adjustable parameters  */
item.dimension = 35;

item.stroke = 'black';
item['stroke-width'] = 1;
item.stdDeviation = 1;
/* end adjustable parameters */

item.role = 'vertex';

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['stdDeviation','stroke','stroke-width']));
item.installBorder(borderPP);

graph.installCirclePeripheryOps(item);

item.setFieldType('stroke','svg.Rgb');

return item;
});

