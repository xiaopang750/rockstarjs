/**
 *description: 路径配置
 *author:fanwei
 *date:2014/11/20
 */
define(function(require, exports, module){
	
	/*
		@param: R.uri.reqPrefix ajax请求的公共前缀
		@param: R.uri.assets js中调用静态资源的路径
		@param: R.uri.css js中调用css的路径
	*/

	R.uri = {
		reqPrefix: "/example/",
		assets: "../statics/assets/",
		css: "../statics/src/css/"
	};

	var example = require('./interfaces/example');
	
	R.interfaces = {
		example: example
	};


});




