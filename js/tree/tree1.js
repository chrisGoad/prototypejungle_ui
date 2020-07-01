import * as core from "/js/core-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.min.js";
import * as ui from "/js/ui-1.1.0.min.js";

const html = dom.html;
const SvgElement = dom.SvgElement;
//properties of vars are set by other modules
const vars = core.ObjectNode.mk();
//let tree =core.set("tree",core.ObjectNode.mk());
let shownItem,onlyShowEditable,mainTop,tops,mainTree,protoPanelShowsRef,protoState,protoTops;
//let protoDivRest; // not used, I don't think

SvgElement.setFieldType("fill","svg.Rgb");
SvgElement.setFieldType("stroke","svg.Rgb");
SvgElement.setFieldType("backgroundColor","svg.Rgb");
dom.Style.setFieldType("fill","svg.Rgb");



const hiddenProperties = {role:1,resizable:1,customControlsOnly:1,data:1,draggable:1,
                         draggableInKit:1,isKit:1,isGraph:1,hiddenProperties:1,
                          visibility:1,transform:1,nonRevertable:1,unselectable:1,
                          neverselectable:1,transformm:1,noData:1,dataSource:1,
                          attributes:1,categorized:1,categoryCount:1,connectedEdges:1,
                          end0connection:1,end1connection:1,undraggable:1};
  
const frozenProperties = {dataSource:1};  
//core.inspectEverything = true;
vars.expandMode = 'none';
let showFunctions = false;
let showNonEditable = true;
let TreeWidget = core.ObjectNode.mk().__namedType();
let enabled = true; 
let fullyExpandThreshold = 20;
let highlightColor = "rgb(100,140,255)"
let viewableStringMaxLength = 45;
const newTreeWidget = function (o) {
  core.setProperties(this,o,["textProto","rootPos"]);
}
  // ground level operators
  
let  WidgetLine = core.ObjectNode.mk();// holds methods and data for a widgetline; will be .w. of each dom element for a widgetline
let wline = WidgetLine;
let NonPrimLine = html.Element.mk('<div style="font-size:small;color:black;width:100%"/>').__namedType();
let nonPrim = NonPrimLine;// prototype for widget lines
let mline = nonPrim.set("main",html.Element.mk('<div style="font-size:small"/>'));
mline.set("note",html.Element.mk('<span style="margin-right:5px;color:blue;cursor:pointer">?</span>'));
mline.set("toggle",html.Element.mk('<span style="cursor:pointer;color:black">&#9655;</span>'));
      
mline.set("theName",html.Element.mk('<span style="padding-right:20px;color:black;font-size:small"/>')); 

let dpySelected = html.Element.mk('<div style="color:black"/>');


WidgetLine.forNode = function () {
  return core.evalXpath(core.root,this.nodePath);
}
/*
 * Special case. When a mark is modified, it moves from the marks array to the modified object.
 * In some cases , the paths over on the tree side are not kept up to date. But we can patch this
 * efficiently: in this case the parentNode path will evaluate to "__modified", and we know to look over
 * into the modified array.
 */
 
WidgetLine.forParentNode = function () {
  let pnp = this.parentNodePath;
  let rs = core.evalXpath(core.root,pnp);
  if (rs === '__modified') { 
    pnp[pnp.length-2] = 'modifications';
    rs = core.evalXpath(core.root,pnp);
  }
  return rs;
}
  
core.ObjectNode.__getTheNote = function () {
  let rs;
  if (this === core.root ) {
    rs = this.__topNote;
  } else if (this.__parent) {
    rs = this.__parent.__getNote(this.__name)
  }
  return rs;
}
  
core.ArrayNode.__getTheNote = core.ObjectNode.__getTheNote;
  
