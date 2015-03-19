/**
 *description:复制到剪贴板
 *author:fanwei
 *date:2014/04/05
 */

/*
	@param;
	ele object,被复制的文本框;	
*/

 define(function(require, exports, module){
 	
 	var oTip = require('./tip');

 	function copyText(ele) {

 		var sValue,
 			jsEle;

 		sValue = ele.val();
 		jsEle = ele[0];	

 		if( window.clipboardData ) {

			window.clipboardData.setData('text', sValue);

			oTip.say( '已复制到剪贴版' );

		} else {

			oTip.say( '复制失败，请按ctrl+c复制' );

			if( jsEle.setSelectionRange ) {

				jsEle.select();
				jsEle.setSelectionRange( 0, sValue.length );

			}

		}

 	}

 	return copyText;	
 
 });