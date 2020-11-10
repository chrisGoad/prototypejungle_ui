
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	rs.setName('grid0_22');
  rs.randomizeOrder = 1;
	rs.phaseFactor = 40; 
	rs.phase0dim = 60;
	rs.numTimeSteps = 100;

  let sqsz= 50;
  let sqd = 50;

	
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



rs.shapeGenerator = function (rvs,cell) {
		let {shapes,rectP,circleP,numRows,numCols,phaseFactor,phase0dim} = this;
    //debugger;
  //  let shade = rvs.shade;
    let {r,g,b}  = rvs;
	 let shape = rectP.instantiate();
	 // let shape = circleP.instantiate();
    let phase = rvs.phase;
		let dim = Math.cos(phase) * phaseFactor + phase0dim;
		//console.log('dim',dim,' phase ',phase);
    //let dim =  rvs.dimension;//50;//Math.sqrt(Math.max(0,fc)) * 2 * sqsz;
    //shape.dimension  = dim;
    shape.width = dim;
    shape.height = dim;
		shapes.push(shape);
   // shape.fill = `rgba(${shade},${shade},${shade})`;
    shape.fill = `rgba(${r},${g},${b},0.5)`;
   // shape.fill = (Math.random() < 0.5)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
    //shape.width = shape.height = (1 + Math.random()) * sqsz;
    //shape.height = (1 + Math.random()) * sqsz;
		shape.show();
		return shape;
	}


rs.shapeUpdater= function (shape,rvs,cell,cnt,idx) {
	let {timeStep,numTimeSteps,phaseFactor,phase0dim} = this;
	debugger;
	let {r,g,b,phase:iPhase}  = rvs;

  let fr = timeStep/numTimeSteps;
	//let iPhase = rvs.phase;

	let phase = iPhase + fr * 2 * Math.PI;
	let dim = Math.cos(phase) * phaseFactor + phase0dim;
			console.log('dim',dim,' phase ',phase);

	shape.width = dim;
	shape.height = dim;
	shape.fill = `rgba(${r},${g},${b},0.5)`;

	shape.update();
	shape.show();
}

  
     
     
 
		


rs.initialize = function () {
  
	core.root.backgroundColor = 'black';
//	core.root.backgroundColor = 'gray';
//	core.root.backgroundColor = 'rgb(100,100,0)';
	this.initProtos();
 this.setupShapeRandomizer('r',{step:10,stept:10,min:100,max:240});
 this.setupShapeRandomizer('g',{step:10,stept:10,min:100,max:240});
 this.setupShapeRandomizer('b',{step:10,stept:10,min:100,max:240});
 //this.setupShapeRandomizer('dimension',{step:10,min:5,max:80});
 this.setupShapeRandomizer('phase',{step:0.3*Math.PI,min:0,max:2*Math.PI});

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



rs.step = function ()   {
	debugger;
	this.stepShapeRandomizer('r');
	this.stepShapeRandomizer('g');
	this.stepShapeRandomizer('b');
  this.updateGrid();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}
		

return rs;

});

