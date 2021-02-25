core.require('/gen1/sphere_image0.js',
function (addMethods) {

let rs = svg.Element.mk('<g/>');
addMethods(rs);
rs.setName('sphere_image0_1');
addMethods(rs);

let nr = 240;
let dim = 40;
let bwd = 1200;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0,pupilFraction:.16,coronaFraction:0,coronaColor:'purple',
backgroundColor:'white',backgroundWidth:1.5*bwd,backgroundHeight:bwd,
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};

Object.assign(rs,params);

return rs;
})

