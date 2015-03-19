/**
 *description: global-use
 *author:fanwei
 *date:2014/07/14
 */
define(function(require, exports, module){
	
	/*	
		全局R对象上暴露一些基础方法
		@param domain 请求的基础路径, 如果是同一域名reqBase domain唯一
		@param assets 在js中调用静态图片系统文件路径, 如头像
		@param css 在js中调用css路径
		@param interfaces 接口
	*/
	window.R = window.R || {};

	var config = require('./config');
	var Class = require('../lib/ooClass/class');
	var util = require('./base/base_util');
	
	R.Class = Class;
	R.util = util;


});