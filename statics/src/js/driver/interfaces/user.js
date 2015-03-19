/**
 *description: 用户接口
 *author:fanwei
 *date:2015/01/09
 */
define(function(require, exports, module){	

	module.exports = {

		login: R.uri.reqPrefix + 'user/login',
		regist: R.uri.reqPrefix + 'user/regist',
		loginOut: R.uri.reqPrefix + 'user/loginOut'
	};
	
});
