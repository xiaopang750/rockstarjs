'use strict';
var grunt = require('grunt');

function check(path) {
  var buf = grunt.file.read(path, { encoding: null })
  return !(buf[0] !== 0xEF && buf[1] !== 0xBE && buf[2] !== 0xBB)
}

exports.addBom = {
  withBom: function(test) {
    test.expect(1);
    var exptected = check('test/tmp/add/with-bom.txt')
    test.equal(exptected, true, 'test/tmp/add/with-bom.txt')
    test.done()
  },
  withoutBom: function(test) {
    test.expect(1);
    var exptected = check('test/tmp/add/without-bom.txt')
    test.equal(exptected, true, 'test/tmp/add/without-bom.txt')
    test.done()
  }
}