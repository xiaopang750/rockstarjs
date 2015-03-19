/**
 *description:loadCss
 *author:fanwei
 *date:2014/10/24
 */
define(function(require, exports, module){
	
	function loadCss(src) {

		var head = document.getElementsByTagName("head")[0] || document.documentElement;
		var oLink = document.createElement('link');
		oLink.rel = "stylesheet";
		oLink.href = src;
		head.appendChild(oLink);

	}

	module.exports = loadCss;
	
});