core.ObjectNode.__mkWidgetLine = function ({top}) {
  let thisHere,rs,el,m,isLNode,tg,pth,noteSpan,notePop,txt,tspan,nspan,clr;
  if (onlyShowEditable && this.__mfrozen) {
    return;
  }
  thisHere = this;
  rs = Object.create(WidgetLine);
  el = nonPrim.instantiate();
  el.main.$css("font-size","small"); // fixStyles
  el.set("w",rs);
  if (this.__parent) {
    rs.parentNodePath = core.xpathOf(this.__parent,core.root);
    rs.forProp = this.__name;
  }
  m = el.main;
  isLNode = core.ArrayNode.isPrototypeOf(this);
  if (!isLNode && (this.forProto || this.noToggle)) {
    tg = m.toggle;
    tg.$hide();
  }
  pth = core.xpathOf(this,core.root);
  rs.__treeTop = Boolean(top);
  noteSpan = m.note;
  if (this.__getTheNote()) {
    notePop = function () {rs.popNote()};
    noteSpan.$click(notePop);
    noteSpan.$show();
  } else {
    noteSpan.$hide();
  }
  txt = withTypeName(this,this.__name,top);
  thisHere = this;
  tspan = m.toggle;
  if (this.noToggle) {
    tspan.$hide();
  } else if (this.__leaf) {
    tspan.$html(" ");
  }  else {
    tspan.$click(function () {rs.toggle();});
  }
  nspan = m.theName;
  nspan.$html(txt);
  clr = "black";
  nspan.style.color = clr;
  m.addEventListener("mouseover",function () {
    let inheritors;
    m.$css({"background-color":"rgba(0,100,255,0.2)"});
    if (core.ArrayNode.isPrototypeOf(thisHere)) {
      dom.highlightNodes(thisHere);
    } else { 
      inheritors = core.inheritors(thisHere,function (x) {
        return x.__get("__element");
      });
      dom.highlightNodes(inheritors);
    }
  });
  m.addEventListener("mouseout",function () {
    m.$css({"background-color":"white"});
    dom.unhighlight();
  });
  nspan.$click(function () {
    rs.selectThisLine("tree");
  });
  if (this.forProto) {
    this.hasWidgetLine = true;
  }
  rs.nodePath = pth;
  return rs;
}
  

core.ArrayNode.__mkWidgetLine = core.ObjectNode.__mkWidgetLine;
  
// operations on the widget tree, as opposed to the dom tree
WidgetLine.treeChild = function (id) {
  let fc = this.__parent.forChildren;
  let elc;
  if (fc) {
    elc = fc[id];
    if (elc) {
      return elc.w;
    }
  }
  return undefined;
}
  
WidgetLine.treeParent = function() {
  let pr = this.__parent.__parent;
  let pel;
  if (pr) {
    pel =  pr.__parent;
    if (pel) {
      return pel.w;
    }
  }
  return undefined;
}
  
WidgetLine.treePath = function () {
  let rs = [];
  let el = this.__parent; 
  while (el && !(el.w.__treeTop)) {
    rs.push(el.__name);
    el = el.__parent.__parent;
  }
  return rs.reverse();
}
  
  
WidgetLine.addTreeChild = function (nm,ch) {
  let el = this.__parent;
  let fc = el.forChildren;
  if (!fc) {
    fc = html.Element.mk('<div  style="margin-left:20px">');
    this.set("forChildren",ch);
  }
  fc.set(nm,ch.__parent);
}
 
  
WidgetLine.treeTop = function () {
  if (this.__treeTop) {
    return this;
  }
  let pr = this.treeParent(); // the forChildren node intervenes in the ancestry chain
  return pr.treeTop();
}
  
WidgetLine.forTreeChildren = function (fn) {
  let el,fch;
  if (this.__prim) {
    return;
  }
  el = this.__parent;
  fch = el.forChildren;
  if (fch) {
    let prps = Object.getOwnPropertyNames(fch);
    prps.forEach(function (p) {
      if (core.internal(p)) {
        return;
      }
      let v = fch[p];
      if (v.__parent !== fch) {
        return;
      }
      if (html.Element.isPrototypeOf(v)) {
       fn(v.w);
      }
    });
  }
}
  
WidgetLine.forTreeDescendants = function (fn) {
  let perChild = function (ch) {
    ch.forTreeDescendants(fn);
  }
  fn(this);
  this.forTreeChildren(perChild);
}
    
  
WidgetLine.treeChildren = function () {
  let rs = [];
  let perChild = function (ch) {
    rs.push(ch);
  }
  this.forTreeChildren(perChild);
  return rs;
}
  
WidgetLine.childrenNames = function () {
  let rs = [];
  let el = this.__parent;
  let fch = el.forChildren;
  let prps = Object.getOwnPropertyNames(fch);
  prps.forEach(function (p) {
    let v;
    if (core.internal(p)) {
      return;
    }
    v = fch[p];
    if (v.__parent !== fch) {
      return;
    }
    if (html.Element.isPrototypeOf(v)) {
      rs.push(p);
    }
  });
  return rs;
}

