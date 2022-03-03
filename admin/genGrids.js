
let kind = process.argv[2];
//let signedstr = process.argv[3]
let forKOPstr = process.argv[3];
let sortByOrderstr = "1";
if (process.argv[3]==="0") {
  sortByOrderstr = "0";
}
/*let alternateStr = process.argv[3];
let byKindstr = process.argv[4];
let byLikesstr = process.argv[5];
let aspectstr = process.argv[6];*/

const toBoolean = (v) => {
  if (typeof v === 'string') {
    return (v==='0')?false:true;
  } else {
    return false;
  }
}
let signed = 0
//let signed = toBoolean(signedstr);
let forKOP = toBoolean(forKOPstr);
let sortByOrder = toBoolean(sortByOrderstr);
let byKind = kind === 'byKind';
let alternate = kind === 'alternate';
let byLikes = kind === 'byLikes';
let byAspect = kind === 'byAspect';
let vertical = kind === 'vertical';
let horizontal = kind === 'horizontal';
let horizontalnf = kind === 'horizontalnf'; // horizontal no frame
let square = kind === 'square';

console.log('sortByOrder',sortByOrder,'forKOP',forKOP,'byKind',byKind,'byAspect',byAspect,'byLikes',byLikes,'signed',signed,'horizontalnf',horizontalnf);
//return;
//let alternate = 0;
let sectionsPath;
if (byLikes) {
  sectionsPath = './gridSections.js';
} else if (alternate) {
  sectionsPath = './altSections.js';
} else if (byKind) {
  sectionsPath = './byKindSections.js';
} else if (byAspect) {
  sectionsPath = './byAspectSections.js'
} else if (vertical) {
  signed = 0;
  sectionsPath = './verticalSections.js';
} else if (horizontal) {
  signed = 0;
  sectionsPath = './horizontalSections.js';
} else if (horizontalnf) {
  signed = 0;
  sectionsPath = './horizontalnfSections.js';
} else if (square) {
  signed = 0;
  sectionsPath = './squareSections.js';
} else {
  sectionsPath = './gridSections.js';
}
let outPath;
if (alternate) {
  outPath = 'www/altGrids.html';
} else if (byKind) {
  outPath = 'www/byKind.html';
} else if (byAspect) {
  outPath = 'www/aspectGrids.html';
} else if (vertical) {
  outPath = 'www/vertical.html';
} else if (horizontal) {
  outPath = 'www/horizontal.html';
} else if (horizontalnf) {
  outPath = 'www/horizontalnf.html';
} else if (square) {
  outPath = 'www/square.html';
} else {
  outPath = 'www/grids.html';
}
console.log('sectionsPath', sectionsPath,'outPath',outPath);

var fs = require('fs');

