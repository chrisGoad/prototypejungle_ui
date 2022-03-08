

/*
Utility for dealing with html files from wwwscrc. Inserts boilerplate, does substitutions,  and writes to www
For the index file:
node admin/updateHtml.js p index
For the rest
node admin/updateHtml.js p

"p" means production (use of .min js files). Use d for non-min
*/

var fs = require('fs');

var protopedia = 0;
var minimize = process.argv[2] === 'p';//for production
var index = false;//process.argv[3] === 'index';
var diagrams = false;//process.argv[3] === 'diagrams';


var boilerplate0 = 
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="Diagramming basedd on an open repository of prototype structures.">
<title>PrototypeJungle</title>
<link rel="stylesheet" type="text/css"  href="style.css"/>
<link rel="stylesheet" type="text/css"  href="spectrum.css"/>
<link rel="icon" href="/images/favicon.ico" />
</head>
<body style="background-color:white;font-size:14pt"> <!-- from 12 6/8/19 -->
`;

var introPlate = 
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>PrototypeJungle</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

<link rel="stylesheet" type="text/css"  href="style.css"/> 
</head>
<body style="margin:11px;background-color:white;font-size:11pt">
<script type="text/javascript" src="/intro/pages.js"></script>
<script>
const jumpTo = function (dst) {
  let prnt = window.parent.parent;
  prnt.postMessage(dst,'*');
}

</script>
`;


var shellplate =
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="Diagramming basede on an open repository of prototype structures.">
<title>PrototypeJungle</title>
<link rel="icon" href="/images/favicon.ico" />
</head>
<body style="background-color:white;font-size:14pt">
<script src= "/initIframe.js"></script>
 `;
var minimalScripts =
`<script src="js/minimal-1.1.0.min.js"></script>
`;

var signInScripts = 
`<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase.js"></script>
<script src="js/firebase_only-1.1.0.min.js"></script>
`;

var kitAdvice = 
`<script>
let adviceIsOpen = false;
const openAdvice = function () {
  let toggle = document.getElementById('adviceToggle');
   let advice = document.getElementById('advice');
  adviceIsOpen = !adviceIsOpen;
  if (adviceIsOpen) {
    toggle.innerHTML = 'Hide Basics';
    advice.style.display = 'block';
  } else {
    toggle.innerHTML = 'Show Basics';
    advice.style.display = 'none';
    
  }

}
</script>
<p></p><p>You only need to know a few basics about PrototypeJungle's capabilities to use kits.
<a id="adviceToggle" style="cursor:pointer" onclick="openAdvice()">Show Basics</a></p>
<div id="advice" style="display:none">
<p>
After clicking "Select Kit Root" in the menu to the left, the properties of the kit as whole will appear in the 
<i>right</i> hand panel, where they can be edited. 
Editing properties is explained  <a style="cursor:pointer" onclick="jumpTo('draw.html?source=(sys)/forMainPage/three_circles.item&intro=properties&fit=0.7')">here</a>. 
</p>
<p>If  the kit contains shapes such as rectangles, circles, etc, you can <a style="cursor:pointer" 
onclick="jumpTo('draw.html?source=(sys)/forMainPage/swap4.item&intro=swap&fit=0.5')">swap</a>
them for other shapes.</p>
<p>Text can be edited by selecting the text in question (or its container), and then clicking on "Edit Text" or "Add Text" on the left menu.</p>
<p>If images are of interest, you might want to have a look at the 
<a style="cursor:pointer" onclick="jumpTo('draw.html?source=(sys)/intro/van_gogh.item&intro=image&fit=0.9')">
relevant tutorial page</a>.</p>
 <p> To save diagrams, and export
them in jpeg or svg form (where they can be accessed via URL, or embedded in web pages), use the file pulldown. A few details are
 <a style="cursor:pointer" onclick="jumpTo('draw.html?intro=files')">here</a> </p>
 <p>
 You can 
