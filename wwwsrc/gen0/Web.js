//active
core.require('/mlib/basics.js','/mlib/web0.js',function (addBasis,addWebMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addWebMethods(rs);
return rs;
});