// this finds widget lines whose nodes inherit from this fellow's node
// method: Find the lines athe same path
  
WidgetLine.upOrDownChain = function (returnNodes,up) {
  let pth = this.treePath();
  let rs = [];
  //let {tops}= tree;
  let idx,myTop,ln,i,ptop,cl,topnode,nd;
  if (!tops) {
    return [];
  }
  if (up) {
    idx = 0;
  } else {
    myTop = this.treeTop();
    idx = tops.indexOf(myTop)+1;
  } 
  ln = tops.length;
  for (i=idx;i<ln;i++) {
    ptop = tops[i];
    cl =  ptop.treeSelectPath(pth);
    if (!cl) {
      return rs.reverse();
    }
    if (cl === this) { //done
      return rs.reverse(); // in order going up the chain
    } else  {
      if (returnNodes) {
        topnode = ptop.forNode();
        nd = core.evalPath(pth,topnode);
        if (nd) { // nd undefined might indicate trouble todo look into this
          rs.push(nd);
        }
      } else {
        rs.push(cl);
      }
    }
  }
  return rs;
}

WidgetLine.upChain = function (returnNodes) {
  return this.upOrDownChain(returnNodes,true);
}



WidgetLine.downChain = function (returnNodes) {
  return this.upOrDownChain(returnNodes,false);
}
  
// now find the widget lines which represent the prim fields which inherit from the child named k of this
WidgetLine.inheritors = function (k) {
  let upc = this.upChain();
  let rs = [];
  let ln = upc.length;
  let i,u,und,ch;
  for (i=0;i<ln;i++) {
    u = upc[i];
    und = u.forNode();
    if (!und.hasOwnProperty(k)) {
      ch = u.treeSelect(k);
      if (ch) {
        rs.push(ch);
      }
    }
  }
  return rs;
}
  
WidgetLine.fieldIsOverridden = function () {
  let k = this.forProp;
  let pr = this.treeParent();
  let upc,ln,i;
  if (!pr) {
    return false;
  }
  upc  = pr.upChain(true);
  ln = upc.length;
  for (i=0;i<ln;i++) {
    if (upc[i].hasOwnProperty(k)) {
      return 1;
    }
  }
  return false;
}
 
// selectChild is at the Element level. this is at the tree level
WidgetLine.treeSelect = function (nm) {
  let fc,chel;
  if (this.__prim) {
    return undefined;
  }
  fc = this.__parent.forChildren;
  if (fc) {
    chel = fc[nm];
    if (chel) {
      return chel.w;
    }
  }
  return undefined;
}
  
WidgetLine.treeSelectPath = function (path) {
  let ln = path.length;
  let cw = this;
  for (let i=0;i<ln;i++) {
    let cpe = path[i];
    cw = cw.treeSelect(cpe)
    if (!cw) {
      return undefined;
    }
  }
  return cw;
}

WidgetLine.selectedLine = function () {
  let tp = this.treeTop();
  return tp.__selectedLine;
}
  
  
WidgetLine.highlightedPart = function () {
  if (this.__prim) {
    return this.__parent.title;
  } else if (this.__ref) {
    return this;
  } else {
    return this.__parent.main;
  }
}

WidgetLine.unselectThisLine = function () {
  this.__selected = false;
  let el = this.highlightedPart();
  el.$css("background-color","white");
}
  
  
WidgetLine.selectChildLine = function (nm) {
  let ch;
  this.expand();
  ch = this.treeChild(nm);
  if (ch) {
    ch.selectThisLine('tree');
  }
}

let selectedLine;

