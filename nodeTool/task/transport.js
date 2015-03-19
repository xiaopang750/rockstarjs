module.exports = function() {

	var config = require('../config')();

	//cmd格式转换
	var transport = {
	
		options: {
			debug: false
		},
		expand : true,
        cwd: config.transport.cwd,  
        src: config.transport.files,  
        dest: config.transport.dest
    }

	return transport;
};