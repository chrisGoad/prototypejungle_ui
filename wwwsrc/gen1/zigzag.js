
core.require('/line/line.js','/shape/circle.js','/gen0/grid0.js',function (linePP,circlePP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);


/*adjustable parameters  */


rs.initProtos = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP.stroke = 'rgb(100,100,100)';
  this.blineP.stroke = 'rgb(200,0,0)';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'rgb(250,100,100)';
  let vec = Point.mk((this.width/this.numRows)*0.05,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .2; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(1,1,1)';//'red';
//  this.circleP.fill = 'red';
  this.circleP.dimension = 1;
}  


rs.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,shapeDescriptors,numCols,numRows,deltaX,symetrical,lineLength} = this;

  let dir = 0;
	if (this.verticalShape) {
    let sx = this.verticalShape.x;
    let sy = this.verticalShape.y;
    if ((cell.x === sx) && (cell.y === sy )){
      dir = 0.5*Math.PI;
      console.log('x '+cell.x+' y '+cell.y);
    }
	}
 	let idx = cell.index;

	let line0 = this.shapeP1.instantiate();
	shapes.set(idx,line0);
  this.setLineEnds(line0,lineLength,dir);
  if (0 && (dir !== 0)) {
    line0.stroke = 'white';
  }
	return line0;
}

rs.shortenLine = function (end0,end1,factor) {
  let vec = end1.difference(end0).times(0.5 * factor);
  let middle = end0.plus(end1).times(0.5);
  let nend0 = middle.plus(vec);
  let nend1 = middle.difference(vec);
  return [nend0,nend1];
}

rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
 let {numRows,numCols,showMissing,showStripes} = this;
	   
 let {x,y} = cell; 
 let hy = this.numRows/2;
 let hx = this.numCols/2;
 debugger;
 let missing;
 if (this.missingZag) {
	 let bx = this.missingZag.x;
	 let by = this.missingZag.y;
	 missing = (x === bx) && (y === by) && (orientation === 'horizontal');
	 //missing = 0;
  }
	if (showStripes) {
		let offCenterY = (y!==hy) && (y!==(hy+1));
		let offCenterX = (x!==hx) && (x!==(hx+1));
		let oneOffY  = (y === (hy+1)) && (orientation === 'vertical'); 
		let oneOffX =  (x === (hx+1)) && (orientation === 'horizontal');
		if ((x+y)%2 === 0)  { // on diagonal
			let offCenter = offCenterX && offCenterY;
			if (offCenterX && offCenterY) {
				return;
			}
		}
		if ((y%2===1) && oneOffX && offCenterY) {
			return;
		}
		if ((x%2===1) && oneOffY && offCenterX) {
			return;
		}
	} else {
		if ((x+y)%2 === 0)  { // on diagonal
		//  return;
		}
		if ((x+y)%2 === 1)  { // on diagonal
		  return;
		}
	}

	/*if (((x+y)%2 === 0) || missing)  {
		let cy = ((y!==hy) && (y!==(hy+1))) || ((y === (hy+1)) && (orientation === 'vertical')); 
		let cx = ((x!==hx) && (x!==(hx+1))) || ((x === (hx+1)) && (orientation === 'horizontal'));

		if (cx && cy && !missing) {
		 //alert ('no missing zag');
		 return;
		}
	}*/
	let r = rvs.red;
  let lines = this.lines;
	let line = this.blineP.instantiate();
	if (missing && !showMissing) {
		return;
	}
	lines.push(line);
  let  ends = this.shortenLine(end0,end1,0.8);
  line.setEnds(ends[0],ends[1]);
	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  if (missing) {
		line.stroke = 'cyan';
	}
	line.update();
	line.show();
}



return rs;
}
});

      
