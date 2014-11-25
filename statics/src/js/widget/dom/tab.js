/*
 *description:tab
 *author:fanwei
 *date:2014/06/01
 */

/*
	选项卡模块:
	oWrap:选项卡容器;
	headClass:选中当前class;
	contentClass:选中当前容器content的class;
*/

define(function(require, exports, module){
	
	function Tab(opts) {

		opts = opts || {};
		this.oWrap = opts.oWrap || null;
		this.headClass = opts.headClass || 'active';
		this.contentClass = opts.contentClass || 'active';
		this.tabHeadName = opts.tabHeadName || '[widget-role = tab-head]';
		this.tabContentName = opts.tabContentName || '[widget-role = tab-content]';
		this.eventName = opts.eventName || 'click';
		this.onclick = opts.onclick || null;
	}

	Tab.prototype = {

		init: function() {

			this.widgetInit();

			this.events();

		},
		widgetInit: function() {
			
			this.aHead = this.oWrap.find( this.tabHeadName );
			this.aContent = this.oWrap.find( this.tabContentName );
			this.tab(0);

		},
		events: function() {

			var _this,
				oTarget,
				sRole,
				index;

			_this = this;	

			this.oWrap.on(this.eventName, this.tabHeadName, function(e){

				index = $(this).index();
				
				_this.tab( index );

				_this.onclick && _this.onclick($(this), e.target, index);

			});

		},
		tab: function(iNow) {

			this.aHead = this.oWrap.find(this.tabHeadName);
			this.aContent = this.oWrap.find(this.tabContentName);

			this.aHead.removeClass( this.headClass );
			this.aHead.eq(iNow).addClass( this.headClass );
			
			this.aContent.hide();
			this.aContent.eq(iNow).show();

		}

	};

	module.exports = Tab;

});