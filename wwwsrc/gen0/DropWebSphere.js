//active
core.require('/mlib/basics.js','/mlib/drop0.js','/mlib/web0.js','/mlib/sphere0.js',function (addBasis,addDropMethods,addWebMethods,addSphereMethods) {
let rs = svg.Element.mk('<g/>');
debugger;
addBasis(rs);
addDropMethods(rs);
addWebMethods(rs);
addSphereMethods(rs);
return rs;
});