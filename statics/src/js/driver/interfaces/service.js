/**
 *description: 服务管理接口
 *author:fanwei
 *date:2015/01/29
 */
define(function(require, exports, module){	

	module.exports = {

		list: R.uri.reqPrefix + 'service/list',
		add: R.uri.reqPrefix + 'service/add',
		edit: R.uri.reqPrefix + 'service/edit',
		remove: R.uri.reqPrefix + 'service/remove',
		regist: R.uri.reqPrefix + 'service/regist'

	};
	
});