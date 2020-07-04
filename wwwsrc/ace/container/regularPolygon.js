//regular polygon
core.require('/shape/regularPolygon.js','/container/container.js',function (borderPP,containerP) {
let item = containerP.instantiate();

/*adjustable parameters  */
item.dimension = 35;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
item.numberOfSides = 6;          //Number of sides
item.theta = 0;                 //Tilt angle of polygon, degrees
/* end adjustable parameters */

item.role = 'vertex';

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['numberOfSides','theta']));
item.installBorder(borderPP);

graph.installCirclePeripheryOps(item);

return item;
});

