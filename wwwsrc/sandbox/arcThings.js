core.require('/shape/arcThing3.js',function (atPP) {
//core.require('/shape/circle.js',function (atPP) {
  debugger;
let item =  svg.Element.mk('<g/>');


item.atP = core.installPrototype(atPP);

item.initializee = function () {
  item.set('things',core.ArrayNode.mk());
}


item.numX = 5;
item.numY = 5;
item.deltaX =  70;
item.deltaY = item.deltaX;

item.update = function () {
  debugger;
  let x = this.numX;
  let y = this.numY;
  let dx = this.deltaX;
  let dy = this.deltaY;
  let n = x * y;
  let things = this.things;
  let atP = this.atP;
  let tt = this.thing;
  if (!tt) {
    this.set('thing',atP.instantiate().show());
  }
  
  if (!things) {
    things = this.set('things',core.ArrayNode.mk());
    things = this.things;
  }
  let cn = things.length;
  for (let i = cn;i<n;i++) {
    let nt = atP.instantiate().show();
    things.push(nt);
  }
  
  for (let i = 0;i<x;i++) {
    for (let j = 0;j<y;j++) {
      let idx = i * y + j;
      let ps = Point.mk(i*dx,j*dy);
      let th = things[idx];
      debugger;
      th.update();
      th.moveto(ps);
    }atP.instantiate().show()
  }
}
      
      
    
    
  

return item;
});


