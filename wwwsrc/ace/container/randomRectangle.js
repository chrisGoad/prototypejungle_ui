core.require('/random/rectangle.js','/container/container.js',function (borderPP,containerP) {
let item = containerP.instantiate();

/* This is a container whose border is a rectangle */ 

/*adjustable parameters  */
item.width = 35;
item.height = 25;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

item.role = 'vertex';

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['fill','stroke','stroke-width']));
item.installBorder(borderPP);

// This makes the item suitable for use as a graph vertex.
graph.installRectanglePeripheryOps(item);

return item;
});

