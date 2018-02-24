var FileAPI = require('file-api')
  , File = FileAPI.File
  , FileList = FileAPI.FileList
  , FileReader = FileAPI.FileReader;
var input = new File("./test.js");
var atob = require('atob');
var TextDecoder = require('text-encoding');

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}

var promise = getBase64(input);
console.log(promise);