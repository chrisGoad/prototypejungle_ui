core.require(function () {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;
  return function (item) {

item.setName = function (name,jsonName) {
	this.name = name;
	core.vars.whereToSave = name;
	let theName = jsonName?jsonName:name;
	this.path = `json/${theName}.json`;
}

}}); 
 
