
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_24');
rs.randomizeOrder = 1;
let sqsz= 50;
//let sqd = 128;
let sqd = 64;
let ar = 1;
rs.saveImage = 1;
rs.loadFromPath = 0;
rs.numCols = ar*sqd;
rs.numRows = sqd;
rs.height =  sqd * sqsz;
rs.width = ar * rs.height;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'yellow';
	this.rectP['stroke-width'] = 2;
		core.assignPrototypes(this,'circleP',circlePP);
}  



const numPowers = function(n,p) {
	if (n === 0) {
		return 0;
	}
	if (n === p) { 
	  return 1;
	}
	if (n%p === 0) {
		return 1 + numPowers(n/p,p);
	}
	return 0;
}

rs.sizeFactor = function (rvs, cell) {
	let {x,y} = cell;
	let px = numPowers(x,2);
	let py = numPowers(y,2);
	return Math.min(px,py);
	return px+py;
}
	
rs.shapeGenerator = function (rvs,cell) {
	  debugger;
		let {shapes,rectP,circleP,numRows,numCols,genCircles} = this;
	  //let shape = rectP.instantiate();
	  let shape = (this.genCircles)?circleP.instantiate():rectP.instantiate();
		let fc = this.sizeFactor(rvs,cell);
		let dim = Math.pow(fc+1,1.2) *40;
		if (!this.genCircles) {
			shape.width = dim;
			shape.height = 2*dim;
			shape.height = dim;
		} else {
			shape.dimension = dim;
		}
		shapes.push(shape);
		let r = 100 + Math.random() * 155;
		let g = 100 +Math.random() * 155;
		let b = 100 + Math.random() * 155;
   // if (1 || (fc >= 2)) {
    //if (0 && (fc >= 2)) {
    if (fc >= 2) {
			shape.fill = 'rgba(255,255,255,0.5)';
			shape.fill = 'rgba(0,0,255,0.5)';
		} else {
      shape.fill = 'rgba(0,0,255,0.4)';
      shape.fill = `rgba(${r},${g},${b},0.5)`;
		}
		shape.show();
		return shape;
	}


  
     
     
 
		


rs.initialize = function () {
  
	core.root.backgroundColor = 'black';
//	core.root.backgroundColor = 'rgb(100,100,0)';
	this.initProtos();
 this.setupShapeRandomizer('redOrWhite',{step:0.5,min:0,max:2});

	this.initializeGrid();
debugger;
 /* let line = this.lineP.instantiate();
  let hht = 0.5*this.height;
  line.setEnds(Point.mk(0,-hht),Point.mk(0,hht));
  this.set('line0',line);
  line.show();*/

}
		

return rs;

});

