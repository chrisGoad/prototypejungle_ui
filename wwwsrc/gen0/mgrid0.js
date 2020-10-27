
//core.require('/grid/addColorGrid.js',function (colorGridMethods) {
	//debugger;
core.require('/gen0/dim2dWalker.js','/gen0/animation.js',
 function (addRandomMethods,addAnimationMethods) {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;
  return function (rs) {
  //return function () {
/*adjustable parameters  */
//let item = svg.Element.mk('<g/>');	
addAnimationMethods(rs);

rs.adjustLine = function (line) {
	let {segCenters,numSegs,segs,direction:dir} = line;
	let vec = Point.mk(Math.cos(dir),Math.sin(dir));
	for (let i=0;i<numSegs;i++) {
		let sg = segs[i];
		let centerd = segCenters[i];
		let center = vec.times(centerd);
		sg.moveto(center);
	}
}

rs.setMinCenters = function (line) {
	let {segs,segL,numSegs} = line;
	let minCenters = [];
	line.minCenters = minCenters;
	let totalL = this.totalLength(line);
	let leftc = (-0.5*(totalL-segL));
	for (let i=0;i<numSegs;i++) {
		minCenters.push(leftc+i*segL);
	}
}

rs.contractLineL = function (line,delta) {
	let {segs,segL,numSegs,stdSegCenters,segCenters,minCenters} = line;
	debugger;
	if (!minCenters) {
		this.setMinCenters(line);
		minCenters = line.minCenters;
	}
	for (let i=0;i<numSegs;i++) {
		let segc = stdSegCenters[i];
		segCenters[i] = Math.max(minCenters[i],segc - delta);
	}
	this.adjustLine(line);
}


rs.totalLength = function (line) {
	let {segL,gapL,numSegs} = line;
	let totalL = segL * numSegs + gapL * (numSegs - 1);
	return totalL;
}

rs.copyArray = function (a) {
	return [].concat(a);
}
	
//rs.mkLine = function(dir,lineP,segL,gapL,numSegs) {
rs.mkLine = function(dir,lineP,params,color) {
	let {segL,gapL,numSegs} = params;
	let rs = svg.Element.mk('<g/>');
	Object.assign(rs,params);
	rs.direction = dir;
	let totalL = this.totalLength(rs);//segL * numSegs + gapL * (numSegs - 1);
	let cpos = -0.5*totalL;
	let centerPos = cpos + 0.5*segL;
	let vec = Point.mk(Math.cos(dir),Math.sin(dir));
	let svec = vec.times(segL);
	let hsvec = vec.times(0.5*segL);
	let mhsvec = hsvec.times(-1);
  let agapL = gapL;
	let segs = 	rs.set('segs',core.ArrayNode.mk());
  let segCenters = [];
  rs.segCenters = segCenters;	
	for (let i=0;i<numSegs;i++) {
		let sg = lineP.instantiate();
		segs.push(sg);
		sg.stroke = color;
		segCenters.push(centerPos);
		//sg.setEnds(e0,e1);
		sg.setEnds(mhsvec,hsvec);
		//gapL = gapL + 0.3*(Math.random() - 0.5);
		/*if (this.alternateGaps) {
		  agapL = (i%2 === 1)?0.5*gapL:1.5*gapL;
			gvec =  vec.times(agapL);
		}
		cp = e1.plus(gvec).plus(svec);*/
		//cp = cp.plus(gvec);
		sg.show();
		centerPos = centerPos + segL + agapL;
	}
	rs.stdSegCenters = this.copyArray(segCenters);
	this.adjustLine(rs);
	return rs;
}

//rs.mkLines = function (dir,lineP,segL,gapL,numSegs,numLines,lineSep) {
rs.mkLines = function (dir,lineP,lineParams,lineSetParams) {
	let {numLines,lineSep,lineSeps} = lineSetParams;
	 debugger;
  let rs = svg.Element.mk('<g/>');
	let lines = 	rs.set('lines',core.ArrayNode.mk());
	let dir1 = dir + 0.5 *Math.PI;
	let dist = 0;
	if (lineSeps) {
		for (let i=0;i<numLines-1;i++) {
			dist += lineSeps[i];
		}
	} else {
		dist = (numLines - 1) * lineSep;
	}
	let vec = Point.mk(Math.cos(dir1),Math.sin(dir1));
	let dvec;
  if (lineSep) {
  	dvec	= vec.times(lineSep);
	}
	let cp = vec.times(-0.5*dist);
  for (let i=0;i<numLines;i++) {
		let color = i%2===0?'yellow':(i%2 === 1?'green':'blue');
		/*let r3 = 3*Math.random();
		let color;
		if (r3 < 1) {
			color = 'yellow';
		} else if (r3 < 2) {
			color = 'green';
		} else {
			color = 'blue';
		}*/
		//let color = Math.random() > 0.5?'yellow':'black';
		let line = this.mkLine(dir,lineP,lineParams,color);
		lines.push(line);
		line.moveto(cp);
		if (lineSeps) {
			dvec = vec.times(lineSeps[i]);
		}
		cp = cp.plus(dvec);
	}
	return rs;
}

	

	
	



}
});

      

