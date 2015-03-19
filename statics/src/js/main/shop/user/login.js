/**
 *description:登录
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var oTip = require('../../../widget/dom/tip');
	var cookie = require('../../../util/cookie/cookie');
	var enterDo = require('../../../widget/dom/enterDo');
	var placeHolder = require('../../../widget/dom/placeholder');

	var Login = R.Class.create(R.util, {

		initialize: function() {
			
			this.aEenter = $('[enter-do]');
			this.oRemember = $('[remember]');
			this.oName = $('[name = usercode]');
			this.oPass = $('[name = loginpassword]');
			this.nowUserName = '';

			this.form();
			this.events();
			this.showUserCode();

			var HolderName = new placeHolder(this.oName);

			var HolderPass = new placeHolder(this.oPass);
		},
		events: function() {

			var _this = this;

			enterDo(this.aEenter, function(){

				_this.oLoginForm.subMit();

			});

		},
		showUserCode: function() {

			//显示上次登录的账号
			var usercode = cookie.getCookie('userName');

			if(usercode) {

				this.oName.val(usercode);

			}

		},
		form: function() {

			var _this = this;

			this.oLoginForm = new ajaxForm({

				subUrl: R.interfaces.user.login,
				fnSumbit: function( data ) {

					_this.nowUserName = data.usercode;

					data.usergroup = R.nowWayId;

					data.isRemember = _this.oRemember.attr('checked') ? 1 : 0;

					return data;

				},
				sucDo: function(data) {
		
					cookie.setCookie('userName', _this.nowUserName, '30day');
					window.location = data.data.url;

				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oLoginForm.upload();

		}

	});

	var oLogin = new Login();

});
