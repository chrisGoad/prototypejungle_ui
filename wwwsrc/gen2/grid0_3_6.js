
core.require('/gen1/grid0_3.js','/gen0/animation.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor,addAnimate)	{ 


  let rs = svg.Element.mk('<g/>');
	addAnimate(rs);
	
	
	rs.setName('grid0_3_6');
	rs.numTimeSteps = 100;

 

const finishProtos = function (grid) {
	grid.rectP.stroke = 'rgba(0,0,0,.8)';
	//grid.rectP.stroke = 'rgba(255,255,0,.9)';
	grid.rectP['stroke-width'] = 0.2;
}

	let grid0= rs.set('grid0',constructor());
	grid0.isGrid0 = 1;
	let grid1 = rs.set('grid1',constructor());
	
	//grid0.backgroundColor = 'white';
	//grid1.backgroundColor = 'yellow';
	
	
	let grids = [grid0,grid1];
	let sqd = 32;
  let ar = 1;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:0,widthFactor:1,heightFactor:1};
	grids.forEach( (grid) => {Object.assign(grid,gParams);grid.finishProtos = () => finishProtos(grid)});
  //grid1.widthFactor = .7;
	//grid1.heightFactor = 3;	
	//grid2.widthFactor = .7;
	//grid2.heightFactor = 3;
	
	
const colorSetter0 = function (grid,shape,ifc) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	//shape.fill  = 'black';
	let fc = ifc-0;
  if (fc <= 1) {
				shape.fill = `rgba(${r},0,0,0.4)`;
	} else if (fc === 2) {
			shape.fill = 'rgba(255,255,255,0.4)';
  } else if (fc === 3) {
		shape.fill = `rgba(0,${b},${b},0.4)`;

	} else if (fc === 4) {
	  shape.fill = 'rgba(255,255,255,0.4)';
	} 
}

const colorSetter1 = function (grid,shape,fc) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	//shape.fill  = 'black';
	shape.fill = `rgba(${r},${g},${b},0.4)`;
}
const colorSetter2 = function (grid,shape,ifc) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	//shape.fill  = 'black';
	let fc = ifc-0;
  if (fc <= 1) {
				shape.fill = `rgba(${r},0,0,0)`;
				shape.stroke = `rgba(${r},0,0,0)`;
	} else if (fc === 2) {
			//shape.fill = 'rgba(255,255,255,0.4)';
	    shape.fill = `rgba(${r},${r},0,0.4)`;
  } else if (fc === 3) {
		shape.fill = `rgba(0,${b},${b},0.4)`;

	} else if (fc === 4) {
	  shape.fill = 'rgba(255,255,255,0.4)';
	} 
}


grid0.colorSetter = function (shape,fc) {colorSetter0(this,shape,fc);}
grid1.colorSetter = function (shape,fc) {colorSetter0(this,shape,fc);}

const shapeGenerator = function (grid,rvs,cell) {
	debugger;
	let {shapes,rectP,deltaX,deltaY,widthFactor,heightFactor} = grid;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	//shape.width = 50;
	//shape.height = 35;
	shape.width = widthFactor * deltaX;
	shape.height= heightFactor * deltaY;
	shapes.push(shape);
	//let rvs = grid.randomValuesAtCell(grid.randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} = rvs;
	if (grid.isGrid0) {
	   shape.fill = `rgba(${r},${g},0,0.8)`;
	} else {
		shape.fill = `rgba(0,${g},${b},0.8)`;
	}
		
	/*if (fc === 0) {
		shape.fill = 'rgba(255,0,0,0.4)';
	} else if (fc === 1) {
		shape.fill = 'rgba(0,255,0,0.4)';
  } else if (fc === 2) {
		shape.fill = 'rgba(0,0,255,0.4)';
	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';S
	}*/
	shape.show();
	return shape;
}
const shapeUpdater = function (grid,shape,rvs) {
	let {r,g,b} = rvs;
	if (grid.isGrid0) {
	   shape.fill = `rgba(${r},${g},0,0.8)`;
	} else {
		shape.fill = `rgba(0,${g},${b},0.8)`;
	}
//	shape.fill = `rgba(${r},${g},${b},0.8)`;
}
	//this.shapeUpdater(shape, rvs,cell,cnt,idx);
grids.forEach( function (grid) {
	grid.shapeGenerator = function (rvs,cell) {
	  return shapeGenerator(this,rvs,cell);
	}
	grid.shapeUpdater = function (rvs,cell) {
		return shapeUpdater(this,rvs,cell);
	}
});

//grid1.shapeGenerator = function (rvs,cell) {
///	return shapeGenerator(this,rvs,cell);gr
//}

rs.initialize = function () {
	debugger;
	/*let grid0 = this.grid0;
	let grid1 = this.grid1;
	let grid3 = this.grid3;
	let grid4 = this.grid4;*/
	grids.forEach((grid) => 
		{  
			 grid.setupShapeRandomizer('r',{step:20,stept:10,min:100,max:255});
			 grid.setupShapeRandomizer('g',{step:20,stept:10,min:100,max:255});
			 grid.setupShapeRandomizer('b',{step:20,stept:10,min:100,max:255});
			 grid.initialize();

		});
													 
													 

	//grid1.initialize();
	//grid0.initialize();
	
	//this.initWsq();
	let mby = 0.6 * grid1.width;
//	grid0.moveto(Point.mk(-mby,-mby));
	//grid1.moveto(Point.mk(mby,-mby));
	//grid2.moveto(Point.mk(-mby,mby));
	//grid3.moveto(Point.mk(mby,mby));
		core.root.backgroundColor = 'black';
	//	core.root.backgroundColor = 'gray';
	//core.root.backgroundColor = 'white';

}


const step = function (grid)   {
	debugger;
	grid.stepShapeRandomizer('r');
	grid.stepShapeRandomizer('g');
	grid.stepShapeRandomizer('b');
  grid.updateGrid();
}

rs.step = function () {
	step(grid0);
	step(grid1);
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}

return rs;

});

