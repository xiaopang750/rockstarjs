/**
 *description:库存列表
 *author:wangweicheng
 *date:2015/3/11
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require('../../../widget/dom/dialog');
	var oTip = require('../../../widget/dom/tip');
	var stockEdit = require('../../../tpl/shop/goods/stockEdit');
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/goods/stockList');
	var enterDo = require('../../../widget/dom/enterDo');

	var StockList = R.Class.create(R.util, {

		initialize: function() {
			
			this.defaultParam = {
				pagesize: 10
			};

			this.oSearchInput = $('[search-input]');
			this.oSearchBtn = $('[search-btn]');
			this.oWrap = $('[list-wrap]');
			this.showPage();
			this.events();
			this.initEditBox();
			this.initUploadForm();
		},
		showPage: function() {

			this.oPage = new fenye(R.interfaces.goods.stockList, oTplList, this.defaultParam);

		},
		events: function() {
			
			var _this = this;

			this.oWrap.on('click', '[modify]', function(){

				_this.modify($(this));

			});

			this.oSearchBtn.on('click', function(){

				var sValue = _this.oSearchInput.val();
				_this.search(sValue);

			});

			enterDo(this.oSearchInput, function(oInput){
				var sValue = oInput.val();
				_this.search(sValue);
			});

		},
		initEditBox: function() {

			//渲染弹框
			this.oEditBox = new Dialog({
				boxTpl: stockEdit
			});
		},
		initUploadForm: function() {

			//editBox
			var _this = this;

			this.oEditForm = new ajaxForm({

				subUrl: R.interfaces.goods.stockPriceEdit,
				fnSumbit: function( data ) {
					
					data.pkShopProdcut = _this.nowAid;
					return data;

				},
				sucDo: function(data, oBtn , param) {

					oTip.say(data.msg);
					
					_this.refreshList(_this.nowAEdit, param);
					_this.oEditBox.close();

				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oEditForm.upload();

		},
		findEdit: function(oList) {

			var aEdit = oList.find('[edit]');
			return aEdit;
		},
		getEditData: function(aEdit) {

			//获取编辑数据
			var data = {};
			aEdit.each(function(i){

				var oEdit = aEdit.eq(i);
				var name = oEdit.attr('edit');
				var value = oEdit.text();
				data[name] = value;
			});

			return data;
		},
		refreshList: function(aEdit, data) {

			//刷新列表
			for (var attr in data) {

				aEdit.each(function(i){

					var oEdit = aEdit.eq(i);
					var name = oEdit.attr('edit');
				
					if(attr == name) {

						oEdit.text(data[attr]);
					}

				});
			}

		},
		modify: function(oThis) {
			//修改
			this.nowAid = oThis.attr('aid');
			var oList = oThis.parents('[list]');
			this.nowAEdit = this.findEdit(oList);
			var data = this.getEditData(this.nowAEdit);
			this.oEditBox.refreshData(data);
			this.oEditBox.show();
			this.oEditForm.reload();
		},
		search: function(sValue) {

			var _this = this;

			this.reqUrl = R.interfaces.goods.stockList;
			this.reqParam = {content: sValue};

			this.req(function(data) {
				
				var wrap = $('[data-ele=data-wrap]');
				var tpl = require('../../../tpl/shop/goods/stockList');

				_this.render(wrap, tpl, data.data); 

			}, function(data) {
				oTip.say(data.msg);
			});

		}

	});

	var oStockList = new StockList();

});
