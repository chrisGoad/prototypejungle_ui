
//core.require('/ngen1/grid_0.js','/line/line.js',
core.require('/generators/basics.js','/line/line.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (rs,linePP,addGridMethods,addRandomMethods) {

addGridMethods(rs);
addRandomMethods(rs);
rs.setName('grid_4');
 // let rs = constructor();
//core.require('/line/line.js','/grid/addGrid8.js',function (linePP,addGridMethods) {
  debugger;
  let nr = 40;
  let topParams = {numRows:nr,numCols:nr,width:200,height:200,pointJiggle:9};
  Object.assign(rs,topParams);
/*	rs.saveImage = true;
	rs.setName('grid_4');
  rs.loadFromPath = 0;
//  rs.initProtos();
 rs.shapeP.stroke = 'white';
  rs.shapeP['stroke-width'] = 1;
	rs.blineP.stroke = 'rgb(255,255,0)';
	rs.blineP['stroke-width'] = 0.3;
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;
  //rs.deltaX = rs.numCols/rs.width;
  //rs.deltaY = rs.numRows/rs.height;
  //rs.visChance= 1;
  rs.pointJiggle = 9;
  //rs.includeShapes = true;
  //rs.includeCellBoundaries = 1;
 
  //rs.boundaryStrokeWidth =0.3;
 //rs.shapeStroke = 'white';
  //rs.shapeStrokeWidth = 1;
*/
rs.initProtos = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP.stroke = 'rgb(100,100,100)';
  //this.blineP.stroke = 'rgb(200,0,0)';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP',linePP);
  this.shapeP.stroke = 'rgb(250,100,100)';
  this.shapeP.stroke = 'white';
  let vec = Point.mk((this.width/this.numRows)*0.05,0);
  this.shapeP.setEnds(vec.minus(),vec);
  this.shapeP['stroke-width'] = .2; 	
  this.shapeP['stroke-width'] = 1; 	
 /* core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(255,0,0)';//'red';
  this.circleP.dimension = 3;
	 core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.stroke = 'transparent';
  this.rectP.fill = 'rgb(255,0,0)';//'red';
  this.rectP.width = 3;
  this.rectP.height= 3;*/
}  

  const biasFun = function (grid,i,j) {
		let params = grid.params;
    let {numCols,numRows} = params;
    let xf = i/numCols;
    let yf = j/numRows;
    let weight;
    if (xf < 0.2) {
      weight = 0;
    } else if (xf > 0.8){
      weight = 0;
    } else {
      weight = 1;
    }
    weight = Math.max(1 - 2*Math.abs(xf - 0.5),0.4);
    let rs = {weight:weight,value:.2};
    return rs;
  }
 // let {numRows,numCols} = rs;

  rs.shapeGenerator = function (rvs) {
    let shapes = this.shapes;
		let rs = svg.Element.mk('<g/>');
		shapes.push(rs);
		let factor2 = 1;
    const setup = (nm,shp,idx,count) => {
      rs.set(nm,shp);
      let dx = this.deltaX;
      let hln = (dx/count) * 0.05;// = 0.03;
      let x = -0.5*dx + (dx/(count+1))*(idx+1);
      if (1 || orientation == 'horizontal') {
        let p0 = Point.mk(x-hln,0);
        let p1 = Point.mk(x+hln,0);
        shp.setEnds(p0,p1);
      } else  if (orientation === 'vertical') {
        let y = this.deltaY*factor2;
        let p0 = Point.mk(0,-y);
        let p1 = Point.mk(0,y);
        shp.setEnds(p0,p1);
     
      } else  if (orientation === 'diagonal1') {
         let x = grid.deltaX*factor2;
        let y = grid.deltaY*factor2;
        let p0 = Point.mk(-x,-y);
        let p1 = Point.mk(x,y);
        shp.setEnds(p0,p1);
      } else  if (orientation === 'diagonal2') {
        let x = this.deltaX*factor2;
        let y = this.deltaY*factor2;
        let p0 = Point.mk(x,-y);
        let p1 = Point.mk(-x,y);
        shp.setEnds(p0,p1);
      }
      shp.update();
      shp.show();
    }
    
    let r0,r1;
    let disp = this.deltaX * 0.25;
    const num = Math.floor(Math.random()* 7.999)+1;
    if (num > 4) return;
    for (let i=0;i<num;i++) {
      let r = this.shapeP.instantiate();
      setup('r'+i,r,i,num);
    } 
    return rs;
  };
	

//rs.boundaryColorFunction = (c) => `rgb(0,${Math.floor(c)},${Math.floor(c)})`;


rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let {blineP,showMissing,lines,updating,lineIndex} = this;

	let line = this.nextLine(blineP);
	let c = rvs.color
	lines.push(line);
  line.setEnds(end0,end1);
	//if (this.boundaryColorFunction) {
		//line.stroke = this.boundaryColorFunction(c);
		line.stroke = `rgb(0,${Math.floor(c)},${Math.floor(c)})`;
	//} else {
 //   line.stroke =  `rgb(${Math.floor(c)},${Math.floor(c)},${Math.floor(c)})`;
	//}
	line.show();
	return line;
}
/*
rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	debugger;
  let lines = this.lines;
	let line = this.blineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.color;
	line.stroke = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
	line.update();
	line.show();	
}*/
rs.initialize = function () {
  let {numRows,numCols} = this;
  core.root.backgroundColor = 'black';
  this.initProtos();
	this.setupBoundaryRandomizer('color', {step:35,min:150,max:250,biasFun,numRows,numCols});
  this.initializeGrid();
}

  return rs;
});

