//This code implements the randomized square shape
core.require('/random/rectangle_utils.js',function (utils) {


let item =  svg.Element.mk('<path fill="none"  stroke-linecap="round" />');

/* adjustable parameters */
item.dimension = 35;
item.fill = 'transparent';
item.stroke = 'black';
item['stroke-width'] = 1;
item.randomFactor = 0.2;
/*end adjustable parameters*/

item.resizable = true;
//A spot is plain shape, that can be turned into a container 
item.role = 'spot';

item.update =  function () {
  this.d = utils.genPath(this);

}

return item;
});
