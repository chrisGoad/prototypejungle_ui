core.require('/gen0/lines2.js','/shape/rectangle.js',//'/random/addIntersectingLines4.js',
function (addMethods,rectPP) {
debugger;
let rs = svg.Element.mk('<g/>');

let params = {radius:10,segLength:0.4,numLines:2000,numTimeSteps:50,
focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

addMethods(rs);

rs.setName('sphere2_1');

//rs.radius = 100;
//rs.segLength // as fraction of radius


rs.finishProtos = function () {	
  core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.fill = 'transparent';
	this.rectP.stroke = 'transparent'
	this.rectP['stroke-width'] = 0.1;
	
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 0.2;
}  
const randomTheta =  () => Math.random() * Math.PI;
const randomPhi =  () => 2* Math.random() * Math.PI;

rs.lineColor = 'yellow';

rs.lineColors = ['white','purple','cyan'];

rs.randomOnSphere = function () {
	let {radius:r,segLength:ln} = this;
	//debugger;
	let theta = randomTheta();
	let phi = randomPhi();
	let sinTheta = Math.sin(theta);
	let xu = sinTheta * Math.cos(phi);
	let yu = sinTheta * Math.sin(phi);
	let zu =  Math.cos(theta);
	if (zu <= 0) {
		return;
	}
	let ro = (1+ln)*r;
	let e0 = Point3d.mk(r*xu,r*yu,r*zu);
	let e1 = Point3d.mk(ro*xu,ro*yu,ro*zu);
	let sg = Segment3d.mk(e0,e1);
	return sg;
}
	

rs.addSegs = function() {
	let {dim,focalPoint,focalLength,cameraScaling,numLines,radius,segLength,shape3d,lineColor} = this;
	debugger;
	let sgs = shape3d.parts;
	let count = 0;
	while (count < numLines) {
		let sg = this.randomOnSphere();
		if (sg) {
			if (this.lineColor) {
				sg.stroke = this.lineColor;
			}
			sgs.push(sg);
			count++;
		}
	}
}	

rs.initialize = function () {
	let {dim,focalPoint,focalLength,cameraScaling,numLines,radius,segLength} = this;
	debugger;
	this.initProtos();
	let rect = this.set('rect',this.rectP.instantiate());
	let bk = 'red';
	rect.width = 180;
	rect.height = 180;
	rect.fill = bk;
	rect.show();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  core.root.backgroundColor =bk;
	this.segLengthA = radius * segLength;
	debugger;
	let sgs = core.ArrayNode.mk();
	let shp = Shape3d.mk(sgs);
	this.set('shape3d',shp);
	this.addSegs();
	rs.initializeLines();
	return;
	let count = 0;
	while (count < numLines) {
		let sg = this.randomOnSphere();
		if (sg) {
			sgs.push(sg);
			count++;
		}
	}

	rs.initializeLines();
}


rs.moveSegs = function (d) {
	//let {shape3d,radius,segLengthA,timeStep} = this;
	let {shape3d,radius,segLengthA,timeStep} = this;
	let sgs = shape3d.parts;
	sgs.forEach( (sg) => {
	   let {end0:e0,end1:e1} = sg;
		 let radius = e0.length();
		 let rt0 = (radius+d)/radius;
		 let ne0 = e0.times(rt0);
		 let rt1 = (radius+d+segLengthA)/(radius+segLengthA);
		 let ne1 = e1.times(rt1);
		 sg.set('end0',ne0);
		 sg.set('end1',ne1);
	}); 
  //this.radius = this.radius + d;
	this.updateLines();
}

rs.explosionCount = -1;	

rs.step = function ()   {
	let {explosionCount:ecnt,timeStep:ts,lineP,lineColors} = this;
	if (ts && (ts%10 === 0)) {
		debugger;
		ecnt++;
		this.explosionCount = ecnt;
		let ln = lineColors.length;
		this.lineColor  = lineColors[ecnt%ln];
		this.addSegs();
	}
	this.moveSegs(1);
	
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}

return rs;
});