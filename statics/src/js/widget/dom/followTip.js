/*
 *description:跟随提示框
 *author:fanwei
 *date:2014/09/19
 */

define(function(require, exports, module){

	var FollowTip = R.Class.create(R.until, {
		
		initialize: function(opts){

			opts = opts || {};
			this.oWrap = opts.oWrap || null;
			this.ele = opts.ele || '[f-tip]';
			this.index = opts.index || 5000;
			this.onOver = opts.onOver || null;
			this.onOut = opts.onOut || null;
			this.onMove = opts.onMove || null;
			this.createTip();
			this.events();

		},
		events: function() {

			var _this = this;
			var l,
				t;

			this.oWrap.on('mouseenter', this.ele, function(e){
				
				var result = _this.onOver && _this.onOver($(this));

				if(result == false) {
					return;
				}

				_this.show();

			});	


			this.oWrap.on('mouseleave', this.ele, function(e){
				
				_this.onOut && _this.onOut($(this));
				_this.hide();

			});

			this.oWrap.on('mousemove', this.ele, function(e){

				l = e.pageX + 15;

				if(l + _this.oTip.width() > document.documentElement.clientWidth) {

					l = e.pageX - _this.oTip.width() - 50;

				}

				t = e.pageY;
				_this.position(l ,t);
				_this.onMove && _this.onMove($(this), _this.oTip, l, t);

			});

		},
		write: function(str) {

			this.oContent.html(str);

		},
		show: function(str) {

			this.oTip.show();

		},
		hide: function() {

			this.oTip.hide();

		},
		position: function(l, t) {

			this.oTip.css({
				left: l,
				top: t
			});

		},
		createTip: function() {

			var html = 
			'<div>'+
				'<div class="shadow"></div>'+
				'<div class="content"></div>'+
			'</div>';

			this.oTip = $(html);
			this.oShadow = this.oTip.children().eq(0);
			this.oContent = this.oTip.children().eq(1);
			this.setTip();
			$('body').append(this.oTip);
		},
		setTip: function() {

			this.oTip.css({
				display: 'none',
				position: 'absolute',
				/*background: 'rgba(0, 0, 0, 0.5)',*/
				width: '200px',
				padding: '20px',
				borderRadius: '5px',
				color: '#fff',
				zIndex: this.index,
				wordBreak: 'break-all'
			});

			this.oShadow.css({
				position: 'absolute',
				left: 0,
				top: 0,
				background: '#000',
				opacity: 0.5,
				zIndex: 3,
				width:'100%',
				height: '100%',
				borderRadius: '5px'
			});

			this.oContent.css({
				position: 'relative',
				left: 0,
				top: 0,
				zIndex: 5
			});

		}

	});

	module.exports = FollowTip;
})