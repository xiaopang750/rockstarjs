/**
 *description: 业绩管理接口
 *author:fanwei
 *date:2015/01/25
 */
define(function(require, exports, module){	

	module.exports = {

		getAllList: R.uri.reqPrefix + 'performance/getAllList', //查询店铺业绩数据
		getHairList: R.uri.reqPrefix + 'performance/getHairList', //获取理发师业绩
		getHistoryList: R.uri.reqPrefix + 'performance/getHistoryList' //获取历史订单

	};
});
