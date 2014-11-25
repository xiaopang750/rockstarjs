/**
 *description:palcehoder:input提示
 *author:fanwei
 *date:2014/04/04
 */

/*
	placeholder(aEle,{color:"#ccc"});

	如果浏览器支持placeholder则用加上placeholder属性;
*/

define(function(require, exports, module) {

	function placeholder(aInput, options) {	

		if ( "placeholder" in aInput.get(0) ) {

			var name;

			aInput.each(function(i){

				name = aInput.eq(i).attr('text');

				aInput.eq(i).attr('placeholder', name);

			});

		} else {

			var name,
			aText,
			color;

			if(!options) options = {};

			color = options.color || '#bbb'	

			aInput.each(function(i){

				name = aInput.eq(i).attr('text');

				var oSpan = $('<span></span>');
				var left = aInput.eq(i).offset().left + 'px';
				var top = aInput.eq(i).offset().top  + 'px';
				var oInput = aInput.eq(i);

				if(aInput.eq(i).val()) oSpan.hide();

				oSpan.html(name);
				oSpan.css('color',color);

				oSpan.css({
					position:'absolute',
					top: top,
					left: left
				});

				$('body').append( oSpan );

				oInput.focus(function(){

					oSpan.css({visibility: 'hidden'})

				});

				oInput.blur(function(){

					if(!oInput.val()) {
						oSpan.css({visibility: 'visible'});	
					}
				});

				oSpan.click(function(){

					oInput.trigger('focus');

				});

			});

		}

		

	}

	return placeholder;

});