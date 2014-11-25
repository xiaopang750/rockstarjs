module.exports = function() {

	var config = require('../config')();

	//css压缩
	var cssmin = {
		
		options: {
			banner: '/*! company <%= pkg.name %> version <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		expand: true,
        cwd: config.cssmin.cwd,
        src: config.cssmin.files,
        dest: config.cssmin.dest
		
	};

	return cssmin;

};