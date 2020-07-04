core.require('/assembly/nest2.js','/container/container.js',function (borderPP,containerP) {
let item = containerP.instantiate();

/* This is a container whose border is a rectangle */ 

/*adjustable parameters  */
item.width = 35;
item.height = 25;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
/* end adjustable parameters */

// properties to be transferred to the border */
item.set('borderProperties',core.lift(['fill','stroke','stroke-width']));
item.installBorder(borderPP);
item.peripheryType = 'rectangle';
item.role = 'vertex';

item.update = function () {
  debugger;
  this.containerUpdate();
  if (this.border) {
    this.border.role = 'spot';
    let src = this.border.outer.__sourceUrl;
    if (src === '/shape/lozenge.js') {
      this.peripheryType = 'lozenge';
    }
  }
}
debugger;
// This makes the item suitable for use as a graph vertex.
graph.installPeripheryOps(item);

return item;
});