WidgetLine.selectThisLine = function (src,forceRedisplay) { // src = "canvas" or "tree"
  let prnd,selnd,nd,tp,isProto,isShapeTree,drawIt,
    sl,cntr,el,cht,coffy,ely,soff,hiddenBy;
  if (this.__prim) {
    prnd = this.forParentNode();
    selnd = prnd;
  } else {
    nd = this.forNode();
    selnd = nd;
  }
  selectedLine = this;
  if (this.__selected && !forceRedisplay) {
    return;
  }
  if (prnd) {
    return;
  }
  tp = this.treeTop();
  isProto = tp.protoTree; // is this the prototype panel? 
  isShapeTree = !(isProto);// the shape panel 
  drawIt =  (src === "tree");
  sl = tp.__selectedLine;
  cntr = $(tp.__parent.__container);
  this.__selected = true;
  if (sl) {
    sl.unselectThisLine();
  }
  el = this.highlightedPart();
  el.$css("background-color",highlightColor );
  tp.__selectedLine = this;
  // take  care of scrolling
  cht = cntr.height();
  coffy = cntr.offset().top;
  // now scroll the fellow into view if needed
  ely = el.$offset().top;
  soff = cntr.scrollTop();
  hiddenBy = ely - (coffy+cht); // how far is this element below the visible area?
  if (hiddenBy > -40) {
    cntr.scrollTop(soff + hiddenBy+40);
  } else {
    hiddenBy = coffy -ely;
    if (hiddenBy > -40) {
      cntr.scrollTop(soff-hiddenBy-40);
    }
  }
  core.log("tree","SELECTION STAGE 1");
  if (isShapeTree) { // show the prototype in its panel
    if (this.__ref) {
      showRef(this.refValue);
    } else {
      showProtoChain(nd);
    }
  }
  if (drawIt) {
    selnd.__select('tree');
    core.originalSelectionPath = undefined;
    shownItem = selnd;

    core.ui.enableTreeClimbButtons();
  }    
  core.log("tree","SELECTION DONE");
}
  
WidgetLine.ancestorIsSelected = function () {
  let pr;
  if (this.__selected) {
    return true;
  }
  pr = this.treeParent();
  if (!pr) {
    return false;
  }
  return pr.ancestorIsSelected();
}


  
const hiddenProperty = function (p) {
  if (typeof p !== "string") {
    return false;
  }
  if (core.beginsWith(p,'__')) {
    return true;
  }
  if (core.endsIn(p,'_h_')) {
    return true;
  }
  if (hiddenProperties[p]) {
    return true;
  }
  return (core.beginsWith(p,"__fieldType")||core.beginsWith(p,"__inputFunction__")||core.beginsWith(p,"__status")||
          core.beginsWith(p,"__uiWatched")|| core.beginsWith(p,"__note"));
}
  
core.ObjectNode.__fieldIsEditable = function (k) {
  let ch,tp;
  if (frozenProperties[k]) {
    return false;
  }
  if (core.internal(k) || hiddenProperty(k)) {
    return false; // for now;
  }
  let hp = this.hiddenProperties;
  if (hp && hp[k]) {
    return false;
  }
  ch = this[k];
  tp = typeof ch;
  if (k==="data") {
    return false;
  }
  if (!this.__inWs()) {
    return false;
  }
  if (tp === "function") {
    return false;
  }
  return !this.__fieldIsFrozen(k)
}
  
core.ArrayNode.__fieldIsEditable = function (k) {
  let ch = this[k];
  let tp = typeof ch;
  if (tp === "function") {
    return false;
  }
  return true;
}
  
  
const hasEditableField = function (nd,overriden) { // hereditary'
  let k,ch;
  for (k in nd) {
    if (nd.__fieldIsEditable(k,overriden)) {
      return true;
    }
    ch = nd[k];
    if (core.isNode(ch) && hasEditableField(ch,overriden)) {
      return true;
    }
  }
  return false;
}
  
  
WidgetLine.popNote= function () {
  let prp = this.forProp;
  let prnd,nt,nd;
  if (this.__prim) {
    prnd = this.forParentNode();
    if (prnd) {
      nt = prnd.__getNote(prp);
    }
  } else {
    nd = this.forNode();
    if (nd === core.root) {
      nt = nd.__topNote;
    } else {
      nt = nd.__parent.__getNote(prp);
    }
  }
  if (nt) {
    viewNote(prp,nt);
  }
}
 
let dontShowFunctionsFor = [core.geom];
    
const externalizeString = function (s) {
  let t = viewableStringMaxLength;
  return (s.length > t)?s.slice(0,t) +"...":s;
}
    
