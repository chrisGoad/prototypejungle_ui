core.require('/shape/shadedCircle.js',function (circlePP) {
let item =  svg.Element.mk('<g/>');

/*adjustable parameters */
item.dimension = 30;
item.armWidth = 0.3333; // as a fraction of dimension 10;
item.gap = 0.1666;//as a fraction of dimension 5
item.circleRadiusFraction = 1.01;
item.fill = 'rgb(64,64,62)';
item.outerFill = 'black';
/*end adjustable parameters */

item.resizable = true;

item.initializePrototype = function () {
  debugger;
  core.assignPrototype(this,'circleP',circlePP);
}

item.initialize = function () {
   let circleP = this.circleP;
   circleP.unselectable = true;
   circleP.fx = 0.5;
   circleP.fy = 0.5;
   circleP.midOpacity = 0.3;
   circleP.outerFill = this.fill;
   this.set('segP',svg.Element.mk('<path fill="blue" stroke="transparent" stroke-width = "1"/>'));
   this.segP.fill = this.outerFill;
   this.segP.unselectable = true;
   this.set('segments',core.ArrayNode.mk());
   for (let i=0;i<4;i++) {
     this.segments.push(this.segP.instantiate());
   }
   this.set('circle',this.circleP.instantiate().show());

}


item.updateSegment = function (seg,which) {   
  const p2str = function (letter,point) {
    return letter+' '+core.nDigits(point.x,5)+' '+core.nDigits(point.y,5)+' ';
  }
  let gap = this.dimension * this.gap;
  let segWidth = this.segWidth;
  let armWidth = (this.dimension) * (this.armWidth);
  const flip = function (RL,UD,pnt) {
    return Point.mk(RL?-pnt.x:pnt.x,UD?-pnt.y:pnt.y);
  } 
  let RL,UD,sweep;
  if (which === 'UL') {
    RL = 0;
    UD = 0;
    sweep = 1;
  } else if (which === 'LL') {
    RL = 0;
    UD = 1;
    sweep = 0;
  } else if (which === 'UR') {
    RL = 1;
    UD = 0;
    sweep =0;
  } else if (which === 'LR') {
    RL = 1;
    UD = 1;
    sweep = 1;
    
  }   
  let LO = flip(RL,UD,Point.mk(-segWidth-gap,-gap));
  let RO = flip(RL,UD,Point.mk(-gap,-segWidth-gap));
  let LI = flip(RL,UD,Point.mk(-(segWidth-armWidth)-gap,-gap));
  let RI = flip(RL,UD,Point.mk(-gap,-(segWidth-armWidth)-gap));
  let radius = Math.sqrt(2) * gap + segWidth - armWidth;
  this.radius = radius;
  let outerRadius = this.outerRadius;
  let path = p2str('M',LO);
  path += `A ${outerRadius} ${outerRadius} 0 0 ${sweep}`;
  path += p2str(' ',RO);
  path += p2str('L',RI);
  path += `A ${radius} ${radius} 0 0 ${sweep?0:1}`;
  path += p2str(' ',LI);
  path += p2str('L',LO);	
  seg.d = path;
}

item.update = function () {
  this.circle.dimension = this.dimension;
  this.outerRadius = 0.5 * (this.dimension)/(this.circleRadiusFraction);
  this.segWidth = this.outerRadius - this.dimension * this.gap;
  this.circle.outerFill = this.fill;
  this.segP.fill = this.outerFill;
  let segs = this.segments;
  this.updateSegment(segs[0],'UL');
 this.updateSegment(segs[1],'LL');
  this.updateSegment(segs[2],'UR');
  this.updateSegment(segs[3],'LR');
  this.circle.update();

}

return item;
});


