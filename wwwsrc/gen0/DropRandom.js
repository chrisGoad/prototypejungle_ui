//active
core.require('/mlib/basics.js','/mlib/drop0.js','/mlib/topRandomMethods.js',function (addBasis,addDropMethods,addRandomMethods) {
let rs = svg.Element.mk('<g/>');
debugger;
addBasis(rs);
addDropMethods(rs);
addRandomMethods(rs);
return rs;
});