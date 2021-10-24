//active
core.require('/mlib/basics.js','/mlib/grid0.js','/mlib/lines0.js',function (addBasis,addGridMethods,addLinesMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addRandomMethods(rs);
addLinesMethods(rs);
return rs;
});