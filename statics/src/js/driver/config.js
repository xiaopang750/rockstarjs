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
	var nowWay = $('body').attr('nowWay');

	/*R.uri = {
		reqPrefix: "/main/" + nowWay + "/",
		uploadPrefix: "/upload/" + nowWay + "/",
		assets: "../statics/assets/",
		css: "../statics/src/css/",
		views: "../statics/src/views/"
	};*/
	
	var user = require('./interfaces/user');
	var member = require('./interfaces/member');
	var performance = require('./interfaces/performance');
	var upload = require('./interfaces/upload');
	var goods = require('./interfaces/goods');
	var service = require('./interfaces/service');
	var content = require('./interfaces/content');
	var glboal = require('./interfaces/global');
	var customService = require('./interfaces/customService');
	
	R.interfaces = {
		user: user,
		member: member,
		performance: performance,
		upload: upload,
		goods: goods,
		service: service,
		content: content,
		global: glboal,
		customService: customService
	};

	//当前渠道
	R.nowWay = nowWay;

});




