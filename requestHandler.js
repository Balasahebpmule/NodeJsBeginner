var querystring = require("querystring"),
fs = require("fs"),
util = require("util"),
formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
   
    console.log("about to parse");
   if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
     
   var form = new formidable.IncomingForm();
    console.log("about to parse");

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
 var oldpath = files.upload.path;
     var newpath = 'C:/Users/balasaheb.mule/test.png';
//"D:/My tasks/Node learnings/First Node/tmp/test.png"; //

        fs.rename(oldpath, newpath, function(error) {
            if (error) {
                fs.unlink(newpath);
                fs.rename(oldpath, newpath);
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Received image:<br/>");
        response.write("<img src='/show' />");
        response.end(util.inspect({fields: fields, files: files}));
        //sponse.end();
    });

 
    return;
  }
  // show a file upload form
  response.writeHead(200, {'content-type': 'text/html'});
  response.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
} 
function show(response) {
    console.log("Request handler 'show' was called.");
      var newpath = 'C:/Users/balasaheb.mule/test.png';
//"D:/My tasks/Node learnings/First Node/tmp/test.png"; //
    fs.readFile(newpath, "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;
