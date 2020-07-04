const stest = function () {
  let aa = core.ArrayNode.mk();
  aa.push(Point.mk(1,2));
  aa.push(Point.mk(2,3));
  debugger;//keep
  let zz = core.serialize(aa);
  let yy = 3;
}

export {stest};