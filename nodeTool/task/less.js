module.exports = function() {

	var config = require('../config')();
	var lessComplie = config.replace.complie.less;

	//less编译
	var less = {

		complie: {

	        files: [
		        {
		            expand: true,
		            cwd: lessComplie['baseUrlLess'],
		            src: lessComplie['file'],
		            dest: lessComplie['baseUrlCss'],
		            ext: lessComplie['extName']
		        }
	        ]
	    }
	}

	return less;
};