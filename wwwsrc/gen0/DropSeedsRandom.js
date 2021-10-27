//active
core.require('/mlib/basics.js','/mlib/drop0.js','/mlib/topRandomMethods.js','/mlib/drop_seeds0.js',function (addBasis,addDropMethods,addRandomMethods,addSeedMethods) {
let rs = svg.Element.mk('<g/>');
debugger;
addBasis(rs);
addDropMethods(rs);
addRandomMethods(rs);
addSeedMethods(rs);
return rs;
});