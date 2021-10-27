//active
core.require('/mlib/basics.js','/mlib/drop0.js','/mlib/web0.js',function (addBasis,addDropMethods,addWebMethods) {
let rs = svg.Element.mk('<g/>');
debugger;
addBasis(rs);
addDropMethods(rs);
addWebMethods(rs);
return rs;
});