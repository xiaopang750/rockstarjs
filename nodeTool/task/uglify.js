module.exports = function() {

	var config = require('../config')();

	//js压缩
	var uglify = {

		js: {
			options: {
				banner: '/*! company <%= pkg.name %> version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			expand: true,
	        cwd: config.uglify.taskjs.cwd,
	        src: config.uglify.taskjs.files,
	        dest: config.uglify.taskjs.dest
		},
		seajs: {
			options: {
				banner: '/*! company <%= pkg.name %> version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			expand: true,
	        src: config.uglify.seajs.files
		}
	};

	return uglify;

};