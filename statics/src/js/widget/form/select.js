/**
 *description:自定义select
 *author:fanwei
 *date:2013/11/01
 */

/*
	调用方法: $(ele).select(options);	
*/

 define(function(require, exports, module){

 	var template = require('../../lib/template/template');
 	require('../../../css/widget/form/select.css');
 	require('../dom/roll');

 	$.fn.select = function(options) {

 		options = options || {};
 		options.w = options.width || '100px';
 		options.h = options.height || '30px';
 		options.onselect = options.onselect || null;
 		options.selectClass = options.selectClass || 'ui-select';

 		var num,
 			oSelect,
 			arrSelect;

 		num = $(this).length;
 		arrSelect = [];	

 		$(this).each(function(i){

 			oSelect = new Select($(this), options, num - i);
 			oSelect.init();
 			arrSelect.push(oSelect);

 		});

 		return arrSelect;
 	}

 	function Select(ele, options, index) {

 		this.ele = ele;
 		this.index = index;
 		this.options = options;
 		this.first = true;

 	}

 	Select.prototype = {

 		init: function() {

 			var nowIndex;

 			this.initSelect();

 			this.makeWrap();

 			this.getList();

 			this.events();
 		},
 		render: function(sTpl, data) {

 			var render = template.compile(sTpl);
 			var html = render(data);
 			this.ele.html( html );

 		},
 		events: function() {

 			var _this,
 				index;

 			_this = this;

 			this.oHead.on('click', function(){

 				_this.judgeShow();

 				return false;

 			});


 			this.oUl.on('click','[sc = ui-select-list]', function(){

 				index = $(this).index();
 				
 				_this.selectList( index );

 				_this.options.onselect && _this.options.onselect( _this.ele.children().eq(index) );

 			});

 			$(document).on('click', function(){
 					
 				_this.judgeShow('doc');

 			});

 		},
 		initSelect: function() {

 			this.ele.css('visibility', 'hidden');

 		},
 		makeWrap: function() {

 			var w,
 				h;

 			this.oWrap = $('<div sc="ui-select-wrap" class="ui-select-wrap"></div>');
 			this.oHead = $('<div sc="ui-select-head" class="ui-select-head"></div>')
	 		this.oUl = $('<ul sc="ui-select-content" class="ui-select-content"></ul>');
	 		this.oHeadContent = $('<div sc="ui-head-content" class="ui-head-content"></div>');
	 		this.oTrangle = $('<div sc="ui-head-trangle" class="ui-head-trangle"><span class="trangle"></span></div>');

	 		w = this.options.w;
 			h = this.options.h;

	 		this.oWrap.addClass(this.options.selectClass);

	 		this.oWrap.css({
	 			width: w,
	 			height: h,
	 			position: 'relative',
	 			zIndex: this.index
	 		});

	 		this.oHead.css({
	 			width: '100%',
	 			height: h
	 		});

	 		this.oUl.css({
	 			position:'absolute',
	 			width: '100%',
	 			left: 0,
	 			top: h,
	 			display: 'none',
	 			overflow: 'hidden'
	 		});

	 		this.ele.wrap( this.oWrap );

	 		this.ele.after( this.oUl );

	 		this.ele.before( this.oHead );

	 		this.oHead.append( this.oHeadContent );

	 		this.oHead.append( this.oTrangle );

 		},
 		getList: function() {

 			var aChildren = this.ele.children();
	 		var i,
	 			num,
	 			arr,
	 			newLi,
	 			html,
	 			isSelected,
	 			isHasSelected,
	 			firstText;

	 		num = aChildren.length;
	 		this.arrList = [];
	 		isHasSelected = false;

	 		this.oUl.html('');

	 		for ( i=0;i<num;i++ ) {

	 			html = aChildren.eq(i).attr('ui-html');
	 			var newLi = $('<li sc="ui-select-list">'+ html +'</li>');
	 			isSelected = aChildren.eq(i).attr('selected') == 'selected' ? true : false;
	 			if(isSelected) {

	 				this.oHeadContent.html( html );
	 				isHasSelected = true;
	 				
	 			}
	 			newLi.css('width', '100%');
	 			this.arrList.push( newLi );
	 			this.oUl.append( newLi );
	 		}

	 		if(!isHasSelected) {

	 			firstText = aChildren.eq(0).attr('ui-html');

	 			this.oHeadContent.html( firstText );
	 		}

	 		this.oUl.roll(100);	
 		},
 		judgeShow: function(type) {

 			var isShow;

			isShow = this.oUl.attr('visible');

			if( !type ) {

				if( isShow ) {

					this.listHide();

				} else {

					this.listShow();

				}	

			} else {

				if( isShow ) {

					this.listHide();

				}

			}

 		},
 		listShow: function() {

 			this.oUl.show();
 			this.oUl.attr('visible', 'yes');

 		},
 		listHide: function() {

 			this.oUl.hide();
 			this.oUl.attr('visible', '');

 		},
 		selectList: function(index) {

 			var nowOption,
 				nowList,
 				nowStr,
 				firstLead;

 			nowOption = this.ele.children().eq(index);
 			nowOption.attr('selected', 'selected');
 			nowList = this.arrList[ index ];
 			nowStr = nowList.html();
 			this.oHeadContent.html( nowStr );

 			/*if( this.first ) {
 				
 				this.first = false;
 				firstLead = nowOption.attr('lead-text');

 				if( firstLead ) {

 					this.oHeadContent.html( firstLead );
 				}

 			} else {

 				

 			}*/

 		}

 	}

 
 });