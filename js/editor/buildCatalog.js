
const addToDirectory = function (directory,str,ob,cb) {
	let path = directory + '/' + str;
	let json = JSON.stringify(ob);
	core.saveJson(path,json,cb);
}
	
	

//shapes
const catShape = function () {
let shapeFF = 0.4;
   // let nn = 0;
	    debugger;
      addToDirectory('/catalog/shape','.order',
                        'text,image,circle,ellipse,square,rectangle,randomSquare,randomRectangle,nest2,roundedRectangle,shadedRectangle,spiral,'+
                        'shadedCircle,shadedCircle2,arcThing2,lozenge,regularPolygon,bullsEye,curve');
      
      addToDirectory('/catalog/shape','text.link',{url:"/shape/textPlain.js",role:"vertex",fitFactor:0.3,svg:"/forCatalog/text_no_box.svg"});
    addToDirectory('/catalog/shape','image.link',{url:"/container/rectangle.js",role:"vertex",fitFactor:0.5,svg:"/forCatalog/image_no_box.svg"});
   addToDirectory('/catalog/shape','circle.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/circle.js","spot":"/shape/circle.js"},svg:"/forCatalog/circle.svg"});
	 return;
   fb.addToDirectory('/catalog/shape','ellipse.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/ellipse.js","spot":"/shape/ellipse.js"},svg:"(sys)/forCatalog/ellipse.svg"});
      fb.addToDirectory('/catalog/shape','square.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                        urls:{"vertex":"/container/square.js","spot":"/shape/square.js"},svg:"(sys)/forCatalog/square.svg"});
fb.addToDirectory('/catalog/shape','randomSquare.link',{roles:['vertex','spot'],fitFactor:shapeFF,title:"Randomized",
                  urls:{"vertex":"/container/randomSquare.js","spot":"/random/square.js"},svg:"(sys)/forCatalog/square.svg"});
 fb.addToDirectory('/catalog/shape','rectangle.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                  urls:{"vertex":"/container/rectangle.js","spot":"/shape/rectangle.js"},svg:"(sys)/forCatalog/rectangle.svg"});
fb.addToDirectory('/catalog/shape','randomRectangle.link',{roles:['vertex','spot'],fitFactor:shapeFF,title:"Randomized",
                  urls:{"vertex":"/container/randomRectangle.js","spot":"/random/rectangle.js"},svg:"(sys)/forCatalog/rectangle.svg"});
fb.addToDirectory('/catalog/shape','nest2.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                  urls:{"vertex":"/container/nest2.js","spot":"/assembly/nest2.js"},svg:"(sys)/forCatalog/nest2.svg"});
  
        fb.addToDirectory('/catalog/shape','roundedRectangle.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                          urls:{"vertex":"/container/roundedRectangle.js","spot":"/shape/roundedRectangle.js"},svg:"(sys)/forCatalog/roundedRectangle.svg"});
       fb.addToDirectory('/catalog/shape','shadedRectangle.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                          urls:{"vertex":"/container/shadedRectangle.js","spot":"/shape/shadedRectangle.js"},svg:"(sys)/forCatalog/shadedRectangle.svg"});
   fb.addToDirectory('/catalog/shape','spiral.link',{url:"/shape/spiral.js",roles:["vertex","spot"]});
    fb.addToDirectory('/catalog/shape','shadedCircle.link',{roles:["vertex","spot"],
                     urls:{"vertex":"/container/shadedCircle.js","spot":"/shape/shadedCircle.js"},svg:"(sys)/forCatalog/shadedCircle0.svg",
    /*settings:{"outerFill":"rgb(50,50,100)","fx":0.2,"fy":0.2,"stroke":"transparent"}*/});
     fb.addToDirectory('/catalog/shape','blurredCircle.link',{roles:["vertex","spot"],
                     urls:{"vertex":"/container/blurredCircle.js","spot":"/shape/blurredCircle.js"},svg:"(sys)/forCatalog/shadedCircle0.svg",
    /*settings:{"outerFill":"rgb(50,50,100)","fx":0.2,"fy":0.2,"stroke":"transparent"}*/});
    fb.addToDirectory('/catalog/shape','shadedCircle2.link',{roles:["vertex","spot"],
                     urls:{"vertex":"/container/shadedCircle.js","spot":"/shape/shadedCircle.js"},svg:"(sys)/forCatalog/shadedCircle.svg",
                     settings:{"outerFill":"rgb(100,50,50)","innerFill":"red","fx":0.5,"fy":0.5,"midOpacity":0.1,
                     "midpoint":0.7,"stroke":"transparent"}});
    fb.addToDirectory('/catalog/shape','arcThing2.link',{roles:["vertex","spot"],
                     urls:{"vertex":"/container/arcThing2.js","spot":"/shape/arcThing2.js"},svg:"(sys)/forCatalog/arcThing2.svg"});
    fb.addToDirectory('/catalog/shape','lozenge.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/lozenge.js","spot":"/shape/lozenge.js"},svg:"(sys)/forCatalog/lozenge.svg"});
  fb.addToDirectory('/catalog/shape','regularPolygon.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/container/regularPolygon.js","spot":"/shape/regularPolygon.js"},title:"Polygon",svg:"(sys)/forCatalog/regularPolygon.svg"});
  fb.addToDirectory('/catalog/shape','bullsEye.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/bullsEye.js","spot":"/shape/bullsEye.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
  fb.addToDirectory('/catalog/shape','blurredBullsEye.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/blurredBullsEye.js","spot":"/shape/blurredBullsEye.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
  fb.addToDirectory('/catalog/shape','polygonBullsEye.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/polygonBullsEye.js","spot":"/shape/polygonBullsEye.js"},svg:"(sys)/forCatalog/shape/PolygonalBullsEye.svg"});
  fb.addToDirectory('/catalog/shape','dualBullsEye.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/dualBullsEye.js","spot":"/shape/dualBullsEye.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
fb.addToDirectory('/catalog/shape','gapBullsEye.link',{roles:['vertex','spot'],fitFactor:shapeFF,
                       urls:{"vertex":"/shape/gapBullsEye.js","spot":"/shape/gapBullsEye.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
fb.addToDirectory('/catalog/shape','face.link',{url:"(sys)/face/albert.item",role:"spote",svg:"(sys)/forCatalog/lozenge.svg"});
 fb.addToDirectory('/catalog/shape','bubble.link',{url:"(sys)/face/bubble.item",role:"spote",svg:"(sys)/forCatalog/lozenge.svg"});
                                                    
 
   //fb.addToDirectory('/catalog/shape','horizontalBracket.link',{roles:['vertex','spot'],fitFactor:shapeFF,
   //                    urls:{"vertex":"/container/horizontalBracket.js","spot":"/shape/horizontalBracket.js"},svg:"(sys)/forCatalog/bullsEye.svg"});
   fb.addToDirectory('/catalog/shape','curve.link',{url:"/shape/curve.js",title:'Free Curve',svg:"(sys)/forCatalog/curve.svg"});
}


// connectors

const catConnector = function () {
// note this version does not support replacement of shafts, only complete connectors.
   fb.addToDirectory('/catalog/connector','.order',
                      'line,decoLine,wavyLine,bulbous,spots,connectedSpots,arrow,arrowMiddle,arrowDoubleEnded,arcArrow,oneBend,oneBendArrowV,'+
                      'oneBendArrowH,blank0,twoBendsV,twoBendsH,twoBendsArrowV,twoBendsArrowH,multiInV,multiInH,multiInArrowV,multiInArrowH,'+
                      'multiOutArrowV,multiOutArrowH');
 fb.addToDirectory('/catalog/connector','line.link',{role:'edge',url:"/connector/line.js",svg:"(sys)/forCatalog/line.svg"});
fb.addToDirectory('/catalog/connector','decoLine.link',{role:"edge",url:"/connector/decoLine.js",svg:"(sys)/forCatalog/line/decoLine.svg"});
fb.addToDirectory('/catalog/connector','wavyLine.link',{role:"edge",url:"/connector/wavyLine.js",svg:"(sys)/forCatalog/line/wavyLine.svg"});
fb.addToDirectory('/catalog/connector','bulbous.link',{role:"edge",url:"/connector/bulbous.js",svg:"(sys)/forCatalog/line/bulbous.svg"});
fb.addToDirectory('/catalog/connector','spots.link',{role:"edge",url:"/connector/spots.js",svg:"(sys)/forCatalog/line/spots.svg"});
fb.addToDirectory('/catalog/connector','connectedSpots.link',{role:"edge",url:"/connector/connectedSpots.js",svg:"(sys)/forCatalog/line/connectedSpots.svg"});
  
  fb.addToDirectory('/catalog/connector','arrow.link',{url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrow.svg"});
fb.addToDirectory('/catalog/connector','arrowMiddle.link',{url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrowMiddle.svg",settings:{"headInMiddle":true}});
fb.addToDirectory('/catalog/connector','arrowDoubleEnded.link',{url:"/arrow/arrow.js",role:"edge",svg:"(sys)/forCatalog/arrowDoubleEnded.svg",settings:{"doubleEnded":true}});
fb.addToDirectory('/catalog/connector','arcArrow.link',{url:"/arrow/arcArrow.js",role:"edge",svg:"(sys)/forCatalog/arcArrow.svg"});


fb.addToDirectory('/catalog/connector','oneBend.link',{url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/oneBend.svg",
settings:{"vertical":true,"includeArrow":false,"end0":[-30,0],"end1":[0,-30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','oneBendArrowV.link',{url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/arrow/oneBendV.svg",
settings:{"vertical":true,"includeArrow":true,"end0":[-30,0],"end1":[0,-30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','oneBendArrowH.link',{url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/arrow/oneBendH.svg",
settings:{"vertical":false,"includeArrow":true,"end0":[30,0],"end1":[0,30]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','blank0.link',{url:"/arrow/oneBend.js",role:"edge",
svg:"(sys)/forCatalog/blank.svg",
settings:{"vertical":false,"includeArrow":true,"end0":[30,0],"end1":[0,30]},fitFactor:0.4});

fb.addToDirectory('/catalog/connector','twoBendsV.link',{url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/twoBendsV.svg",
settings:{"vertical":true,"includeArrow":false,"depth":-19,"end0":[0,20],"end1":[0,-20]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsH.link',{url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/twoBendsH.svg",
settings:{"vertical":false,"includeArrow":false,"depth":19,"end0":[-20,0],"end1":[20,0]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsArrowV.link',{url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/arrow/twoBendsV.svg",
settings:{"vertical":true,"includeArrow":true,"depth":-19,"end0":[0,20],"end1":[0,-20]},fitFactor:0.4});



fb.addToDirectory('/catalog/connector','twoBendsArrowH.link',{url:"/arrow/twoBends.js",role:"edge",
svg:"(sys)/forCatalog/arrow/twoBendsH.svg",
settings:{"vertical":false,"includeArrow":true,"depth":19,"end0":[-20,0],"end1":[20,0]},fitFactor:0.4});


// remove fb.addToDirectory('/catalog/connector','cArrow.link',{url:"/arrow/cArrow.js",role:"edge",svg:"(sys)/forCatalog/arrow/c.svg"});
//settings:{"end0":[1,2]}});
// remove fb.addToDirectory('/catalog/connector','uArrow.link',{url:"/arrow/uArrow.js",role:"edge",svg:"(sys)/forCatalog/arrow/u.svg",fitFactor:0.4});

fb.addToDirectory('/catalog/connector','multiInV.link',{url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/multiInV.svg",
settings:{"vertical":true,"includeArrow":false,"singleEnd":[0,-15],"ends":[[-15,15],[15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInH.link',{url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/multiInH.svg",
settings:{"vertical":false,"includeArrow":false,"singleEnd":[15,0],"ends":[[-15,-15],[-15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInArrowV.link',{url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/arrow/multiInV.svg",
settings:{"vertical":true,"includeArrow":true,"singleEnd":[0,-15],"ends":[[-15,15],[15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiInArrowH.link',{url:"/arrow/multiIn.js",role:"multiIn",
svg:"(sys)/forCatalog/arrow/multiInH.svg",
settings:{"vertical":false,"includeArrow":true,"singleEnd":[15,0],"ends":[[-15,-15],[-15,15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiOutArrowV.link',{url:"/arrow/multiOut.js",role:"multiOut",
svg:"(sys)/forCatalog/arrow/multiOutV.svg",
settings:{"vertical":true,"includeArrows":true,"singleEnd":[0,15],"ends":[[-15,-15],[15,-15]]},fitFactor:0.4});


fb.addToDirectory('/catalog/connector','multiOutArrowH.link',{url:"/arrow/multiOut.js",role:"multiOut",
svg:"(sys)/forCatalog/arrow/multiOutH.svg",
settings:{"vertical":false,"includeArrows":true,"singleEnd":[-15,0],"ends":[[15,-15],[15,15]]},fitFactor:0.4});


return "ok";
}

const catVariant = function () {
  let nn = 0;
     fb.addToDirectory('/catalog/connector','.order',
  "spotStraightLineArrow,bulbousCurvedLineArrow,decoCurvedLineArrow,dashedRandomStraightSolidArrow,bulbousCurvedSolidArrow,nestedRoundedRectangle");
  fb.addToDirectory('/catalog/variant','bulbousCurvedLineArrow.link',{
     url:"(sys)/variant/arrow/bulbousCurvedLine.item",role:"edge",svg:"(sys)/variant/arrow/bulbousCurvedLine.svg"});
  fb.addToDirectory('/catalog/variant','decoCurvedLineArrow.link',{
     url:"(sys)/variant/arrow/decoCurvedLine.item",role:"edge",svg:"(sys)/variant/arrow/decoCurvedLine.svg"});
   fb.addToDirectory('/catalog/variant','spotStraightLineArrow.link',{
     url:"(sys)/variant/arrow/spotStraightLine.item",role:"edge",svg:"(sys)/variant/arrow/spotStraightLine.svg"});
  fb.addToDirectory('/catalog/variant','dashedRandomStraightSolidArrow.link',{
     url:"(sys)/variant/arrow/dashedRandomStraightSolid.item",role:"edge",svg:"(sys)/variant/arrow/dashedRandomStraightSolid.svg"});
     
  fb.addToDirectory('/catalog/variant','bulbousCurvedSolidArrow.link',{
     url:"(sys)/variant/arrow/bulbousCurvedSolid.item",role:"edge",svg:"(sys)/variant/arrow/bulbousCurvedSolid.svg"});
 
 //// fb.addToDirectory('/catalog/variant','arrow.link',{url:"(sys)/arrow.item",role:"edge",svg:"(sys)/forCatalog/arrow.svg"});
  fb.addToDirectory('/catalog/variant','nestedRoundedRectangle.link',{url:"(sys)/variant/nestedRoundedRectangle.item",role:"vertex",svg:"(sys)/variant/nestedRoundedRectangle.svg"});
  fb.addToDirectory('/catalog/variant','.order','spotStraightLineArrow,bulbousCurvedLineArrow');
  console.log('zzzub');
}

//lines

const catLine = function () {
  let nn = 0;
  fb.addToDirectory('/catalog/line','.order',
                    "line,decoLine,wavyLine,bulbous,spots,connectedSpots,meander");
     
  fb.addToDirectory('/catalog/line','line.link',{role:'line',url:"/line/line.js",svg:"(sys)/forCatalog/line.svg"});
  fb.addToDirectory('/catalog/line','decoLine.link',{role:"line",url:"/line/decoLine.js",svg:"(sys)/forCatalog/line/decoLine.svg"});
  fb.addToDirectory('/catalog/line','wavyLine.link',{role:"line",url:"/line/wavyLine.js",svg:"(sys)/forCatalog/line/wavyLine.svg"});
  fb.addToDirectory('/catalog/line','bulbous.link',{role:"line",url:"/line/bulbous.js",svg:"(sys)/forCatalog/line/bulbous.svg"});
  fb.addToDirectory('/catalog/line','spots.link',{role:"line",url:"/line/spots.js",svg:"(sys)/forCatalog/line/spots.svg"});
  fb.addToDirectory('/catalog/line','connectedSpots.link',{role:"line",url:"/line/connectedSpots.js",svg:"(sys)/forCatalog/line/connectedSpots.svg"});
  fb.addToDirectory('/catalog/line','meander.link',{url:'/border/meander.js',role:"horizontalLine",
                           svg:"(sys)/forCatalog/meander2.svg"});
}

// boxes
const catBox = function () {
    fb.addToDirectory('/catalog/box','.order',
                      "box0,box,boxwithcorners,decorated0");
    let nn = 0;
       fb.addToDirectory('/catalog/box','box0.link',{roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/box.svg",settings:{extraRight:0,extraLeft:0}});
   fb.addToDirectory('/catalog/box','box.link',{roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/extra.svg"});
 fb.addToDirectory('/catalog/box','boxwithcorners.link',{roles:['vertex','spot'],
                  urls:{"vertex":"/container/box.js","spot":"/box/basic.js"},svg:"(sys)/forCatalog/cornerbox.svg",settings:{extraRight:0,extraLeft:0,cornerOffset:3}});
       fb.addToDirectory('/catalog/box','decorated0.link',{roles:['vertex','spot'],
                  urls:{"vertex":"/container/decorated0.js","spot":"/box/decorated0.js"},svg:"(sys)/forCatalog/border_decorated0.svg"});
    /* fb.addToDirectory('/catalog/box','decorated1.link',{roles:['vertex','spot'],
                  urls:{"vertex":"/container/decorated1.js","spot":"/box/decorated1.js"},svg:"(sys)/forCatalog/border_decorated1.svg"});
                  */
}
       

 // arrow heads
const catArrowHead = function () {
  let nn = 0;
      fb.addToDirectory('/catalog/arrowHead','.order',
                        'line,solid,curvedInLine,curvedInSolid,curvedOutLine,curvedOutSolid');

  fb.addToDirectory('/catalog/arrowHead','line.link',
       {url:"/arrow/lineHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/lineHead.svg"});
 fb.addToDirectory('/catalog/arrowHead','solid.link',
       {url:"/arrow/solidHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/solidHead.svg"});
fb.addToDirectory('/catalog/arrowHead','curvedInLine.link',
       {url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedInLineHead.svg",settings:{curvedIn:true,solidHead:false}});
 fb.addToDirectory('/catalog/arrowHead','curvedInSolid.link',
       {url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedInSolidHead.svg",settings:{curvedIn:true,solidHead:true}});
 fb.addToDirectory('/catalog/arrowHead','curvedOutLine.link',
       {url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedOutLineHead.svg",settings:{curvedIn:false,solidHead:false}});
 
 fb.addToDirectory('/catalog/arrowHead','curvedOutSolid.link',
       {url:"/arrow/curvedHead.js",role:"arrowHead",insertable:false,svg:"(sys)/forCatalog/arrow/curvedOutSolidHead.svg",settings:{curvedIn:false,solidHead:true}});
}


// kit
const catKit  = function () {
        fb.addToDirectory('/catalog/kit','.order',
        "tree2V,tree2H,treeV,treeH,familyTree,bracket,arcRing,ring,snake,radial,graph");

 //https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg/486px-Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg
let nn = 1;


//fb.addToDirectory('/catalog/kit','blank0.link',{url:"/kit/smallGraph.js",
//svg:"(sys)/forCatalog/blank.svg"});

             
fb.addToDirectory('/catalog/kit','tree2V.link',
       {url:"/kit/startTree2V.js",svg:"(sys)/kits/tree2V.svg"});
fb.addToDirectory('/catalog/kit','tree2H.link',
       {url:"/kit/startTree2H.js",svg:"(sys)/kits/tree2H.svg"});
       
       
fb.addToDirectory('/catalog/kit','treeV.link',
       {url:"/kit/startTreeV.js",svg:"(sys)/kits/treeV.svg"});
 fb.addToDirectory('/catalog/kit','treeH.link',
       {url:"/kit/startTreeH.js",svg:"(sys)/kits/treeH.svg"});


 fb.addToDirectory('/catalog/kit','familyTree.link',
       {url:"/kit/familyTree.js",svg:"(sys)/forCatalog/kit/familyTree.svg"});
       
            
 fb.addToDirectory('/catalog/kit','bracket.link',
       {url:"/kit/bracket.js",svg:"(sys)/forCatalog/kit/bracket.svg"});
       

       
fb.addToDirectory('/catalog/kit','arcRing.link',
       {url:"/kit/arcRing.js",svg:"(sys)/kits/arcRing.svg"});              
       
fb.addToDirectory('/catalog/kit','ring.link',
       {url:"/kit/ring.js",svg:"(sys)/forCatalog/ring.svg"});


       
fb.addToDirectory('/catalog/kit','snake.link',
       {url:"/kit/snake.js",svg:"(sys)/kits/snake.svg"});              
              
       
fb.addToDirectory('/catalog/kit','radial.link',
       {url:"/kit/radial.js",svg:"(sys)/forCatalog/radial.svg"});
       

fb.addToDirectory('/catalog/kit','graph.link',
       {url:"/kit/smallGraph.js",svg:"(sys)/forMainPage/smallGraph.svg",title:'Graph'});
       

//fb.addToDirectory('/catalog/kit','fromData.link',
//       {url:"/example/fromData.js",svg:"(sys)/forCatalog/radial.svg"});
}


/*
 https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Guido_Cagnacci_003.jpg/800px-Guido_Cagnacci_003.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg/486px-Gottfried_Wilhelm_Leibniz%2C_Bernhard_Christoph_Francke.jpg
*/
// image
const catImage = function () {
 let nn = 1;
fb.addToDirectory('/catalog/image','below.link',
          {url:"notused.jpg",role:"vertex",svg:"(sys)/forCatalog/image_text_below.svg",
          settings:{anyImage:true,textBelowImage:true,"includeOutline":true,"text":"Text"}});
fb.addToDirectory('/catalog/image','beside.link',
          {url:"notused.jpg",role:"vertex",svg:"(sys)/forCatalog/image_text_beside.svg",
          settings:{anyImage:true,textBelowImage:false,"includeOutline":true,"text":"Text"}});

          
fb.addToDirectory('/catalog/image','sample.link',
          {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/474px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
          role:"vertex"});

}

export {catShape,catVariant,catConnector,catLine,catBox,catArrowHead,catKit,catImage};
