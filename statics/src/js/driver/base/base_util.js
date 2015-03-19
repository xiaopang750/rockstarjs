/**
 *description:base-util
 *author:fanwei
 *date:2013/11/01
 */

/**
	util模块提供
	1.解析search参数;
	  this.parse();

	2.ajaxload;
	  this.reqUrl = '地址';
	  this.reqParam = {} 参数;
	  this.req(suc, fail, error); 发送请求;

	3.模板渲染;
	  this.render(oWrap, oTpl, data, way);
	  oWrap: 容器
	  oTpl: require cmd格式的对象


	4.日志打印;
	  this.log('xxxx');

*/
define(function(require, exports, module) {

	var Class = require('../../lib/ooClass/class');
	var bodyParse = require('../../util/http/bodyParse');
	var request = require('../../util/http/request');

	var Util = Class.create({

		initialize: function() {

			this.reqParam = {};
			this.reqUrl = '';
			this.reqAsync = true;
			
		},
		parse: function() {

			//解析search参数
			return bodyParse();

		},
		render: function(oWrap, oTpl, data, way) {
			
			//模板渲染
			var html = oTpl(data);

			if(!way) {

				oWrap.html( html );

			} else if(way == 'prepend') {

				var oNew = $(html);
				oWrap.prepend(oNew);
				return oNew;

			} else if(way == 'append') {

				var oNew = $(html);
				oWrap.append(oNew);
				return oNew;

			} else if(way == 'after') {

				var oNew = $(html);
				oWrap.after(oNew);
				return oNew;

			} else if(way == 'before') {

				var oNew = $(html);
				oWrap.before(oNew);
				return oNew;

			}  

		},
		req: function(fnSuc, fnFail, fnError) {
			
			var data = request({

				url: this.reqUrl,

				data: this.reqParam,

				async: this.reqAsync,

				sucDo: function(data, code) {
					
					fnSuc && fnSuc(data, code);
				},
				noDataDo: function(data, code) {

					fnFail && fnFail(data, code);
				},
				failDo: function(status){
					
					fnError && fnError(status);
				}

			});

			return data;

		},
		log: function(str) {

			//打印调试日志
			if(window.console) {

				console.log(str);

			}

		}	

	});
	
	module.exports = Util;

});