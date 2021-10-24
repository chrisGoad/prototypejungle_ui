//active
core.require('/mlib/basics.js','/mlib/grid0.js',function (addBasis,addGridMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addGridMethods(rs);
return rs;
});