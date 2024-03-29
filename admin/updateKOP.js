
var fs = require('fs');

  //var needsSignInScripts = {sign_in:1,account:0,index:1,svg:1};
   var noScripts = 1;//{account:1};
 
  
let transferMedia = process.argv[2];

//console.log('xfM',transferMedia);
  
const endsIn = function (string,p) {
  return string.substr(string.length-p.length) === p;
}

  var xferFile = function(ipath,opath) {
    //var scripts = needsSignInScripts[fl]?signInScripts:minimalScripts;
//var ffl = fl+'.html';
  //  let fipath = '../prototypejungle_ui/'+ipath;
    //var vl = fs.readFileSync(ipath).toString();
    var vl = fs.readFileSync(ipath);
        console.log('read',ipath,'writing',opath);
  

     fs.writeFileSync(opath,vl);
  

  }
  
  

const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}



  
  var xferDir = function (idir,odir) {
		
     let files = fs.readdirSync(idir);
     files.forEach( function (fln) {
       let ext = afterLastChar(fln,'.');
       console.log('fln',fln,'ext',ext);
      if ((ext === fln) || (!['js','css','html','svg','jpg','ico','md'].includes(ext))) {
         console.log('wrong kind of file/dir',fln);
         return;
      }
      let fpath = idir + '/' + fln;
      var vl = fs.readFileSync(fpath).toString();
      console.log('read',fpath);
     
       fs.writeFileSync(odir+'/'+fln,vl);
     
     });
  }
  var xferFiles = function (idir,ifiles,odir) {
		let ln = ifiles.length;
		for (let i = 0;i<ln;i++) {
			let ifl = idir + '/' +ifiles[i];
			let ofl = odir + '/' +ifiles[i];
      xferFile(ifl,ofl);
		}
  }
	let sectionsC = require('./gridSections.js');
	
	const collectContent = function (sections) {
		let rs = [];
    let idir = './www/images';

		//console.log('sections',sections);
		sections.forEach( (section) => {
			section.forEach((thing) => {
        if (thing.length > 1) {
          let media = thing[1];
          rs.push(media+'.jpg');
          let  mediaH = media+'_h.jpg';
          let  mediaV = media+'_v.jpg';
          if (fs.existsSync(idir + '/' + mediaH)) {
            rs.push(mediaH);
            console.log('mediaH',mediaH);
          } 
          if (fs.existsSync(idir + '/' + mediaV)) {
            rs.push(mediaV);
            console.log('mediaH',mediaV);
          }
        }
			})
		});
		return rs;
	}
	
	let mediaFiles = collectContent(sectionsC.sections);
//	console.log(mediaFiles);
	
	const xferMedia = function (mediaFiles) {
		let idir = './www/images';
		let itdir = './www/thumbs'
		let  odir = '../kop/public/images'
		let  otdir = '../kop/public/thumbs'
		let jpgFiles = mediaFiles.filter((file) => endsIn(file,'.jpg'));
		console.log(jpgFiles);
		xferFiles(idir,jpgFiles,odir);
		xferFiles(itdir,jpgFiles,otdir);
	}
	if (transferMedia) {
		console.log('transfering media (jpgs)');
		xferMedia(mediaFiles);
	}
	let srcd = 'www/';
	let dstd = '../kop/public/';
	const xfer = function (srcf,idstf) {
		let dstf = idstf?idstf:srcf;
	  xferFile(srcd+srcf,dstd+dstf)
	}
  xferFiles(srcd,['pageSupport.js',
  'grids.html','gPages.js','gTitles.js', 
  'square.html','sqPages.js','sqTitles.js',
  'horizontal.html','hPages.js','hTitles.js',
  'vertical.html','vPages.js','vTitles.js',
  'horizontalnf.html','hnfPages.js','hnfTitles.js','altPages.js','altTitles.js'
  ],
  dstd);
	xfer('pageSupport.js','pageSupport.js');
	xfer('grids.html','index.html');
	xfer('square.html','square.html');
	xfer('vertical.html','vertical.html');
	xfer('horizontal.html','horizontal.html');
	xfer('horizontalnf.html','horizontalnf.html');
	xfer('essay.html');
	xfer('page.html');
//	xfer('eutelic.html');
	xfer('thePages.js');
	xfer('theTitles.js');
	/*
	xfer('altPage.html');
	xfer('altGrids.html');
	xfer('altPages.js');
	xfer('altTitles.js');
	*/
	/*
	const xferTopFiles = function (files) {
		let idir = './www';
		let  odir = '../eutelic/public';
		xferFiles(idir,files,odir);
	}
	xferTopFiles(['grids.html','page.html']);
	*/
			
	
			return;
		
		