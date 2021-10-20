//active
core.require('/mlib/basics.js','/mlib/pgen0.js','/mlib/web0.js',function (addBasis,addPointGenMethods,addWebMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
return rs;
});