deploy all of the diagramming capabilities of PrototypeJungle for your kit (useful perhaps for adding commentary or arrows). 
If this is of 
interest,  please peruse the rest of the 
<a style="cursor:pointer" onclick="jumpTo('draw.html?intro=tutorial_index&source=(sys)/forMainPage/spiralLogo8.item&fit=0.7')">tutorial</a>
</p>
</div>
<hr/>
`;
var buttonStyle = index?'indexUbutton':'ubutton';
//var buttonStyle = 'indexUbutton';
//`<body style="background-color:rgb(30,30,30)">
var shellDomain = 'http://127.0.0.1:3001/';
//(&beta;)`
var mainStart = '';
/*`<script>
// sign_in and register are special cases - they  don't work inside iframes, so must be visited on the main domain


const jumpTo = function (dst) {
  let shellDomain = location.hostname === '127.0.0.1'?'http://127.0.1:3001/':'https://prototypejungle.org/';

  if ((location.pathname === '/sign_in.html') || (location.pathname === '/register.html')) {
    location.href = shellDomain+dst;
  } else {
    let prnt = window.parent;
    prnt.postMessage(dst,'*');
  }
}


</script>
`;*/

var shellStart = 
`<script>
let mainDomain = location.hostname === '127.0.0.1'?'http:127.0.1:3000':'https://prototypejungle.firebaseapp.com';
const jumpTo = function (dst) {
  if (dst.substr(0,4) === 'http') {
    location.href = dst;
  } else {
    location.href = '/'+dst;
  }
}
</script>
`;

var checkPlate = 
`<script>

const determinePlatform = function () {
  let ua = window.navigator.userAgent;
  //let match = userAgent.match(/Safari/);
  let match = userAgent.match(/Chrome/);

  if (match) {
    alert('Chrome');
  }
determinePlatform();

  
</script>
`;

var boilerplate1 =
`
<div id="outerContainer">  
  <div id="topbar"> 
     <div id="topbarOuter" style="padding-bottom:0px">`+
        (index?'\n':`<a onclick="jumpTo('')"><span style="position:relative;top:${index?-27:-10}px" class="mainTitle">PrototypeJungle</span></a>\n`)+
`         <img style ="position:relative;border:none;top:${index?0:0}px;left:${index?0:20}px;" alt="images/logo_alt.html" src="/images/logo3.svg"  width="60" height="25"/>
         <div id = "topbarInner" style="position:relative;float:right;top:0px">
            <span 	onclick="jumpTo('doc/allKits.html')" class="${buttonStyle}">Kits</span>
            <span 	onclick="jumpTo('draw.html?source=(sys)/forMainPage/spiralLogo8.item&intro=tutorial_index&fit=0.4')" class="${buttonStyle}">Tutorial</span>
 <span class="${buttonStyle}" onclick="jumpTo('draw.html')">Draw</span> 
          <span class="${buttonStyle}" onclick="jumpTo('code.html')">Code Editor</span> 
            <span class="${buttonStyle}"  onclick="jumpTo('text.html')">Text Editor</span> 
            <span onclick="jumpTo('doc/code.html')" class="${buttonStyle}">Coding Guide</span> 
       <span  onclick="jumpTo('doc/about.html')" class="${buttonStyle}">About</span>
             <span id ="registerButton" style="display:none" onclick="jumpTo('register.html')" class="${buttonStyle}">Register</span>
            <span id ="signInButton" style="display:none" onclick="jumpTo('sign_in.html')" class="${buttonStyle}">Sign In</span>
           <span id="accountButton" style="display:none" onclick="jumpTo('account.html')" class="${buttonStyle}">Account</span>      
         </div> 
    </div>
  </div>
  <div id="innerContainer" style="margin-top:10px">
   `;


var endplate =
`  </div>
</div>
</body>
</html>
`;

/*
let fireLibs =
`<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-storage.js"></script>
`;
*/

let fireLibs =
`<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-storage.js"></script>
`;

//<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>

