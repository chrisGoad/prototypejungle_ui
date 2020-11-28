
core.require('/gen1/grid0_3.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor,addSetName)	{ 


  let rs = svg.Element.mk('<g/>');
	addSetName(rs);
	
	
	rs.setName('grid0_3_combo4');

 

const finishProtos = function (grid) {
	grid.rectP.stroke = 'rgba(0,0,0,.8)';
	//grid.rectP.stroke = 'rgba(255,255,0,.9)';
	grid.rectP['stroke-width'] = 0.2;
}

	let grid0= rs.set('grid0',constructor());
	let grid1 = rs.set('grid1',constructor());
	let grid2 = rs.set('grid2',constructor());
	let grid3 = rs.set('grid3',constructor());
	grid0.backgroundColor = 'white';
	grid1.backgroundColor = 'yellow';
	grid2.backgroundColor = 'yellow';
	grid3.backgroundColor = 'black';
	
	let grids = [grid0,grid1,grid2,grid3];
	let sqd = 48;
  let ar = 2;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:1,widthFactor:3,heightFactor:.7};
	grids.forEach( (grid) => {Object.assign(grid,gParams);grid.finishProtos = () => finishProtos(grid)});
  grid1.widthFactor = .7;
	grid1.heightFactor = 3;	
	grid2.widthFactor = .7;
	grid2.heightFactor = 3;
	
	//Object.assign(grid0,gParams);
	//Object.assign(grid1,gParams);
	//grid0.finishProtos  = function () {finishProtos(this);}
	//grid1.finishProtos  = function () {finishProtos(this);}
/*let sqd = 100;
let ar = 1;
grid0.numCols = ar*sqd;
grid1.numCols = ar*sqd;
grid0.numRows = sqd;
grid1.numRows = sqd;*/
//let wdf = 6/ar;
//let htf = .7;
/*grid1.colorSetter = function (shape,fc) {
	debugger;
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	
  if (fc === 0) {
		shape.fill = `rgba(${r},0,0,0.4)`;
	} else if (fc === 1) {
		shape.fill = `rgba(0,${g},0,0.4)`;
  } else if (fc === 2) {
		shape.fill = `rgba(0,0,${b},0.4)`;
			//	shape.fill = 'rgba(255,255,255,0.4)';

	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';
	} else if (fc === 4) {
		shape.fill = 'white';
	}
}*/
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
grid2.colorSetter = function (shape,fc) {colorSetter0(this,shape,fc);}
grid3.colorSetter = function (shape,fc) {colorSetter2(this,shape,fc);}

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
	let fc = grid.sizeFactor(rvs,cell);
	grid.colorSetter(shape,fc);
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

grids.forEach( function (grid) {
	grid.shapeGenerator = function (rvs,cell) {
	  return shapeGenerator(this,rvs,cell);
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
	grids.forEach((grid) => grid.initialize());
	//grid1.initialize();
	//grid0.initialize();
	
	//this.initWsq();
	let mby = 0.6 * grid1.width;
	grid0.moveto(Point.mk(-mby,-mby));
	grid1.moveto(Point.mk(mby,-mby));
	grid2.moveto(Point.mk(-mby,mby));
	grid3.moveto(Point.mk(mby,mby));
		core.root.backgroundColor = 'black';
	//	core.root.backgroundColor = 'gray';
	//core.root.backgroundColor = 'white';

}

return rs;

});

