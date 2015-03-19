/**
 *description:平台订单列表
 *author:wangweicheng
 *date:2015/3/11
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require('../../../widget/dom/dialog');
	var fenye = require('../../../widget/dom/fenye');
	var platBook = require('../../../tpl/shop/goods/platBook');
	var oTip = require('../../../widget/dom/tip');
	var oTplList = require('../../../tpl/shop/goods/platBookList');

	var PlatBookList = R.Class.create(R.util, {

		initialize: function() {

			this.defaultParam = {
				pagesize: 10
			};
			
			this.operatBook = null;
			this.currentRow = null;

			this.initEditBox();
			this.showPage();
			this.events();
			
		},
		showPage: function() {
			this.oPage = new fenye(R.interfaces.goods.platBookList, oTplList, this.defaultParam);
		},
		events: function() {
			
			var _this = this;	

			//驳回弹窗
			$(document).on('click', '[operation=reject]', function(){
				$('[reject-textarea]').val('');
				_this.currentRow = $(this).parents('[list]');
				_this.operatBook = _this.currentRow.attr('pkproductbook');
				_this.oEditBox.show();
			});

			//确认驳回
			$(document).on('click', '[sc=confirm]', function(){
				var sText = $('[reject-textarea]').val();
				if(!sText){
					oTip.say('请填写驳回理由');
				}else{
					_this.confirmOperation('N', sText, _this.currentRow);
				}	
			});

			//确认通过
			$(document).on('click', '[operation=pass]', function(){
				_this.currentRow = $(this).parents('[list]');
				_this.operatBook = _this.currentRow.attr('pkproductbook');
				_this.confirmOperation('Y', null, _this.currentRow);
			});

		},
		initEditBox: function() {
			//渲染弹框
			this.oEditBox = new Dialog({
				boxTpl: platBook
			});
		},
		confirmOperation: function(res, sText, oRow) {
			
			var _this = this;

			this.reqUrl = R.interfaces.goods.bookApprove;
			this.reqParam = {
				ispass: res,
				pkProductBook: this.operatBook
			};

			if(sText){
				this.reqParam.note = sText;
			}

			this.req(function(data){
				oTip.say(data.msg);
				_this.oEditBox.close();
				_this.showPage();
			}, function(data){
				oTip.say(data.msg);
			});

		}

	});

	var oPlatBookList = new PlatBookList();

});
