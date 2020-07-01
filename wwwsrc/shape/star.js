//polygon
// coded by Olivier Bauer Simon

//regular polygon

core.require(function () {
let item =  svg.Element.mk('<polygon/>');

/* adjustable parameters */
item.fill = "transparent";
item.stroke = "black";
item['stroke-width'] = 1;
item.dimension = 30;
item.innerDimension = 0.5;// as fraction
item.numberOfSides = 5;          //Number of sides
item.theta = 0;                 //Tilt angle of polygon, degrees
/* end adjustable parameters */

item.resizable  = true;
item.role = 'spot';
item.dimension = 30;
item.setComputedProperties(['points']);

item.update = function () {
  let p2str = function (point,after) {
    return point.x+' '+point.y+after;
  };
  let n = this.numberOfSides;
  let start = (2*this.theta + (180 - (360/n)))*Math.PI/360;
  let r = this.dimension/2;
  let innerR = r * this.innerDimension;
  let path = p2str(geom.Point.mk(r*Math.cos(0*2*Math.PI/n+start), r*Math.sin(0*2*Math.PI/n+start)),' ');
  path += p2str(geom.Point.mk(innerR*Math.cos(Math.PI/n+start), innerR*Math.sin(Math.PI/n+start)),' ');

  for (let i = 1; i <= n; i++) {
      path += p2str(geom.Point.mk(r*Math.cos(i*2*Math.PI/n+start), r*Math.sin(i*2*Math.PI/n+start)),' ');
      path += p2str(geom.Point.mk(innerR*Math.cos((i*2 +1)*Math.PI/n+start), innerR*Math.sin((i*2+1)*Math.PI/n+start)),' ');
  }
  this.points = path;
}

ui.hide(item,['points']);
graph.installCirclePeripheryOps(item);

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,ui.stdTransferredProperties,own);
}

return item;
});

