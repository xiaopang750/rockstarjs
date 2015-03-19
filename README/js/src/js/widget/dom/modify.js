/*
 *description:文字修改
 *author:fanwei
 *date:2013/11/01
 */

/*
	调用方法
	$(ele).modify();
*/

 define(function(require, exports, module){
 	
 	var selectText = require('./selectText');
 	var until = require('../../lib/until/until');
 	var oUntil = new until();
 	var oTip = require('../../widget/dom/tip');

 	$.fn.modify = function(opts) {

 		opts = opts || {};
 		opts.inputName = opts.inputName || '';
 		opts.onblur = opts.onblur || null;

 		var oModify;

 		return $(this).each(function(){

 			oModify = new Modify( $(this), opts );

 			oModify.init();

 		});

 	};

 	function Modify(ele, opts) {

 		this.ele = ele;
 		this.org = this.ele.html();
 		this.name = opts.inputName;
 		this.onblur = opts.onblur;
 	}

 	Modify.prototype = {

 		init: function() {

 			this.initWidget();

 			this.makeInput();

 			this.events();

 		},
 		events: function() {

 			var _this = this;

 			this.oWrap.on('click', '[data-ele = ui-modify-btn]', function(){

 				var str;

 				str = $(this).html();

 				if(str == '修改') {
 					_this.editShow($(this));
 				} else if(str == '保存') {
 					_this.save($(this));
 				}

 				return false;

 			});

 		},
 		initWidget: function() {

 			this.oWrap = this.ele.parent();

 			this.oWrap.css('position','relative');

 		},
 		save: function(oThis) {
 			
 			var _this,
 				str,
 				page,
 				site,
 				name,
 				data,
 				param;

 			page = oThis.attr('page');
 			site = oThis.attr('site');
 			name = oThis.parents('[data-ele = list-wrap]').find('[data-name = modify]').val() + '.html';

 			data = {};
 			param = {};
 			data.pageUrl = name;
 			str = this.oInput.val();
 			_this = this;

 			param = {
 				pkPage: page,
 				pkSite: site,
 				type: 'pageBasicInfo',
 				content:  JSON.stringify(data)
 			};

 			oUntil.reqUrl = R.interfaces.modify_site_url;
 			oUntil.reqParam = param;
 			oUntil.req(function(data){

 				_this.eidtHide( str );
 				oThis.html('修改');
 				oTip.say(data.msg);
 				
 			}, function(data){

 				_this.eidtHide( );
 				oThis.html('修改');
 				oTip.say(data.msg);

 			});

 		},
 		makeInput: function() {

 			this.oInput = $('<input data-name='+ this.name +' modify-ele="modify-nodo">');

 			this.oInput.hide();

 			this.oWrap.append( this.oInput );

 			this.text = this.ele.html();

 			this.oInput.val( this.text );
 		},
 		position: function() {

 			var l,
 				t,
 				w,
 				h;

 			l = this.ele.position().left;
 			t = this.ele.position().top;
 			w = this.ele.innerWidth(true);
 			h = this.ele.innerHeight(true);	

 			this.oInput.css({
 				position:'absolute',
 				left:l,
 				top:t,
 				width:w,
 				height:h,
 				border:'1px solid #ccc',
 				fontSize: '12px',
 				display:'block'
 			});

 		},
 		_judgeShow: function() {

 			var isShow;

 			isShow = this.oInput.is(':visible');

 			if( isShow ) {

 				this.oInput.hide();

 			} else {

 				this.oInput.show();

 			}

 		},
 		editShow: function(oThis) {

 			var num = this.oInput.val().length;

 			oThis.html('保存');
 			this.position();
 			this.oInput.show();
 			selectText(this.oInput, num, num);

 		},
 		eidtHide: function( str ) {

 			if( !str ) {

 				this.ele.html( this.org );
 				this.oInput.val( this.org );

 			} else {

 				this.ele.html( str );

 			}

 			this.oInput.hide();
 			

 		}

 	}
 
 });

