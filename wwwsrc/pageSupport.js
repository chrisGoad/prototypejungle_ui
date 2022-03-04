debugger;
const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}

const extension = function (string) {
  return afterLastChar(string,'.');
}
	
const parseQuerystring = function() {
  let nvpair = {};
  let qs = window.location.search.replace('?','');
  let pairs = qs.split('&');
  pairs.forEach(function(v) {
    let pair = v.split('=');
    if (pair.length>1) {
      nvpair[pair[0]] = pair[1];
    }
  });
  return nvpair;
}
let cWidth;
let cPage;
let lastPage;
const onPrev = function () {
  debugger;
	
	let dest = thePages[cPage-1];
	  
	
	window.location.href = `./page.html?image=${dest}&page=${cPage-1}`;
}
const onNext = function () {
  debugger;
	
	let dest = thePages[cPage+1];
	let lastPageArg = (cPage === (thePages.length - 2))?'&lastPage=1':'';

	window.location.href = `./page.html?image=${dest}&page=${cPage+1}${lastPageArg}`;
}


const onTop = function () {
  debugger;
	
	window.location.href = './index.html';
}
document.addEventListener('DOMContentLoaded', () => {
  debugger;
	let cWidth =document.documentElement.clientWidth;
	let cHeight =document.documentElement.clientHeight;
	let cAR = cWidth/cHeight;
  let image = document.images[0];
	let getArgs = parseQuerystring();
	cPage = Number(getArgs.page);
	//lastPage = getArgs.lastPage;
	let title = theTitles[cPage];
	let prevDiv = document.getElementById('prevDiv');
	let nextDiv = document.getElementById('nextDiv');
	let topDiv = document.getElementById('topDiv');
	let titleDiv = document.getElementById('titleDiv');
	let imageDiv = document.getElementById('imageDiv');
	let videoDiv = document.getElementById('videoDiv');
	let imageEl =  document.getElementById('theImage');
	let videoEl =  document.getElementById('theVideo');
	let lastPage = cPage === (thePages.length-1);
	if (cPage === 0) {
	 prevDiv.style.visibility = "hidden";
	}
	if (lastPage) {
	  nextDiv.style.visibility = "hidden";
	}
	prevDiv.addEventListener('click',onPrev);
	nextDiv.addEventListener('click',onNext);
	topDiv.addEventListener('click',onTop);
	if (title) {
	  titleDiv.innerHTML = decodeURI(title);
	}
	
	//imageEl.width = 0.9*Math.min(cWidth,cHeight);
	//imageEl.width = 0.9*cWidth;
	let im = getArgs.image;
	let ext = extension(im);
	let dir = (ext==='jpg')?'images/':'videos/';
	if (ext === 'mp4') {
	  imageDiv.style.display = 'none';
		 videoEl.src = dir+im;
	} else {
	  videoDiv.style.display = 'none';
 	  imageDiv.style.visibility = 'hidden';
   imageEl.src = dir + im;
		imageEl.onload = ()=>{
		  let imWd = imageEl.naturalWidth;
		  let imHt = imageEl.naturalHeight;
			let imAR = imWd/imHt;
			if (imAR > cAR) {
			  imageEl.width = 0.75*cWidth;
			} else {
			  imageEl.height = 0.75 * cHeight;
			}	 
 	    imageDiv.style.visibility = 'visible';

		  debugger;
		}
	}
});	
