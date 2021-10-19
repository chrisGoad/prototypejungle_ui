core.require('/mlib/basics.js','/mlib/pgen0.js','/mlib/web0.js',function (addBasis,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
let stripes = rs.set('stripes',svg.Element.mk('<g/>'));
let topWeb = rs.set('top',svg.Element.mk('<g/>'));
let middleWeb = rs.set('middle',svg.Element.mk('<g/>'));
let bottomWeb = rs.set('bottom',svg.Element.mk('<g/>'));
addBasis(rs);
addPointGenMethods(rs);
//addPointGenMethods(bottomWeb);
addBasis(topWeb);
addBasis(middleWeb);
addBasis(bottomWeb);
addWebMethods(topWeb);
addWebMethods(middleWeb);
addWebMethods(bottomWeb);