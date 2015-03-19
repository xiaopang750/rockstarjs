/**
 *description:需要全局调用的api
 *author:fanwei
 *date:2015/1/10
 */

define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	var ui = require("./ui");
	var oDevice = require('./device');
	var oWebview = require('./webview');
	var oStoragePage = require('./pageStorage');

	$('[refresh-page]').click(function(){

		var nowView = oWebview.nowView();

		nowView.reload(true);

	});

	var GlobalApi = Class.create(ui, {

		initialize: function() {

			//页面级别，决定backButton的作用 1:退出 2:回退 只针对android
			this.nowPageLevel = parseInt( $('body').attr('pageLevel') );

			var _this = this;

			if(window.plus) {

				this.pageReady();

			} else {

				oDevice.deviceReady(function(){

					_this.pageReady();

				});

			}

		},
		pageReady: function() {

			//设备就绪需要做的事情
			var _this = this;

			oDevice.confirmQuit( this.nowPageLevel );
			this.clickHref();

		},
		clickHref: function() {

			var _this = this;

			//a标签点击跳转
			$(document).on('click', '[uilink]', function(){

				var sHref = $(this).attr('href');

				oWebview.toPage(sHref);

				return false;

			});

		},
		toPage: oWebview.toPage

	});

	//var oGlobalApi = new GlobalApi();
	
	module.exports = GlobalApi;

});