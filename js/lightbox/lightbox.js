import * as core from "/js/core-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.min.js";

const html = dom.html;

let Lightbox = core.ObjectNode.mk();

//let Lightbox = lightbox.set("Lightbox",core.Object.mk()).__namedType();
let theBox  = Lightbox.set('box',
                    html.Element.mk('<div style="border:white black;position:absolute;z-index:5000;background-color:white;color:black"/>'));
        
let topLine = theBox.set("topLine",
  html.Element.mk('<div style="position:relative;width:100%;background-color:white;color:black;height:30px"></div>'));
              
topLine.set("closeX",
  html.Element.mk('<div style="position:absolute;right:0px;padding:3px;cursor:pointer;background-color:red;font-weight:bold;'+
                  'border:thin solid black;font-size:12pt;color:black">X</div>'));
topLine.set("content",html.Element.mk('<div/>'));
theBox.set("content",html.Element.mk('<div style="bbackground-color:red;z-index:1000"> This  should be replaced using setContent</div>'));

 
// replaced when popped
const shade =
  html.Element.mk(`<div style="position:absolute;top:0px;left:0px;width:600px; height:100px;z-index:500;
        opacity:0.8;background-color:rgba(0,0,0,0.5);color:white"/>`);



Lightbox.setTopline = function (ht) {
    this.topLine.html(ht);
}

Lightbox.setContent = function (cn) {
  this.box.content.$empty();
  this.box.content.set("content",cn);
}

Lightbox.setHtml = function (ht) {
  this.box.content.$css({"padding":"20px"});
  this.box.content.$html(ht);
}

Lightbox.dismiss = function () {
  this.box.$hide();
  shade.$hide();
}
  
Lightbox.pop = function (dontShow,iht,withoutTopline) {
  this.render();
  let wd = $(document).width();
  let ht = $(document).height();
  let w = $(window);
  let stop = w.scrollTop();
  let bht = w.height();
  let bwd = w.width();
  let r = this.rect;
  let lwd = r.extent.x;
  let eht;
  /* center the fellow */
  let lft = Math.max((bwd - lwd)/2,50);
  if (iht) {
    eht = iht;
  } else {
    eht = Math.max(bht - (r.extent.y) - 50,50);
  }
  if (withoutTopline) {//for the chooser
    eht = Math.min(bht -  100,400);
  }
  this.box.$show();
  this.box.$css({'background-color':'white'});
  let cn = this.box.content;
  cn.$css({height:eht+"px"});
  let dims = {position:"absolute",width:lwd+"px",height:(eht+"px"),top:(stop+35)+"px",left:(lft+"px"),"z-index":3};
  this.box.$css(dims);
  shade.$css({width:(wd+"px"),height:(ht+"px"),top:"0px",left:"0px","z-index":2});
  if (this.iframe) {
    this.iframe.attr("width",this.width-25);
  }
  if (!dontShow) {
    shade.$show(); 
    this.box.$show();
    if (withoutTopline) {
      this.box.topLine.$hide();
    } else {
      this.box.topLine.$show();
    }
  } else {
    this.dismiss();
  }
}
  

 Lightbox.afterClose = function () {
   if (this.afterCloseCallback) {
     this.afterCloseCallback();
   }
 }
 
 
 Lightbox.activateClose = function (whenClosed) {
   let thisHere = this;
   this.box.topLine.closeX.$click(function () {
     thisHere.dismiss();thisHere.afterClose();if (whenClosed) {
      whenClosed();
     }
   });
 }

Lightbox.render = function () {
  let bx = this.box;
  let b;
  if (bx.__element) {
    return; // already rendered 
  }
  if (core.mainPage) {
    b = core.mainPage.__element;
  } else { 
    b = document.body;
  }
  if (!shade.__element) {
    shade.__addToDom(b);
  }
  bx.__addToDom(b);
  shade.$hide();
}

  
  
// msg might be a string or an element

Lightbox.popMessage = function (msg,centerIt) {
  let msgdiv;
  this.pop();
  this.element.empty();
  this.addClose();
  if (typeof msg === 'string') {
    msgdiv = $('<div/>');
    msgdiv.css({"margin":"20px"});
    if (centerIt)  {
      msgdiv.css({'text-align':'center'});
    }
    msgdiv.html(msg);
  } else {
    msgdiv = msg;
  }
  this.element.append(msgdiv);
}



 Lightbox.setRect = function (rect) {
   this.rect  = rect;
   let c = rect.corner;
   let ex = rect.extent;
   let css = {left:(c.x)+"px",top:(c.y)+"px",width:(ex.x)+"px",height:(ex.y)+"px"};
   this.box.css(css);
   this.box.content.css({height:(ex.y-50)+"px",width:(ex.x-20)+"px"});
 }
  


const newLightbox =  function (rect,content) {
  let rs = Lightbox.instantiate();
  rs.set("rect",rect.instantiate());
  if (content) {
    rs.setContent(content);
  }
  rs.container = document.body;
  rs.activateClose();
  return rs;
}
  
export {newLightbox};
