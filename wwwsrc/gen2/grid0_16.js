
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	rs.setName('grid0_16');

  let sqsz= 50;
  let sqd = 50;

	
	rs.saveImage = 1;
  rs.loadFromPath = 0;
	rs.numCols = 1.5*sqd;
	rs.numRows = sqd;
		
	rs.height = 0.8 * sqd * sqsz;
	rs.width = 1.5 * rs.height;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke = 'black';
	this.rectP.fill = 'blue';
	this.rectP['stroke-width'] = 2;
	this.rectP.width = sqsz;
  this.rectP.height = sqsz;
		core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'blue';
	this.circleP.dimension =20;
	core.assignPrototypes(this,'lineP',linePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.lineP.stroke= 'rgba(255,255,0,0.2)';
  this.lineP['stroke-width']= 10;



}  



rs.shapeGenerator = function (rvs,cell) {
		let {shapes,rectP,numRows,numCols} = this;
    debugger;
    let rOw = rvs.redOrWhite;
	  let shape = rectP.instantiate();
    let hc = 0.5*numCols;
    let fc = Math.abs(cell.x - hc)/numRows+0.05;
    //let dim = (Math.abs(cell.x - hc)/numRows+0.1) * 1.4 * sqsz;
    //let dim = Math.sqrt(fc) * 1.4 * sqsz;
    let dim = fc * 2 * sqsz;
   // let dim =  Math.sqrt(fc) * 2 * sqsz;
    shape.width = dim;
    shape.height = dim;
		shapes.push(shape);
    //shape.fill = (Math.random() < 0.5)?'rgba(255,255,255,0.6)':'rgba(25,25,25,0.6)';
    let lev = 100 + rOw*50;
    shape.fill = (rOw < 1)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
  //  shape.fill = 'rgba(255,255,255,0.6)';
    //shape.fill = (rOw < 1)?`rgba(${lev},${lev},${lev},0.6)`:`rgba(${lev},25,25,0.6)`;
   // shape.fill = (Math.random() < 0.5)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
    //shape.width = shape.height = (1 + Math.random()) * sqsz;
    //shape.height = (1 + Math.random()) * sqsz;
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
  let line = this.lineP.instantiate();
  let hht = 0.5*this.height;
  line.setEnds(Point.mk(0,-hht),Point.mk(0,hht));
  this.set('line0',line);
  line.show();

}
		

return rs;

});

