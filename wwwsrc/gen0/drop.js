//active
core.require('/mlib/basics.js','/mlib/drop0.js',function (addBasis,addDropMethods) {
let rs = svg.Element.mk('<g/>');
debugger;
addBasis(rs);
addDropMethods(rs);
return rs;
});