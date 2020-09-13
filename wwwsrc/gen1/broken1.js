
	//core.require('/gen0/animation.js',function (addAnimationMethods) {
	core.require('/gen0/grid0.js',function (addGridMethods) {

  return function (item) {
/*adjustable parameters  */

  addGridMethods(item);

item.inCell = function (line) {
	let {width,height,numRows,numCols} = this;
	let pnt = line.toGlobalCoords();
	let deltaX = width/numCols;
	let deltaY = height/numRows;
	let x = Math.floor((pnt.x + 0.5*width)/deltaX);
	let y = Math.floor((pnt.y + 0.5*height)/deltaY);
	console.log('inCell x',x,' y ',y);
	return {x:x,y:y};
}

    
const selectRandomPointsOnSeg = function (seg,minDist,maxDist) {
	let {end0,end1} = seg;
	let vc = end1.difference(end0);
	let ln = vc.length();
	let nvc  = vc.times(1/ln);
	let remaining =  ln;
	let cp = end0.copy();
	let notDone = true;
	let r = maxDist - minDist;
	rs = [cp];
	while (true) {
		let nln = minDist + Math.random() * r;

		if ((remaining < maxDist) && (nln >= remaining)) {
			rs.push(end1.copy());
			return rs;
		}
    cp = cp.plus(nvc.times(nln));
    rs.push(cp);
    remaining = remaining - nln;
	}
}

   
const selectPointsOnSeg = function (seg,n) {
	let {end0,end1} = seg;
	let vc = end1.difference(end0);
	let ln = vc.length();
	let nvc  = vc.times(1/ln);
	let d = ln/n;
	let dvc = nvc.times(d);
	let cp = end0.copy();
	let rs = [cp];
	for (let i=0;i<n;i++) {
		cp = cp.plus(dvc);
		rs.push(cp);
	}
	return rs;
}



item.addLine = function (lines,p1,p2) {
  if (!p2) {
    debugger; //keep
  }
  let line = this.lineP.instantiate();
  lines.push(line);
  line.setEnds(p1,p2);    
  line.update();
  line.show();
  return line;
  //debugger;
}

  

item.mkSegmentedLine = function (seg,pnts,color) {
	let {segmentedLines} = this;
	let segLine = core.ArrayNode.mk();
	let rs = svg.Element.mk('<g/>');
  rs.set('contents',segLine);
  segmentedLines.push(rs);
	let ln = pnts.length;
	for (let i=0;i<ln-1;i++) {
		let end0 = pnts[i].copy();
		let end1 = pnts[i+1].copy();
		let vc = end1.difference(end0);
		let ln = vc .length();
		let nvc = vc.times(0.5/ln);
		let center = end0.plus(end1).times(0.5);
		let e1 = nvc;
		let e0 = nvc.minus();
		//let line = this.addLine(segLine,end0,end1);
		let line = this.addLine(segLine,e0,e1);
		line.moveto(center);
		//debugger;
		line.cell = this.inCell(line);
		line.stroke = color;
		line.len = ln;
		line.center = center;
		//line.nvec = nvc;
	}
	

	return rs;
}


item.mkRandomlySegmentedLine = function (seg,minDist,maxDist,color) {
	let pnts = selectRandomPointsOnSeg(seg,minDist,maxDist);
	return this.mkSegmentedLine(seg,pnts,color);
}

item.mkEvenlySegmentedLine = function (seg,n,color) {
	let pnts = selectPointsOnSeg(seg,n);
	return this.mkSegmentedLine(seg,pnts,color);
}


item.setLength = function (line,fr) {
	let {len,center,nvec,dir:idir} = line;
	//debugger;
	let dir = idir?idir:0;
	let hln = 0.5 * fr * len;
  let end1 = Point.mk(Math.cos(dir),Math.sin(dir)).times(hln);
  let end0 = end1.minus();//Point.mk(Math.cos(dir),Math.sin(dir)).times(hln);
	line.setEnds(end0,end1);
	line.update();
  line.show();
	/*	let end0 = center.difference(nvec.times(hln));
		let end1 = center.plus(nvec.times(hln));
		line.setEnds(end0,end1);
		line.update();
		line.draw();*/
}

item.segLineForEach = function (segLineC,fun) {
	let segLine = segLineC.contents;
	segLine.forEach( (line) => { fun(line)});
}

item.lineForEach = function (fun) {
	let {segmentedLines} = this;
	segmentedLines.forEach((segLine) => {this.segLineForEach(segLine,fun);});
}


item.setLengths = function (segLineC,fr) {
	let setLineLength = (line) => {this.setLength(line,fr);};
		
	this.segLineForEach(segLineC,setLineLength);
}



		

}
});

      

