/**
 *description:load-select
 *author:fanwei
 *date:2014/09/19
 */

/*
	var oSelect = new select({
		ele: '', select 容器
		url: '', 请求接口
		param: '', 请求参数
		tpl: '' option模板,
		changeData: 更换数据,
		onChange: function() {
	
		},
		onReady: function() {
			
		}
	});
*/

define(function(require, exports, module){

	var template = require('../../lib/template/template');
	
	var select = R.Class.create(R.until, {

		initialize: function(opts) {

			opts = opts || {};
			this.oSelect = opts.ele || '';
			this.loadUrl = opts.url || '';
			this.param = opts.param || '';
			this.renderData = opts.renderData || '';
			this.tpl = opts.tpl || '';
			this.changeData = opts.changeData || null;
			this.onChange = opts.onChange || null;
			this.onReady = opts.onReady || null;
			this._req();
			this.events();
			this.orgHTML = this.oSelect.html();

		},
		_req: function() {

			var _this = this;
			var nowOption,
				nowIndex,
				oSelect;

			oSelect = this.oSelect[0];

			if(!this.loadUrl) {

				data = this.renderData;
				this.render(data);

				nowIndex = oSelect.selectedIndex;
				nowOption = $( oSelect.options[ nowIndex ] );
				this.onReady && this.onReady(this.oSelect, nowOption, nowIndex);

			} else {

				this.reqUrl = this.loadUrl;
				this.reqParam = this.param;
				this.req(function(data){

					data = _this.changeData ? _this.changeData(data) : data;
					_this.render(data);

					nowIndex = oSelect.selectedIndex;
					nowOption = $( oSelect.options[ nowIndex ] );
					_this.onReady && _this.onReady(_this.oSelect, nowOption, nowIndex);

				});

			}

		},
		events: function() {

			var nowOption,
				nowIndex,
				oSelect,
				_this;

			_this = this;

			this.oSelect.on('change', function(e){
				
				oSelect = $(this)[0];

				nowIndex = oSelect.selectedIndex;

				nowOption = $( oSelect.options[ nowIndex ] );

				_this.onChange && _this.onChange($(this), nowOption, nowIndex);

			});

		},
		render: function(data) {
			
			var render = template.compile(this.tpl);
			
			var html = render(data);

			this.oSelect.append( $(html) );

		},
		clear: function() {

			this.oSelect.html( this.orgHTML );

		}

	});

	module.exports = select;
	
});