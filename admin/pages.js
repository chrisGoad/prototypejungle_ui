var pages = {
  index:"draw.html?intro=tutorial_index&source=(sys)/forMainPage/spiralLogo8.item&fit=0.7",
 basic_ops:"draw.html?intro=basic_ops&fit=1.2",
  properties:"draw.html?source=(sys)/forMainPage/three_circles.item&intro=properties&fit=0.7",
  prototypes:"draw.html?source=(sys)/intro/prototypes.item&intro=prototypes&fit=0.75",
  swap:"draw.html?source=(sys)/forMainPage/swap4.item&intro=swap&fit=0.5",
  image:"draw.html?source=(sys)/intro/van_gogh.item&intro=image&fit=0.9",
  swapPart:"draw.html?source=(sys)/forMainPage/three_circles.item&intro=swapPart&fit=0.7",
 files:"draw.html?intro=files",
  //catalog:"draw.html?intro=catalog",
 separate:"draw.html?source=(sys)/intro/separate.item&intro=separate&fit=0.8",
  connections:"draw.html?source=(sys)/intro/connections3.item&intro=network",
  multi_connect:"draw.html?source=(sys)/intro/multiConnect.item&intro=details",
  clone:"draw.html?source=(sys)/intro/copy.item&intro=copy",
  kit:"draw.html?source=/kit/startTree2V.js&fit=0.8&intro=kit",
  data:"draw.html?source=(sys)/intro/graph.item&fit=0.8&intro=data",
  catalog:"draw.html?intro=catalog",
   variant:"draw.html?source=(sys)/intro/decoArrow.item&fit=0.5&intro=variant",
   wrap:"draw.html?source=(sys)/intro/wrap.item&fit=0.5&intro=wrap",
   share:"draw.html?intro=share",
tree:"draw.html?source=(sys)/intro/tree.item&fit=0.5&intro=tree",
  exercise:"draw.html?source=(sys)/intro/exercise0.item&intro=exercise",
  beta:"doc/beta.html"
}

//var pageOrder  = ['properties','basic_ops','network','swap','prototypes','clone','files','tree','data','separate',''];
//var pageOrder  = //['index','properties','basic_ops','connections','swap','image','clone','files','kit','data','catalog','wrap','variant','separate'];

/*
var pageOrder  =['grid24','grid24au_2','grid24ay_4','grid24ay_5','grid24ay_6','grid24ay_7','grid6','grid24b','grid24g','spatter4c','spatter4b','spatter4a','grid24h','grid24j','grid24k','grid24m','grid24d','grid8','grid12','grid24c','grid28b','grid16','grid17','grid18','grid19','grid28c','grid28d','grid24a','eye0','eye1','shaded5a','shaded5b','intersect0','intersect1','intersect3','intersect4','intersect5','intersect7','intersect9','intersect10','intersect11','intersect13','intersect15','intersect25','intersect17','intersect18','intersect19','intersect21','intersect22','intersect23','spaced5','spaced6','spaced8','spaced9','spaced10','multiGrid0','multiGrid2','multiGrid3','quadTree0','bullsEyeGrid','randomLines3','grid28a'];
*/


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
const gotoNextPage = function (myId) {
  debugger;
  let n = pageOrder.indexOf(myId);
  gotoPage(pageOrder[n+1],formatOrder[n+1]);
}


const gotoPrevPage = function (myId) {
  let n = pageOrder.indexOf(myId);
  gotoPage(pageOrder[n-1],formatOrder[n-1]);
}

const thingString = function (ix,idir,fmat,ititle) {
	
	debugger;
	let dir = 'images';
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
	//let imsrc = `http://localhost:8081/images/${path}.jpg`;
	let imsrc = `/images/${path}.jpg`;
	let title,titleArg;
	if (ititle) {
		titleArg = '&title='+ititle+'<br/>';
		title = ititle;
	} else {
		titleArg = '';
		title = '';
	}
	//let rs = `<div><p style="text-align:center">${title}<a href="http://localhost:8081/draw.html?source=/${dir}/${path}.js">${x}</a><br/><a href="http://localhost:8081/${dir}/${path}.js">source</a><br/><a href="page.html?what=${x}&fmat=${fmat}${title}"><img width="150" src="${path}.jpg"></a></p></div>`;
	let rs = `<div><p style="text-align:center">${title}<a href="/${dir}/${path}.js">${x}</a><br/><a href="/${dir}/${path}.js">source</a><br/><a href="page.html?what=${x}&fmat=${fmat}${title}"><img width="200" src="${imsrc}"></a></p></div>`;
	return rs;
}

