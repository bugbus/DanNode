var path = require('path');
var _path = path.join(__dirname, '.', 'text.txt');

var fs = require('fs');
 fs.readFile(_path, 'utf8', function(err, data){
     if(err) return
     
 });