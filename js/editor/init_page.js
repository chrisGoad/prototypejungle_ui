

/*global setupYesNo setupDialog enableButton disableButton mpg: true */



dom.vars.defaultTransform = Transform.mk(Point.mk(),1);

let mainPage;
let svgDivReady = false;

const setupSvgDiv = function () {
  if (!svgDivReady) {
    dom.setSvgMain(dom.SvgRoot.mk(svgDiv.__element));
    svgDiv.__element.draggable = true;
    dom.svgMain.activateInspectorListeners();
    dom.svgMain.addButtons("View");
    svgDivReady = true;
  }
}

const genMainPage = function (cb) {
  if (mainPage) {
    return;
  }
  mainPage = buildPage();//mpg
  activateButtons();
  initFsel();
  mpg.__addToDom();
  if (svgDiv) {
    setupSvgDiv();
    core.setRoot(SvgElement.mk('<g/>')); // to be replaced by incoming item, usually
    core.root.set('transform',dom.vars.defaultTransform);
    dom.svgMain.contents=core.root;
    if (source) {
	  core.root.__sourceUrl = source;
	}
  }
  $('.mainTitle').click(function () {
    fb.sendToShell('');
  });
  if (upBut) {
    disableButton(upBut);
    enableButton(topBut);
    disableButton(downBut);
  }
  genButtons(ctopDiv.__element);
 
  //const next = function () {
  $('body').css({"background-color":"#eeeeee","overflow":"hidden"});
  let r = Rectangle.mk({corner:[0,0],extent:[500,200]});
  let insertR = Rectangle.mk({corner:[0,0],extent:[700,500]});
  mpg.set("lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("alert_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("info_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("confirm_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("dialog_lightbox",lightbox.newLightbox(r)).box.$css({"padding-left":"20px"});
  mpg.set("chooser_lightbox",lightbox.newLightbox(insertR,undefined, true));
  mpg.set("data_lightbox",lightbox.newLightbox(Rectangle.mk({corner:[0,0],extent:[200,50]})));
  mpg.set("textedit_lightbox",lightbox.newLightbox(r));
  setupYesNo();
  setupDialog();
  setupInfo();
  if (docDiv) {
    if (intro) {
      docIframe.__element.src = "/intro/"+intro+".html";
    } else {
      docDiv.$hide();
    }
  }
  layout();
  if (!cb) {
    return;
  }
  if (ui.vars.whichPage === 'code_editor') {
    if (source) {
      core.httpGet(source,function () {
        cb();
     });
    } else {
      cb();
    }
  } else if(ui.vars.whichPage === 'structure_editor') {
    if (core.vars.historyEnabled) {
      disableButton(undoBut);
    } else {
      undoBut.$hide();
    } 
    setCatalogMode('insert',cb);
  } else {
    cb();
  }
}

let mainGetVars = {'source':true,'intro':true,'data':true};

let source,sourceFile,helperUrl,content,loadUrl;

const processQuery = function() {  
  //debugger;
  let q = ui.parseQuerystring();
  swapMachine = ui.vars.swapMachine;
  helperUrl = '/solar/naws.js';
  intro = q.intro;
  source = q.source;
  content = q.content;
  loadUrl = q.load; // emulates dragging this in as first action
  saveCatalog = q.saveCatalog;
  if (source==='none') {
    source = undefined;
  } else if (source) {
    source = fb.handleTwiddle(source);
    sourceFile = core.afterLastChar(source,'/');
  } else {
    if  (ui.vars.whichPage === 'structure_editor') {
      source = '';
      sourceFile = '';
    } else if  (ui.vars.whichPage === 'code_editor') {
      source = '/example/sampleCode.js';
      sourceFile = 'sampleCode.js';
    } else {
      sourceFile = '';
    }
  }
  ui.vars.source  = source;
  if (q.fit) {
    fitFactor = Number(q.fit);
  }
  let settings = {};
  for (let s in q) {
    if (!mainGetVars[s]) {
      let qs = q[s];
      let nqs = Number(qs);
      settings[s] = isNaN(nqs)?qs:nqs;
    }
  }
  settings = settings;
}  
const getConfig = function (cb) {
  core.httpGet(`(${userName})/config.json`,(err,json) => {
    if (!err) {
      try {
        theConfig = JSON.parse(json);
        if (theConfig) {
          theCatalogs = theConfig.catalogs;
        }
      } catch (e) {
        theConfig = 'JsonError';
        theCatalogs = 'JsonError';
      }
    }
    if (!theCatalogs) {
      theCatalogs = (userName === 'sys')?'./*':'(sys)/*,./*';
    }
    cb();
  });
}

let userName,directory;
let pageInitialized = false; // to prevent repeats, which firebase will sometimes invoke via onIdTokenChanged 
const initPage = function () {
  debugger;
 // console.log('init Page');
  graph.installRectanglePeripheryOps(dom.SvgTag.image);
  const todo = function () {  
  //   console.log('after set current user');  
    const next = function () {
      //catKit();
      pageInitialized = true;
      processQuery();
      dom.vars.fitStdExtent = (ui.vars.whichPage === 'structure_editor') && !(source);
      if (ui.vars.whichPage === 'code_editor') {
        genMainPage(function () {
            showMainScript(afterPageGenerated);
            //return;
            //afterPageGenerated();
        });
      } else {
      //  console.log('call afterPageGenerated');
        genMainPage(afterPageGenerated);//()=>afterPageGenerated(ui.vars.whichPage === 'text_editor'));// do not install for text editor
      }
    }
   
		theCatalogs = 'sys/*';
		if (!pageInitialized) next();
    
  };
	todo();
}

let afterPageGeneratedBeenCalled = false;
const afterPageGenerated = function (doNotInstall) {
  if (afterPageGeneratedBeenCalled) {
    return;
  }
  afterPageGeneratedBeenCalled = true;
  if (sourceFile  && fileDisplay) {
    fileDisplay.$html(sourceFile);
  }
  if (doNotInstall) {
     return;
  }
  if (svgDiv) {
    installMainItem(source);
  } else {
    finishMainInstall();
  }
}

export {initPage,userName,directory};
    
