/**
 *description:客服管理
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var oTplMsg = require('../../../tpl/shop/customService/msg');
	var getNowTime = require('../../../util/time/getNowTime');
	var oTip = require('../../../widget/dom/tip');

	var Service = R.Class.create(R.util, {

		initialize: function() {
			
			this.oHistory = $('[history-wrap]');
			this.oHistoryView = $('[history-view]');
			this.oArea = $('[send-area]');
			this.oSendBtn = $('[send-btn]');
			this.oMsgList = $('[msg-all-wrap]');
			this.oHistoryBtn = $('[history-btn]');

			this.events();

		},
		events: function() {
			
			var _this = this;

			this.oSendBtn.click(function(){
				_this.sendMsg();
			});

			this.oHistoryBtn.on('click', function(){

				_this.showList();

			});

		},
		judge: function() {

			//发送验证
			var sValue = this.oArea.val();
			var recevierNum = this.getReciver().num;

			if(!sValue) {

				oTip.say('消息不能为空');
				return;

			} else if(!recevierNum) {

				oTip.say('请至少选择一个发送人');
				return;
			}

			return sValue;

		},
		sendMsg: function() {

			//sendMsg
			var result = this.judge();
			var _this = this;

			if(!result) return;

            var oDate = new Date();
			var time = getNowTime(oDate, true).time;
			var recevier = this.getReciver();
			var sendData = {
				data: [
					{
						ts: time,
						lastmessage: result
					}
				]
			};
			this.reqUrl = R.interfaces.customService.sendMsg;
			this.reqParam = {
				usergroup: recevier.group,
				messagetype: 'PLATFORM',
				receiver: recevier.receiver,
				content: result
			};
			
			this.req(function(data){

				_this.appendOneList(sendData);
				oTip.say(data.msg);

			}, function(data){

				oTip.say(data.msg);

			});
			
		},
		getReciver: function() {

			//获取发送对象
			var arr = [];
			var aCheck = this.oMsgList.find('[msguid]');
			var oCheck;
			var uid;
			var group;

			aCheck.each(function(i){

				oCheck = aCheck.eq(i);

				if(oCheck.attr('checked') == 'checked') {
					uid = oCheck.attr('msguid');
					group = oCheck.parents('[group]').attr('group');
					arr.push(uid);
				}

			});

			return {
				receiver: arr.join(','),
				group: group,
				num: arr.length
			};

		},
		appendOneList: function(data) {

			this.create(data, 'append');
			this.oArea.val('');
			this.oHistory.parent()[0].scrollTop = this.oHistory[0].scrollHeight;

		},
		showList: function() {

			//获取历史消息
			var _this = this;

			this.reqUrl = R.interfaces.customService.historyMsg;
			this.req(function(data){
				
				if(data.data) {
					_this.clearArea();
					_this.create(data, 'append');
				} else {
					oTip.say(data.msg);
				}

			}, function(data){
				oTip.say(data.msg);
			});
		},
		create: function(data, way) {

			this.render(this.oHistory, oTplMsg, data, way);

		},
		clearArea: function() {
			this.oHistory.html('');
		}

	});

	var oService = new Service();

});
