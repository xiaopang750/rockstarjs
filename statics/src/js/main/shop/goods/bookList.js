/**
 *description:订货单列表
 *author:wangweicheng
 *date:2015/3/11
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require('../../../widget/dom/dialog');
	var fenye = require('../../../widget/dom/fenye');
	var oTip = require('../../../widget/dom/tip');
	var oTplList = require('../../../tpl/shop/goods/bookList');
	var oConfirmTpl = require('../../../tpl/shop/goods/confirmBook');

	var BookList = R.Class.create(R.util, {

		initialize: function() {
			
			this.defaultParam = {
				pagesize: 10
			};
			
			this.pkProductBook = null;
			this.currentRow = null;

			this.initEditBox();
			this.showPage();
			this.events();
		},
		showPage: function() {
			this.oPage = new fenye(R.interfaces.goods.bookList, oTplList, this.defaultParam);
		},
		events: function() {
			var _this = this;

			//订货单提交
			$(document).on('click', '[operation=submit]', function(){

				var pkProductBook = $(this).attr('bid');
				_this.bookSubmit(pkProductBook);

			});

			//确认收货弹窗
			$(document).on('click', '[operation=confirm]', function(){
				
				_this.currentRow = $(this).parents('[list]');
				_this.pkProductBook = _this.currentRow.attr('bid');	
				_this.oConfirmBox.show();

			});

			//确认出库
			$(document).on('click', '[sc=book-confirm]', function(){
				_this.confirmRec(_this.pkProductBook);
			});


		},
		initEditBox: function() {
			//渲染弹框
			this.oConfirmBox = new Dialog({
				boxTpl: oConfirmTpl
			});
		},
		confirmRec: function(pkProductBook) {

			var _this = this;
			
			this.reqUrl = R.interfaces.goods.bookConfirm;
			this.reqParam = {pkProductBook: pkProductBook};

			this.req(function(data){
				oTip.say(data.msg);
				_this.oConfirmBox.close();
				_this.showPage();
			}, function(data){
				oTip.say(data.msg);
			});

		},
		bookSubmit: function(pkProductBook) {

			var _this = this;

			this.reqUrl = R.interfaces.goods.bookSubmit;
			this.reqParam = {pkProductBook: pkProductBook};

			this.req(function(data){
				oTip.say(data.msg);
				_this.showPage();
			}, function(data){
				oTip.say(data.msg);
			});

		}

	});

	var BookList = new BookList();

});
