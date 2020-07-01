
core.require('/container/circle.js','/grid/grid2.js',function (elementPP,grid) {

let item = svg.Element.mk('<g/>');

/*adjustable parameters  */

item.numRows= 6;
item.numCols= 6;
item.deltaX =  70;
item.deltaY = item.deltaX;
item.sizeFactor1 = 1;
item.sizeFactor2 = 1.2;


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

