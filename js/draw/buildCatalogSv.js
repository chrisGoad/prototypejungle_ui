
//shapes
const catShape = function () {
let shapeFF = 0.4;
    let nn = 0;
      fb.addToDirectory('/catalog/shape','text.link',{iindex:nn++,url:"/shape/textPlain.js",role:"vertex",fitFactor:0.3,svg:"(sys)/forCatalog/text_no_box.svg"});
    fb.addToDirectory('/catalog/shape','image.link',{iindex:nn++,url:"/container/rectangle.js",role:"vertex",fitFactor:0.5,svg:"(sys)/forCatalog/image_no_box.svg"});
   fb.addToDirectory('/catalog/shape','circle.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/circle.js","spot":"/shape/circle.js"},svg:"(sys)/forCatalog/circle.svg"});
      fb.addToDirectory('/catalog/shape','square.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                        urls:{"vertex":"/container/square.js","spot":"/shape/square.js"},title:"Square",svg:"(sys)/forCatalog/square.svg"});
fb.addToDirectory('/catalog/shape','rectangle.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                  urls:{"vertex":"/container/rectangle.js","spot":"/shape/rectangle.js"},title:"Rectangle",svg:"(sys)/forCatalog/rectangle.svg"});
        fb.addToDirectory('/catalog/shape','roundedRectangle.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                          urls:{"vertex":"/container/roundedRectangle.js","spot":"/shape/roundedRectangle.js"},svg:"(sys)/forCatalog/roundedRectangle.svg"});
       fb.addToDirectory('/catalog/shape','shadedRectangle.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                          urls:{"vertex":"/container/shadedRectangle.js","spot":"/shape/shadedRectangle.js"},svg:"(sys)/forCatalog/shadedRectangle.svg"});
   fb.addToDirectory('/catalog/shape','spiral.link',{iindex:nn++,url:"/shape/spiral.js",roles:["vertex","spot"]});
    fb.addToDirectory('/catalog/shape','shadedCircle.link',{iindex:nn++,roles:["vertex","spot"],
                     urls:{"vertex":"/container/shadedCircle.js","spot":"/shape/shadedCircle.js"},svg:"(sys)/forCatalog/shadedCircle0.svg",
    settings:{"outerFill":"rgb(50,50,100)","fx":0.2,"fy":0.2,"stroke":"transparent"}});
    fb.addToDirectory('/catalog/shape','shadedCircle2.link',{iindex:nn++,roles:["vertex","spot"],
                     urls:{"vertex":"/container/shadedCircle.js","spot":"/shape/shadedCircle.js"},svg:"(sys)/forCatalog/shadedCircle.svg",
                     settings:{"outerFill":"rgb(100,50,50)","innerFill":"red","fx":0.5,"fy":0.5,"midOpacity":0.1,
                     "midpoint":0.7,"stroke":"transparent"}});
    fb.addToDirectory('/catalog/shape','lozenge.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/lozenge.js","spot":"/shape/lozenge.js"},svg:"(sys)/forCatalog/lozenge.svg"});
  fb.addToDirectory('/catalog/shape','regularPolygon.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/regularPolygon.js","spot":"/shape/regularPolygon.js"},title:"Polygon",svg:"(sys)/forCatalog/regularPolygon.svg"});
  fb.addToDirectory('/catalog/shape','bullsEye.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/bullsEye.js","spot":"/shape/bullsEye.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
   //fb.addToDirectory('/catalog/shape','horizontalBracket.link',{iindex:nn++,roles:['vertex','spot'],fitFactor:shapeFF,
   //                    urls:{"vertex":"/container/horizontalBracket.js","spot":"/shape/horizontalBracket.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
   fb.addToDirectory('/catalog/shape','curve.link',{iindex:nn++,url:"/shape/curve.js",title:'Free Curve',svg:"(sys)/forCatalog/curve.svg"});
}


// connectors

const catConnector = function () {

 let nn = 1;
 fb.addToDirectory('/catalog/connector','line.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/line.js",line:'/line/line.js'},svg:"(sys)/forCatalog/line.svg"});
fb.addToDirectory('/catalog/connector','decoLine.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/decoLine.js",line:'/line/decoLine.js'},svg:"(sys)/forCatalog/line/decoLine.svg"});
fb.addToDirectory('/catalog/connector','wavyLine.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/wavyLine.js",line:'/line/wavyLine.js'},svg:"(sys)/forCatalog/line/wavyLine.svg"});
fb.addToDirectory('/catalog/connector','bulbous.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/bulbous.js",line:'/line/bulbous.js'},svg:"(sys)/forCatalog/line/bulbous.svg"});
fb.addToDirectory('/catalog/connector','spots.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/spots.js",line:'/line/spots.js'},svg:"(sys)/forCatalog/line/spots.svg"});
fb.addToDirectory('/catalog/connector','connectedSpots.link',{iindex:nn++,roles:['edge','line'],urls:{edge:"/connector/connectedSpots.js",line:'/line/connectedSpots.js'},svg:"(sys)/forCatalog/line/connectedSpots.svg"});
  fb.addToDirectory('/catalog/connector','arrow.link',{iindex:nn++,url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrow.svg"});
fb.addToDirectory('/catalog/connector','arrowMiddle.link',{iindex:nn++,url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrowMiddle.svg",settings:{"headInMiddle":true}});
fb.addToDirectory('/catalog/connector','arrowDoubleEnded.link',{iindex:nn++,url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrowDoubleEnded.svg",settings:{"doubleEnded":true}});
fb.addToDirectory('/catalog/connector','arcArrow.link',{iindex:nn++,url:"/arrow/arcArrow.js",role:"edge",svg:"(sys)/forCatalog/arcArrow.svg"});


fb.addToDirectory('/catalog/connector','oneBend.link',{iindex:nn++,url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/oneBend.svg",
settings:{"vertical":true,"includeArrow":false,"end0":[-30,0],"end1":[0,-30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','oneBendArrowV.link',{iindex:nn++,url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/arrow/oneBendV.svg",
settings:{"vertical":true,"includeArrow":true,"end0":[-30,0],"end1":[0,-30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','oneBendArrowH.link',{iindex:nn++,url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/arrow/oneBendH.svg",
settings:{"vertical":false,"includeArrow":true,"end0":[30,0],"end1":[0,30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','blank0.link',{iindex:nn++,url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/blank.svg",
settings:{"vertical":false,"includeArrow":true,"end0":[30,0],"end1":[0,30]},fitFactor:0.4});

fb.addToDirectory('/catalog/connector','twoBendsV.link',{iindex:nn++,url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/twoBendsV.svg",
settings:{"vertical":true,"includeArrow":false,"depth":-19,"end0":[0,20],"end1":[0,-20]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsH.link',{iindex:nn++,url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/twoBendsH.svg",
settings:{"vertical":false,"includeArrow":false,"depth":19,"end0":[-20,0],"end1":[20,0]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsArrowV.link',{iindex:nn++,url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/arrow/twoBendsV.svg",
settings:{"vertical":true,"includeArrow":true,"depth":-19,"end0":[0,20],"end1":[0,-20]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsArrowH.link',{iindex:nn++,url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/arrow/twoBendsH.svg",
settings:{"vertical":false,"includeArrow":true,"depth":19,"end0":[-20,0],"end1":[20,0]},fitFactor:0.4});


// remove fb.addToDirectory('/catalog/connector','cArrow.link',{iindex:nn++,url:"/arrow/cArrow.js",role:"edge",svg:"(sys)/forCatalog/arrow/c.svg"});
//settings:{"end0":[1,2]}});
// remove fb.addToDirectory('/catalog/connector','uArrow.link',{iindex:nn++,url:"/arrow/uArrow.js",role:"edge",svg:"(sys)/forCatalog/arrow/u.svg",fitFactor:0.4});

fb.addToDirectory('/catalog/connector','multiInV.link',{iindex:nn++,url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/multiInV.svg",
settings:{"vertical":true,"includeArrow":false,"singleEnd":[0,-15],"ends":[[-15,15],[15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInH.link',{iindex:nn++,url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/multiInH.svg",
settings:{"vertical":false,"includeArrow":false,"singleEnd":[15,0],"ends":[[-15,-15],[-15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInArrowV.link',{iindex:nn++,url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/arrow/multiInV.svg",
settings:{"vertical":true,"includeArrow":true,"singleEnd":[0,-15],"ends":[[-15,15],[15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInArrowH.link',{iindex:nn++,url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/arrow/multiInH.svg",
settings:{"vertical":false,"includeArrow":true,"singleEnd":[15,0],"ends":[[-15,-15],[-15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiOutArrowV.link',{iindex:nn++,url:"/arrow/multiOut.js",role:"multiOut",
svg:"(sys)/forCatalog/arrow/multiOutV.svg",
settings:{"vertical":true,"includeArrows":true,"singleEnd":[0,15],"ends":[[-15,-15],[15,-15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiOutArrowH.link',{iindex:nn++,url:"/arrow/multiOut.js",role:"multiOut",
svg:"(sys)/forCatalog/arrow/multiOutH.svg",
settings:{"vertical":false,"includeArrows":true,"singleEnd":[-15,0],"ends":[[15,-15],[15,15]]},fitFactor:0.4});


return "ok";
}

//lines

const catLine = function () {
    let nn = 0;
       fb.addToDirectory('/catalog/line','line.link',{iindex:nn++,url:'/line/line.js',role:"line"});
     fb.addToDirectory('/catalog/line','wavyLine.link',{iindex:nn++,url:"/line/wavyLine.js",role:"line",svg:"(sys)/forCatalog/line/wavyLine.svg"});//,svg:"(sys)/forCatalog/line/decoLine.svg"});
    fb.addToDirectory('/catalog/line','decoLine.link',{iindex:nn++,url:"/line/decoLine.js",role:"line",svg:"(sys)/forCatalog/line/decoLine.svg"});
     fb.addToDirectory('/catalog/line','bulbous.link',{iindex:nn++,url:"/line/bulbous.js",role:"line",svg:"(sys)/forCatalog/line/bulbous.svg"});//,svg:"(sys)/forCatalog/line/decoLine.svg"});
       fb.addToDirectory('/catalog/line','meander.link',{iindex:nn++,url:'/border/meander.js',role:"horizontalLine",
                         svg:"(sys)/forCatalog/meander2.svg"});
}

// boxes
const catBox = function () {
    let nn = 0;
       fb.addToDirectory('/catalog/box','box0.link',{iindex:nn++,roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/box.svg",settings:{extraRight:0,extraLeft:0}});
   fb.addToDirectory('/catalog/box','box.link',{iindex:nn++,roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/extra.svg"});
 fb.addToDirectory('/catalog/box','boxwithcorners.link',{iindex:nn++,roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/cornerbox.svg",settings:{extraRight:0,extraLeft:0,cornerOffset:3}});
       fb.addToDirectory('/catalog/box','decorated0.link',{iindex:nn++,roles:['vertex','spot'],
                  urls:{"vertex":"/container/decorated0.js","spot":"/box/decorated0.js"},svg:"(sys)/forCatalog/border_decorated0.svg"});
    /* fb.addToDirectory('/catalog/box','decorated1.link',{iindex:nn++,roles:['vertex','spot'],
                  urls:{"vertex":"/container/decorated1.js","spot":"/box/decorated1.js"},svg:"(sys)/forCatalog/border_decorated1.svg"});
                  */
}
       

 // arrow heads
const catArrowHead = function () {
  let nn = 0;
  fb.addToDirectory('/catalog/arrowHead','line.link',
       {iindex:nn++,url:"/arrow/lineHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/lineHead.svg"});
 fb.addToDirectory('/catalog/arrowHead','solid.link',
       {iindex:nn++,url:"/arrow/solidHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/solidHead.svg"});
fb.addToDirectory('/catalog/arrowHead','curvedInLine.link',
       {iindex:nn++,url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedInLineHead.svg",settings:{curvedIn:true,solidHead:false}});
 fb.addToDirectory('/catalog/arrowHead','curvedInSolid.link',
       {iindex:nn++,url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedInSolidHead.svg",settings:{curvedIn:true,solidHead:true}});
 fb.addToDirectory('/catalog/arrowHead','curvedOutLine.link',
       {iindex:nn++,url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedOutLineHead.svg",settings:{curvedIn:false,solidHead:false}});
 
 fb.addToDirectory('/catalog/arrowHead','curvedOutSolid.link',
       {iindex:nn++,url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedOutSolidHead.svg",settings:{curvedIn:false,solidHead:true}});
}


// kit
const catKit  = function () {
 //https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg/486px-Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg
let nn = 1;


//fb.addToDirectory('/catalog/kit','blank0.link',{iindex:nn++,url:"/kit/smallGraph.js",
//svg:"(sys)/forCatalog/blank.svg"});

             
fb.addToDirectory('/catalog/kit','tree2V.link',
       {iindex:nn++,url:"/kit/startTree2V.js",svg:"(sys)/forCatalog/kit/tree2V.svg"});
fb.addToDirectory('/catalog/kit','tree2H.link',
       {iindex:nn++,url:"/kit/startTree2H.js",svg:"(sys)/forCatalog/kit/tree2H.svg"});
       
       
fb.addToDirectory('/catalog/kit','treeV.link',
       {iindex:nn++,url:"/kit/startTreeV.js",svg:"(sys)/forCatalog/tree.svg"});
 fb.addToDirectory('/catalog/kit','treeH.link',
       {iindex:nn++,url:"/kit/startTreeH.js",svg:"(sys)/forCatalog/kit/treeH.svg"});


 fb.addToDirectory('/catalog/kit','familyTree.link',
       {iindex:nn++,url:"/kit/familyTree.js",svg:"(sys)/forCatalog/kit/familyTree.svg"});
       
            
 fb.addToDirectory('/catalog/kit','bracket.link',
       {iindex:nn++,url:"/kit/bracket.js",svg:"(sys)/forCatalog/kit/bracket.svg"});
       
              
       
fb.addToDirectory('/catalog/kit','ring.link',
       {iindex:nn++,url:"/kit/ring.js",svg:"(sys)/forCatalog/ring.svg"});
fb.addToDirectory('/catalog/kit','radial.link',
       {iindex:nn++,url:"/kit/radial.js",svg:"(sys)/forCatalog/radial.svg"});

fb.addToDirectory('/catalog/kit','graph.link',
       {iindex:nn++,url:"/kit/smallGraph.js",svg:"(sys)/forMainPage/smallGraph.svg",title:'Graph'});
       

//fb.addToDirectory('/catalog/kit','fromData.link',
//       {iindex:nn++,url:"/example/fromData.js",svg:"(sys)/forCatalog/radial.svg"});
}


/*
 https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Guido_Cagnacci_003.jpg/800px-Guido_Cagnacci_003.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg/486px-Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg
*/
// image
const catImage = function () {
 let nn = 1;
fb.addToDirectory('/catalog/image','below.link',
          {iindex:nn++,url:"notused.jpg",role:"vertex",svg:"(sys)/forCatalog/image_text_below.svg",
          settings:{anyImage:true,textBelowImage:true,"includeOutline":true,"text":"Text"}});
fb.addToDirectory('/catalog/image','beside.link',
          {iindex:nn++,url:"notused.jpg",role:"vertex",svg:"(sys)/forCatalog/image_text_beside.svg",
          settings:{anyImage:true,textBelowImage:false,"includeOutline":true,"text":"Text"}});

          
fb.addToDirectory('/catalog/image','sample.link',
          {iindex:nn++,url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/474px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
          role:"vertex"});

}

export {catShape,catConnector,catLine,catBox,catArrowHead,catKit,catImage};
