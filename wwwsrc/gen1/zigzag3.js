
core.require('/line/line.js','/shape/circle.js','/gen0/grid0.js',function (linePP,circlePP,addGridMethods) {
	return function () {
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

/*
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
*/

rs.shortenLine = function (end0,end1,factor) {
	if (!end1) {
		debugger;
	}
  let vec = end1.difference(end0).times(0.5 * factor);
  let middle = end0.plus(end1).times(0.5);
  let nend0 = middle.plus(vec);
  let nend1 = middle.difference(vec);
  return [nend0,nend1];
}

rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
	let {numRows,numCols,blineP,showMissing,showStripes,lines,updating,lineIndex} = this;
	let line = blineP.instantiate();
	line.show();
	return line;

	let drawAll = 0;
	/*if (updating) {
		debugger;
	 line = lines[lineIndex];
	} else {
	  line = this.blineP.instantiate();
	  lines.push(line);
	}
	*/

 let vertical = orientation === 'vertical';
 let {x,y} = cell; 
 let hy = this.numRows/2;
 let hx = this.numCols/2;
 let p = rvs.pattern;
 let zigDown = p < 1;
 let zigUp = (1 <= p) && (p  < 2);
 let noZig = (2 <= p) && (p <= 3);
 let missing;
 if (this.missingZag) {
	 let bx = this.missingZag.x;
	 let by = this.missingZag.y;
	 missing = (x === bx) && (y === by) && (orientation === 'horizontal');
	 //missing = 0;
  }
	if (showStripes) {
	} else {
		
		if (((x+y)%2 === 0) && vertical && !drawAll) { // on diagonal
		  line.hide();
			line.updateAndDraw();
		  return line;
		}
		if ((!vertical) &  (!noZig)) {
			
		  let omitDownZag = ((x+y)%2 === 1)
		  let omitUpZag = !omitDownZag;
	//	let omitUpZag = (((x+y)%2 === 0) && !vertical);
			if (zigDown) {
				if (omitDownZag && !drawAll) {
					line.hide();
					line.updateAndDraw();
					return line;
				}
			} else {
				if (omitUpZag && !drawAll) {
					line.hide();
				  line.updateAndDraw();
					return line;
				}
			}
    }
	}
	let r = rvs.red;
	if (missing && !showMissing && !drawAll) {
		line.hide();
		line.updateAndDraw();
		return line;
	}
	//lines.push(line);
  let  ends = this.shortenLine(end0,end1,0.8);
  line.setEnds(ends[0],ends[1]);
	//r = 255;
	if (zigDown) {
	  line.stroke = `rgb(100,${Math.floor(r)},${Math.floor(r)})`;
	} else {
	  line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},100)`;
	}
//	line.stroke = 'white';
  if (missing) {
		line.stroke = 'cyan';
	}
	line.show();
	line.updateAndDraw();
	return line;
}

rs.boundaryLineUpdater = function (line,end0,end1,rvs,cell,orientation) {
	//debugger;
let {numRows,numCols,blineP,showMissing,showStripes,lines,updating,lineIndex} = this;
//debugger;
	let drawAll = 0;
	/*if (updating) {
		debugger;
	 line = lines[lineIndex];
	} else {
	  line = this.blineP.instantiate();
	  lines.push(line);
	}
	*/

 let vertical = orientation === 'vertical';
 let {x,y} = cell; 
 if ((x===1) && (y===1)) {
	 debugger;
 }
 let hy = this.numRows/2;
 let hx = this.numCols/2;
 let p = rvs.pattern;
 let fp = Math.floor(p);
 console.log('p ',fp);
 if (fp > 0) {
	 debugger;
 }
 let zigDown = p < 1;
 let zigUp = (1 <= p) && (p  < 2);
 let noZig = (2 <= p) && (p <= 3);
 let missing;
	if (showStripes) {
	} else {
		
		if (((x+y)%2 === 0) && vertical && !drawAll) { // on diagonal
		  line.hide();
			line.updateAndDraw();
		  return line;
		}
		if ((!vertical) &  (!noZig)) {
			
		  let omitDownZag = ((x+y)%2 === 1)
		  let omitUpZag = !omitDownZag;
	//	let omitUpZag = (((x+y)%2 === 0) && !vertical);
			if (zigDown) {
				if (omitDownZag && !drawAll) {
					line.hide();
					line.updateAndDraw();
					return line;
				}
			} else {
				if (omitUpZag && !drawAll) {
					line.hide();
				  line.updateAndDraw();
					return line;
				}
			}
    }
	}
	let r = rvs.red;
	if (missing && !showMissing && !drawAll) {
		line.hide();
		line.updateAndDraw();
		return line;
	}
	//lines.push(line);
  let  ends = this.shortenLine(end0,end1,0.8);
  line.setEnds(ends[0],ends[1]);
	//r = 255;
	if (zigDown) {
	  line.stroke = `rgb(100,${Math.floor(r)},${Math.floor(r)})`;
	} else {
	  line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},100)`;
	}
//	line.stroke = 'white';
  if (missing) {
		line.stroke = 'cyan';
	}
	line.show();
	line.updateAndDraw();
}
return rs;
}
});

      

