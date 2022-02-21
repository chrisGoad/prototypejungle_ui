
let forKOPstr = process.argv[2];
let alternateStr = process.argv[3];
let byKindstr = process.argv[4];
let byLikesstr = process.argv[5];

const toBoolean = (v) => {
  if (typeof v === 'string') {
    return (v==='0')?false:true;
  } else {
    return false;
  }
}

let forKOP = toBoolean(forKOPstr);
let byKind = toBoolean(byKindstr);
let alternate = toBoolean(alternateStr);
let byLikes = toBoolean(byLikesstr);

console.log('forKOP',forKOP,'byKind',byKind);
//return;
//let alternate = 0;
let sectionsPath = byLikes?'./byLikesSections.js':(alternate?'./altSections.js':(byKind?'./sectionsByKind.js':'./gridSections.js'));
console.log('sectionsPath', sectionsPath);
let outPath = alternate?'www/altGrids.html':(byKind?'www/byKind.html':'www/grids.html');
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
const thingString = function (ix,variant,dir,useThumb,ititle,likes) {
	console.log('thingString ix',ix,'useThumb',useThumb,'title',ititle);
	debugger;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	thePages.push(x);
  let title=ititle?ititle:pageNumber+'';
  theTitles.push(ititle?ititle:pageNumber+'');
  let vpath = variant?path+'_v_'+variant:path;
  console.log('variant',variant);
  console.log('vpath',vpath);
  let vx = vpath+'.'+ext;
	let imsrc = `images/${vpath}.jpg`;
	let thumbsrc = alternate?imsrc:(useThumb?`thumbs/${vpath}.jpg`:imsrc);
	console.log('thumbsrc',thumbsrc);
	let pageArg = 'page='+pageNumber;
	let theImageArg = '';
  //imageArg?'&image='+imageArg:'';
	pageNumber++;
	let lastPageArg = (pageNumber === numPages)?'&lastPage=1':'';
	let rs;
	let astart = `<a style="color:white" href="${alternate?'altPage':(byKind?'byKindPage':'page')}.html?image=${vx}&${pageArg}">`;
  let likesStr = likes?`<span style="font-size:10pt">Likes ${likes}</span><br/>`:'';
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
  const compare = function (thing1,thing2) {
    let likes1 = (thing1.length >= 5)?thing1[4]:0;
    let likes2 = (thing1.length >= 5)?thing2[4]:0;
    if (likes1 === likes2) {
      return 0;
    }
    if (likes1 < likes2) { 
      return 1;
    }
    return -1;
  }
  if (byLikes) {
    things.sort(compare);
  }
 // ln = 20;
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
      let [file,variant,idirectory,iuseThumb,ititle,ilikes] = thing;
      let directory,useThumb,title,likes;
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
        
      rs += thingString(file,variant,directory,useThumb,title,likes);
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
 