const dataString = function (dt) {
  let tp = typeof dt;
  let nms,a,v,c;
  if ((tp === "string") || (tp === "number") ) {
    return dt;
  }
  if (core.ObjectNode.isPrototypeOf(dt)) {
    nms = Object.getOwnPropertyNames(dt);
    a = [];
    nms.forEach(function (k) {
      if (!core.internal(k)) {
        v = dt[k];
        if (v === null) {
          v = "null";
        }
        c = "";
        tp = typeof v;
        if (tp !== "object") {
          c += k+':';
          if (tp === "string") {
            c += externalizeString(v);
          } else if (tp === "number") {
            c += core.nDigits(v,2);
          } else {
            c += v;
          }
          a.push(c);
        }
      }
    });
    if (a.length > 0) {
      return "{"+a.join(",")+"}";
    }
  }
  }
  
  /* the correspondence between widgetLines and nodes is represented on the widgetLine side by the xpaths of the associated
   node: nodePath of non-prim widget lines and parentNodePath for prims. Nodes that have a corresponding widget line have
   the hasWidgetLine property. To look this line up, follow the node's xpath. */
  
core.ObjectNode.__widgetLineOf = function () {
  if (!this.hasWidgetLine) {
    return undefined;
  }
  let pth = core.xpathOf(this,core.root);
  let wl = mainTop.treeSelectPath(pth);
  return wl;
}
  
core.ArrayNode.__fieldIsHidden = function () {return false;}
  
// should  property k of this be shown? Returns 0, "prim" "function" "ref" or "node"
core.ObjectNode.__showInTreeP = function (k) {
  let dataValue,hidden,vl,tp,isFun,editable,isob,isnd;
  let v = this[k];
  if (core.isObject(v) && v.__hideInUI) {
     return false;
  }
  if (this.__coreProperty(k)) {
    return false; // a  property defined down in core modules of the proto chain.
  }
  // special case
  if (this.dimension && ((k === 'width') || (k === 'height'))) {
    return false;
  }
  if (hiddenProperty(k)) {
  
    return false;
  }
  let hp = this.hiddenProperties;
  if (hp && hp[k]) {
    return false;
  }
  if (k === "data") {
    dataValue = dataString(this.data);
    return dataValue?"prim":false;
  }
  // motivation: things like circleWithText, which should have its text attributes hidden if there
  // is no text, but they are still relevant in the prototype
  let isProto = core.isPrototype(this);//this.__get('__isPrototype');//core.isDescendantOf(this,core.root.prototypes);
  let cnd =  this.showConditions;
  if (cnd && !isProto) {
    let kcnd = cnd[k];
    if (kcnd && !kcnd.call(this)) {
      return false;
    }
  } 
  
  if (this.__fieldIsHidden(k)) {
    return false;
  } 
  
  vl = this[k];
  tp = typeof vl;
  isFun = tp === "function";
  if (isFun) {
    if (!showFunctions) {
      return false;
    }
    if (dontShowFunctionsFor.indexOf(this.__parent) >= 0) {
      return false;// excludes eg geom functions
    }
    return "function";
    
  }
  editable = this.__fieldIsEditable(k);
   if (onlyShowEditable && !editable ) {
      return false;
  }
  isnd = core.isNode(vl);
  if (isnd && !core.treeProperty(this,k)) {
    if (!this.hasOwnProperty(k)) {
      return false; // inherited references are not shown
    }
    return "ref";
  }
  isob = tp === "object";
  if (isob && !isnd) {
    return false;// Outside the tree
  }
  return isnd?"node":"prim";
}
 
core.ArrayNode.__showInTreeP = core.ObjectNode.__showInTreeP;
let inputFont = "8pt arial";

const computeStringWd = function (s) {
   let wm = ui.measureText(s,inputFont);
   return Math.max(20,wm+20)
}
 
