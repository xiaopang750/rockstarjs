/**
 *description:注册
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var oTip = require('../../../widget/dom/tip');
	var enterDo = require('../../../widget/dom/enterDo');

	var Regist = R.Class.create(R.util, {

		initialize: function() {
			
			this.aEenter = $('[enter-do]');
			this.events();
			this.form();
		},
		events: function() {

			var _this = this;

			enterDo(this.aEenter, function(){

				_this.oRegistForm.subMit();

			});

		},
		form: function() {

			var _this = this;

			this.oRegistForm = new ajaxForm({

				subUrl: R.interfaces.user.regist,
				fnSumbit: function( data ) {

					return data;

				},
				sucDo: function(data) {

					oTip.say(data.msg);

					//window.location = data.data;

				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oRegistForm.upload();

		}

	});

	var oRegist = new Regist();

});
