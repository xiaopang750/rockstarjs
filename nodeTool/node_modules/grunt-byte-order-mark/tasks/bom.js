'use strict';

module.exports = function(grunt) {

  function bom(file, addBom) {
    var buf = grunt.file.read(file, { encoding: null });

    var missingBOM = (buf[0] !== 0xEF && buf[1] !== 0xBE && buf[2] !== 0xBB)
    grunt.log.debug('\n\n file: %s, missingBom: %s', file, missingBOM)

    if (missingBOM && addBom) {
      grunt.log.ok('Adding BOM to ' + file)
      grunt.file.write(file, '\ufeff' + buf, { encoding: 'utf-8' })
    } else if (!missingBOM && !addBom) {
      grunt.log.ok('Removing BOM from ' + file)
      grunt.file.write(file, buf.slice(3), { encoding: 'utf-8' })
    }
  }

  grunt.registerMultiTask('bom', 'Add or remove BOM from files', function() {
    var options = this.options({
      add: true,
      remove: false
    })

    var addBom = options.add === undefined ? options.remove : options.add

    this.filesSrc.forEach(function(filePath) {
      bom(filePath, addBom)
    })
  })
}