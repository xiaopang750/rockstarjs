/**
 *description:loading
 *author:fanwei
 *date:2015/01/11
 */
define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	
	//loading
	var Loading = Class.create({

		initialize: function() {

			

		},
		show: function(title, styles) {

			title = title || '';
			plus.nativeUI.showWaiting(title, styles);

		},
		hide: function() {

			plus.nativeUI.closeWaiting();

		}

	});

	//confirm
	var Confirm = Class.create({

		initialize: function() {
				
		},
		confirm: function(opts) {

			opts = opts || {};
			var buttons = opts.buttons || ["确认", "取消"];

			plus.nativeUI.confirm(opts.content, function(e){

				if(e.index == "0") {
					opts.onConfrim && opts.onConfrim(e);
				}

			}, opts.title, buttons);

		}

	});

	//info
	var Info = Class.create({

		initialize: function() {
				
		},
		tip: function(opts) {

			var opts;

			opts = opts || {};

			if(window.plus) {

				if(plus.os.name != 'Android') {

					//ios
					opts.content = opts.content || '';
					opts.onClose = opts.onClose || null;
					opts.title = opts.title || '';
					opts.doneStr = opts.doneStr || '好';

					plus.nativeUI.alert(opts.content, function(){

						opts.onClose && opts.onClose();

					}, opts.title, opts.doneStr);

				} else {

					//android
					opts = opts || {};
					opts.duration = opts.duration || "short";
					opts.align = opts.align || "center";
					opts.verticalAlign = opts.verticalAlign || "bottom";
					opts.content = opts.content || '';
					plus.nativeUI.toast( opts.content );
				}

			} else {

				alert(opts.content);

			}

		}

	});

	//calendar
	var Calendar = Class.create({

		initialize: function() {
				
		},
		pick: function(suc, cancel, opts) {

			opts = opts || {};
			plus.nativeUI.pickDate(function(e){

				var oDate = e.date;
				var json = {};
				json.year = oDate.getFullYear();
				json.month = oDate.getMonth();
				json.day = oDate.getDate();
				json.hour = oDate.getHours();
				json.min = oDate.getMinutes();
				json.sec = oDate.getSeconds();

				suc && suc(json);

			}, function(e){

				cancel && cancel(e.message);

			}, opts);

		}

	});


	//oTime
	var Time = Class.create({

		initialize: function() {

		},
		pick: function(suc, cancel, opts) {

			opts = opts || {};

			plus.nativeUI.pickTime(function(e){

				var oDate = e.date;
				var json = {};
				json.hour = oDate.getHours();
				json.min = oDate.getMinutes();
				json.sec = oDate.getSeconds();
				suc && suc(json);

			}, function(e){

				cancel && cancel(e.message);


			}, opts);
		}

	}); 	

	var oInfo = new Info();
	var oConfirm = new Confirm();
	var oLoading = new Loading();
	var oCalendar = new Calendar();
	var oTime = new Time();

	//ui
	var Ui = Class.create({
		initialize: function() {},
		uiInfo: oInfo,
		uiConfirm: oConfirm,
		uiLoading: oLoading,
		uiCalendar: oCalendar,
		uiTime: oTime
	});	

	//var oUi = new Ui;

	module.exports = Ui;
	
});