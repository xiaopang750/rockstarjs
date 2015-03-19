/**
 *description:商品列表
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require('../../../widget/dom/dialog');
	var oTip = require('../../../widget/dom/tip');
	var goodsListTpl = require('../../../tpl/shop/goods/goodsEdit');
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/goods/goodsList');

	var GoodsList = R.Class.create(R.util, {

		initialize: function() {
			
			this.defaultParam = {
				pagesize: 10
			};

			this.oWrap = $('[list-wrap]');
			this.showPage();
			this.events();
			this.initEditBox();
			this.initUploadForm();
		},
		showPage: function() {

			this.oPage = new fenye(R.interfaces.member.packageInfo, oTplList, this.defaultParam);

		},
		events: function() {
				
			var _this = this;

			this.oWrap.on('click', '[modify]', function(){

				_this.modify($(this));

			});

		},
		initEditBox: function() {

			//渲染弹框
			this.oEditBox = new Dialog({
				boxTpl: goodsListTpl
			});
		},
		initUploadForm: function() {

			//editBox
			var _this = this;

			this.oEditForm = new ajaxForm({

				subUrl: R.interfaces.goods.goodsEdit,
				fnSumbit: function( data ) {

					data.pkShopCombo = _this.nowAid;
					data.currentmoney = data.shopmoney;
					data.fairermoney = data.fairermoney/100;
					return data;

				},
				sucDo: function(data, oBtn , param) {

					oTip.say(data.msg);
					
					param.fairermoney = param.fairermoney * 100 + '%';
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
				value = value.replace('%', '');
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
		}

	});

	var oGoodsList = new GoodsList();

});
