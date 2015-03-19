/**
 *description:左侧导航
 *author:fanwei
 *date:2014/11/05
 */
define(function(require, exports, module){
	
	var oNavLeftWrap = $('[nav-left-wrap]');

	var orgTop = oNavLeftWrap.offset().top;
	var nowTop;
	var nowId = window.location.hash;
	var aSection = $('[content-section]');

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

		scrollJudge(nowTop);
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

			$(this).addClass('active').parent().siblings().find('a').removeClass('active');

		});

	}


	function scrollJudge(windowTop) {

		aSection.each(function(i){

			var nowSection = aSection.eq(i);
			var top = nowSection.offset().top;
			var nowId;

			if(windowTop >= top) {
				nowId = '#' + nowSection.attr('id');
				hilightNav(nowId);
			}

		});

	}

});