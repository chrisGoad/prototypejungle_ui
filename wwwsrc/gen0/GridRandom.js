//active
core.require('/mlib/basics.js','/mlib/grid0.js','/mlib/topRandomMethods.js',function (addBasis,addGridMethods,addRandomMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addRandomMethods(rs);
addGridMethods(rs);
return rs;
});