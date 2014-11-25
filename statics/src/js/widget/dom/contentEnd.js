/**
 *description:contentEditor元素光标移动到最后
 *author:fanwei
 *date:2014/month/day
 */
define(function(require, exports, module){
	
	function moveEnd(obj) {

		obj.focus();

	    if(window.getSelection) {

	    	var sel = window.getSelection();
		    var range = document.createRange();
		    var len =  obj.childNodes.length;
			range.setStart(obj, len);     
	    	range.setEnd(obj, len);  
	    	sel.removeAllRanges();  
	    	sel.addRange(range);

	    } else {

	    	var range = document.selection.createRange();
	    	var len = obj.innerHTML.length;
		    range.moveEnd('character', len);
		    range.collapse(true);
		    range.select();
	    }

	}

	module.exports = moveEnd;
	
});