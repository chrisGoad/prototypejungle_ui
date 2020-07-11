
core.require('/shape/blurredCircle.js','/shape/blurredRectangle.js',
function (blurredCirclePP,blurredRectanglePP) {
  debugger;	//this.initProtos();
let rs = svg.Element.mk('<g/>');

	core.assignPrototypes(rs,'blurredCircleP',blurredCirclePP);
  rs.blurredCircleP.__contents.stroke = 'transparent';
  rs.blurredCircleP.__contents.fill = 'rgb(255,0,0)';//'red';
  rs.blurredCircleP.dimension = 6;
  rs.blurredCircleP.filterWidth = 10;
  rs.blurredCircleP.filterHeight = 10;
  rs.blurredCircleP.stdDeviation  = .5;

	core.assignPrototypes(rs,'blurredRectangleP',blurredRectanglePP);
  rs.blurredRectangleP.__contents.stroke = 'transparent';
  rs.blurredRectangleP.__contents.fill = 'rgb(255,0,0)';//'red';
  rs.blurredRectangleP.filterWidth = 200;
  rs.blurredRectangleP.width = 77;
  rs.blurredRectangleP.filterHeight = 200;
  rs.blurredRectangleP.height = 5;
  rs.blurredRectangleP.stdDeviation  = 4;

 
	
	rs.initialize = function () {
		debugger;
		let rect  = this.blurredRectangleP.instantiate();
    this.set('rr',rect);
		rect.show();
		let rect2  = this.blurredRectangleP.instantiate();
    this.set('rr2',rect2);
		rect2.show();
		rect2.moveto(Point.mk(200,0));
	//	rect.update();
  }	
  return rs;
});

