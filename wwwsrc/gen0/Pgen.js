//active
core.require('/mlib/basics.js','/mlib/pgen0.js',function (addBasis,addPgenMethods) {
let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPgenMethods(rs);
return rs;
});