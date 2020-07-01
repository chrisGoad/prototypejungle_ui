/* 
curl localhost:8080
*/
const http = require('http');
const fs = require('fs');
//const Buffer = require('Buffer');
//const mtypes = {html:'text/html',js:'text/javascript',
const mtypes = {html:'text/html',js:'application/javascript',
                  css:'text/css',svg:'image/svg+xml',ico:'image/x-icon'};
const requestListener = function (req, res) {
	let iurl = req.url;
	let url = new URL('http://localhost:8081'+iurl);
	let method = req.method;
	//let url = req.url;
	let ipath = url.pathname;//.substring(1);
	let dot = ipath.lastIndexOf('.');
	//let ln = ipath.length;
	let ext = ipath.substring(dot+1);
	//let path = 'www/test2.html';
	let path = 'www'+ipath;
	let ctype = mtypes[ext];
  console.log('path = ',path,' method=',method,' ctype = ',ctype);
	let data;
  if (method === 'POST') {
    let data = '';
    req.on('data', chunk => {
        data += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log('data = ', data);
        res.end('ok');
    });
		return;
	}



	let body;
	//if (ctype && fs.existsSynch(path)) {
	if (fs.existsSync(path)) {
    body	= fs.readFileSync(path).toString();
	} else {
		body = '';
		ctype = 'text/plain';
	}
  //let ln = Buffer.byteLength(body);
  let ln = body.length;
	console.log('length',ln);
	//let body = ext;
		
	res.writeHead(200, {
    'Content-Length': ln,
   // 'Content-Length': Buffer.byteLength(body),
	//'Content-Type': 'text/html'});
	//'Content-Type': 'text/plain'});
	'Content-Type': ctype+'; charset=utf-8'});
	//res.write(page);
  res.end(body);
	return;
	res.writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
   // 'Content-Length': Buffer.byteLength(body),
	'Content-Type': 'text/html'});
	//res.write(page);
  res.end(body);
}

const server = http.createServer(requestListener);
server.listen(8081);