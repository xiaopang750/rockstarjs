module.exports = function() {

	var config = require('../config')();

	/*
		@param pageConfig: 页面上引入js,css地址的替换;css版本号的增加
		@param driverConfig: 驱动配置的替换
		@param seaConfig: seajs配置的替换
	*/

	var replace = {

		pageConfig: {

			options: {

		       patterns:config.replace.changePage.patterns,
		       usePrefix: false
		    },
		    files: [
		      {	
		      	expand: true, 
		      	cwd: config.replace.changePage.cwd,
		      	src: config.replace.changePage.src, 
		      	dest: config.replace.changePage.dest
		      }
		    ]

		},
		driverConfig: {

			options: {

		       patterns:config.replace.driverConfig.patterns,
		       usePrefix: false
		    },
		    files: [
		      {	
		      	expand: true, 
		      	flatten: true,
		      	src:  config.replace.driverConfig.src, 
		      	dest: config.replace.driverConfig.dest
		      }
		    ]
				
		},
		seaConfig: {

			options: {
		      	patterns:config.replace.seaConfig.patterns,
		      	usePrefix: false
		    },
		    files: [
		      {	
		      	expand: true, 
		      	flatten: true,
		      	src:  config.replace.seaConfig.src, 
		      	dest: config.replace.seaConfig.dest
		      }
		    ]
		}

    };

    return replace;

};