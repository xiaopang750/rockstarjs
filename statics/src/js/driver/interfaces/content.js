/**
 *description: 内容管理接口
 *author:fanwei
 *date:2015/01/31
 */
define(function(require, exports, module){	

	module.exports = {

		list: R.uri.reqPrefix + 'content/list', //内容列表
		add: R.uri.reqPrefix + 'content/add',
		edit: R.uri.reqPrefix + 'content/edit',
		cancel: R.uri.reqPrefix + 'content/cancel' //取消发布

	};
	
});