/*let mainImports =
`import * as core from "/js/core-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.min.js";
import * as fb from "/js/firebase-1.1.0.min.js";
import * as graph from "/js/graph-1.1.0.min.js";
import * as ui from '/js/ui-1.1.0.min.js';
`;
*/
/*
let mainImports =
`import * as core from "/js/core-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.min.js";
import * as graph from "/js/graph-1.1.0.min.js";
import * as ui from '/js/ui-1.1.0.min.js';
`;
*/
let mainImports =
`import * as core from "/js/core-1.1.0.min.js";
import * as geom from "/js/geom-1.1.0.min.js";
import * as dom from "/js/dom-1.1.0.min.js";
`;

function doSubstitution(s,what,value,withDoubleBracket) {
    var rge = withDoubleBracket?new RegExp('\{\{'+what+'\}\}','g'):new RegExp(what,'g');
    return s.replace(rge,value);
}

//let firebaseSys = 'https://firebasestorage.googleapis.com/v0/b/project-5150272850535855811.appspot.com/o/twitter%3A14822695%2F';
let firebaseSys = 'https://firebasestorage.googleapis.com/v0/b/project-5150272850535855811.appspot.com/o/JHtAs2VsGjYCqJmOo39SexGq2Fx1%2F';
function insertBoilerplate(toShell,s,scripts) {
  console.log('toShell',toShell);
 
  var irs = doSubstitution(s,'boilerplate0',boilerplate0+(toShell?shellStart:mainStart),1);
  var irs = doSubstitution(irs,'introPlate',introPlate,1);
  
  var irs = doSubstitution(irs,'fireLibs',fireLibs,1);
  irs = doSubstitution(irs,'mainImports',mainImports,1);

 var irs = doSubstitution(irs,'boilerplate',boilerplate0+(toShell?shellStart:mainStart)+boilerplate1+scripts,1);
  var irs = doSubstitution(irs,'min',minimize?'min.':'',1);
 // var irs = doSubstitution(irs,'ProjectName',protopedia?'ProtoPedia':'PrototypeJungle',1);
  //var irs = doSubstitution(irs,'siteName',protopedia?'protopedia':'prototypejungle',1);
  var irs = doSubstitution(irs,'kitAdvice',kitAdvice,1);

  var irs = doSubstitution(irs,'<cw>','<span class="codeWord">');
  var irs = doSubstitution(irs,'</cw>','</span>');
   var irs = doSubstitution(irs,'<smallcw>','<span class="codeWord" style="font-size:9pt">');
  var irs = doSubstitution(irs,'</smallcw>','</span>');
  var irs = doSubstitution(irs,'<precode>','<p style="padding:5px"></p><pre style="font-weight:bold" class="code">');
    var irs = doSubstitution(irs,'<precodeId','<p style="padding:5px"></p><pre class="code"');
var irs = doSubstitution(irs,'<smallcode>','<pre style="font-size:11pt">');
  var irs = doSubstitution(irs,'</precode>','</pre>');
  var irs = doSubstitution(irs,'</smallcode>','</pre>');
   var irs = doSubstitution(irs,'<vgap/>','<p style="padding:5px"></p>');
     irs = doSubstitution(irs,'shellDomain',shellDomain,1);

 let preirs = irs;
  var irs = doSubstitution(irs,'sys',firebaseSys,1);
  //console.log('found sys',irs != preirs);
 
  return doSubstitution(irs,'endplate',endplate,1);
}

function insertShellplate(s,scripts) {
  let irs = doSubstitution(s,'boilerplate',shellplate,1);
  //irs = doSubstitution(irs,'checkPlate',checkPlate,1);
  irs = doSubstitution(irs,'shellDomain',shellDomain,1);
 return doSubstitution(irs,'endplate',endplate,1);

 }


  
  //var needsSignInScripts = {sign_in:1,account:0,index:1,svg:1};
   var noScripts = 1;//{account:1};
 
  
  
  
