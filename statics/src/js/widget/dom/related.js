/*
 *description:联动菜单
 *author:fanwei
 *date:2013/11/03
 */

/*
	联动菜单
	MainUrl: 主select 请求地址;
	SubUrl: 复select 请求地址;
	tplMain: 主select模板; (模板写法请参考artTemplate simple写法)
	tplSub: 复select模板;
	firstLoad: 第一次是否加载主菜单选项;
	paramName: 传给后台的参数名称;
*/

define(function(require, exports, module){
	
	var template = require('../../lib/template/template');
	var request = require('../../widget/http/request');

	function Related(options){

		this.oMain = options.oMain || null;
		this.oSub = options.oSub || null;
		this.MainUrl = options.MainUrl || '';
		this.SubUrl = options.SubUrl || '';
		this.tplMain = options.tplMain || '';
		this.tplSub = options.tplSub || '';
		this.firstLoad = options.firstLoad ? true : false;
		this.paramName = options.paramName || 'district_pcode';

	}

	Related.prototype = {

		init: function(){

			this.events();

		},
		events: function() {

			var _this = this;

			if ( _this.firstLoad ) {

				this.load(this.MainUrl, '', function(data){
					_this.renderSelect(_this.oMain, data.data.province, _this.tplMain);

					_this.renderSelect(_this.oSub, data.data.city, _this.tplSub);

				});

			}

			this.oMain.on('change', function(e){

				_this.changeDo( $(this) );

			});

		},
		changeDo: function( oThis ) {

			var num = oThis.get(0).selectedIndex;

			var code = oThis.children().eq(num).attr('id');

			var _this = this;

			var dataList = {};
			dataList[this.paramName] = code;

			this.load(this.SubUrl, dataList, function(data){
				
				_this.renderSelect(_this.oSub, data.data, _this.tplSub);

			});

		},
		load: function(url, param, cb){

			request({
				url: url,
				data: param,
				sucDo: function( data ){

					cb && cb( data );

				}
			})

		},	
		renderSelect: function( oSelect, data, tpl ) {

			if (!data){

				return;
			}

			var i,
				num
			
			num = data.length;	

			var render = template.compile(tpl);

			var html = render(data);

			oSelect.html(html);

		}

	}

	module.exports = Related;

});