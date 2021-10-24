//active
core.require('/mlib/basics.js','/mlib/grid0.js','/mlib/lines0.js','/mlib/topRandomMethods.js',function (addBasis,addGridMethods,addLinesMethods,addRandomMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addRandomMethods(rs);
addLinesMethods(rs);
addGridMethods(rs);
return rs;
});