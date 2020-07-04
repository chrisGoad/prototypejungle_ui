
core.require('/box/basic.js','/line/wavyLine.js','/container/container.js',function (borderPP,linePP,containerP) {

let item = containerP.instantiate();

/*adjustable parameters  */
item.width = 40;
item.height = 30;
item.extraRight = 15;
item.extraLeft = 5;
item.stroke = 'black';
item['stroke-width'] = 2;
item.fill = 'transparent';
item.cornerOffset = 0;
/* end adjustable parameters */

item.role = 'vertex';

item.set('borderProperties',core.lift(['extraRight','extraLeft','cornerOffset']));

item.installBorder(borderPP);
//debugger;
//core.assignPrototype(item.borderP,'lineP',linePP);// a test

graph.installRectanglePeripheryOps(item);

return item;
});

