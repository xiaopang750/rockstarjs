/**
 *description: webview-api
 *author:fanwei
 *date:2015/01/11
 */
define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	var Ui = require('./ui');
	var oUi = new Ui();
	var oStoragePage = require('./pageStorage');
	
	var Webview = Class.create({

		initialize: function(opts) {
			
			opts = opts || {};
			this.ani = opts.as || 'slide-in-right'; //加载动画
			this.time = opts.at || '200'; //加载动画所需时间
			this.preate = opts.preate || {};
			this._openw = opts._openw || null //当前webview 
		},
		show: function(webview, ani, duration, cb) {

			webview.show(ani, duration, cb);

		},
		hide: function(webview, ani, duration, cb) {

			webview.hide(ani, duration, cb);

		},
		close: function(webview, ani, duration, cb) {

			webview.hide(ani, duration, cb);
		},
		nowView: function() {

			//获取当前webview
			return plus.webview.currentWebview();

		},
		getView: function(id) {

			//通过id获取webview
			return plus.webview.getWebviewById( id );

		},
		create: function(opts) {

			/*
				url: webview 地址 这里默认 id 和 url 一样
				styles: webview 样式
				otherData: 其他数据
			*/
			opts = opts || {};

			opts.url = opts.url || '';

			opts.styles = opts.styles || {
				scrollIndicator : 'none',
				scalable: false,
				popGesture: 'hide'
			};

			opts.otherData = opts.otherData || {};

			//存储create过的page
			oStoragePage.add(opts.url);

			if(!opts.url) {
				console.log('未传入webview地址');
				return;
			}

			return plus.webview.create(opts.url, opts.url, opts.styles, opts.otherData);
		},
		onLoaded: function(webview, cb) {

			//当webview加载完成
			webview.addEventListener('loaded', function(){

				cb && cb();

			});

		},
		onClose: function(webview, cb) {

			//当webview关闭时
			webview.addEventListener('close', function(){

				cb && cb();

			});

		},
		viewShow: function(webview, cb) {

			//显示webview
			webview.show(this.ani, this.time, cb);

		},
		preateWebivew: function(id) {

			var _this = this;

			if(!this.preate[id]){

				var webview = this.create({
					url: id
				});	

				this.preate[ id ] = webview;

				this.onClose(webview, function(){

					_this._openw = null;

					if( _this.preate[ id ] ) {

						_this.preate[ id ] = null;

					}

				});
			}
		},
		loc: function(id) {

			var _this = this;

			if(this._openw) {

				return;
			}

			this._openw = this.preate[ id ];

			if( this._openw ) {

				if(this._openw.showded) {

					this._openw.viewShow();

				} else {

					this._openw.viewShow();
					this._openw.showded = true;

				}

			} else {

				oLoading.show();

				this._openw = this.create({
					url: id,
					otherData: {
						preate: true
					}
				});

				this.preate[ id ] = this._openw;

				this.onLoaded(this._openw, function(){

					oLoading.hide();
					_this.viewShow( _this._openw );
					_this._openw.showded = true;
					_this._openw = null;

				});

				this.onClose(this._openw, function(){

					_this._openw = null;

					if(_this.preate[id]) {

						_this.preate[id] = null;

					}

				});

			}


		},
		toPage: function(sHref) {

			var isHasParam;
			var isOtherPage; //是否是别人域名下的页面;

			//这里不用this 上的方法; webview 被其他类继承, this指向改变

			if(sHref.indexOf('http://') == -1) {

				//没有http的代表是自己域下的页面
				sHref = 'http://' +  window.location.host + sHref;
				isOtherPage = false;

			} else {

				//别人域名下的页面
				plus.key.removeEventListener('backbutton',deviceQuit);
				isOtherPage = true;

			}

			//如果有参数不add到 storage里面			
			if(sHref.indexOf('?') != -1) {
				sHref = sHref.split('?')[0];
				isHasParam = true;
			} else {
				isHasParam = false;
			}

			//不重复才创建
			oStoragePage.judgeSame(sHref, function(){

				//新页面
				oUi.uiLoading.show();

				var oNewView = oWebview.create({
					url: sHref
				});

				oWebview.onLoaded(oNewView, function(){

					oWebview.viewShow(oNewView);

					oNewView.appendJsFile("_www/deji.js");
					oUi.uiLoading.hide();

					if(isOtherPage) {
						otherPageBack(sHref);
					}

				});

			}, function(url){

				//已经创建过的页面
				if(isOtherPage) {
					otherPageBack(sHref);
				}
				
				var oHasedView = oWebview.getView(url);
				oHasedView.reload(true);

				//如果页面是 aaa.com?2带参数的需要每次都刷新页面
				if(isHasParam) {

					oUi.uiLoading.show();
					oWebview.onLoaded(oHasedView, function(){

						oWebview.viewShow(oHasedView);
						oUi.uiLoading.hide();

					});

				} else {

					oWebview.viewShow(oHasedView);

				}

			});				

		}

	});

	var oWebview = new Webview();

	return oWebview;
	
});

