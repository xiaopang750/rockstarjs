/**
 *description:常用工具模块
 *author:fanwei
 *date:2013/11/01
 */

/**
	until模块提供
	1.解析search参数;
	  this.parse();

	2.ajaxload;
	  this.requestUri = '地址';
	  this.param = {}参数;
	  this.load();发送请求;
	  this.suc = function() {}成功回调;约定err:0是成功;
	  this.fail = function() {}失败回调;约定err:1是失败;

	3.模板渲染;
	  this.tempWrap = ele;
	  this.tempId = 'xxx'
	  this.data = data;
	  this.render();

	4.继承;
	  var oIndex = until.extend(构造函数,{});
	  第一个参数为function(){};
	  第二个参数为json;

	5.日志打印;
	  this.log('xxxx');

	bug:
	1.同时执行this.suc 异步回调suc事件会被覆盖;  
	2.继承的构造函数不能传参;
*/

define(function(require, exports, module) {

	var Class = require('./class');
	var bodyParse = require('../http/bodyParse');
	var request = require('../http/request');

	var Until = Class.create({

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

	module.exports = Until;

});