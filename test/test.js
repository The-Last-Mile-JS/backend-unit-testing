var input = require("./input.js")   // get input file
var output = require("./output.js") // get expected output file
var leaderboard = new Array();      // leaderboard

var FileAPI = require('file-api')
  , File = FileAPI.File
  , FileList = FileAPI.FileList
  , FileReader = FileAPI.FileReader;
var atob = require('atob');
var TextDecoder = require('text-encoding');

var test = require('tape').test; // assign the tape library to the variable "test"
const testFolder = '../submission/';
const fs = require('fs');

function getBase64(file, onLoadCallback) {
  return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}

function read_file(){
fs.readdirSync(testFolder).forEach(file => { //go through all the files in the folder
  var parts = file.split('.');
  var ext = parts[parts.length - 1]; //get the extension and name
  var name = parts[parts.length - 2];
  
  //check if the file is .js format
  if(ext.toLowerCase() == 'js') 
    var square = require(testFolder + name); //get function
    var name_file = testFolder + name + ".js";
    if((testFolder+name).split('/')[parts.length] != ''){ //check the function name is not null
    var testfile = new File(name_file);
    var testing = true;
    for (i = 1; i <= Object.keys(input()).length; i++){
      if (output()[i] != square(input()[i])){
        testing = false;
        break;
      }
    }

    // test
    test('should return 9 when input 3', function (t) { 
      for (i = 1; i <= Object.keys(input()).length; i++){
        t.equal(output()[i], square(input()[i]));
      }
      t.end();
    });

    // check running time
    if (testing){
      var start = new Date().getTime();
      for (i = 1; i <= 1e5; i++){ //run the function 10 million times
        for (k = 1; k <= Object.keys(input()).length; k++){
          square(input()[k]);
        }
      }
      var end = new Date().getTime();

      var promise = getBase64(testfile);
      promise.then(function(result) {
          var num_of_semicolumn = atob(result.split("base64,")[1]).split(";").length - 1;
          leaderboard.push([end - start, num_of_semicolumn , name]);
      }).then(function(){
        leaderboard.sort(sortFunction);
      
      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }
      
      console.log();
      console.log("=============================================");

      for(i = 0; i < leaderboard.length; i++){
          console.log(leaderboard[i][2] + " score is " + leaderboard[i][0] + " and concise level is " + leaderboard[i][1]);
      }
      
      console.log("=============================================");
      console.log();
      
      });
     //calculate the complexity by subtracting start time from end time
    }
  }
})
}
read_file();