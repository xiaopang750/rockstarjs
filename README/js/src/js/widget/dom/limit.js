/*
 *description:文字字数限制
 *author:fanwei
 *date:2014/08/26
 */
define(function(require, exports, module){
	
	function Limit() {

		this.delay = 500;

	}

	Limit.prototype = {

		init: function(){

			this.events();

		},
		events: function() {

			var _this = this;
			var timer,
				oThis;

			$(document).on('keyup', '[text-limit]', function(e){

				oThis = $(this);

				clearTimeout(timer);
				timer = setTimeout(function(){

					_this.cut(oThis);

				},_this.delay);

			});

			$(document).on('focus', '[text-limit]', function(e){
				
				_this.cut($(this));

			});

			$(document).on('blur', '[text-limit]', function(e){
				
				_this.cut($(this));

			});

		},
		cut: function(oThis) {

			var max = parseInt(oThis.attr('text-max'));
			var isInput,
				str;

			if(oThis.val()) {

				str = oThis.val();
				isInput = true;

			} else {

				str = oThis.html();
				isInput = false;
			}

			var strlen = str.length;

			if(strlen >= max) {

				if(isInput) {

					oThis.val( str.substring(0, max) );	

				} else {

					oThis.html( str.substring(0, max) );

				}

			} 

		}

	}

	module.exports = Limit;

});

