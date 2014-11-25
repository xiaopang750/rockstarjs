/*
 *description:回车toDo
 *author:fanwei
 *date:2014/03/27
 */
define(function(require, exports, module){
	
	function enterDo(aInput, toDo) {

		aInput.keydown(function(e){
			
			if (e.which == 13) {

				toDo && toDo($(this));
			}

		});

	}

	return enterDo;

});