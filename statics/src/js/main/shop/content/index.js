/**
 *description:内容管理列表
 *author:fanwei
 *date:2015/1/31
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Dialog = require("../../../widget/dom/dialog");
	var oTip = require("../../../widget/dom/tip");
	var fenye = require('../../../widget/dom/fenye');
	var oTplList = require('../../../tpl/shop/content/contentList');

	var ContentList = R.Class.create(R.util, {

		initialize: function() {

			this.defaultParam = {
				pagesize: 10
			};

			this.oWrap = $('[list-wrap]');
			this.showPage();
			this.initRemoveBox();
			this.events();

		},
		showPage: function() {

			this.oPage = new fenye(R.interfaces.content.list, oTplList, this.defaultParam);

		},
		initRemoveBox: function() {

			this.oRemovBox = new Dialog({
				content: '确认取消发布么?'
			});
		},
		events: function() {
				
			var _this = this;
				
			this.oWrap.on('click', '[remove]', function(){

				/*
					001: 发布
					002: 未发布
				*/
				var status,
					tip;

				_this.oRemoveBtn = $(this);
				_this.oEdit = _this.oRemoveBtn.parents('[data-list]').find('[edit]');
				status = _this.oRemoveBtn.attr('isCanceled');
				_this.removeDestStatus = status == '001' ? '002' : '001';
				_this.destshow = status == '001' ? 'inline-block' : 'none';
				_this.removeDestStr = _this.removeDestStatus == '001' ? '取消发布' : '发布';	
				_this.removeTipStr = _this.removeDestStatus == '001' ? '发布' : '取消发布';
				_this.removeId = $(this).attr('cid');
				tip = '确认' + _this.removeTipStr + '么?';

				_this.oRemovBox.boxContent().html(tip);
				_this.oRemovBox.show();

			});

			this.oRemovBox.onConfirm = function() {

				_this.reqUrl = R.interfaces.content.cancel;
				_this.reqParam = {
					pkContent: _this.removeId,
					status: _this.removeDestStatus
				};
				_this.req(function(data){

					oTip.say(data.msg);
					_this.oRemovBox.close();
					_this.oRemoveBtn.html(_this.removeDestStr);
					_this.oRemoveBtn.attr('isCanceled', _this.removeDestStatus);
					_this.oEdit[0].style.display = _this.destshow;


				}, function(data){
					oTip.say(data.msg);
				});

			};
		}

	});

	var oContentList = new ContentList();

});
