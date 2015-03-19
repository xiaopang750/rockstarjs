/*
 *description:文字修改
 *author:fanwei
 *date:2013/11/01
 */


define(function(require, exports, module){
	
	var Modify = R.Class.create(R.until, {

		initialize: function(opts) {
			
			this.index = opts.index || 100;
			this.oWrap = opts.oWrap || null;
			this.target = opts.target || '';
			this.noHideEle = opts.noHideEle || 'no-hide';
			this.triggerBtn = opts.triggerBtn || '[trigger-btn]';
			this.onTrigger = opts.onTrigger || null;
			this.onShow = opts.onShow || null;
			this.onHide = opts.onHide || null;

			this.padding = 3;

			this.createModifyInput();
			this.events();
			
		},
		createModifyInput: function() {

			this.oHolderInput = $('<input type="text" no-hide>');
			this.oHolderInput.css({
				display: 'none',
				position: 'absolute',
				zIndex: this.index,
				border: '1px solid #ccc',
				padding: this.padding
			});

			$('body').append( this.oHolderInput );

		},
		showInput: function(oThis) {

			var l,
				t,
				w,
				h,
				str;

			w = oThis.width();
			h = oThis.height();
			l = oThis.offset().left;
			t = oThis.offset().top;
			str = oThis.html();

			this.oHolderInput.val(str);

			this.oHolderInput.css({
				width: w,
				height: h,
				lineHeight: h,
				left: l,
				top: t - this.padding,
				display: 'block'
			});

			this.oHolderInput.trigger('focus');

		},
		events: function() {

			var _this = this;

			this.oWrap.on('click', this.target, function(){

				var reuslt = _this.onShow && _this.onShow();

				if(reuslt == false) {
					return;
				}

				_this.showInput($(this));

				_this.oNowTarget = $(this);

				return false;

			});

			this.oWrap.on('click', this.triggerBtn, function(){
				
				_this.onTrigger && _this.onTrigger($(this));

				return false;

			});

			$(document).on('click', function(e){

				var oTarget = $(e.target);

				var isShow = _this.oHolderInput.is(':visible');
				var isNoHide = oTarget.attr('no-hide') != 'undefined';

				if(isShow && !isNoHide) {
					_this.inputHide();
				}

			});

		},
		inputHide: function() {

			var isModify = this.oHolderInput.val() == this.oNowTarget.html() ? false : true;

			this.onHide && this.onHide( this.oNowTarget, isModify, this.oHolderInput.val() );
			//this.oHolderInput.hide();

		},
		hide: function() {
			this.oHolderInput.hide();
		}

	});

	module.exports = Modify;

	
});
