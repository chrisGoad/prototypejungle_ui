
core.require('/shape/shadedRectangle.js','/container/container.js',function (borderPP,containerP) {

let item = containerP.instantiate();

/* adjustable parameters */
item.width = 50;
item.height = 35;
item.cornerRadiusFraction = 0.3;
item.stroke = 'black';
item['stroke-width'] = .1;
item.outerFill = 'rgb(100,100,240)';
item.innerFill = 'white';
/*end  adjustable parameters */

item.fill = 'transparent';
item.role = 'vertex';

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['cornerRadiusFraction','stroke','stroke-width','innerFill','outerFill']));

item.installBorder(borderPP);

graph.installRectanglePeripheryOps(item);

item.setFieldType('innerFill','svg.Rgb');
item.setFieldType('outerFill','svg.Rgb');

return item;
});

