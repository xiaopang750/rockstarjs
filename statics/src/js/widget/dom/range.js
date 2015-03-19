/*
 *description:select-range-input
 *author:fanwei
 *date:2014/09/19
 */

define(function(require, exports, module){
	
	function selectRange(ele, start, stop) {

		//ele jquery-object

		var oEle = ele[0];

		if(oEle.setSelectionRange) {

			//firefox 
			oEle.select();
			oEle.setSelectionRange(start, stop);

		} else {

			var range = oEle.createTextRange();
			range.collapse(true);
			range.moveStart("character", start);
			range.moveEnd("character", stop - start);
			range.select();

		}

	}

	return selectRange;

})