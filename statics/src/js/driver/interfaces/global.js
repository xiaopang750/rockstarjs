/**
 *description: 全局接口
 *author:fanwei
 *date:2015/01/25
 */
define(function(require, exports, module){	

	module.exports = {

		modifyPass: R.uri.reqPrefix + 'global/modifyPass', //密码修改
		getArea: R.uri.reqPrefix + 'global/getArea', //区域联动
		upload: R.uri.uploadPrefix + 'uploader' //上传

	};
});
