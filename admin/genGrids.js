
let  forEutelic = 0;
var fs = require('fs');


let thePages = [];
const  gotoPage = function (id,fmat) {
  location.href = id+'.html';
  location.href = `page.html?what=${id}&fmat=${fmat}`;
 
}
/*
const gotoPage = function (id) {
  debugger;
  let page = pages[id]?pages[id]:id;
  window.parent.location.href = page;
}
*/
let pageTop = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Visual Experiments</title>
  <style>
    .theGrid {
      display:grid;
      padding-top:10px;
      grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
    }
    .indent {
      padding-left:40px;
    }
    .topPad {
      padding-top:40px;
    }
    .emphasis {
      font-style:italic;
      font-weight:bold;
     }
  </style>
</head>
<body style="font-size:14pt;font-family:arial;background-color:gray" >

<p style="text-align:center"> Grids</p>
`;
/*
<script src="pages.js"></script>
<script src="gridPages.js"></script>
*/
let pageNumber = 0;
let numPages = 0;
const thingString = function (ix,dir,fmat,ititle) {
	
	debugger;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	thePages.push(x);
	//let imsrc = `http://localhost:8081/images/${path}.jpg`;
	let imsrc = `images/${path}.jpg`;
	let thumbsrc = `thumbs/${path}.jpg`;
	let title,titleArg;
	if (ititle) {
		titleArg = '&title='+ititle;
		title = ititle;
	} else {
		titleArg = '';
		title = x
	}
	let pageArg = '&page='+pageNumber;
	pageNumber++;
	let lastPageArg = (pageNumber === numPages)?'&lastPage=1':'';
	let rs;
	let astart = `<a href="page.html?image=${x}&fmat=${fmat}${titleArg}${pageArg}${lastPageArg}">`;
	if (forEutelic) {
		let titleLink = ititle?`${astart}${ititle}</a><br/>`:'';
		//let titleA = ititle?`<a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${title}</a><br/>`:'';
rs = `<div><p style="text-align:center">${titleLink}${astart}<img width="200" src="${thumbsrc}"></a></p></div>
	`; 
	} else {
		
rs = `<div><p style="text-align:center"><a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${title}</a><br/><a href="${dir}/${path}.js">source</a><br/>${astart}<img width="200" src="${thumbsrc}"></a></p></div>
`;
	}
//let rs = `  <div><p style="text-align:center">${title}<a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${x}</a><br/><a href="${dir}/${path}.js">source</a><br/><a href="page.html?image=${x}&fmat=${fmat}${title}"><img width="200" src="${imsrc}"></a></p></div>
//`;
	return rs;
}
/*
let pageOrder = [];
let formatOrder = [];
const writeThing = function (x,dir,fmat,title) {
	document.writeln(thingString(x,dir,fmat,title));
	pageOrder.push(x);
	formatOrder.push(fmat);
}*/
let numThingsPerLine = 4;
let sectionString = function (things) {
	let numThingsThisLine = 0;
	let startLine =  `
<div class="theGrid">
  <div></div>
  `;
	let rs = `
<div class="theGrid">
  <div>START SECTION</div>
  `;
	let ln = things.length;
	for (let i=0;i<ln;i++) {
		let thing = things[i];
//things.forEach(function (thing) {
		if (thing.length === 3) {
			rs += thingString(thing[0],thing[1],thing[2]);
		} else {
				rs += thingString(thing[0],thing[1],thing[2],thing[3]);
		}
		numThingsThisLine++;
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
	//console.log('foo',rs);
	return rs;

}
const writeThePages = function () {
	let js = 'let thePages = '+JSON.stringify(thePages)+';';
	fs.writeFileSync('www/thePages.js',js);
}
	
const writePage = function (sections) {
	
	let frs = '';
	frs += pageTop;
	frs +=sectionsString(sections);
	fs.writeFileSync('www/grids.html',frs);
}

let sectionsC = require('./gridSections.js');
/*let sections = [
[
		 ['grid0_8_10','gen2','square'],
		 ['multi0','gen2','square'],
		 ['grid0_9_0','gen2','wide2'],

],
[
  ['zigzag3_3.mp4','gen2','wide2'],
	['grid0_9.mp4','gen2','square','Animation'],
	['eye0','grid','square'],
	['eye1','grid','square'],
],	
[	 
	 ['wander0_1.mp4','gen2','square'],
	 ['wander0_1_2.mp4','gen2','wide2'],
	 ['mlines0_4.mp4','gen2','wide2','Rotation'],
	 ['mlines0_7.mp4','gen2','Square']
]
];*/
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
 console.log('numPages',numPages);
 