core.ObjectNode.__mkPrimWidgetLine = function ({property:k}) { // for constants (strings, nums etc).  nd is the node whose property this line displays
  let nd = this;
  let isOwn = nd.hasOwnProperty(k);
  let rs = Object.create(WidgetLine);
  let atFrontier = rs.__atFrontier = nd.__atProtoFrontier(); // the next fellow in the prototype chain is outside the ws
  let ownp = nd.hasOwnProperty(k);
  let inherited = !ownp;
  let el = html.Element.mk('<div style="padding-bottom:2px"></div>');
  let txt,qm,sp,ovrEl,editable,onInput,cp,cl,handleInput,notePop,inpwd,inp,enterH,ftp;
  el.set('w',rs);
  el.$click(function () {
    rs.selectThisLine("tree");
  });
  rs.__prim = true;
  rs.parentNodePath = core.xpathOf(nd,core.root);
  rs.forProp = k;
  txt = (isOwn?'*':'')+k;
  if (nd.__getNote(k)) {
    qm =  html.Element.mk('<span style="color:blue;margin-right:5px;cursor:pointer;font-weight:bold">?</span>');
    el.set("qm",qm);
    notePop = function () {rs.popNote()};
    qm.$click(notePop);
    sp =  html.Element.mk('<span style="cursor:pointer;color:cl;padding-right:5px">'+txt+'</span>');
    sp.$click(notePop);
  } else {
    sp =  html.Element.mk('<span style="padding-right:5px;font-size:small">'+txt+'</span>');
  }
  el.set("title",sp);
  rs.title = sp;
  ftp = nd.__getFieldType(k);
  el.set('ovr',ovrEl);
  rs.ovr = ovrEl;
  editable = this.__fieldIsEditable(k);
  if (!editable) {
    inp =  html.Element.mk('<span/>');
    el.set("valueField",inp);
    rs.kind = "value";
    return rs;
  }
  //  the input field, and its handler
  onInput = function (chv) {
    let rsinh,event;
    if (typeof chv === "string") {
      ui.alert(chv);
    } else if (chv) {
      rs.title.$html('*'+k);
      ui.vars.setSaved(false);
      rsinh = rs.upChain();
      rsinh.forEach(function (wlc) {
        if (!wlc.colorPicker) { //handled in __newColor__
          wlc.updateValue({});
        }
      }); 
        // special case, obviously
      if (k !== "backgroundColor"  ||  ui.draw) {
        if (rs.inherited) {
          rs.inherited.$hide(); // this field is no longer inherited, if it was before
        }
        if (rs.inherit) {
          rs.inherit.$show();
        }
      }
      if (ui.vars.eventsEnabled) {
        event = core.Event.mk('UIchange',nd);
        event.property=k;
        event.emit();
      }
      dom.svgMain.updateAndDraw();
      ui.updateControlBoxes();
      refreshValues();
      core.saveState('propertyEdit');
    }
  }   
    // put in a color picker
  if (ftp === "svg.Rgb") {
    cp = html.Element.mk('<input type="input" value="CP"/>');
    cl = nd[k];
    cl = cl?cl:"black";
    cp.__color__ = cl; // perhaps the inherited value
    cp.__newColor__ = function (color) {
      let cls,inh,icp;
      let chv = ui.processInput(inp,nd,k,inherited&&(!atFrontier),computeStringWd,color);
      onInput(chv);
      cls = color.toRgbString();
      inh = rs.upChain();
      inh.forEach(function (wlc) {
        icp = wlc.colorPicker;
        if (icp) {
          $(icp.__element).spectrum("set",cls);
        }
      });
    }
    el.set("colorPicker",cp);
    rs.kind = "colorPicker";
    return rs;
  }
  if (ftp === 'boolean') {
    let seltxt =
      '<select><option value="true">true</option><option value="false">no</option></select>';
    let sel = html.Element.mk(seltxt);
    sel[2].text = 'false';
    if (nd[k]) {
      sel[1].selected = true;
    } else {
      sel[2].selected = true;
    }
    el.set('select',sel);
    sel.addEventListener("change",function () {
      let idx = sel.__element.selectedIndex;
      let value = idx===0;
      nd.set(k,value);
      if (nd.__visible()) {
        nd.__update();
      }
      //dom.afterSetValue(nd);
      onInput(true);      
    });
    rs.kind = "boolean";
    return rs;
  }
  // the remaining case
  //put in a text input field 
  inpwd = 100;// this gets replaced anyway when the value is measured
  inp = html.Element.mk('<input type="input" value="" style="font-size:8pt;font:tree.inputFont;background-color:#e7e7ee;width:'+
                           inpwd+'px;margin-left:10pt"/>');
  handleInput = function () {
    let chv = ui.processInput(inp,nd,k,inherited,computeStringWd);
    onInput(chv);
  }
  enterH = function (e) {    
    if((e.key === 13)||(e.keyCode === 13)) {
       handleInput();
    }
  }
  inp.addEventListener("blur",handleInput);
  el.set("inputField",inp);
  rs.kind = "input";
  inp.addEventListener("keyup",enterH);
  return rs;
}

core.ArrayNode.__mkPrimWidgetLine = core.ObjectNode.__mkPrimWidgetLine;

// it is convenient to erase "inherited" when the user starts to type into the field
 
