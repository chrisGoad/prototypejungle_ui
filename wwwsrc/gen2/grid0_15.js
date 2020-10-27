
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	rs.setName('grid0_14');

	
	rs.saveImage = 1;
  rs.loadFromPath = 0;
	
let innerLproto = svg.Element.mk('<g/>');
	addGridMethods(rs);
	//addGridMethods(innerGproto);
	addLineMethods(innerLproto);
	innerLproto.numLines = 60;;
	innerLproto.angleMin = -90;
	innerLproto.angleMax = 90;
	
	
	let outerRC = 6;
	rs.numRows= outerRC;
	rs.numCols = outerRC;
	let fc = 1.1;
	fc = 0.3;
  //fc = 1;
  let innerDim = 40;
	let outerDim = fc * innerDim * outerRC;
	rs.width = outerDim;
	rs.height = outerDim;
	rs.numDrops = 20;
	rs.pointJiggle = 0;
	//rs.spatter = 1;

	
		
		
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 1;
	this.rectP.width = 1;
	this.rectP.height = 4;
		core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'blue';
	this.circleP.dimension =20


}  


innerLproto.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 0.1;
}


rs.shapeGenerator = function (rvs,cell) {
		let {shapes,rectP} = this;
		debugger;
		let {x,y} = cell;
		
		let rn = Math.floor(Math.random() * 4);
		let shape;
		if (0 &&(rn === 0)) {
			shape = circleP.instantiate();
	  } else if (0 && (rn< 3)) {
		  shape = innerGproto.instantiate();
  //shape.genCircle = (cell.x + cell.y)%2 === 0;
      shape.genCircle = rn === 1;
		  shape.initProtos();
			shape.initializeGrid();	
		} else {
      shape = innerLproto.instantiate();
			shape.initProtos();
			//shape = rectP.instantiate();
     // shape.stroke = 'black';
      let rn = 0.5  + 0.5*Math.random();
			if (1 && ((x > 1) && (x<4)) && ((y>1) && (y<4))) {
				//shape.angleMin = -10;
				//shape.angleMax = 10;
    
				shape.width = rn * 0.5 * innerDim;
				shape.height = rn *0.5 * innerDim;
				shape.backgroundColor= 'red';
			} else if (1 && ((x > 0) && (x<5)) && ((y>0) && (y<5))) {
			  shape.width = rn * 0.75 * innerDim;
        shape.height = rn* 0.75 * innerDim;
			  shape.backgroundColor = 'green';

			} else {
        shape.width = rn*innerDim;
        shape.height = rn*innerDim;
				shape.backgroundColor = 'blue';
			}
      			shape.initializeLines();

		}
		shapes.push(shape);
		shape.show();
		return shape;
	}

const inRandomOrder = function (n) {
  debugger;
  let rs = []; 
  let inRs = [];
  for (let i=0;i<n;i++) {
    inRs[i] = 0;
  }
  const kthFree = function (k) {
    let found = 0;
    let cIndex = 0;
    while (found < k) {
      if (inRs[cIndex]) {
         cIndex++;
      } else {
        found++;
        cIndex++;
      }
    }
    return cIndex;
  }
  let numAllocated = 0;
  let numFree = n;
  while (numFree > 0) {
    let rn =Math.floor(Math.random() * numFree);
    if (rn === numFree) {
       rn--;
    }
    let next = kthFree(rn+1);
    rs.push(next);
    inRs[next] = 1;
    numFree--;
  }
  return rs;
}

console.log('inRandomOrder ',inRandomOrder(4));

  
     
     
  
    
     


		


rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	this.initializeGrid();

}
		

return rs;

});

