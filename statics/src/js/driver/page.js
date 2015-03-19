/**
 *description:页面公共js
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var Class = require("../lib/ooClass/class");
	var oTip = require('../widget/dom/tip');
	var Dialog = require('../widget/dom/dialog');
	var oTplPassBox = require('../tpl/shop/global/modifyPass');
	var ajaxForm = require('../widget/form/ajaxForm');
	var enterDo = require('../widget/dom/enterDo');

	var oMessageTpl = require('../tpl/shop/customService/msgAll');

	var GlobalPage = Class.create(R.util, {

		initialize: function() {
			
			this.oHeader = $('[header]');

			this.initDialog();
			this.modifyPass();
			this.aModifyInput = $('[modify-pass-input]');
			this.oLeftBar = $('[left-bar]');
			this.events();	
			this.oMsgAllWrap = $('[msg-all-wrap]');	
			this.getAllMsg();

		},
		getAllMsg: function() {

			//加载发送消息的人物

			if(this.oMsgAllWrap.length) {

				var _this = this;

				this.reqUrl = R.interfaces.customService.msgAll;
				this.req(function(data){
					
					_this.render(_this.oMsgAllWrap, oMessageTpl, data.data);
					_this.aGroup = $('[group]');
					_this.addMessageEvent();

				});

			}	

		},
		addMessageEvent: function() {

			var _this = this;

			this.oMsgAllWrap.on('click', '[group]', function(e){

				if( $(e.target).attr('cancelbubble') == 'true' ) {
					return;
				}

				var oThis = $(this);
				var aOtherGroup = oThis.siblings();
				var aOtherCheck = aOtherGroup.find('[msgUid]');
				aOtherCheck.removeAttr('checked');
				
				if(oThis.hasClass('active')) {
					
					oThis.removeClass('active');

				} else {
					_this.aGroup.removeClass('active');
					oThis.addClass('active');
				}

			});

		},	
		initDialog: function() {

			//修改密码弹框
			this.oPassBox = new Dialog({
				boxTpl: oTplPassBox
			});

		},	
		events: function() {
			
			var _this = this;

			$('[loginOut]').on('click', function(){

				_this.loginOut();

			});	

			$('[modifypass]').on('click', function(){

				_this.oPassBox.show();

			});

			enterDo(this.aModifyInput, function(){

				_this.oModifyForm.subMit();

			});

			this.oHeader.on('mouseenter', '[block-item]', function(){

				var oNowMenu = $(this).find('[drop-menu]');
				_this.showHeaderMenu(oNowMenu);

			});

			this.oHeader.on('mouseleave', '[block-item]', function(){

				var oNowMenu = $(this).find('[drop-menu]');
				_this.hideHeaderMenu(oNowMenu);

			});

			this.oPassBox.onClosed = function() {

				_this.oModifyForm.clear();
				_this.oModifyForm.refresh();

			};

			this.oLeftBar.on('click', '[list-main-head]', function(e){

				_this.showSubNav($(this));

			});
			
		},
		showSubNav: function(oThis) {

			var oMainList = oThis.parents('[list-main]');
			var isHasDown = oMainList.hasClass('down');
			var oSub = oMainList.find('[list-sub]');

			if(isHasDown) {
				oMainList.removeClass('down');
			} else {
				oMainList.addClass('down');
			}

		},
		showHeaderMenu: function(oMenu) {
			oMenu.show();
		},
		hideHeaderMenu: function(oMenu) {
			oMenu.hide();
		},
		loginOut: function() {

			this.reqUrl = R.interfaces.user.loginOut;
			this.req(function(data){

				window.location = data.data.url;

			});

		},
		modifyPass: function() {
			
			var _this = this;
			var oNew = $('[name = newpassword]');

			this.oModifyForm = new ajaxForm({

				subUrl: R.interfaces.global.modifyPass,
				btnName: 'modify-pass-btn',
				boundName: 'modify-pass-wrap',
				otherCheck:{

					reNewPassWord:[

						function(ele){

							if ( !ele.val() ) {

								return false;

							} else {

								return true;	
							}
							
						},
						function(ele){

							if ( ele.val() != oNew.val() ) {

								return false;

							} else {


								return true;
							}

						}
					]
				},
				sucDo: function(data, oBtn, param) {

					oTip.say(data.msg);
					_this.oModifyForm.clear();
					_this.oPassBox.close();
					setTimeout(function(){
						_this.loginOut();
					},1000);
				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oModifyForm.upload();

		}

	});

	var oGlobalPage = new GlobalPage();

});
