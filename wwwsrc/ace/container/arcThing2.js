//shaded and crossed circle

core.require('/shape/arcThing2.js','/container/container.js',function (borderPP,containerP) {

let item = containerP.instantiate();

/*adjustable parameters */
item.dimension = 35;
item.armWidth = 0.2; // as a fraction of dimension
item.gap = 0.1;//as a fraction of dimension
item.circleRadiusFraction = 1.01;
item.fill = 'rgb(64,64,62)';
item.outerFill = 'black';
/*end adjustable parameters */

item.resizable = true;

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['armWidth','gap','outerFill','fill','circleRadiusFraction']));
item.installBorder(borderPP);

graph.installCirclePeripheryOps(item);

item.setFieldType('fill','svg.Rgb');
item.setFieldType('outerFill','svg.Rgb');

return item;
});

