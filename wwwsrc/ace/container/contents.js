removeThis
// many basic shapes optionally include text, and so are groups in SVG

core.require('/text/textarea.js','/text/combo.js',function (textareaP,combo) {

let item = dom.SvgElement.mk('<g/>');

/* adjustable parameters */
item.width = 50;
item.height = 35;
item.fill = 'black';
item['font-style'] = "normal";
item['font-size'] = "12";
item.topPadding = 0;
item.vSep = 5; // between image and text
item.bottomPadding = 0;
item.sidePadding = 7;
item.lineSep = 5;
item["font-family"] = "arial";
item["font-weight"]="normal";
/*end adjustable parameters*/

item.role = 'vertex';
item.resizable = true;
item.lastWidth = item.width;
item.lastHeight = item.height;
item.lastDim = item.dimension;

item.text = '';

item.set('textProperties',core.lift(dom.defaultTextPropertyValues));
 // core.setPropertiesIfMissing(container,this,contentProperties);
 item.textProperties.__setFieldType('stroke','svg.Rgb');


 const dealWithImage =  (itm,textItem,textHeight) => {
    let image = itm.__parent.image;
    if (!image) {
      return;
    } 
    let extraTopPadding = itm.extraTopPadding?itm.extraTopPadding:0;
    let topPadding = extraTopPadding+itm.topPadding;
    let extraBottomPadding = itm.extraBottomPadding?itm.extraBottomPadding:0;
    let bottomPadding = extraBottomPadding+itm.bottomPadding;
    let extraSidePadding = itm.extraSidePadding?itm.extraSidePadding:0;
    let sidePadding = extraSidePadding+itm.sidePadding;
    let imHeight=0;
    let imWidth = 0;
    let aspectRatio = image.aspectRatio;
    let maxImHeight = itm.height - topPadding - (textHeight?itm.vSep:0) - textHeight - bottomPadding;
    let maxImWidth = itm.width - 2*sidePadding;
    if ((maxImHeight < 0) || (maxImWidth < 0)) {
      image.hide();
    } else {
      image.show();
    }
    let imWidthAtMaxHeight = maxImHeight * aspectRatio; // how wide would the image be if its height were at max
    if (imWidthAtMaxHeight < maxImWidth) { // bounded by height
       imHeight = maxImHeight;
       imWidth = imWidthAtMaxHeight;
    } else { // bounded by width
      imWidth = maxImWidth;
      imHeight = imWidth/aspectRatio;
    }
    image.width = imWidth;
    image.height = imHeight;
    let midIm = textHeight?(-0.5*itm.height+itm.topPadding+0.5*imHeight):0;
    image.moveto(geom.Point.mk(0,midIm));
    if (textHeight) {
      let midText = 0.5*itm.height - bottomPadding - 0.5*textHeight;
      textItem.moveto(geom.Point.mk(0,midText));
    }
  }

item.firstUpdate = true;
item.update = function (whichExtent) {
  combo.updateCombo(this,whichExtent,dealWithImage);
}


let minBorderProperties = ['width','height','dimension','stroke','fill','stroke-width'];
let contentProperties = ['sidePadding','topPadding','vSep','bottomPadding'];
let borderPP,contentsPP;


const containerProperties = ['topPadding','vSep','bottomPadding','sidePadding','lineSep','textProperties'];
 
 //once shown, they stay shown                            
const hideContainerProperties  = (container,hideEm) => {
    if (!container.containerPropertiesShown) {
      if (hideEm) {
        if (!container.containerPropertiesHidden) {
          containerProperties.forEach((prop) =>  ui.hide(container,prop));
          container.containerPropertiesHidden = true;
        }
      } else {
        containerProperties.forEach((prop) =>  ui.show(container,prop));
        container.containerPropertiesShown = true;
      }
    }

  };
    



return item;
});