const endsIn = function (string,p) {
  return string.substr(string.length-p.length) === p;
}

  var xferFile = function(forShell,whichSubst,ffl) {
    console.log('read',ffl);
    //var scripts = needsSignInScripts[fl]?signInScripts:minimalScripts;
     var scripts = '';
//var ffl = fl+'.html';
    let ipath = '../prototypejungle_ui/'+(forShell?'shellsrc/':'wwwsrc/')+ffl;
    var ivl = fs.readFileSync(ipath).toString();
        console.log('read',ipath);

    console.log('writing',ffl);
   let vl;
   if (whichSubst === 'shell') {
      vl = endsIn(ffl,'.html')?insertShellplate(ivl,scripts,''):ivl;
   } else if (whichSubst === 'www') {
     vl = endsIn(ffl,'.html')?insertBoilerplate(forShell,ivl,scripts,''):ivl;
   } else {
     vl = ivl;
   }


   if (forShell) {
     fs.writeFileSync('www-shell/'+ffl,vl);
   } else {
     fs.writeFileSync('www/'+ffl,vl);
   }


  }
  
  

const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}


  
  var xferDir = function (forShell,whichSubst,dir) {
		 let isTop = forShell === 'top';
     let ipath = '../prototypejungle_ui/'+(forShell?(isTop?'':'shellsrc/'):'wwwsrc/')+(dir?'/'+dir:'');
		 console.log('ipath',ipath);
     let files = fs.readdirSync(ipath);
     files.forEach( function (fln) {
       let ext = afterLastChar(fln,'.');
       console.log('fln',fln,'ext',ext);
    //  if ((ext === fln) || (!['js','css','html','png','svg','jpg','ico','md'].includes(ext))) {
      if ((ext === fln) || (!['mjs','js','css','html','svg','jpg','ico','md','mp3'].includes(ext))) {
         console.log('wrong kind of file/dir',fln);
         return;
      }
      let fpath = ipath + '/' + fln;
      var scripts = '';

      var ivl = fs.readFileSync(fpath).toString();
      console.log('read',fpath);
      let vl;
      if (whichSubst == 'shell') {
         vl = endsIn(fln,'.html')?insertShellplate(ivl,scripts,''):ivl;
      } else if (whichSubst === 'www') {
				console.log('inserting boilerplate');
        vl = endsIn(fln,'.html')?insertBoilerplate(forShell,ivl,scripts,''):ivl;
      } else {
        vl = ivl;
      }
 
      if (forShell === 'top') {
        console.log('writing to ',(dir?dir+'/':'')+fln);
        fs.writeFileSync((dir?dir+'/':'')+fln,vl);     
			} else  if (forShell) {
        console.log('writing to ','www-shell/'+(dir?dir+'/':'')+fln);
        fs.writeFileSync('www-shell/'+(dir?dir+'/':'')+fln,vl);
      } else {
        console.log('writing to ','www/'+(dir?dir+'/':'')+fln);

       fs.writeFileSync('www/'+(dir?dir+'/':'')+fln,vl);
      }
     });
  }

  var xferDirs = function (forShell,whichSubst,dirs) {
    dirs.forEach( (dir) => xferDir(forShell,whichSubst,dir));
  }

  var xferFiles = function (forShell,whichSubst,files) {
    files.forEach( (file) => xferFile(forShell,whichSubst,file));
  }
/*
  var xferFiles = function (toShell,shellSubst,dir,ext,fls) {
    fls.forEach(function (fl) {
      xferFile(toShell,shellSubst,dir+fl+ext); 
    });
  }
  */
	
	
 
 // git add README.md arrow axes border box connector container coreExamples data  example image images kit line random shape  text timeline
xferDir(0,'www','doc');
xferDir('top','','admin');
//xferDir(0,'www','');
 xferDir('top','','server');
xferFiles(0,'www',['page.html','altPage.html','byKindPage.html','draw.html','drawImage.html','essay.html','eutelic.html','zoom0.js','topdefs.js','style.css','spectrum.css','pageSupport.js']);
//xferDir(1,'www','doc');
//xferDir(0,'www','intro');
//xferDir(1,'shell','');
//xferDir(1,'www','slide_show');


