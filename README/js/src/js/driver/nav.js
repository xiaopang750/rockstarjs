/**
 *description:左侧导航
 *author:fanwei
 *date:2014/11/05
 */
define(function(require, exports, module){

	var oNavLeftWrap = $('[nav-left-wrap]');
	var offsetY = 200;
	var orgTop = oNavLeftWrap.offset().top;
	var nowTop;
	var nowId = window.location.hash;
	var aSection = $('[content-right] h2');
	var isClick = false;

	if(nowId) {

		var nowLocObj = $(nowId);

		loc(nowLocObj);
		hilightNav(nowId);
	}

	judge();
	events();

	$(window).on('scroll', judge);

	function judge() {

		nowTop = $(window).scrollTop();

		if(nowTop >= orgTop) {
			oNavLeftWrap.addClass('active');
		} else {
			oNavLeftWrap.removeClass('active');
		}

		if(!isClick) {
			scrollJudge(nowTop);	
		}

		isClick = false;

	}

	function loc(obj) {

		if(!obj.length) return;

		var top = obj.offset().top;

		setTimeout(function(){

			document.body.scrollTop = top;
			document.documentElement.scrollTop = top;

		},10);

	}

	function hilightNav(id) {

		var oA = $('a[href='+ id +']');
		oA.parent().siblings().find('a').removeClass('active');

		oA.addClass('active');

	}

	function events() {

		oNavLeftWrap.on('click', 'a', function(){

			isClick = true;

			$(this).addClass('active').parent().siblings().find('a').removeClass('active');

		});

	}

	function scrollJudge(windowTop) {
		
		var winHeight = document.documentElement.clientHeight;
		var docHeight = document.documentElement.scrollHeight;
		var nowId;

		aSection.each(function(i){

			var nowSection = aSection.eq(i);
			var top = nowSection.offset().top;

			if(windowTop + offsetY >= top) {
				nowId = '#' + nowSection.attr('id');
				hilightNav(nowId);
			} 

		});

		/*if(winHeight + windowTop == docHeight ) {

			nowId = '#' + aSection.eq(aSection.length - 1).attr('id');
			hilightNav(nowId);

		}*/

	}


});

