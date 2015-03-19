window.loadFrame = function(oFrame, src, cb){

	oFrame.attr('src', src);

	oFrame.unbind('load');
	oFrame.load(function(){

		cb && cb();

	});

};


console.log(rootData);
		
var oLeftNav = document.getElementById('leftNav');
var oFrame = $('#frame');

writeNav(oLeftNav, rootData.children);

$(oLeftNav).on('click', '[linker]', function(){

	var sHref = $(this).attr('href');

	loadFrame(oFrame, sHref);
});


$(oLeftNav).on('click', '[root]', function(){

	var oChildren = $(this).next('ul');
	var oEm = $(this).find('em');


	if(oChildren.attr('status') == 'down') {

		oChildren.slideUp(300);
		oChildren.attr('status', 'up');
		oEm.removeClass('fa-angle-down');

	} else {
		
		oChildren.slideDown(300);
		oChildren.attr('status', 'down');
		oEm.addClass('fa-angle-down');
	}	

});

var aA = $(oLeftNav).find('a');

$(oLeftNav).on('click', 'a', function(){

	//console.log($(this).parents('ul'));

	aA.removeClass('active');
	$(this).addClass('active');
	localStorage._haha_select_name = $(this).text();

});


if(localStorage._haha_select_name) {

	highLight(localStorage._haha_select_name);

}

function highLight(name) {

	var nowTest,
		aUl,
		num,
		nowA,
		sHref;

	aA.each(function(i){

		nowA = aA.eq(i);
		nowTest = nowA.text();

		if(nowTest == name) {
			
			aA.removeClass('active');
			nowA.addClass('active');
			aUl = nowA.parents('ul');
			aUl.prev().find('em').addClass('fa-angle-down');
			aUl.show();
			aUl.attr('status', 'down');
			sHref = nowA.attr('href');
			loadFrame(oFrame, sHref);

		}

	});

}


$('[search]').focus(function(){

	$(this).addClass('active');

});

$('[search]').blur(function(){

	$(this).removeClass('active');

});

console.log(arrFile);

var oAuto = new AutoComplete($('[search]')[0], arrFile);

oAuto.afterClick = function(sValue) {

	highLight(sValue);
	localStorage._haha_select_name = sValue;

};