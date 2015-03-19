/*
 *description:对话框
 *author:fanwei
 *date:2014/04/09
 */

/*
	boxStr: 生成dialog的自定义dom字符串;
	onClosed: 关闭时的回调方法;
	onStart:打开时的回调方法;
	onConfirm: 确定时的回调方法;
	boxSelector: 自定义选择弹框,如果传入了boxSelector则调用选择器弹框;
*/

define(function(require, exports, module){
		
	function Dialog(opts) {

		opts = opts || {};
		this.type = opts.type || 'confirm'
		this.title = opts.title || '';
		this.content = opts.content || '';
		this.enterKey = opts.enterKey ? opts.enterKey : false;
		this.escKey = opts.escKey ? opts.escKey : false;
		this.index = opts.index || 4000;
		this.box = null;

		this.boxStr = opts.boxStr || '<div class=\"confirmbox '+ this.type +'\" sc="confirm-box" sc="box">'+
			'<h2 class="tc font-18 red mt-20" sc="box-title">'+ this.title +'</h2>'+
			'<p class="font-20 tc mt-30 mb-40" sc="box-content">'+ this.content +'</p>'+
			'<div class="tc">'+
				'<a href="javascript:;" class="btn btn-primary mr-15" sc="confirm">确定</a>'+
				'<a href="javascript:;" class="btn btn-danger" sc="close">取消</a>'+
			'</div>'+
		'</div>';

		this.boxSelector = opts.boxSelector || '';
		this.boxTpl = opts.boxTpl || '';
		this.boxData = opts.boxData || {};
		this.onClosed = opts.onClosed || null;
		this.onStart = opts.onStart || null;
		this.onConfirm = opts.onConfirm || null;
		this.overLayHide = opts.overLayHide || null;

		this.init();
		
	}

	Dialog.prototype = {

		init: function() {

			this.render();

			this.events();

			this.makeLay();

			//this.makeRound();

		},
		render: function() {

			var info = this.create();

			var marginTop,
				marginLeft;

			marginTop = (-info.h/2) + 'px';
			marginLeft = (-info.w/2) + 'px';

			this.position(info.box, '50%', '50%', marginTop+ ' 0 0 '+marginLeft);

			this.box = info.box;

		},
		makeRound: function() {
			
			var html = 
			'<div class="clearfix level-t">'+
				'<div class="lt fl"></div>'+
				'<div class="t fl"></div>'+
				'<div class="rt fl"></div>'+
			'</div>'+
			'<div class="clearfix level-m">'+
				'<div class="l fl"></div>'+
				'<div class="main fl"></div>'+
				'<div class="r fl"></div>'+
			'</div>'+
			'<div class="clearfix level-b">'+
				'<div class="lb fl"></div>'+
				'<div class="b fl"></div>'+
				'<div class="rb fl"></div>'+
			'</div>';

			this.boxSelector.append( $(html) );

		},
		makeLay: function(){

			var hasLay = $('[sc = Dialog-lay]').length;

			if ( hasLay ) {

				this.oLay = $('[sc = Dialog-lay]');

				return;
			}

			this.oLay = $('<div sc="Dialog-lay"></div>');

			this.oLay.css({
				width:'100%',
				height:'100%',
				position:'fixed',
				left:0,
				top:0,
				zIndex:3000,
				background:'#000',
				opacity:'0.3',
				display: 'none'
			});

			$('body').append(this.oLay);

		},
		set: function(left, top) {

			this.oLay.css({
				left: left,
				top: top
			});

		},
		create: function() {

			var oBox,
				w,
				h;

			if ( this.boxSelector ) {

				//已存在
				oBox = $( this.boxSelector );

			} else if( this.boxTpl ){

				//tmodjs-template
				oBox = $( this.boxTpl( this.boxData ) );

				$('body').append(oBox);	

			} else {

				//str
				oBox = $(this.boxStr);

				$('body').append(oBox);	

			}

			w = oBox.outerWidth(true);

			h = oBox.outerHeight(true);

			this.oBox = oBox;

			return {box:oBox, w:w, h:h};
		},
		events: function() {

			var that = this;

			this.box.on('click', '[sc = close]', function(){

				that.close(that.box);

			});

			this.box.on('click', '[sc = confirm]', function(){
				
				that.onConfirm && that.onConfirm.call(that, $(this));

			});

			$(document).on('click', function(e){

				//console.log(that.oBox);

				if(that.overLayHide) {

					if( $(e.target).parents()[0] != that.oBox[0]  && $(e.target)[0] != that.oBox[0] ) {
						
						that.close();

					}	

				}

			});

		},
		position: function(obj,left,top,margin) {

			obj.css({
				position:'fixed',
				left:left,
				top:top,
				margin:margin,
				zIndex:this.index,
				display:'none'
			});

		},
		show: function() {

			this.box.show();

			this.oLay.show();

			this.onStart && this.onStart.call(this);

		},
		close: function(isCb) {

			this.box.hide();

			this.oLay.hide();

			if(isCb !== false) {
				this.onClosed && this.onClosed.call(this);	
			}
		},
		fix: function(){

			this.box.css('position', 'fixed');

		},
		dom: function() {

			return this.oBox;

		},
		boxTitle: function() {

			return this.oBox.find('[sc = box-title]');

		},
		boxContent: function(){

			return this.oBox.find('[sc = box-content]');

		}

	};

	module.exports = Dialog;

});