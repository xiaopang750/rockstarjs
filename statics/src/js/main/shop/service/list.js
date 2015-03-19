/**
 *description:服务管理列表
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require("../../../widget/dom/dialog");
	var oTip = require("../../../widget/dom/tip");
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/service/fairList');

	var ServiceList = R.Class.create(R.util, {

		initialize: function() {
			
			this.oWrap = $('[list-wrap]');
			
			this.defaultParam = {
				pagesize: 10
			};
			this.showPage();
			this.initRemoveBox();
			this.events();

		},
		showPage: function() {

			this.oPage = new fenye(R.interfaces.service.list, oTplList, this.defaultParam);

		},
		initRemoveBox: function() {

			this.oRemovBox = new Dialog({
				content: '确认删除么?'
			});
		},
		events: function() {
			
			var _this = this;
				
			this.oWrap.on('click', '[remove]', function(){

				_this.removeId = $(this).attr('cid');
				_this.oRemovBox.show();

			});

			this.oRemovBox.onConfirm = function() {

				_this.reqUrl = R.interfaces.content.remove;
				_this.reqParam = {cid: _this.removeId};
				_this.req(function(data){
					oTip.say(data.msg);
					this.close();
				}, function(data){
					oTip.say(data.msg);
				});

			};

			this.oWrap.on('click', '[reguid]', function(){
				
				var uid = $(this).attr('reguid');
				_this.registApp(uid, $(this));

			});
		},
		registApp: function(uid, oThis) {

			var _this = this;

			this.reqUrl = R.interfaces.service.regist;
			this.reqParam = {
				pkFairer: uid
			}
			this.req(function(data){

				_this.registSuc(oThis);
				oTip.say(data.msg);

			}, function(data){

				oTip.say(data.msg);

			});

		},
		registSuc: function(oBtn) {

			oBtn.hide();
			var oSpan = $('<span>已注册app</span>');
			oBtn.after(oSpan);

		}

	});

	var oServiceList = new ServiceList();

});
