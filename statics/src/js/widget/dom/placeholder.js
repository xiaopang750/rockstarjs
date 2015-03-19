/**
 *description:palcehoder:input提示
 *author:fanwei
 *date:2014/04/04
 */

/*
	placeholder(oInput,{color:"#ccc"});

	如果浏览器支持placeholder则用加上placeholder属性;
*/

define(function(require, exports, module) {

	function Placeholder(oInput, options) {	

		this.oInput = oInput;
		this.options = options || {};
		if(!this.oInput.length) return;
		this.start();
	}

	Placeholder.prototype = {

		start: function() {

			var _this = this;

			var hasProperty = this.hasProperty();

			var name = this.oInput.attr('text');

			/*if(hasProperty) {
				
				this.oInput.attr('placeholder', name);

			} else {*/
				
				var nowParent = this.oInput.parent();
				this.oHolder = $('<span style="color:#a9a9a9">'+ name +'</span>');
				nowParent.append(this.oHolder);

				if(this.oInput[0].offsetParent != nowParent[0]) {

					//父级没有定位
					nowParent.css('position', 'relative');

				}
				
				var pl = parseInt( this.oInput.css('paddingLeft') );
				var l = this.oInput.position().left + pl;
				var t = this.oInput.position().top + (this.oInput.outerHeight(true) - this.oHolder.outerHeight(true))/2;
				var sValue = this.oInput.val();

				this.oHolder.css({
					position: 'absolute',
					left: l,
					top: t,
					visibility: 'hidden'
				});

				if(!sValue) {
					this.show();
				}

				this.events();

			/*}*/

		},
		events: function() {

			var _this = this;

			this.oInput.focus(function(){

				_this.hide();

			});

			this.oInput.blur(function(){

				if(!_this.oInput.val()) {
					_this.show();
				}
			});

			this.oHolder.click(function(){

				_this.oInput.trigger('focus');

			});

		},
		hasProperty: function() {

			if ( ("placeholder" in this.oInput.get(0)) ) { 
				return true;
			} else {
				return false;
			}

		},
		hide: function() {

			this.oHolder && this.oHolder.css({visibility: 'hidden'});	

		},
		show: function() {

			this.oHolder && this.oHolder.css({visibility: 'visible'});

		}

	}

	module.exports = Placeholder;

});