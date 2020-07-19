//not in the catalog

core.require('/box/decorated1.js','/container/container.js',function (borderPP,containerP) {

let item = containerP.instantiate();


/*adjustable parameters  */
item.width = 35;
item.height = 35;
item.horizontalInset = 5;
item.verticalInset = 5;
item.topPadding = 5;
item.vSep = 5; // between image and text
item.bottomPadding = 5;
item.sidePadding = 5;
item.lineSep = 5;
/* end adjustable parameters */

item.role = 'vertex';
item.resizable = true;
item.text = '';

item.set('borderProperties',core.lift(['horizontalInset','verticalInset']));
item.installBorder(borderPP);

graph.installRectanglePeripheryOps(item);

return item;
});

