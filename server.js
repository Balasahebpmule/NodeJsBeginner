var http = require("http");
var url = require("url");
function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;


/*
var http = require("http");
var url = require("url");


function start(route, handle) {

	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		request.setEncoding("utf8");
		var lintCount = 0;
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
			lintCount++;
		});
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
			console.log("\n\r\n\r\n\r No. times data called : " + lintCount);
		});

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;

*/