let fileExt = alternate?'mjs':'mjs';
let thePages = [];
let theTitles = [];
let pageTop = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Kingdom of Pattern</title>
  <style>
    .theGrid {
      display:grid;
      padding-top:10px;
      grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .indent {
      padding-left:40px;
    }
		.centered {
			text-align:center;
		  font-size:13pt;
			display: flex;
		  align-items: center;
		  justify-content: center;
		}
		p {
			padding-top:5px;
			padding-bottom:5px;
			margin-top:0px;
			margin-bottom:0px;
		}
    .topPad {
      padding-top:40px;
    }
    .emphasis {
      font-style:italic;
      font-weight:bold;
     }
  </style>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
</head>
<body style="color:white;font-size:16pt;font-family:arial;background-color:black" >

<p style="text-align:center;padding-bottom:0px;padding-top:10px">What is the Kingdom of Pattern? <a style="color:white;text-decoration:underline" href="essay.html">A Brief Phenomenological Investigation.</a></p>
<!--
<p style="text-align:center;padding-bottom:0px;padding-top:10px"><a style="color:white;text-decoration:underline" href="essay.html">A Short Philosophical Essay.</a></p>
<p style="text-align:center;padding-bottom:0px;padding-top:10px">Click <a style="color:white;text-decoration:underline" href="prints.html">here</a> if  you'd like a print of one of these images for your wall.</	>-->


<p style="text-align:center;font-size:10pt;padding-bottom:5px;padding-top:5px">Images by Chris Goad (via JavaScript)</p>
<p style="text-align:center;font-size:10pt;padding-bottom:5px;padding-top:5px">To Expand the Images Below, Click on Them</p>

<script>
document.addEventListener('DOMContentLoaded', () => {
	debugger;
	let cWidth =document.documentElement.clientWidth;
	let imWid = Math.floor(0.09*cWidth);
	let images = document.querySelectorAll('img');
	images.forEach((im) => {
		im.width = ''+imWid;
	});
});
</script>	
`;
let pageNumber = 0;
let numPages = 0;
const thingString = function (order,ix,variant,dir,useThumb,ititle,likes) {
	console.log('thingString order',order,'ix',ix,'variant',variant,'dir',dir,'useThumb',useThumb,'title',ititle,'likes',likes);
	debugger;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	thePages.push(x);
  let title=ititle?ititle:pageNumber+'';
  theTitles.push(ititle?ititle:pageNumber+'');
  let vpath = (variant?path+'_v_'+variant:path)+(signed?'_s':'');
  console.log('variant',variant);
  console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
	let imsrc = `images/${vpath}.jpg`;
	let thumbsrc = useThumb?`thumbs/${vpath}.jpg`:imsrc;
	console.log('thumbsrc',thumbsrc);
	let pageArg = 'page='+pageNumber;
	let theImageArg = '';
  //imageArg?'&image='+imageArg:'';
	pageNumber++;
	let lastPageArg = (pageNumber === numPages)?'&lastPage=1':'';
	let rs;
	let astart = `<a style="color:white" href="${alternate?'altPage':(byKind?'byKindPage':'page')}.html?image=${vx}&${pageArg}">`;
 // let likesStr = likes?`<span style="font-size:10pt">Likes ${likes}</span><br/>`:'';
  let likesStr = `<span style="font-size:10pt">Likes ${likes?likes:'none'} Order ${order}</span><br/>`;
	if (forKOP) {
		let titleLink = title?`${astart}${title}</a></p>`:'';
		console.log('titleLink',titleLink);
rs = `<div><p class="centered">${titleLink}
<p class="centered">${astart}<img width="200" src="${thumbsrc}" alt="Image Missing"></a></p></div>
	`; 
	} else {
		
rs = `<div><p style="text-align:center"><a href="http://localhost:8081/draw.html?source=/${dir}/${path}.${fileExt}${theImageArg}">${title}</a><br/>
<a href="${dir}/${path}.${fileExt}">source</a><br/>
${likesStr}
${astart}<img width="200" src="${thumbsrc}"></a></p></div>
`;
	}
	return rs;
}

let numThingsPerLine = 4;

const stripOrnt = function (str) {
    let spl = str.split('_');
    let sln = str.length;
    let ln = spl.length;
    let rs = str;
    let lst;
    if (ln > 1) {
      lst = spl[ln-1];
      if ((lst === 'v') || (lst === 'h')) {
        rs = str.substring(0,sln-2);
      } else if (lst === 'sq') {
        rs = str.substring(0,sln-3);
      }
    }
    console.log('stripOrnt','lst',lst,str,' = ',rs);
    return rs;
  }
 const getOrder = function (thing) {
    let file = stripOrnt(thing[1]);
    let order = orderDict[file];
    console.log('getOrder',order,typeof order);
    return order?order:1000;
 }
 
    
  const compareByOrder = function (thing1,thing2) {
    let file1 = stripOrnt(thing1[1]);
    let file2 = stripOrnt(thing2[1]);
    let order1 = getOrder(thing1);
    let order2 = getOrder(thing2);
    let rs;
    if (order1 === order2) {
      rs = 0;
    } else if (order1 > order2) { 
      rs = 1;
    } else {
      rs = -1;
    }
    console.log('file1',file1,'file2',file2,'order1',order1,'order2',order2,'rs',rs);
    return rs;

  }
      
 
let sectionString = function (things) {
	let numThingsThisLine = 0;
	let startLine =  `
<div class="theGrid">
  <div></div>
  `;
	let rs = `
<div class="theGrid">
  <div></div>
  `;
	let ln = things.length;
  const compareLikes = function (thing1,thing2) {
    let likes1 = (thing1.length >= 6)?thing1[5]:0;
    let likes2 = (thing1.length >= 6)?thing2[5]:0;
    if (likes1 === likes2) {
      return 0;
    }
    if (likes1 < likes2) { 
      return 1;
    }
    return -1;
  }
  if (byLikes) {
    things.sort(compareLikes);
  }
  /*const compareByOrder = function (thing1,thing2) {
    let order1 = thing1[0];
    let order2 = thing2[0];
    if (order1 === order2) {
      return 0;
    }
    if (order1 > order2) { 
      return 1;
    }
    return -1;
  }*/
  
  
  if (sortByOrder) {
    things.sort(compareByOrder);
  }
 // ln = 2;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
    let tln = thing.length;
    if (tln === 1) {
      console.log("Section");
      let txt = thing[0];
      numThingsThisLine = numThingsPerLine;
   //  rs += `</div>${startLine}<div>${txt}</div></div>`;
      rs += `</div><br/><div style="text-align:center">${txt}</div><br/><div>`;
    } else {
      let [order,file,variant,idirectory,iuseThumb,ititle,ilikes] = thing;
      let directory,useThumb,title,likes;
      console.log('Order',order,'file',file);
      let tov = typeof variant;
      console.log('is variant',tov);

      if (tov === "number") {
        console.log('VARIANT');
        directory = idirectory;
        useThumb = iuseThumb;
        title = ititle;
        likes = ilikes;
      } else {
        directory = variant;
        useThumb = idirectory;
        title = iuseThumb;
        likes = ititle;
        variant = undefined;
      }
      let ord = getOrder(thing);
      rs += thingString(ord,file,variant,directory,useThumb,title,likes);
      //rs += thingString(file,directory,useThumb,title,image);
      numThingsThisLine++;
    }
		console.log('numThingsThisLine',numThingsThisLine,'i',i,'ln',ln);
		if ((numThingsThisLine === numThingsPerLine) && (i<(ln-1))) {
			console.log('EOL');
			rs += `</div><br/>
	`+ startLine;
			numThingsThisLine = 0;
	  }
  };
  rs += `</div><br/>
`;
 debugger;
 return rs;
}



const sectionsString = function (sections) {
	let rs = '';
	sections.forEach((section) => rs += sectionString(section));
	return rs;

}
const writeThePages = function () {
	let js = 'let thePages = '+JSON.stringify(thePages)+';';
	fs.writeFileSync(alternate?'www/altPages.js':(byKind?'www/byKindPages.js':'www/thePages.js'),js);
}
const writeTheTitles = function () {
	let js = 'let theTitles = '+JSON.stringify(theTitles)+';';
	fs.writeFileSync(alternate?'www/altTitles.js':(byKind?'www/byKindTitles.js':'www/theTitles.js'),js);
}
		
const writePage = function (sections) {
	
	let frs = '';
	frs += pageTop;
	frs +=sectionsString(sections);
	fs.writeFileSync(outPath,frs);
}

//let sectionsC = require(alternate?'./altSections.js':'./gridSections.js');
let sectionsC = require(sectionsPath);
let imageOrder  = require('./imageOrder.js');
console.log('imageOrder',imageOrder);

const order2dict = function (order) {
  let rs = {};
  order.forEach( (ln) => {
    let [o,s] = ln;
    rs[s] = o;
  });
  return rs;
}

let orderDict = order2dict(imageOrder);

console.log('orderDict',orderDict);

const countPages = function (sections) {
	let rs = 0;
	sections.forEach((section) => {
		section.forEach((thing) =>  rs++);
	});
	return rs;
}
		
numPages = countPages(sectionsC.sections);

 writePage(sectionsC.sections);
 writeThePages();
 writeTheTitles();
 console.log('numPages',numPages);
 