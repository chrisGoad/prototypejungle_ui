core.require('/gen1/sphere_image0.js',
function (addMethods) {

let rs = svg.Element.mk('<g/>');
addMethods(rs);
rs.setName('sphere_image0_0');
addMethods(rs);

let nr = 240;
let dim = 40;

let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,pupilFraction:.195,coronaFraction:0,coronaColor:'purple',
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

return rs;
})

