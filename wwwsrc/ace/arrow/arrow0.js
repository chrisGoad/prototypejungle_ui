// arrow

core.require('/text/attachedText.js',function (textItemP) {

let item = svg.Element.mk('<g/>');

/* adjustable parameters */
item.headInMiddle = false;
item.stroke = "black";
item['stroke-width'] = 2;
item.headLength = 10;
item.headWidth = 8;
item.headGap = 0; // arrow head falls short of end1 by this amount
item.tailGap = 0; // arrow tail is this distance away from end0
item.includeEndControls = true; // turned on when added, and off when connected
item.text = '';
item.doubleEnded = false;
item.includeHead = true;
/*end adjustable parameters */



let textPropertyValues = core.lift(dom.defaultTextPropertyValues);
textPropertyValues.lineSep = 12;
let textProperties = Object.getOwnPropertyNames(textPropertyValues);
item.set('textProperties',textPropertyValues);
item.textProperties.__hideInUI = true;
item.textProperties.__setFieldType('stroke','svg.Rgb');

item.role = "edge";

let transferredProperties = ['text','stroke','stroke-width','headLength','headWidth','headGap','tailGap',
                             'includeEndControls'];

item.transferState = function (src,own) { //own = consider only the own properties of src
  core.setProperties(this,src,transferredProperties,own);
  if (src.includeEndControls) {
    this.end0.copyto(src.end0);
    this.end1.copyto(src.end1);
  }
  if (src.textItem) {
    if (!this.textItem) {
      this.set('textItem',textItemP.instantiate());
      this.textItem.unselectable = true;
    }
    this.textItem.transferState(src.textItem,own);
  }
 
}

item.set("end0",geom.Point.mk(0,0));
item.set("end1",geom.Point.mk(50,0));
item.set("direction",geom.Point.mk(0,0)); // direction at end1
item.set("direction1",geom.Point.mk(0,0)); // direction at end1
item.set("direction0",geom.Point.mk(0,0)); // direction at end1

let normal,length;

item.computeParams = function () {
  let {end0,end1} = this;
  length = end0.distance(end1);
  let dir = end1.difference(end0).normalize()
  this.direction.copyto(dir);
  this.direction1.copyto(dir);
  this.direction0.copyto(dir.times(-1));
  normal = this.direction.normal();
}

item.computeEnd0 = function (deviation) {
 return this.end0.plus(this.direction.times(deviation));
}

item.computeEnd1 = function (deviation) {
 return this.end1.plus(this.direction.times(deviation));
}

item.middle = function () {
 return this.end0.plus(this.end1).times(0.5);
}

item.update = function () {
  let includeHead =  this.includeHead;
  this.computeParams();
  if ((!this.head) && includeHead) {
    this.set('head',this.headP.instantiate()).show();
    this.head.unselectable = true;
  } else if ((this.head) && (!includeHead)) {
    this.head.remove();
  }
  if (!this.shaft) {
    this.set('shaft',this.shaftP.instantiate()).show();
    this.shaft.unselectable = true;
    this.shaft.role = 'line';

  }
   if (includeHead && this.doubleEnded && (!this.tail)) {
      this.set('tail',this.headP.instantiate());
      this.tail.unselectable = true;
      this.tail.show();
    }     
  let e0 = this.end0;
  let e0p = this.computeEnd0(this.tailGap);
  let e1p = this.computeEnd1(-this.headGap);
  let shaftEnd = (includeHead && this.head.solidHead  && !this.headInMiddle)?this.computeEnd1(-0.5*this.headLength-this.headGap):e1p;
  let shaftStart = (includeHead && this.doubleEnded && this.tail.solidHead)?this.computeEnd0(0.5*this.headLength+this.tailGap):e0p;
  let headPoint;
  if (includeHead) {
    headPoint = this.headInMiddle?
      (e0.plus(e1p).times(0.5)).plus(this.direction.times(this.headLength*0.5)):e1p;
  }
  let tailPoint;      
  if (this.doubleEnded) {
    tailPoint = e0p;
  }
  this.shaft['stroke-width'] = this['stroke-width'];
  this.shaft.stroke = this.stroke;
  if (this.shaft.setEnds) { // might be a dummy before replacePrototype
    this.shaft.setEnds(shaftStart,shaftEnd);
    this.shaft.update();
  }
  
  if (includeHead && this.head.headPoint && this.head.headPoint.copyto) {
    this.head.headPoint.copyto(headPoint);
    this.head.direction.copyto(this.direction);
  }
  if (includeHead && this.doubleEnded && this.tail.headPoint && this.tail.headPoint.copyto) {
    this.tail.headPoint.copyto(tailPoint);
    this.tail.direction.copyto(this.direction.times(-1));
  }
  if (includeHead && this.head.solidHead) {
    this.head.fill = this.stroke;
    if (this.doubleEnded) {
      this.tail.fill = this.stroke;
    }
  } else if (includeHead) {
    core.setProperties(this.head,this,['stroke','stroke-width']);
    if (this.doubleEnded) {
      core.setProperties(this.tail,this,['stroke','stroke-width']);
    }
  }
  if (includeHead) {
    core.setProperties(this.head,this,['headLength','headWidth']);
    if (this.doubleEnded) {
      core.setProperties(this.tail,this,['headLength','headWidth']);
    }
    if (this.head.update) {
      this.head.update();
    }
    if (this.doubleEnded && this.tail.update) {
      this.tail.update();
    }
  }
  if (this.text) {
    if (!this.textItem) {
      this.set('textItem',textItemP.instantiate());
      this.textItem.unselectable = true;
    }
    this.textProperties.__hideInUI = false;
    let proto = Object.getPrototypeOf(this);
    proto.textProperties.__hideInUI = false;
    core.setProperties(this.textItem,this.textProperties,textProperties);
    this.textItem.update();
  } else {
    this.textProperties.__hideInUI = true;
  }
}

item.controlPoints = function () {
  this.computeParams();
  let rs =  [];
  if (this.includeEndControls) {
    rs.push(this.end0);
    rs.push(this.end1);
  }
  if (this.includeHead) {
    let headControlPoint = this.head.controlPoint();
    rs.push(headControlPoint);
  }
  return rs;
}

item.updateControlPoint = function (idx,rpos) {
  let headControlIndex = (this.includeHead)?(this.includeEndControls?2:0):-1;
  switch (idx) {
    case headControlIndex:
      this.head.updateControlPoint(rpos);
      ui.updateInheritors(ui.whatToAdjust);
      return;
    case 0:
      if (this.end0vertex) {
        graph.mapEndToPeriphery(this,this.end0,this.end0vertex,'end0connection',rpos);
      } else {
        this.end0.copyto(rpos);
      }
      break;
    case 1:
      if (this.end1vertex) {
        graph.mapEndToPeriphery(this,this.end1,this.end1vertex,'end1connection',rpos);
      } else {
        this.end1.copyto(rpos);
      }
      break;
  }
  this.update();
  this.draw();
}

item.afterCopy = function () {
  let delta = this.end1.difference(this.end0);
  this.end0.copyto(Point.mk(0,0));
  this.end1.copyto(delta);
}


item.setEnds = function (e0,e1) {
  this.end0.copyto(e0);
  this.end1.copyto(e1);
} 


item.installShaftAndHead = function (shaftPP,headPP) {
  core.assignPrototypes(this,'shaftP',shaftPP,'headP',headPP);
}

ui.hide(item,['head','direction',"text",'textItem','includeEndControls',//shaft,
              'headInMiddle','end0','end1']);

item.setFieldType('stroke','svg.Rgb');
item.setFieldType('doubleEnded','boolean');
item.setFieldType('includeHead','boolean');

graph.installEdgeOps(item);

return item;
});