let pageOrder = [];
let formatOrder = [];
const writeThing = function (x,dir,fmat,title) {
	document.writeln(thingString(x,dir,fmat,title));
	pageOrder.push(x);
	formatOrder.push(fmat);
}

let writeSection = function (things) {
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
	pageOrder.push(thing[0]);
	formatOrder.push(thing[2]);
});
 rs += `</div>`;
 debugger;
 document.writeln(rs);
}
	
	
const htmlString = function (ix,fmat,ititle,noButtons) {
	let width;
	let ww = window.innerWidth;
	let wh = window.innerHeight;
	debugger;
	let spix = ix.split('.');
	let path = spix[0];
	let ext = (spix.length === 1)?'jpg':spix[1];
	let x = path + '.'+ ext;
  let vidsrc = `http://localhost:8081/export/${ix}`;
	let imsrc;
	if (ext === 'gif') {
		imsrc = vidsrc;
  } else {
	  imsrc = `/images/${ix}`;
	}
	if (fmat === 'square') {
		width = 550;
	} else if (fmat === 'wide1') {
		width = 700;
	} else if (fmat === 'wide2') {
		width = 1000;
	}
	width = '100%';
	let rs;
	let topPad = noButtons?'0px':'50px';
	let title = ititle?ititle:'';
	//let video =  (ext === 'gif')||(ext === 'mp4');
	let video =  (ext === 'mp4');
	let inner;
	if (video) {
	/*	inner = `
<video controls width="100%">
	 <source src="${x}" type="video/${ext}">
</video>
`
<video controls width="100%" height="100%">

*/
  inner = `
<video controls  width="${width}">
	 <source src="${vidsrc}" type="video/${ext}">
</video>
`
} else {
		//inner = `<img width="100%" src="${x}">`;
		inner = `<img width="${width}" src="${imsrc}">`;
}
if (!noButtons) {
	 rs = `
<title>Visual Experiments</title>
</head>
<body style="font-size:14pt;font-family:arial;background-color:black;color:white">

<p style="padding:0px;margin:0px;text-align:center">${x} </p>

<div class="theGrid">
  <div  style="text-align:center;padding-top:${topPad}"> <button  onclick="gotoPrevPage('${x}')">Prev</button></div>
  <div>
	  ${inner}
	</div>
  <div style="text-align:center;;padding-top:50px"><button  onclick="gotoNextPage('${x}')">Next</button></p></div>
</div>

  <div style="text-align:center;;padding-top:10px"><button  onclick="location.href='pix.html'">Top</button></p></div>
	`  } else {
		rs = `
<title>Visual Experiments</title>
</head>
<body style="font-size:14pt;font-family:arial;background-color:black;color:white">

<p style="padding-top:20px;margin:0px;text-align:center">${title} </p>

<div class="theGrid">
  <div></div>
	 <div>
	  ${inner}
	</div>
</div>
` ;
debugger;
}
return rs;
}
 <!-- <div><img width="${width}" src="${x}.jpg"></div>-->


const writeStyle = function (noButtons) {
	debugger;
	let buttons = !noButtons;
  let url = new URL(window.location);
	let fmat = url.searchParams.get("fmat");
	let tc;
	if (fmat === 'square') {
		tc = buttons?'1fr 1.4fr 1fr':'1fr 2fr 1fr';
	} else if (fmat === 'wide1') {
		tc = buttons?'1fr 3fr 1fr':'1fr 6fr 1fr';
	}	 else if (fmat === 'wide2') {
		tc = buttons?'1fr 5fr 1fr':'1fr 6fr 1fr';
	}
	document.writeln(
	`<style>
    .theGrid {
      display:grid;
      padding-top:0px;
      grid-template-columns:${tc};
    }
  </style>`);
}
const writeHtml = function (noButtons) {
	debugger;
  let url = new URL(window.location);
	let fmat = url.searchParams.get("fmat");	
	let what =  url.searchParams.get("what");
	let title =  url.searchParams.get("title");
	document.writeln(htmlString(what,fmat,title,noButtons));
}
const blogHtml = function (x) {
  let url = new URL(window.location);
	let fmat = url.searchParams.get("fmat");	
	let what =  url.searchParams.get("what");
	document.writeln(htmlString(what,fmat,1));
}
const arrayAsString = function (x) {
	let ja = JSON.stringify(x);
	return `[${ja}];`
}

  /*
const jumpTo = function (dst) {
  debugger;
  let shellDomain = location.hostname === '127.0.0.1'?'http://127.0.1:3001/':'https://prototypejungle.org/';
  let prnt = window.parent.parent;
  prnt.postMessage(dst,'*');
}

*/