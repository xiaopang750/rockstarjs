module.exports = function(grunt) {

	var template = require('art-template');
	//template.config('base', __dirname);
	var config = require('../config')();
	var jshintConfig = config.jshint;

	//语法检测
	var jshint = {

		options: jshintConfig.options,
        files: {
        	src: jshintConfig.files
        }
	}

	jshint.options.cb = function(data) {

		var html = template(jshintConfig.errorTemp, {data: data});

		grunt.file.write(jshintConfig.errorDest, html);
	};

	return jshint;

};