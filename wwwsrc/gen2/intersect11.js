
//core.require('/line/wavyLine.js','/shape/circle.js','/random/addIntersectingLines4.js',function (linePP,circlePP,addMethods) {
core.require('/line/wavyLine.js','/shape/circle.js','/gen0/lines0.js','/gen0/basics.js',function (linePP,circlePP,addMethods,addBasicMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addBasicMethods(item);
item.setName('intersect11');
/*adjustable parameters  */


item.initializeProto = function (itm,left) {
  core.assignPrototypes(itm,'lineP',linePP);
  itm.lineP.stroke = 'white';
  itm.lineP.stroke = left?'rgb(230,230,230)':'rgb(232, 159, 39)';
  itm.lineP.radius = 150;
  itm.lineP['stroke-width'] = .025; 	
   core.assignPrototypes(itm,'circleP',circlePP);
  //this.lineP['stroke-width'] = 1; 	
}  


const seg2line = function (itm,lsg,isLeft) {
  let {end0,end1} = lsg;
  let e0x = end0.x;
  let e1x = end1.x;
  let tmp;
  if ((isLeft &&( e0x < e1x)) || (!isLeft && (e0x >= e1x))) {
    let tmp = end0;
    end0 = end1;
    end1 = tmp;
  }
  end0.y = end1.y;
  let e0y = end0.y;
  let e1y = end1.y;
  let emy  = 0.5*(e0y+e1y);
  let miny = -0.5*(itm.height);
  let radius = 1000;//1000 - 8*(emy-miny);
  let line = itm.lineP.instantiate();
  line.sweep = isLeft?((emy<0)?1:0):((emy >= 0)?1:0);
  line.setEnds(end0,end1);
  return line;
}

item.initialize = function () {
	debugger;
  let left = this.set('left',svg.Element.mk('<g/>'));
  let right = this.set('right',svg.Element.mk('<g/>'));
  this.initializeProto(left,true);
  this.initializeProto(right,false);
  left.dimension = 200;
  right.dimension = 200;
  addMethods(left);
  addMethods(right);

  left.numLines=4000;
  right.numLines=2500;
  left.angleMin = -10;
  right.angleMin = -10;
  left.angleMax = 10;
  right.angleMax = 10;
  //this.angleMin = -45;
 // this.angleMax = 45;
  //this.numLines=200;
 // core.root.backgroundColor = 'rgb(24, 24, 69)';
 core.root.backgroundColor = 'black';
 /*let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.stroke = 'white';
 circle.stroke = 'transparent';
 circle.update();
 circle.show();*/
 this.excludeLineFunction = function (sg) {
    let md = sg.middle();
    let ln = md.length();
    return(ln > 40);
  //  return (ln >80) || (ln <40) 
  }
 
 //this.lineCenterDistance = 40;
 left.segmentToLineFunction = (itm,lsg) => seg2line(itm,lsg,true);
  right.segmentToLineFunction = (itm,lsg) => seg2line(itm,lsg,false);
  //left.initializeLines();
  left.initializeLines();
  //right.initializeLines();
  right.initializeLines();
  left.moveto(Point.mk(-110,0));
  right.moveto(Point.mk(110,0));
}	
return item;
});
      