//xferDirs(0,'none',['arrow','axes','border','box','connector','container','coreExamples','data',
//'example','grid','image','images','kit','line','random','sandbox','shape','text','timeline']); 
xferDirs(0,'none',['gen0','ngen1','final','mlib','line','shape','shape_modules','generators','instances','sound']); 

  //xferFiles(1,'www',['ops.html','unsupported.html','familytrees.html','coreExamples.html']);

 return;
  
  
//  index = 1
   xferFile(1,1,'initIframe.js');//ok
    xferFile(0,0,'spectrum.css');//ok
xferFile(0,0,'style.css');//ok
xferFile(0,0,'topdefs.js');//ok
// xferFile(1,1,'favicon.ico');
//  xferFile(0,0,'favicon.ico');


 // xferFile('favicon.ico');
   

   xferFiles(1,1,'','.html',['index','draw','drawd','code','coded','text','account','image','devindex','platform','password']);// to shell
   xferFiles(0,0,'','.html',
   ['index','draw','drawd','code','coded','text','account',
   'image','sign_in','register','chooser','devindex','password_register','password','familyTree','accounts']);// to main
   //xferFile(1,0,'coreExamples.html');
   //return;
   //"project","code","choosedoc","rectangle","prototypetree","advantages",
//"project","code","choosedoc","rectangle","prototypetree","advantages",
                        //    "inherit","deepPrototypes","tech","privacy","toc"]);
  xferFile(0,0,'intro/pages.js');//ok
  xferFiles(1,0,'','.html',['ops','unsupported','familytrees','coreExamples']);//ok
  //xferFiles(1,0,'coreExamples/','.js',['circle']);
  xferFiles(0,0,'intro/','.html',['mainIntro','animate','kit','files','tutorial_index','swap','swapPart','intro','tree','insert','exercise','familyTree','bracket','trees',
  'network_main','connect','cayley',"basic_ops","properties","data","prototypes","separate","variant","wrap","share",
    'textbox','copy','catalog',,'image','diagrams','diagrams_main',"network",'details','cohorts','code_intro']);
    
    
    
   // xferFiles(0,0,'doc/','.html',["code","inherit","about",'toc','privacy','tech']);
  xferFile(0,0,'style.css');
  xferFile(1,0,'style.css');
    xferFile(1,1,'spectrum.css');

  xferFile(0,0,'images/logo3.svg');
  xferFile(1,0,'images/logo3.svg');


 xferFile(1,1,'robots.txt');
    xferFile(1,1,'sitemap.xml');
xferFile(0,0,'style.css');
  xferFiles(0,0,'','.html',['devindex','transfer','diagrams','test','nomodules','unsupported','swap','sample','draw','drawd','code','coded','data',
                        'datad','text','textd','catalog','coreExamples',"stripe","accounts","familyTree",
                       'image','sign_in','register','password','password_register','account','donate','programming','chooser','beta','boxGallery']);
  xferFiles(0,0,'','.html',['index','index','sindex','index_alt1','index_alt2','ops']);
   //xferFiles(0,0,'doc/','.html',['swap','pswap','about','pidea','ui_and_api']);

//xferFiles(1,0,'doc/','.html',["code","choosedoc","prototypetree","about","persistence",
//                            "inherit","deepPrototypes","tech","privacy","toc"]);
  xferFiles(0,0,'intro/','.html',['mainIntro','animate','kit','files','tutorial_index','swap','swapPart','intro','tree','insert','exercise','familyTree',
                              'network_main','connect','cayley',"basic_ops","properties","data","prototypes","separate","variant","wrap","share",
                              'textbox','copy','catalog',,'image','diagrams','diagrams_main',"network",'details','cohorts','code_intro']);
  xferFile(0,0,'intro/pages.js');
 // xferFile('favicon.ico');
 // xferFile(1,0,'robots.txt');
 //   xferFile(1,0,'sitemap.xml');
 //   xferFile(1,1,'initIframe.js');
//xferFile(1,0,'style.css');

  xferFile(0,0,'spectrum.css');
xferFile(0,0,'style.css');
xferFile(0,0,'gallery.css');
xferFile(0,0,'topdefs.js');






  