var test = require('tape').test; // assign the tape library to the variable "test"

var student = require('./studentfunctions.js'); // student's function
var input = require('./input.js');
var output = require('./output.js');
// Solution

test('Assertion', function (assert) {
    for (var i = 1; i <= Object.keys(input()).length; i++){
        assert.equal(output()[i], student(input()[i]));
    }
    assert.end();
});
