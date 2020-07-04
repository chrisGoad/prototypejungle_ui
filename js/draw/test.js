const test = function () {
  let aa = core.ArrayNode.mk();
  aa.push(Point.mk(1,2));
  aa.push(Point.mk(2,3));
  let cc = core.ObjectNode.mk();
  cc.set('aa',aa);
  let dd = cc.instantiate();
  debugger;//keep
  let zz = core.serialize(dd);
  let uu = core.deserialize(zz);
  let yy = 3;
}



export {test};