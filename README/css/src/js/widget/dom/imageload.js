/**
 *description:预加载image;
 *author:fanwei
 *date:2013/06/20
 */

/*
	dataImage:img数组url;
	sucDo: 加载完成时的回调函数;
	beforeDo: 开始加载img的回调函数;

	loadImage([
		'aaa.jpg'
	],function(){
		

	},function(){
	

	});
*/

define(function(require, exports, module) {
	
	function loadImage(dataImage, sucDo, beforeDo) {
		var i,
			num,
			count;

		num = dataImage.length;

		count = 0;

		beforeDo && beforeDo();

		for(i=0 ; i<num; i++) {

			var oImage = new Image();

			oImage.onload = function() {

				count ++;

				if(count == num) {

					sucDo && sucDo();
				}
			};

			oImage.onerror = function() {

				count ++;

				if(count == num) {

					sucDo && sucDo(num);
				}
			};

			oImage.src = dataImage[i];
		}
	}

	return loadImage;

});