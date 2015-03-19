/**
 *description:设备api
 *author:fanwei
 *date:2015/01/11
 */
define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	var oWebview = require('./webview');
	var oStoragePage = require('./pageStorage');
	var ui = require('./ui');
	var oUi = new ui();

	//退出,别的页面需要移除绑定，所以作为全局函数
	window.deviceQuit = function() {
		
		var result = confirm('确认退出？');

		if(result){

			oDevice.quit();
		}

	};

	window.deviceBack = function() {

		var nowView = plus.webview.currentWebview();

		nowView.hide('auto', 200);

	};

	window.otherPageBack = function(sHref) {

		plus.key.addEventListener('backbutton',function(){

			var nowView = plus.webview.getWebviewById(sHref);

			nowView.hide('auto', 200);

		},false);

	};

	var Device = Class.create({

		initialize: function() {
				
		},
		deviceReady: function(cb) {

			document.addEventListener('plusready', function(){

				cb && cb();

			}, false);

		},
		quit: function() {

			oUi.uiLoading.show();
			oStoragePage.clear();
			localStorage.arrPage = '';
			setTimeout(function(){
				plus.runtime.quit();
			},1000);
		},
		back: function() {

		},
		confirmQuit: function(pageLevel) {

			/*
			 * pageLevel是1的时候返回按钮是退出
			 * pageLevel大于1的时候是回退
			*/

			var _this = this;

			//确认退出
			if(pageLevel == 1) {

				oStoragePage.clear();
				var nowHref = window.location.href;

				oStoragePage.add(nowHref);

				plus.key.addEventListener('backbutton',deviceQuit,false);


			} else if(pageLevel > 1) {

				plus.key.addEventListener('backbutton',deviceBack,false);

			}
		}

	});

	var oDevice = new Device();

	return oDevice;
	
});