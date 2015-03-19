/*
 *description:limit-text
 *author:fanwei
 *date:2013/08/29
 */

/*
	文本框，文本域字数提示:

	@param:
	oInput: object 监听的文本框
	oTip: obejct 提示框
	max: number 最大字数限制
	inputtipwrap: 容器编辑
*/

define(function(require, exports, module){
	
	function InputTip(oInputName, oTipName) {

		this.oInput = $(oInputName);
		this.oTip = $(oTipName);
		this.max = parseInt(this.oInput.attr('max'));
		this.oInputName = oInputName;
		this.oTipName = oTipName;
		this.delay = 300;

		this.oTip.html(this.max);	
		
	}

	InputTip.prototype = {

		start: function() {

			this.oTip.html( this.max );
			this.events();
			this.calc();

		},
		events: function() {

			var _this = this;
			var timer;


			$(document).on('keypress', this.oInputName, function(){

				_this.oInput = $(this);
				_this.oTip = $(this).parents('[inputtipwrap]').find(_this.oTipName);

				timer = setTimeout(function(){

					_this.calc();	

				}, this.delay);
			});	


			$(document).on('keyup', this.oInputName, function(){

				_this.oInput = $(this);
				_this.oTip = $(this).parents('[inputtipwrap]').find(_this.oTipName);

				timer = setTimeout(function(){

					_this.calc();	

				}, this.delay);
			});	

		},
		calc: function() {

			var sValue,
				num;
			
			sValue = this.oInput.val();
			num = sValue.length;

			if( num >= this.max ) {

				this.oInput.val( this.oInput.val().substring(0, this.max) );

			}

			this.oTip.html( this.max - num );

		}

	}	

	module.exports = InputTip;

});