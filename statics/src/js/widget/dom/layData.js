/**
 *description:下拉层组件
 *author:fanwei
 *date:2015/2/3
 */
define(function(require, exports, module) {
	
	var global = require("../../driver/global");
	var template = require("../../lib/template/artTemplate");

	var LayData = R.Class.create(R.util, {

		initialize: function(opts) {
			
			this.width = opts.width || '';
			this.height = opts.height || '';
			this.ele = opts.ele || null;
			this.index = opts.index || 4000;
			this.data = opts.data || '';
			this.sTpl = opts.sTpl || '';
			this.onClick = opts.onClick || null;
			this.multi = opts.multi || null;
			this.onReady = opts.onReady || null;
			this.triggerEvent = opts.triggerEvent || 'click';
            this.minHeight = opts.minHeight || 60;
            this.maxHeight = opts.maxHeight || 300;

			this.createLay();
			this.render(this.data);
			this.setLay();
			this.events();

		},
		createLay: function() {

			this.oLayStr = 
			'<div layInfo="data">'+
				'<div layInfo-data></div>'+
				'<span class="fa fa-close ba-font-18" lay-close trigger-close></span>'
			'</div>';

			this.oLay = $(this.oLayStr);

			$('body').append(this.oLay);
			this.oLayData = this.oLay.find('[layInfo-data]');
			this.oLayClose = this.oLay.find('[lay-close]');
		},
		setLay: function() {

			this.oLay.css({
				width: this.width,
				padding: '10px',
				background: '#fff',
				border: '1px solid #ccc',
				boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
				borderRadius: '5px',
				wordBreak: 'break-all',
				position: 'fixed',
				zIndex: this.index,
				display: 'none',
				minHeight: this.minHeight,
                maxHeight: this.maxHeight,
                overflow: 'auto'
			});

			this.oLayClose.css({
				position: 'absolute',
				right: '5px',
				top: '5px',
				cursor: 'pointer'
			});

			this.onReady && this.onReady();

		},
		render: function(data) {

			var render = template.compile(this.sTpl);
			var html = render(data);
			this.oLayData.html(html);

		},
		events: function() {
			
			var _this = this;

			$(document).on('click', this.ele, function(e){

				var isDisabled = $(this).attr('infoDisabled');
				if(isDisabled == 'infoDisabled') {
					return;
				}
				_this.oEle = $(this);
				var isVisible = _this.judgeShow();
				var left = _this.oEle .offset().left;
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var top = _this.oEle .offset().top + _this.oEle.outerHeight(true) - scrollTop;

				if(!isVisible) {
					_this.layShow(left, top);
				}

				return false;

			});

			$(document).on('click', function(e){

				var isVisible = _this.judgeShow();

				if($(e.target).attr('type')=='checkbox') return;

				if(isVisible) {
					_this.layHide();
				}

			});

			this.oLay.on('click', '[trigger-close]', function(){

				_this.layHide();

			});

			this.oLay.on('click', function(e){

				e.stopPropagation();
			});

			this.oLay.on('click', '[lay-list]', function(){

				var result = _this.onClick && _this.onClick(_this.oEle, $(this));

				if(result !== false) {
					_this.layHide();
				}

				setTimeout(function(){
					_this.oEle.trigger('focus');
				},50);

			});

            $(window).on('resize', function(){

                _this.layHide();

            });

		},
		judgeShow: function() {

			return this.oLay.is(':visible');

		},
		layShow: function(l, t) {

			if(l && t) {
				this.oLay.css({
					left: l,
					top: t
				});
			}

			this.oLay.show();

		},
		layHide: function() {

			this.oLay.hide();
		}

	});

	module.exports = LayData;

});
