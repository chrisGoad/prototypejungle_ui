

core.require('/gen0/animation.js',function (addAnimationMethods) {

  return function (item) {
		
		addAnimationMethods(item);
		
item.generateLengths = function (lengthGenerator,numShapes,length) {
  let {lines} = this;
	let lineNum = lines.length
	let rs0 = [];
	let frs = [];
	let totalLn = 0;
	for (let i = 0;i<numShapes;i++) {
		let cln = lengthGenerator.call(this,lineNum,i);
		rs0.push(cln);
		totalLn += cln;
	}
	let scale = length/totalLn;
	for (let i = 0;i<numShapes;i++) {
	
		let cln = scale * rs0[i];
		frs.push(cln);
	}
	return frs;
}
		
item.drawLine = function (shapeGenerator,lengthGenerator,end0,end1,numShapes) {
	debugger;
	let {lines:ilines} = this;
	if (ilines) {
		lines = ilines;
	} else {
		lines = this.set('lines',core.ArrayNode.mk());;
	}
	let line = svg.Element.mk('<g/>');
		let lineNum = lines.length;
	line.set('end0',end0.copy());
	line.set('end1',end1.copy());
   lines.push(line);
  let shapes = line.set('shapes',core.ArrayNode.mk());;
  //let lengths = line.set('lengths',[]);;
	let vec = end1.difference(end0);
	let ln = vec.length();
	let lengths = line.set('lengths0',this.generateLengths(lengthGenerator,numShapes,ln));
	line.set('lengths1',this.generateLengths(lengthGenerator,numShapes,ln));
	let nvec = vec.times(1/ln);
	let ps = end0;
	//let totalLn = 0;
	for (let i = 0;i<numShapes;i++) {
	  let shape = shapeGenerator.call(this,lineNum,i,ps);
		shapes.push(shape);
		shape.moveto(ps);
		let cln = lengths[i];
		//lengthGenerator.call(this,lineNum,i,ps);
		//lengths.push(cln);
		//totalLn += cln;
		ps = ps.plus(nvec.times(cln));
	}
/*	ps = end0;
	let scale = ln/totalLn;
	console.log('scale',scale);
	for (let i = 0;i<numShapes;i++) {
		let shape = shapes[i];
		shape.moveto(ps);
		let cln = scale * lengths[i];
		ps = ps.plus(nvec.times(cln));
	}
*/
		

	return line;
}

item.updateLine = function (lineNum,fr) {
	debugger;
	let {lines} = this;
	let line = lines[lineNum];
	let {lengths0,lengths1,shapes,end0,end1} = line;
	let numShapes = shapes.length;
	let vec = end1.difference(end0);
	let ln = vec.length();
	let nvec = vec.times(1/ln);
  let ps = end0;
	for (let i = 0;i<numShapes;i++) {
	  let shape = shapes[i];
		shape.moveto(ps);
		//shape.draw();
		let ln0 = lengths0[i];
		let ln1 = lengths1[i];
		let ln = ln0 + fr*(ln1-ln0);
		//lengthGenerator.call(this,lineNum,i,ps);
		//lengths.push(cln);
		//totalLn += cln;
		ps = ps.plus(nvec.times(ln));
	}
	line.draw();
}

}
 
});

      

