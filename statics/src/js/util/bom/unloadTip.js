/**
 *description:页面卸载提醒
 *author:fanwei
 *date:2014/09/05
 */
define(function(require, exports, module){
	
	function unloadTip(msg) {

		$(window).bind('beforeunload', function(){ 

			if(!window.__dontTip) {
				return msg; 
			}
		  
		}); 

	}

	return unloadTip;
	
});