/**
 *description:event-scroll
 *author:fanwei
 *date:2014/5/28
 */

/**
	$(ele).scroll(function(isDown){
		
		默认事件已阻止,无需处理;

		if(isDown) {
			向下滚动触发
		} else {
			向上滚动触发
		}

	});
*/

 define(function(require, exports, module){
 	
 	$.fn.scroll = function(callBack) {

		var oScroll;

		return $(this).each(function(){

			oScroll = new _Scroll( $(this), callBack );

			oScroll.init();

		});

	}

	function _Scroll(ele, callBack) {

		this.ele = ele.get(0);
		this.callBack = callBack;
	}

	_Scroll.prototype = {

		init: function() {

 			var _this = this;

 			if( document.addEventListener ) {

 				this.ele.addEventListener('mousewheel', function(e){

 					_this.wheel(e, _this.callBack);

 				} , false);
 				this.ele.addEventListener('DOMMouseScroll', function(e){

 					_this.wheel(e, _this.callBack);


 				} , false);

 			} else {

 				this.ele.attachEvent('onmousewheel', function(e){

 					_this.wheel(e, _this.callBack);

 					return false;

 				});

 			}

		},
		wheel: function(e,callBack) {

			var oEvent = e || event;
			var bDown,
				_this;

			_this = this;
			bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
			callBack && callBack( bDown );

			if( oEvent.preventDefault ) {

				oEvent.preventDefault();

			} else {

				return false;

			}


		}

	}

 });