/**
 *description:背景自适应
 *author:fanwei
 *date:2013/06/29
 */

/*
	@param:
	src:自适应img标签的路径;
	fnDo:自适应后的回调函数;
*/

define(function(require, exports, module){

	function adapt_bg(src,fnDo) {

		var oImage = new Image();
		var timer = null;
		oImage.style.position = 'absolute';
		oImage.style.left = 0;
		oImage.style.top = 0;

		oImage.onload = function() {

			document.body.appendChild( oImage );

			var windowWidth = $(window).width();
			var windowHeight = $(document).height();

			update(oImage,windowWidth,windowHeight);

			$(window).resize(function(){

				clearTimeout(timer);
				timer = setTimeout(function(){

					var windowWidth = $(window).width();
					var windowHeight = $(document).height();

					update(oImage,windowWidth,windowHeight);

					fnDo&&fnDo();

				},300);
			});

			fnDo&&fnDo();
		};

		oImage.src = src;

		
	}

	function update(oImage,w,h) {

		  var thisWidth=oImage.width;
  
		  var thisHeight=oImage.height;
		  
		  var scaleTarget=w/h;
		  
		  var scaleThis=thisWidth/thisHeight;
		  
		  if(scaleTarget>scaleThis) { //高的增长速度快
		  
		    oImage.width=w;
			
			oImage.height=w/scaleThis;
			
			oImage.style.marginLeft='0';
			
			oImage.style.marginTop=-(w/scaleThis-h)/2+'px';
			
		  }
		  else {//宽的增长速度快
		  
		    oImage.height=h;
			
			oImage.width=h*scaleThis;
			
			oImage.style.marginTop='0';
			
			oImage.style.marginLeft=-(h*scaleThis-w)/2+'px';
		  }
	}

	return adapt_bg;

});