let stringLengthLimit = 60;
// for prim widget lines only
WidgetLine.updateValue = function ({node:ind}) {
  let el = this.__parent;
  let ttl = this.title;  
  let nd=ind?ind:this.forParentNode();
  if (!nd) {
     core.error('ui','unexpected condition'); 
    return;
  }
  let k = this.forProp;
  let isOwn = nd.hasOwnProperty(k);
  let txt = (isOwn?'*':'')+k;
  if (ttl) {
    ttl.$html(txt);
  }
  let ds = (k === 'data')?dataString(nd.data):undefined;
  let vl = nd[k]; 
  let ovr = this.fieldIsOverridden(k);
  let isFun = typeof vl === "function";
  // assumption: once a field is a color or function this remains true
  let ovrEl,knd,vts,inf,cwd,cp,jel;
  if (isFun) {
    return;
  }
  ovrEl = el.ovr;
  if (ovrEl) {
    ovrEl.setVisibility(ovr);
  }
  knd = this.kind;
  vts = ds?ds:ui.applyInputF(nd,k,vl);
  if (typeof vts === "number") {
    vts = core.nDigits(vts,4);
  }
  if (knd === "input") {
    inf = el.inputField;
    inf.$prop("value",vts);// I don't understand why this is needed, but is
    inf.$attr("value",vts);
    cwd = computeStringWd(vts);
    inf.$css("width",cwd+"px");
  } else if (knd === "colorPicker") {
    cp = el.colorPicker;
    cp.__color__ = vl; // perhaps the inherited value
    jel = $(cp.__element);
    if (jel) {
      jel.spectrum("set",vl);
    }
  } else {
    if (typeof vts === "string") {
      if (vts.length > stringLengthLimit) {
        vts = vts.substr(0,stringLengthLimit)+"...";
      }
    }
    if (el.valueField) {
      el.valueField.$html(vts);
    }
  }
}
    
const mkRangeWidgetLine = function (nd,lb,ub,increment) {
  // usually increment = (ub+1-lb) but not always for the last range
  let cl = "black";
  let rs = Object.create(WidgetLine);
  let el = nonPrim.instantiate();
  let txt,m,nspan,tspan,pth;
  el.set("w",rs);
  rs.__range = true;
  pth = core.xpathOf(nd,core.root);
  rs.nodePath = pth;
  rs.lowerBound = lb;
  rs.upperBound = ub;
  rs.increment = increment;
  txt = "["+lb+"..."+ub+"]";
  m = el.main;
  m.note.$hide();
  nspan = m.theName;
  nspan.$html(txt);
  rs.id = txt;
  tspan = m.toggle;
  cl = function () {
    rs.toggle();
  };
  tspan.$click(cl); 
  return rs;
}
  
const mkRefWidgetLine = function (top,nd,k,v) { // for constants (strings, nums etc).  nd is the node whose property this line displays
  let rf = core.refPath(v,top);
  let cl,rs,sp;
  if (!rf) {
    return undefined;
  }
  cl = "black";
  rs = WidgetLine.mk({tag:"div",style:{color:cl}});
  //sp =  html.Element.mk('<span>'+(k + " REF ")+'</span>');
  sp =  html.Element.mk('<span>'+ k + " REF </span>");
  rs.set("ttl",sp);
  rs.$click(function () {
    rs.selectThisLine("tree");
  });
  rs.__ref =true;
  rs.refValue = v;
  return rs;
}


WidgetLine.visible = function () {
  let pr;
  if (this.__treeTop) {
    return true;
  }
  pr = this.treeParent();
  return pr.visible() && pr.expanded;
}

// first parent which is not a range; that is, parent if ranges are passed through

WidgetLine.nonRangeParent = function () {
  let rs = this.treeParent();
  if ( !rs) {
    return undefined;
  }
  if (rs.__range) {
    return rs.nonRangeParent();
  } else {
    return rs;
  }
}

// the corresponding operation going down the tree; goes past range nodes; accumulate in rs
WidgetLine.childrenPastRanges = function (rs) {
  let frs,tch;
  if (!rs) {
     frs = [];
     this.childrenPastRanges(frs);
     return frs;
  }
  tch = this.treeChildren();
  if (!tch) {
    return;
  }
  tch.forEach(function (ch) {
    if (ch.__range) {
      ch.childrenPastRanges(rs);
    } else {
      rs.push(ch);
    }
  });                 
  }

export {vars,shownItem};