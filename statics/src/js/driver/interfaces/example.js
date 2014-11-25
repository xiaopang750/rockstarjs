/**
 *description:interfaces-user
 *author:fanwei
 *date:2014/11/20
 */
define(function(require, exports, module){	

	module.exports = {

		get: {

		},
		post: {
			login: R.uri.reqPrefix + 'user/login',
			regist: R.uri.reqPrefix + 'user/regist'	
		}

	};
	
});
