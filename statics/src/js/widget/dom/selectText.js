/**
 *description:复制到剪贴板
 *author:fanwei
 *date:2014/04/06
 */

/*
	@param;
	ele object 被操作的文本框;
	start 选中文本框的起始位置;
	end 选中文本框的终点位置;	
*/

define(function(require, exports, module){

 	function selectText(ele, start, end) {

 		var num,
			element;

		num = ele.val().length;
		element = ele[0];

		if(element.setSelectionRange) {

			element.setSelectionRange(start, end);
			
		} else {

			var range = element.createTextRange();
			range.collapse(true);
			range.moveStart("character", num);
			range.moveEnd("character", end - start);
			range.select();
		}

 	}

 	return selectText;

});