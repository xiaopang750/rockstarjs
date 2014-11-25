/*
 *description:自定义滚动条
 *author:fanwei
 *date:2013/11/01
 */

/*
	调用方法:
	$(ele).roll(100);

	100代表可视区域的高度;
*/

define(function(require, exports, module){
	
	require('../../lib/event/scroll');

	$.fn.roll = function(height) {

		height = height || 60;

		var oRoll;

		return $(this).each(function(){

			oRoll = new _Roll( $(this),height );

			oRoll.init();

		});

	}

	function _Roll(ele, h) {

		this.ele = ele;
		this.h = h;
		this.nowTop = 0;

	}

	_Roll.prototype = {

		init: function() {

			this.getHeight();

			if( this.max > this.h ) {

				this.start();

			} 
				
		},
		start: function() {

			this.initWrap();

			this.makeWrap();

			this.events();

		},
		events: function() {

			var _this = this;
			_this = this;

			this.ele.scroll(function(isDown){

				if( isDown ) {

					_this.nowTop += 10;

				} else {

					_this.nowTop -= 10;

				}

				_this.move();

			});

		},
		initWrap: function() {

			var w,
				l,
				t,
				aChildren;

			w = this.ele.innerWidth(true);
			l = this.ele.css('left');
			t = this.ele.css('top');

			aChildren = this.ele.children();
			this.oContentWrap = $('<div sc="ui-roll-wrap"></div>');
			this.ele.append( this.oContentWrap );
			this.oContentWrap.append( aChildren );
			

			this.oContentWrap.css({
				top:0,
				left:0,
				width:this.ele.outerWidth(true),
				position:'absolute'
			});

			this.ele.css({
				height:this.h,
				overflow:'hidden'
			});
		},
		makeWrap: function(){

			this.oRollWrap = $('<div></div>');
			this.oMove = $('<div></div>');

			this.oMove.css({
				position:'absolute',
				left:0,
				top:0,
				height:'10px',
				width:'10px',
				background:'green',
				overflow:'hidden'
			});

			this.oRollWrap.css({
				position:'absolute',
				right:0,
				top:0,
				height:this.max,
				width:'10px',
				background:'#ccc',
				overflow:'hidden'
			});

			this.oRollWrap.append( this.oMove );

			this.ele.append( this.oRollWrap );

		},
		getHeight: function() {

			this.max = this.ele.height() + parseInt( this.ele.css('padding-top') )  + parseInt( this.ele.css('padding-bottom') );

		},
		move: function() {

			var rollDis,
				scale,
				moveDis;

			rollDis = this.h - 10;

			if( this.nowTop < 0  ) this.nowTop = 0;

			if( this.nowTop > rollDis ) this.nowTop = rollDis;

			scale = this.nowTop/rollDis;
			moveDis = -scale * ( this.max - this.h );

			this.oMove.css('top', this.nowTop);

			this.oContentWrap.css('top',  moveDis);

		}

	}

});