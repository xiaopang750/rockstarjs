/**
 *description:页面storage存储
 *author:fanwei
 *date:2015/01/11
 */
define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	
	var Storage = Class.create({

		initialize: function() {
			
			this.pageName = 'arrPage';

		},
		change: function() {

			var sPage = localStorage.arrPage;
			var arrPage = sPage ? JSON.parse(sPage) : [];
			return arrPage;
		},
		save: function(name, data) {

			localStorage[name] = JSON.stringify(data);

		},
		add: function(url) {

			var arr = this.change();
			arr.push(url);
			this.save(this.pageName, arr);

		},
		clear: function() {

			localStorage[ this.pageName ] = '';
		},
		judgeSame: function(url, createDo, showDo) {

			var arr = this.change();

			if(arr.indexOf(url) == -1) {

				createDo && createDo(url);

			} else {

				showDo && showDo(url);
				
			}

		}

	});

	var oStorage = new Storage();

	return oStorage;
	
});