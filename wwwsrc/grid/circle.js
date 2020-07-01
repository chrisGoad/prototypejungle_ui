
core.require('/container/circle.js','/grid/grid.js',function (elementPP,grid) {

let item = svg.Element.mk('<g/>');

/*adjustable parameters  */

item.numRows= 7;
item.numCols= 7;
item.deltaX =  70;
item.deltaY = item.deltaX;
item.sizeFactor = 1.2;
item.randomFactor = .2;
item.randomSize = false;
item.jiggle = true;

item.dimension = 35;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

// properties to be transferred to the element
item.set('elementProperties',core.lift(['fill','stroke','stroke-width']));

grid.installGridMethods(item,elementPP);

return item;
});

