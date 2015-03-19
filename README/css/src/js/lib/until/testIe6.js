/**
 *description:检测ie6
 *author:fanwei
 *date:2014/02/20
 */
define(function(require, exports, module){
	
	if( !window.XMLHttpRequest ) {
		alert('该平台不支持ie6,请升级您的浏览器');
		document.write('该平台不支持ie6,请升级您的浏览器');
	}

});