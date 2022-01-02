
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/lines.js','/mlib/topRandomMethods.js',
function (rectPP,linePP,circlePP,rs,addGridMethods,addLineMethods,addRandomMethods)	{ 

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();

  addGridMethods(rs);
  addRandomMethods(rs);
	rs.setName('grid0_19');
	rs.numTimeSteps = 100;
  rs.randomizeOrder = 1;
  let sqsz= 50;
  let sqd = 50;
	let wd = 0.8 * sqd * sqsz;
	let topParams = {width:wd,height:wd,backgroundColor:'rgb(100,100,100)',backgroundPadding:0.1*wd};
	Object.assign(rs,topParams);
	

//sqsz =20;
//sqd = 20;
	rs.saveImage = 1;
  rs.loadFromPath = 0;
	rs.numCols = 1*sqd;
	rs.numRows = sqd;
		
	rs.height = 0.8 * sqd * sqsz;
	rs.width = 1 * rs.height;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'black';
	this.rectP.fill = 'blue';
	this.rectP['stroke-width'] = 4;
//	this.rectP['stroke-width'] = 0;
	this.rectP.width = sqsz;
  this.rectP.height = sqsz;
		core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'blue';
	this.circleP.dimension =20;
	core.assignPrototypes(this,'lineP',linePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.lineP.stroke= 'rgba(255,255,0,0.9)';
  this.lineP['stroke-width']= 10;



}  

let baseColor = 100;

rs.shapeGenerator = function (rvs,cell) {
		let {shapes,rectP,circleP,numRows,numCols} = this;
    let rOw = rvs.redOrWhite;
	 let shape = rectP.instantiate();
	 // let shape = circleP.instantiate();
    let hc = 0.5*numCols;
    //let fc = Math.abs(cell.x - hc)/numRows+0.05;
  //  let fc = Math.min(cell.x/numRows,1 - cell.x/numRows)+0.01;
    let c = Point.mk(hc,hc);
    let dist = c.distance(cell);
    let rdist = dist/(0.5 * numRows);
    let fc =1 - rdist;
    let clr = 100 + 200*(1-rdist);
   // let fc =1 -  dist/(0.5*numRows);
  //  let fc =1 -  c.distance(cell)/(0.5*numRows);
   // let fc = Math.min(cell.x/numRows,1 - cell.x/numRows)+0.01;
   // fc = 0.75;
    //let dim = (Math.abs(cell.x - hc)/numRows+0.1) * 1.4 * sqsz;
    //let dim = Math.sqrt(fc) * 1.4 * sqsz;
   // let dim = fc * 2 * sqsz;
    
    let dim =  Math.sqrt(Math.max(0,fc)) * 2 * sqsz;
   console.log('dim',dim,' rOw ',rOw);
    //shape.dimension  = dim;
    shape.width = dim;
    shape.width = 1 * dim;
    shape.height = dim;
    shape.height = 1*dim;
		shapes.push(shape);
    shape.update();
    shape.show();
    //shape.fill = (Math.random() < 0.5)?'rgba(255,255,255,0.6)':'rgba(25,25,25,0.6)';
    let lev = 100 + rOw*50;
   // shape.fill = (rOw < 1)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
   // shape.fill = 'rgba(255,255,255,0.6)';
   // shape.fill = Math.random() <.5? 'red':'black';
   // shape.fill = (rOw < 1)?`rgba(${lev},${lev},${lev},0.6)`:`rgba(${lev},25,25,0.6)`;
    //shape.fill = (rOw < 1)?`rgba(255,0,0,1)`:`rgba(255,255,255)`;
    let scolor = Math.max(baseColor,clr - 50);
     shape.fill = (rOw < 1)?`rgba(${scolor-50},${scolor-50},${clr},1)`:`rgba(${clr},${clr},${clr})`;
    //shape.fill = (rOw < 1)?`rgba(0,0,${clr},1)`:`rgba(${clr},${clr},${clr})`;
    shape.stroke = (rOw < 1)?`rgba(0,0,${scolor},1)`:`rgba(${scolor},${scolor},${scolor})`;
    //shape.fill = (rOw < 1)?`rgba(0,0,255,1)`:`rgba(255,255,255)`;
   // shape.fill = (Math.random() < 0.5)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
    //shape.width = shape.height = (1 + Math.random()) * sqsz;
    //shape.height = (1 + Math.random()) * sqsz;
		shape.show();
		return shape;
	}


  
     
     
 
		


rs.initialize = function () {
  
	core.root.backgroundColor = 'black';
	//core.root.backgroundColor = 'gray';
//	core.root.backgroundColor = 'rgb(100,100,100)';
	this.initProtos();
 this.setupShapeRandomizer('redOrWhite',{step:0.5,min:0,max:2});

	this.initializeGrid();
return;
debugger;
  let line1 = this.lineP.instantiate();
  let hht = 0.5*this.height;
  line1.setEnds(Point.mk(0,-hht),Point.mk(0,hht));
  this.set('line0',line1);
  line1.show();
  let line2 = this.lineP.instantiate();
  //let hht = 0.5*this.height;
  line2.setEnds(Point.mk(-hht,0),Point.mk(hht,0));
  this.set('line1',line2);
  line2.show();

}
		
rs.step = function () {
  this.regenerateShapes();
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
}
return rs;

});

