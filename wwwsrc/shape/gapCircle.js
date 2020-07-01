// circle with gaps

core.require(function () {
let item =  svg.Element.mk('<path/>');

/* adjustable parameters */
item.dimension = 30;  
item.fill = 'transparent';
item.stroke = 'black'
item.numGaps = 7;
item.gapFraction = 0.5;
item.gapInitialAngle = 30;
item['stroke-width']  = 1;
/* end adjustable parameters */

item.role = 'spot';
item.resizable = true;




item.computeArcs = function () {
  let {dimension,numGaps,gapFraction} = this;
  let r = dimension/2;
  let perPair = (2*Math.PI)/numGaps;
  let arcAngle = perPair * (1 - gapFraction);
  let rs = [];
  let cAngle = this.gapInitialAngle * (2*Math.PI/180);
  for (let i= 0;i<numGaps;i++)  {
    let pnt = Point.mk(Math.cos(cAngle),Math.sin(cAngle)).times(r);
    let gapEnd = cAngle + arcAngle;
    let gePnt = Point.mk(Math.cos(gapEnd),Math.sin(gapEnd)).times(r);
    rs.push([pnt,gePnt]);
    cAngle += perPair;
  }
  return rs;
}

item.mkArc = function(p0,p1) {
  let p2str = function (letter,point,after) {
    return letter+' '+point.x+' '+point.y+after;
  }
  let r = (this.dimension)/2;
  let path = p2str('M',p0,' ');
  path += p2str(`A ${r} ${r} 0 0 1`,p1,' ');
 // path += p2str('L',p1,' ');
  return path;
}


item.update = function () {
    debugger;
  let numGaps = this.numGaps;
  let arcs = this.computeArcs();
  let path = '';
  for (let i=0;i<numGaps;i++) {
    path += this.mkArc(arcs[i][0],arcs[i][1]);
  }
  debugger;
  this.d = path;
  
}



// used to compute where connections (eg arrows) terminate on this shape's periphery
graph.installCirclePeripheryOps(item);

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,ui.stdTransferredProperties,own);
}

return item;
});

