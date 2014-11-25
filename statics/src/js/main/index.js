/**
 *description:example
 *author:fanwei
 *date:2014/11/19
 */
define(function(require, exports, module){
	
	require('../driver/global');
	var oTpl = require('../tpl/index');

	var Index = R.Class.create(R.util, {

		initialize: function(name) {
		

			var data = [1,2];

			this.log(        oTpl( {data: data} )    );
	
		},
		renderPage: function() {

		}

	});

	var oIndex = new Index();

});