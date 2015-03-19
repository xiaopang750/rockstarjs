/**
 *description:用户管理
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var oTip = require('../../../widget/dom/tip');
	var bodyParse = require('../../../util/http/bodyParse');
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/member/list');

	var Manage = R.Class.create(R.util, {

		initialize: function() {
			
			this.pageInfo = bodyParse();

			this.defaultParam = {
				pagesize: 10,
				likecontent: this.pageInfo.q
			};

			this.oWrap = $('[content-wrap]');
			this.showPage();
			this.events();

		},
		showPage: function() {

			this.oPage = new fenye(R.interfaces.member.query, oTplList, this.defaultParam);

		},
		events: function() {
			
			var _this = this;

			this.oWrap.on('click', '[regist-app]', function(){
				
				_this.registApp($(this));

			});
			
		},
		registApp: function(oThis) {

			var _this = this;

			//给用户发送app密码
			var aid = oThis.attr('aid');
			this.reqUrl = R.interfaces.member.registApp;
			this.reqParam = {
				pkCustomer: aid
			};
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

	var oManage = new Manage();

});
