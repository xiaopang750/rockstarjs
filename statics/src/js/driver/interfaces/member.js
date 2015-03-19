/**
 *description: 会员
 *author:fanwei
 *date:2015/01/25
 */
define(function(require, exports, module){	

	module.exports = {

		queryPayList: R.uri.reqPrefix + 'member/payList', //查询所有结算单
		query: R.uri.reqPrefix + 'member/query', //会员查询
		add: R.uri.reqPrefix + 'member/add', //会员添加
		edit: R.uri.reqPrefix + 'member/edit', //会员编辑
		editPackage: R.uri.reqPrefix + 'member/editPackage', //套餐编辑
		packageInfo: R.uri.reqPrefix + 'member/packageInfo', //套餐信息
		hasedPackage: R.uri.reqPrefix + 'member/hasedPackage', //获取已有的套餐
		savePackage: R.uri.reqPrefix + 'member/savePackage', //套餐保存
		sum: R.uri.reqPrefix + 'member/sum', //结算
		order: R.uri.reqPrefix + 'member/order', //下单,
		registApp: R.uri.reqPrefix + 'member/registApp', //给用户发送app密码 
		fastOrder: R.uri.reqPrefix + 'member/fastOrder' //快速下单

	};
});
