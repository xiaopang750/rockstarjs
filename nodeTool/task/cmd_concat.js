module.exports = function() {

	var config = require('../config')();

	//js依赖合并
	var cmdConcat = {

		options: {  
            include: 'all' 
        },
		expand : true,
        cwd: config.cmdConcat.cwd,  
        src: config.cmdConcat.files,  
        dest: config.cmdConcat.dest
	};

	return cmdConcat;

};