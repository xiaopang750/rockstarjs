/**
 *description:出货单列表
 *author:wangweicheng
 *date:2015/3/11
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var oTip = require('../../../widget/dom/tip');
	var Dialog = require('../../../widget/dom/dialog');
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/goods/deliveryList');
	var oConfirmDelivery = require('../../../tpl/shop/goods/confirmDelivery');

	var DeliveryList = R.Class.create(R.util, {

		initialize: function() {
			
			this.defaultParam = {
				pagesize: 10
			};
			
			this.pkProductDelivery = null;
			this.currentRow = null;

			this.initEditBox();
			this.showPage();
			this.events();
		},
		showPage: function() {
			this.oPage = new fenye(R.interfaces.goods.deliveryList, oTplList, this.defaultParam);
		},
		events: function() {
			
			var _this = this;

			//确认出库弹窗
			$(document).on('click', '[delivery-confirm]', function(){
				_this.currentRow = $(this).parents('[list]');
				_this.pkProductDelivery = _this.currentRow.attr('pkProductDelivery');	
				_this.oConfirmBox.show();
			});

			//确认出库
			$(document).on('click', '[sc=delivery-confirm]', function(){
				_this.deliveryConfirm(_this.pkProductDelivery);
			});

		},
		initEditBox: function() {
			//渲染弹框
			this.oConfirmBox = new Dialog({
				boxTpl: oConfirmDelivery
			});
		},
		deliveryConfirm: function(sid){

			var _this = this;

			this.reqUrl = R.interfaces.goods.deliveryConfirm;
			this.reqParam = {pkProductDelivery: sid};

			this.req(function(data){

				oTip.say(data.msg);
				_this.oConfirmBox.close();
				_this.showPage();

			},function(data){
				oTip.say(data.msg);
			});

		}

	});

	var oDeliveryList = new DeliveryList();

});
