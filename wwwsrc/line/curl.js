// curved head 

core.require('/line/utils.js',function (utils) {

let item = svg.Element.mk('<g/>');
/*adjustable parameters */
item.radius = 20;
item.curlCount = 2;
item.stroke = "black";
item['stroke-width'] = 1;
item.role = 'line';
item.curlUpLeft = true;
item.curlDownLeft = false;
item.curlUpRight = true;
item.curlDownRight = false;

/*end adjustable parameters */

item.customControlsOnly = true;

item.set('end0',Point.mk(0,0));
item.set('end1',Point.mk(20,0));
item.set('direction',Point.mk(1,0));
item.set("curve", svg.Element.mk('<path stroke-linecap = "round" fill="black" />'));

item.curve.neverselectable = true;

const toRadians = function (angle) {
  return (Math.PI * angle)/180;
}

item.curlCenter = function ({up,right}) {
  debugger;
  let lup = right?!up:up;  // logical up

  let sp = right?this.end1:this.end0;
  let ep = right?this.end0:this.end1;
  let dir = ep.difference(sp).normalize();
 // let dir = this.direction;
  let nrm = dir.normal();
  if (lup) {
    nrm = nrm.minus();
  }
  let r = this.radius;
  return sp.plus(nrm.times(r));
}
item.generateCurl = function ({up,right}) {
  let lup = right?!up:up;  // logical up
   var p2str = function (letter,point,after) {
    return letter+' '+point.x+' '+point.y+after;
  }
  debugger;
  let curve  = this.curve;
  let sp = right?this.end1:this.end0;
  let ep = right?this.end0:this.end1;

  let dir = ep.difference(sp).normalize();
  let dirAngle = (Math.atan2(dir.y,dir.x) * 180)/(Math.PI);
 
  let r = this.radius;
  let center = this.curlCenter({up,right});
  const curvePoint = function (angle,radius) {
    let radians = toRadians(angle);
    let nvc = Point.mk(Math.cos(radians) ,-Math.sin(radians));
    return center.plus(nvc.times(radius));
  }
  let startAngle = (lup?-90:90)-dirAngle;
  let interval = 20;//up?-20:20;
  let lastAngle = lup?startAngle - 360 * this.curlCount:startAngle + 360 * this.curlCount;
  debugger;
  let firstP = curvePoint(startAngle,r);
  let d = this.curve.d;
  d += p2str('M',this.end1,' ');	
  d += p2str('L',firstP,' ');
  let currentAngle = lup?startAngle-interval:startAngle + interval;
  let currentPoint,currentRadius;
  let interpolateRadius = this.curlCount > 0.7;
  debugger;
  while (lup?currentAngle>lastAngle:currentAngle < lastAngle) {
    currentRadius = interpolateRadius?r * (1 - 0.5*((currentAngle - startAngle)/(lastAngle - startAngle))):r;
    currentPoint = curvePoint(currentAngle,currentRadius);
   // d += p2str('L',currentPoint,' ');
  //  d += `A ${currentRadius} ${currentRadius} 0 0 0 ${currentPoint.x} ${currentPoint.y}`;
    d += `A ${currentRadius} ${currentRadius} 0 0 ${lup?1:0} ${currentPoint.x} ${currentPoint.y}`;

    currentAngle = lup?currentAngle-interval:currentAngle + interval;
  }
  currentPoint = curvePoint(lastAngle,interpolateRadius?0.5 * r:r);
  //d += p2str('L',currentPoint,' ');
  d += `A ${currentRadius} ${currentRadius} 0 0 ${lup?1:0} ${currentPoint.x} ${currentPoint.y}`;

  curve.d = d;
}

  
item.update= function () {
  debugger;
  this.curve.stroke = this.stroke;
  this.curve['stroke-width'] = this['stroke-width'];
  this.curve.fill = 'transparent';
  this.curve.d = '';
  if (this.curlDownLeft) {
    this.generateCurl({up:false,right:false});
  }
  if (this.curlUpLeft) {
    this.generateCurl({up:true,right:false});
  }
  if (this.curlDownRight) {
    this.generateCurl({up:false,right:true});
  }
  if (this.curlUpRight) {
    this.generateCurl({up:true,right:true});
  }
  this.draw();
}


item.setEnds = function (e0,e1) {
  utils.setEnds(this,e0,e1);
}

item.controlPoints = function () {
  let pnts =  utils.controlPoints(this);
  let pnt;
  if (this.curlDownLeft) {
    pnt = this.curlCenter({up:false,right:false});
  } else if (this.curlDownRight) {
    pnt = this.curlCenter({up:false,right:true});
  } else if (this.curlUpLeft) {
    pnt = this.curlCenter({up:true,right:false});
  } else {
    pnt = this.curlCenter({up:true,right:true});
  }
  pnts.push(pnt);
  debugger;
  return pnts;
}

item.updateControlPoint = function (idx,rpos) {
  if (idx === 2) {
    this.radius  = this.end0.distance(rpos);
  }
  
   utils.updateControlPoint(this,idx,rpos);
}
/*

item.controlPoint = function () {
  return this.headBase0;
}

item.updateControlPoint = function (pos,forMultiOut) {
  return headSup.updateControlPoint(this,pos,forMultiOut);
}

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,['unselectable','neverselectable','solidHead'],own);
}
*/

return item;
});

