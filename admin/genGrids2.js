
var fs = require('fs');



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
<body style="font-size:14pt;font-family:arial;background-color:black" >
<script src="pages.js"></script>
<script src="gridPages.js"></script>
<p style="text-align:center"> Grids</p>
`;

const thingString = function (ix,dir,fmat,ititle) {
	
	debugger;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	//let imsrc = `http://localhost:8081/images/${path}.jpg`;
	let imsrc = `images/${path}.jpg`;
	let title,titleArg;
	if (ititle) {
		titleArg = '&title='+ititle+'<br/>';
		title = ititle;
	} else {
		titleArg = '';
		title = '';
	}
	//let rs = `<div><p style="text-align:center">${title}<a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${x}</a><br/><a href="http://localhost:8081/${dir}/${path}.js">source</a><br/><a href="page.html?what=${x}&fmat=${fmat}${title}"><img width="150" src="${path}.jpg"></a></p></div>`;
	let rs = `  <div><p style="text-align:center">${title}<a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${x}</a><br/><a href="${dir}/${path}.js">source</a><br/><a href="page.html?image=${x}&fmat=${fmat}${title}"><img width="200" src="${imsrc}"></a></p></div>
`;
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
let sectionString = function (things) {
	let rs = `
<div class="theGrid">
  <div></div>
  `;
things.forEach(function (thing) {
	if (thing.length === 3) {
	  rs += thingString(thing[0],thing[1],thing[2]);
	} else {
		  rs += thingString(thing[0],thing[1],thing[2],thing[3]);
	}
//	pageOrder.push(thing[0]);
//	formatOrder.push(thing[2]);
});
 rs += `</div>
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
	

 writePage(sectionsC.sections);
 