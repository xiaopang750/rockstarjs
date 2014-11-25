module.exports = function(grunt) {
  'use strict';
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig({
    jshint: {
      files: [ '*.js' ],
      options: grunt.file.readJSON('.jshintrc')
    },
    karma: {},
    clean: {
      src: 'test/tmp'
    },
    nodeunit: {
      tests: 'test/*_test.js'
    },
    bom: {
      addBom: {
        src: 'test/tmp/add/*.txt',
        options: {
          add: true
        }
      },
      removeBom: {
        src: 'test/tmp/remove/*.txt',
        options: {
          add: false
        }
      }
    }
  })

  grunt.loadTasks('tasks')

  grunt.registerTask('copy', function() {
    grunt.file.copy('test/fixtures/with-bom.txt', 'test/tmp/add/with-bom.txt')
    grunt.file.copy('test/fixtures/without-bom.txt', 'test/tmp/add/without-bom.txt')

    grunt.file.copy('test/fixtures/with-bom.txt', 'test/tmp/remove/with-bom.txt')
    grunt.file.copy('test/fixtures/without-bom.txt', 'test/tmp/remove/without-bom.txt')
  })

  grunt.registerTask('default', ['jshint', 'test'])
  grunt.registerTask('test', ['clean', 'copy', 'bom:addBom', 'bom:removeBom', 'nodeunit', 'clean'])
}