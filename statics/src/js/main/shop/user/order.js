/**
 *description:服务单下单
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var oTip = require('../../../widget/dom/tip');
	var bodyParse = require('../../../util/http/bodyParse');
	var LayData = require('../../../widget/dom/layData');
	//var oTplOther = require('../../../tpl/shop/member/otherPayList');

	var Order = R.Class.create(R.util, {

		initialize: function() {
			
			this.oOrderWrap = $('[order-wrap]');
			this.aOtherPay = $('[otherPay]');
			this.oAll = $('[all]');
			this.oSinHair = $('[sinHair]');
			this.oHairer = $('[hairer]');
			this.oSave = $('[script-role = confirm-btn]');
			this.aSelectMoney = $('[name = fairermoney]');
			this.pageInfo = bodyParse();
			this.reqFairerList();
			this.sum();
			this.events();
			this.form();

		},
		events: function() {
			
			var _this = this;	

			//计算总价
			this.oOrderWrap.on('keypress', '[otherPay]', function(){
				_this.sum();
				_this.sinHair();
			});

			this.oOrderWrap.on('keyup', '[otherPay]', function(){
				_this.sum();
				_this.sinHair();
			});


			this.aSelectMoney.on('click', function(){
				_this.sum($(this));
				_this.getNowFariPirce($(this));
				_this.sinHair();
			});

			this.oSinHair.on('click', function(){
				_this.sinHair($(this));
			});

		},
		sinHair: function() {

			//去除理发价格
			var isChecked = this.oSinHair.attr('checked');
			var fairPrice = this.oSinHair.attr('fairPrice');
			var orgPrice = this.oSinHair.attr('orgPrice');
			var nAll;
			var nPrice;
			var nOrgPrice;
			var nowMoney;

			nAll = parseInt(this.oAll.html());
			nPrice = parseInt(fairPrice);
			nOrgPrice = parseInt(orgPrice);

			if(isChecked) {

				if(fairPrice) {
					nowMoney = nAll - nPrice;
					this.oAll.html( nowMoney );
					this.isSinHair = 'Y';
					this.nowFairPrice = nPrice;
				}

			} else {

				if(fairPrice) {
					nowMoney = nOrgPrice;
					this.oAll.html( nowMoney );
					this.isSinHair = 'N';
				}

			}

			this.oSave.attr('price', nowMoney);

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
					
					var oTip = _this.oOderForm.getTip(oTarget);
					_this.oOderForm.tipRight(oTarget, oTip);
					oTarget.val(oThis.attr('fairername'));
					_this.oOderForm.oSub.attr('pkFairer', oThis.attr('id'));

				}
			});

			//附加项理发师选择
			this.oOtherFairer = new LayData({
				width: '300',
				ele: '[otherFairer]',
				data: {list: this.fairerList},
				sTpl: hairTpl,
				onClick: function(oTarget, oThis) {
					
					oTarget.val(oThis.attr('fairername'));
					oTarget.attr('pkFairer', oThis.attr('id'));

				}
			});

		},
		form: function() {

			var _this = this;
			var aOtherPayFaier = $('[otherFairer]');

			this.oOderForm = new ajaxForm({

				subUrl: R.interfaces.member.order,
				fnSumbit: function( data ) {

					if(!_this.oAll.html()) {
						oTip.say('请检查金额填写是否正确');
						return false;
					}

					var arr = [];

					_this.aOtherPay.each(function(i){

						var otherPay = _this.aOtherPay.eq(i);
						var oOtherFaier = aOtherPayFaier.eq(i);
						var param = {};
						param.additionmoney = otherPay.val();
						param.additionmoney = param.additionmoney ? param.additionmoney : 0;
						param.additionmoney = !isNaN(param.additionmoney) ? param.additionmoney : 0;
						param.pkAddition = otherPay.attr('id');
						param.additionname = otherPay.attr('namer');
						param.pkFairer = oOtherFaier.attr('pkFairer') || '';
						param.fairername = oOtherFaier.val() || data.fairername;

						if(param.additionmoney > 0) arr.push(param);

					});

					if(arr.length) data.addition = JSON.stringify(arr);
					data.customername = _this.pageInfo.name;
					data.comboname = _this.pageInfo.pkName;
					data.pkShopCombo = _this.pageInfo.spid; 
					data.pkCustomer = _this.pageInfo.pkCustomer;
					data.ordermoney = parseInt(_this.oSave.attr('price'));
					data.pkPrice = $('[name=fairermoney]:checked').attr('pkPrice');
					data.pkFairer = this.oSub.attr('pkFairer');
					data.shopname = R.shopName;
					data.pkCustomerCombo = _this.pageInfo.comboid;
					data.nocontainhair = _this.isSinHair || 'N';
					data.fairprice = _this.nowFairPrice || '';
					
					return data;

				},
				sucDo: function(data) {

					oTip.say(data.msg);

					window.location = data.data;

				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oOderForm.upload();

		},
		getNowFariPirce: function(oPrice) {

			//获取当前理发价格
			var fairPrice = oPrice.attr('fairPrice');
			var orgPrice = oPrice.val();
			if(fairPrice) {
				this.oSinHair.attr('fairPrice', fairPrice);
				this.oSinHair.attr('orgPrice', orgPrice);
			}

		},
		sum: function() {

			var count = 0;	
			var _this = this;
			var nMoney = 0;
			var all = 0;
			var _this = this;

			_this.aSelectMoney.each(function(i){

				var nowSelect = _this.aSelectMoney.eq(i);
				var isChecked = nowSelect.attr('checked');

				if(isChecked == 'checked') {
					nMoney = parseInt(nowSelect.val());
				}

			});

			this.aOtherPay.each(function(i){

				var sinPrice = _this.aOtherPay.eq(i).val();
				sinPrice = sinPrice ? sinPrice : 0;
				sinPrice  = parseInt(sinPrice);
				count += sinPrice;

			});

			if(!isNaN(count)) {
				all = count + nMoney;
				this.oAll.html(all);
				this.oSave.attr('price', all);
				this.oSinHair.attr('orgPrice', all);
			} else {
				this.oAll.html('');
			}

		}

	});

	var oOrder = new Order();

});
