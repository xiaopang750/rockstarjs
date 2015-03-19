/**
 *description:操作台首页
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var oTip = require('../../../widget/dom/tip');
	var enterDo = require('../../../widget/dom/enterDo');
	var LayData = require('../../../widget/dom/layData');
	var Dialog = require("../../../widget/dom/dialog");

	var Index = R.Class.create(R.util, {

		initialize: function() {
			
			var _this = this;

			this.oUserInput = $('[search-input]');
			this.oSearchBtn = $('[search-btn]');
			this.oPayWrap = $('[pay-wrap]');
			this.oPayNum = $('[pay-num]');
			this.oPayUl = null;

			this.initDialog();
			this.searchLink = this.oSearchBtn.attr('link');
			this.reqFairerList();
			this.reqPayList(function(){
				_this.aSumList = $('[sum-list]');
				_this.allItem = $('[sum-item]');
				_this.events();
			});
		},
		initDialog: function() {

			this.oConfirmSumBox = new Dialog({
				content: '确认结算么?'
			});

		},
		reqFairerList: function() {

			//获取理发师
			var _this = this;

			this.reqUrl = R.interfaces.service.list;
			this.req(function(data){

				_this.fairerList = data.data.list;
				_this.showHairerInfo();
				
			});
		},
		showHairerInfo: function() {
			
			var _this = this;
			var hairTpl = 
			'{{each list}}' +
				'<a class="ba-mr-10 ba-mb-10" lay-list fairername="{{$value.fairername}}" id="{{$value.pkFairer}}" href="javascript:;">'+
					'{{$value.fairername}}' +
				'</a>'+
			'{{/each}}';

			//理发师
			this.oFairer = new LayData({
				width: '300',
				ele: '[fairername]',
				data: {list: this.fairerList},
				sTpl: hairTpl,
				onClick: function(oTarget, oThis) {
					
					oTarget.val(oThis.attr('fairername'));
					oTarget.attr('pkFairer', oThis.attr('id'));

				}
			});

		},
		reqPayList: function(cb) {

			var _this = this;
			var tpl = require("../../../tpl/shop/user/list");

			this.reqUrl = R.interfaces.member.queryPayList;
			this.req(function(data){

				if(data.data.list.length){
					var html = $('<ul></ul><ul></ul>');

					_this.oPayWrap.append(html);
					_this.oPayUl = _this.oPayWrap.find('ul');

				}else{
					var html = $('<div class="ba-tc">暂无下单数据</div>');
					_this.oPayWrap.append(html);
				}

				for(var i=0;i<data.data.list.length;i++){

					var index = _this.getShort();
					var dd = data.data.list[i];

					_this.render(_this.oPayUl.eq(index), tpl, dd, 'append');
				}

				cb && cb();

			}, function(){

				cb && cb();
				
			});

		},
		events: function() {
			
			var _this = this;

			this.oSearchBtn.on('click', function(){

				var sValue = _this.oUserInput.val();
				_this.search(sValue);

			});

			enterDo(this.oUserInput, function(){
				var sValue = _this.oUserInput.val();
				_this.search(sValue);
			});


			this.aSumList.each(function(i){

				_this.getListPrice(_this.aSumList.eq(i));

			});

			this.oPayWrap.on('keypress', '[sum-item]', function(){

				var nowList = $(this).parents('[sum-list]');
				_this.getListPrice(nowList);

			});	

			this.oPayWrap.on('keyup', '[sum-item]', function(){

				var nowList = $(this).parents('[sum-list]');
				_this.getListPrice(nowList);

			});	

			//确认结算
			this.oPayWrap.on('click', '[sum-btn]', function(){

				_this.nowSumList = $(this);
				_this.oConfirmSumBox.show();

			});	

			enterDo(this.allItem, function(oThis){

				var oBtn = oThis.parents('[sum-list]').find('[sum-btn]');
				_this.nowSumList = oBtn;
				_this.oConfirmSumBox.show();

			});

			this.oConfirmSumBox.onConfirm = function() {

				_this.sum(_this.nowSumList);

			};
			
		},
		sum: function(oBtn) {

			var aid = oBtn.attr('aid');
			var price = oBtn.attr('price');
			var nowList = oBtn.parents('[sum-list]');
			var aItem = nowList.find('[sum-item]');
			var aFairer = nowList.find('[fairername]');

			var arr = [];
			aItem.each(function(i){

				var oItem = aItem.eq(i);
				var oFairer = aFairer.eq(i);
				var param = {};
				param.pkDetail = oItem.attr('pkDetail') || '';
				param.pkAddition = oItem.attr('pkAddition');
				param.additionname = oItem.attr('additionname');
				param.additionmoney = oItem.val() || 0;

				if(param.pkDetail || param.additionmoney) {

					param.pkFairer = oFairer.attr('pkFairer') || '';
					param.fairername = oFairer.val() || '';
					arr.push(param);
					if(!param.pkDetail) {
						delete param.pkDetail;
					}	
				}

			});

			if(price) {

				this.reqSum(aid, price, arr, nowList);

			} else {

				oTip.say('价格输入有误');
			}

		},
		reqSum: function(aid, price, addition, nowList) {
			
			var _this = this;
			//结算请求
			this.reqUrl = R.interfaces.member.sum;
			this.reqParam = {
				pkOrder: aid, 
				ordermoney: price,
				addition: JSON.stringify(addition)
			};
			
			this.req(function(data){

				_this.oConfirmSumBox.close();
				oTip.say(data.msg);
				_this.reduce();
				nowList.fadeOut();

			}, function(data){

				oTip.say(data.msg);

			});

		},
		getListPrice: function(oList) {

			//获取每一列价格
			var allItem = oList.find('[sum-item]');
			var oBase = oList.find('[base]');
			var nBase = parseInt( (oBase.html() || 0) );
			var oSum = oList.find('[sum-all]');
			var oSumBtn = oList.find('[sum-btn]');
			
			var count = 0;
			var sinPrice;

			allItem.each(function(i){

				sinPrice = allItem.eq(i).val();
				sinPrice = sinPrice ? sinPrice : 0;
				sinPrice = parseInt(sinPrice);
				count += sinPrice;

			});

			count += nBase;

			if(!isNaN(count)) {

				oSum.html(count);
				oSumBtn.attr('price', count);

			}else {

				oSum.html('');
				oSumBtn.attr('price', '');

			}

		},
		getShort: function() {

			var index = 0;
			var ih = this.oPayUl.eq(index).height();

			for(var i=1; i<this.oPayUl.length; i++){

				if(this.oPayUl.eq(i).height() < ih){
					index = i;
					ih = this.oPayUl.eq(i).height();
				}

			}
			
			return index;

		},
		reduce: function() {

			//订单reduce;
			var nowNum = parseInt(this.oPayNum.html());
			nowNum -= 1;
			this.oPayNum.html(nowNum);

			if(nowNum == 0) {
				this.oPayWrap.html('<div class="ba-tc">暂无下单数据</div>');
			}

		},
		search: function(sValue) {
			
			/*
				如果是完成的手机号则请求接口,如果有该用户则直接跳到用户信息页
				模糊搜索的跳到搜索列表页
			*/

			var _this = this;

			this.reqUrl = R.interfaces.member.query;
			this.reqParam = {
				likecontent: sValue
			};
			this.req(function(data){

				var oList = data.data.list;
				var uid;

				if(oList && oList.length == 1) {

					uid = oList[0].pkCustomer;
					window.location = R.route['user/add'].url + '?uid=' + uid;
				} else {

					window.location = _this.searchLink + '?q=' + sValue;
				}

			});


		}

	});

	var oIndex = new Index();

});
