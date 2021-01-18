
core.require('/gen0/topRandomMethods.js',function (addTopRandomMethods) {
  return function (item,shape) {
/*adjustable parameters  */

addTopRandomMethods(item);
item.numCircles = 100;
item.maxRadius = 100;
item.minRadius = 50;
item.startAngle = 85;
item.stopAngle = 95;

item.angleThere = 2;
item.angleMissing = 3;
item.numSpokes = 5;
item.useCentralFactor = 0;


/*
item.numRows= 31;
item.numRows = 11;
item.numCols = 11;
item.width = 100;
item.height = 100;
item.lengthThere = 10;
item.lengthMissing = 5;
*/

item.addBrokenCircle = function (radius,startAngle,stopAngle) {
  let {angleThere,angleMissing,arcs} = this;
  let radThere = angleThere * (Math.PI/180);
  let radMissing = angleMissing * (Math.PI/180);
  let cRad = startAngle * (Math.PI/180);
  let stopRad = stopAngle * (Math.PI/180);
  let addingThere = true;
  let cP = Point.mk(Math.cos(cRad),Math.sin(cRad)).times(radius);
  while (cRad < stopRad) {
    let nextStep = Math.min(stopRad-cRad,Math.random() * (addingThere?radThere:radMissing));
    let nextRad = cRad + nextStep;
    let nP = Point.mk(Math.cos(nextRad),Math.sin(nextRad)).times(radius);
    if (addingThere) {		
      let newArc = this.arcP.instantiate();
      arcs.push(newArc);
      newArc.setEnds(cP,nP); 
      newArc.radius = radius;
      newArc.sweep = 1;      
      newArc.update();
      newArc.show();
      addingThere = false;
    } else {
      addingThere = true;
    }
    cRad = nextRad;
    cP = nP;
  }
}
    

const hvSegsIntersect = function (segA,segB,isep) {
  debugger;
 
 let {end0:e0a,end1:e1a} = segA;
  let {end0:e0b,end1:e1b} = segB;
  let {x:a0x,y:a0y} = e0a;
  let {x:a1x,y:a1y} = e1a;
  let {x:b0x,y:b0y} = e0b;
  let {x:b1x,y:b1y} = e1b;
  let dist = Math.max(Math.abs(a0x),Math.abs(a0y),Math.abs(a1x),Math.abs(a1y),Math.abs(b0x),Math.abs(b0y),Math.abs(b1x),Math.abs(b1y));
  let sep = isep * (dist/100);
  /*
  let a0x = -10; let a1x = 10;
  let a0y = 0; let a1y = 0;
  let b0x =0; let b1x = 0;
  let b0y = -10; let b1y = 10;
*/  
  let separatedX = (a1x < (b0x- sep)) ||  (b1x < (a0x- sep));
  let separatedY = (a1y < (b0y- sep)) ||  (b1y < (a0y- sep));
  return !(separatedX || separatedY);
}

const hvSegIntersects = function (seg,segs,sep) {
  let rs = false;
  let n = segs.length;
  for (let i=0;i<n;i++) {
    let segi = segs[i];
    if (hvSegsIntersect(seg,segi,sep)) {
      return true;
    }
  }
}


const addHVseg = function (segs,box,minLen,maxLen,sep) {
  let {corner,extent} = box;
  let {x:cx,y:cy} = corner;
  let {x:xx,y:xy} = extent;
  let vert = Math.random() > 0.5;
  let dln = maxLen - minLen;
  let rs;
  if (vert)  {
    let x0 = Math.random() * xx;
    let y0 = Math.random() * xy;
    let ln = minLen + Math.random() * dln;
    let y1 = y0 + ln;
    if (y1 > xy) {
      return false;
    }
    let e0 = Point.mk(cx+x0,cy+y0);
    let e1 = Point.mk(cx+x0,cy+y1);
    rs =  geom.LineSegment.mk(e0,e1);
  } else {

    let x0 = Math.random() * xx;
    let y0 = Math.random() * xy;
    let ln = minLen + Math.random() * dln;
    let x1 = x0 + ln;
    if (x1 > xx) {
      return false;
    }
    let e0 = Point.mk(cx + x0,cy + y0);
    let e1 = Point.mk(cx + x1,cy + y0);
    rs =  geom.LineSegment.mk(e0,e1);
  }
  if (hvSegIntersects(rs,segs,sep)) {
    return false;
  }
  segs.push(rs);
  
}


const addHVsegs = function (segs,box,minLen,maxLen,sep,numTries) {
  for (let i=0;i<numTries;i++) {
    addHVseg(segs,box,minLen,maxLen,sep);
  }
}



const addLine = function (lineP,lines,seg) {
  let line = lineP.instantiate();
  lines.push(line);
 let {end0,end1} = seg;
  line.setEnds(end0,end1);    
  line.update();
  line.show();
}


const addLines0 = function (lineP,lines,segs) {
  let ln = segs.length;
  for (let i=0;i<ln;i++) {
    addLine(lineP,lines,segs[i]);
  }
}
/*
item.addHVLines = function(lineP,lines,box,minLen,maxLen,sep,numTries) {
  let segs = [];
  addHVsegs(segs,box,minLen,maxLen,sep,numTries);
  addLines0(lineP,lines,segs);
}
 */
 
item.addHVLines = function(params) {
  let {lineP,lines,box,minLen,maxLen,sep,numTries} = params;
  let segs = [];
  addHVsegs(segs,box,minLen,maxLen,sep,numTries);
  addLines0(lineP,lines,segs);
}



  
item.pos2shade = function (pos) {
  //debugger;
  let {numCols,numRows,width,height} = this;
  let minx = -0.5 * width
  let miny = -0.5 * height;
  let col = Math.min(Math.floor(numCols * ((pos.x - minx)/width)),numCols-1);
  let row = Math.min(Math.floor(numRows * ((pos.y - miny)/height)),numRows-1);
  let idx = this.indexFor(col,row);
  let shd = this.shades[idx];
  let rs = this.shade2rgb(shd);
    //console.log('col',col,'row',row,'idx',idx,'shd',shd,'rs',rs);
  return rs;

  
}
  


item.addBrokenLine = function (params) {
  let {lineP,lines,start,dir,length:ln,cellI,cellJ,vertical,maxThere,minThere,maxMissing,minMissing,numLines} = params;
  //let {lines} = this;
  let cLen = 0;
  let cp = start;
  let addingThere = false;
  let Tspread = maxThere - minThere;
  let Mspread = maxMissing - minMissing;
  let i,j;
  let cellV = Math.floor((cLen/ln)*numLines);
  if (vertical) {
    i = cellI,
    j = cellV;
  } else {
    i = cellV;
    j= cellJ;
  }
  while (cLen < ln) {
    
    let fc = 1;
    if (this.useCentralFactor) {
      let fc1 = 2*Math.abs((cLen/ln) - 0.5);
      fc  = fc1 * fc1;
    } 
    let tlen;
    if (addingThere) {
      if (this.thereR) {
        debugger;
        tlen = this.randomizer.valueAt(this.thereR,i,j);
      } else {   
        tlen = minThere + fc*Math.random()*Tspread;
      }
    } else {
      if (this.missingR) {
        debugger;
        tlen = this.randomizer.valueAt(this.missingR,i,j);
      } else {   
        tlen = minMissing + fc*Math.random()*Mspread;
      }
    }
    //let tlen = (addingThere)?minThere + fc*Math.random()*Tspread:minMissing + fc*Math.random()*Mspread;
    let nextLen = Math.min(ln-cLen,tlen);
    let np = cp.plus(dir.times(nextLen));
    if (addingThere) {
      let newLine = lineP.instantiate();
      lines.push(newLine);
      newLine.setEnds(cp,np);  
      if (this.redR) {
        let r = this.randomizer.valueAt(this.redR,i,j);
        let g = this.randomizer.valueAt(this.greenR,i,j);
        let  b = this.randomizer.valueAt(this.blueR,i,j);
        let rgb = this.rgb2color(r,g,b);
        newLine.stroke = rgb;
      }        
      newLine.update();
      newLine.show();
      addingThere = false;
    } else {
      addingThere = true;
    }
    cLen += nextLen;
    cp = np;
  }
} 


      
  // choose a sequence of random numbers between 0 and 1, whose minsep is the fraction allowed of the standard separation  
const chooseRandomNumbers = function (inum,iminSep) {
  let num = inum-2
  let rs = [0];
  let cv = 0;
  let stdSep = 1/(inum-1);
  let minSep = iminSep*stdSep;
  let ds = stdSep-minSep;
  for (let i=0;i<num;i++) {
    let interval = minSep + Math.random()*ds;
    cv += interval;
    rs.push(cv);
  }
  for (let i=0;i<num;i++) {
    rs[i] = rs[i]/cv
    let interval = minSep + Math.random()*ds;
  }
  rs.push(1);
  debugger;
  return rs;
}

  
    
  
  
//item.addQuadLines = function (lineP,lines,quadrangle,numLines,maxThere,minThere,maxMissing,minMissing,minSep) {
item.addQuadLines = function (params) {
  debugger;
   let {lineP,lines,quadrangle,numLines,maxThere,minThere,maxMissing,minMissing,minSep,vertical} = params;
 /* if (!this.lines) {
   this.set('lines',core.ArrayNode.mk());
  }*/
  // join the segment 0->1 of the quadrangle with 2->3 of the triangle with numLines broken lines
  let intervals;
  if (typeof(minSep) === 'number') {
    intervals = chooseRandomNumbers(numLines,minSep);
  }
  let [p0,p1,p2,p3] = quadrangle;
  let vec0  = p1.difference(p0);
  let vec1  = p3.difference(p2);
  for (let i=0;i<numLines;i++) {
    if (intervals) {
      ci = intervals[i];
    } else {
      ci = i/(numLines-1);
    }
    //let e0 = p0.plus(vec0.times(i/(numLines-1)));
    //let e1 = p2.plus(vec1.times(i/(numLines-1)));
    let e0 = p0.plus(vec0.times(ci));
    let e1 = p2.plus(vec1.times(ci));
    let tvec = e1.difference(e0);
    let ln = tvec.length();
    let dir = tvec.times(1/ln);
    let params = {lineP,lines,start:e0,dir,length:ln,minThere,maxThere,minMissing,maxMissing,vertical,numLines};
    if (vertical) {
      params.cellI = i;
    } else {
      params.cellJ = i;
    }
   // this.addBrokenLine(lineP,lines,e0,dir,ln,maxThere,minThere,maxMissing,minMissing);
    this.addBrokenLine(params); //e0,dir,ln,maxThere,minThere,maxMissing,minMissing);
  }
}
          
 

item.initializeLineGrid = function () {
  let {numRows,numCols,width,height} = this;
  this.set('lines',core.ArrayNode.mk());
  let dy = height/numRows;
  let cy = height/2;
  let dir = Point.mk(1,0);
  for (let i = 0;i<numRows;i++) {  
    let sp = Point.mk(-0.5*width,cy);
    this.addBrokenLine(sp,dir,width,this.lengthThere,0,this.lengthMissing);

   // this.addBrokenLine(sp,dir,width);
    cy -= dy;
  }
  let dx = width/numCols;
  let cx = -width/2;
  dir = Point.mk(0,1);
  for (let i = 0;i<numCols;i++) {  
    let sp = Point.mk(cx,-0.5*height);
    this.addBrokenLine(sp,dir,height);
    cx += dx;
  }
  
}
     
      
  
  
item.initializeArcGrid = function () {
  debugger;
  let {numCircles,numSpokes,maxRadius,minRadius,startAngle,stopAngle} = this;
  this.set('arcs',core.ArrayNode.mk()); 
  this.set('lines',core.ArrayNode.mk());

  
  let dR = (maxRadius - minRadius)/(numCircles-1);
  let cR = minRadius;
  for (let i=0;i<numCircles;i++) {
    this.addBrokenCircle(cR,startAngle,stopAngle);
    cR += dR;
  }
  let spokeLn = maxRadius - minRadius;
  let cRad = startAngle * (Math.PI/180);
  let dRad = ((stopAngle-startAngle) * (Math.PI/180))/(numSpokes - 1) ;
  for (let i=0;i<numSpokes;i++) {
    let dir = Point.mk(Math.cos(cRad),Math.sin(cRad));
    cRad += dRad;
    let sp = dir.times(minRadius);
    this.addBrokenLine(sp,dir,spokeLn,this.maxThere,this.minThere,this.maxMissing,this.minMissing);

    cR += dR;
  }
  
}



}
});

      

