
//core.require('/line/wavyLine.js','/shape/circle.js','/random/addIntersectingLines4.js',function (linePP,circlePP,addMethods) {
core.require('/line/wavyLine.js','/shape/circle.js','/mlib/lines.js','/gen0/Basics.js',function (linePP,circlePP,addMethods,item) {
debugger;



import {rs as linePP} from '/line/wavyLine.mjs';
import {rs as basicP} from '/generators/basics.mjs';
import {rs as addLinesMethods} from '/mlib/lines.mjs';	

let item = basicP.instantiate();
addLinesMethods(item);

item.setName('lines_bugeye');
/*adjustable parameters  */


item.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  let left = 1;
  itm.lineP.stroke = left?'rgb(230,230,230)':'rgb(232, 159, 39)';
  itm.lineP.radius = 150;
  itm.lineP['stroke-width'] = .05; 	
   core.assignPrototypes(itm,'circleP',circlePP);
  //this.lineP['stroke-width'] = 1; 	
}  


 this.segmentToLineFunction = function (itm,lsg) {
  let {end0,end1} = lsg;
  let isLeft = 1;
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
item.excludeLineFunction = function (sg) {
    let md = sg.middle();
    let ln = md.length();
    return(ln > 40);
  //  return (ln >80) || (ln <40) 
  }

item.initialize = function () {
	debugger;
	draw.vars.jpgPadFactor = 1.1;
  let left = this.set('left',svg.Element.mk('<g/>'));
  let right = this.set('right',svg.Element.mk('<g/>'));
  this.initProtos();
  this.dimension = 200;
  this.numLines=4000;
  this.angleMax = 10;
 // core.root.backgroundColor = 'rgb(24, 24, 69)';
 core.root.backgroundColor = 'black';
 
 
 //this.lineCenterDistance = 40;
  this.initializeLines();
 
}	
export {item as rs};
});
      

