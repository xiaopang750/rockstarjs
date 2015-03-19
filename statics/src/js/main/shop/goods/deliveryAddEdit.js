/**
 *description:出货单添加编辑
 *author:wangweicheng
 *date:2015/3/11
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var oTip = require('../../../widget/dom/tip');
	var oAddTpl = require('../../../tpl/shop/goods/deliveryAdd');
	var oEditTpl = require('../../../tpl/shop/goods/deliveryEdit');
	var oDetailTpl = require('../../../tpl/shop/goods/deliveryDetail');
	var oGoodsTpl = require('../../../tpl/shop/goods/bookGoods');

	var DeliveryAddEdit = R.Class.create(R.util, {

		initialize: function() {
			
			this.oWrap = $('[data-ele=data-wrap]');
			this.amountMoney = $('[amount-money]');
			this.note = $('[delivery-note]');
			this.pkProductDelivery = this.parse().bid;
			this.status = this.parse().status;

			this.showPage();
			this.events();
			
		},
		showPage: function() {

			var _this = this;

			//新增出库单
			if(!this.pkProductDelivery){
				this.render(this.oWrap, oAddTpl);
			}
			//编辑出库单
			if(this.status == '1'){
				this.reqUrl = R.interfaces.goods.deliveryData;
				this.reqParam = {pkProductDelivery: this.pkProductDelivery};
				this.req(function(data){
					_this.render(_this.oWrap, oEditTpl, data.data);
					_this.countAmount();
				 	_this.note.val(_this.parse().note);
				},function(data){
					oTip.say(data.msg);
				});
			}	
			//出库单详情
			if(this.status == '8'){
				$('[goods-add]').remove();
				$('[book-operation]').remove();
				this.reqUrl = R.interfaces.goods.deliveryData;
				this.reqParam = {pkProductDelivery: this.pkProductDelivery};
				this.req(function(data){
					_this.render(_this.oWrap, oDetailTpl, data.data);
					_this.countAmount();
				 	_this.note.val(_this.parse().note).attr('disabled', 'disabled');
				},function(data){
					oTip.say(data.msg);
				});
			}	
		},
		events: function() {
			var _this = this;

			//查询商品
			$(document).on('keyup', '[goods-list-input]', function(){
				var sValue = $(this).val();
				var oRow = $(this).parents('[list]');
				_this.searchGoods(sValue, oRow);
			});

			//选择商品
			$(document).on('click', '[goods-item]', function(){
				var oInfo = {
					gid: $(this).attr('gid'),
					value: $(this).text(),
					unit: $(this).attr('unit'),
					capacity: $(this).attr('capacity'),
					productprice: $(this).attr('productprice') 
				};
				var oRow = $(this).parents('[list]');
				_this.selectGoods(oInfo, oRow);
				_this.countAmount();
			});

			//删除商品
			$(document).on('click', '[goods-remove]', function(){
				var oRow = $(this).parents('[list]');
				_this.goodsRemove(oRow);
				_this.countAmount();
			});

			//添加商品
			$(document).on('click', '[goods-add]', function(){
				_this.goodsAdd();
			});

			//填写发货数量
			$(document).on('keyup', '[delivery-num-input]', function(){
				var sValue = $(this).val();
				var re = /^\d+$/g;

				if(!re.test(sValue) && sValue != ''){
					oTip.say('请填写数字');
					$(this).val('');
				}else{
					_this.countAmount();
				}
				
			});

			//确认出库单
			$(document).on('click', '[delivery-confirm]', function(){
				_this.deliveryConfirm();
			});

			//取消出库单
			$(document).on('click', '[delivery-cancel]', function(){
				window.location = './deliveryList';
			});

		},
		searchGoods: function(sValue, oRow) {

			this.goodsWrap = oRow.find('[goods-list-wrap]');
			this.goodsList = oRow.find('[goods-list]');

			var _this = this;

			if(sValue == ''){
				this.goodsList.html('');
				this.goodsWrap.hide();
				oRow.find('[data]').html('');
				return;
			}

			this.reqUrl = R.interfaces.goods.stockList;
			this.reqParam = {content: sValue};
			this.req(function(data){

				_this.goodsWrap.show();
				_this.render(_this.goodsList, oGoodsTpl, data.data);

			},function(data){
				_this.goodsWrap.hide();
			});

		},
		selectGoods: function(oInfo, oRow) {

			var oGood = this.oWrap.find('[gid='+oInfo.gid+']');
			var oInput = oGood.find('[goods-list-input]');
			var bRepeat = false;
			
			oInput.each(function(){
				if($(this).val() == oInfo.value){
					bRepeat = true;
					return false;
				}
			});

			if(bRepeat && oRow.attr('gid') != oInfo.gid){
				oTip.say('您已经添加过该商品，请直接修改订货数量');
			}else{
				oRow.attr('gid', oInfo.gid);
				oRow.find('[goods-list-input]').val(oInfo.value);
				oRow.find('[data=unit]').html(oInfo.unit);
				oRow.find('[data=capacity]').html(oInfo.capacity);
				oRow.find('[data=productprice]').html(oInfo.productprice);
				oRow.find('[goods-list]').html('');
				oRow.find('[goods-list-wrap]').hide();
			}

		},
		goodsRemove: function(oRow) {
			oRow.remove();
		},
		goodsAdd: function() {
			this.render(this.oWrap, oAddTpl, {}, 'append');
		},
		countAmount: function() {
			
			var aGoods = this.oWrap.children();
			var count = 0;

			if(!this.pkProductDelivery || this.status == '1'){
				aGoods.each(function(){
					if(($(this).find('[delivery-num-input]').val() != '') && ($(this).find('[data=productprice]').html() != '')){
						count += $(this).find('[delivery-num-input]').val() * $(this).find('[data=productprice]').html();
					}
				});	
			}else{
				aGoods.each(function(){
					count += $(this).find('[data=productnum]').html() * $(this).find('[data=productprice]').html();
				});	
			}

			this.amountMoney.html(count);
			return count;
		},
		deliveryConfirm: function() {

			var param = {
				deliverymoney: this.countAmount(),
				note: $('[delivery-note]').val()
			};

			var productsArr = [];
			var aGoods = this.oWrap.children();			

			//判断是编辑还是添加
			if(this.pkProductDelivery){

				param.pkProductDelivery = this.pkProductDelivery;

				aGoods.each(function(){
					if(($(this).find('[delivery-num-input]').val() != '') && ($(this).find('[data=productprice]').html() != '')){
						var goodsItem = {
							pkProductDeliveryB: $(this).attr('pkProductDeliveryB'),
							pkProduct: $(this).attr('gid'),
							productname: $(this).find('[goods-list-input]').val(),
							productnum: $(this).find('[delivery-num-input]').val(),
							productprice: $(this).find('[data=productprice]').html(),
							productunit: $(this).find('[data=unit]').html()
						};
						productsArr.push(goodsItem);
					}
				});
				
				this.reqUrl = R.interfaces.goods.deliveryEdit;

			}else{
				aGoods.each(function(){
					if(($(this).find('[delivery-num-input]').val() != '') && ($(this).find('[data=productprice]').html() != '')){
						var goodsItem = {
							pkProduct: $(this).attr('gid'),
							productname: $(this).find('[goods-list-input]').val(),
							productnum: $(this).find('[delivery-num-input]').val(),
							productprice: $(this).find('[data=productprice]').html(),
							productunit: $(this).find('[data=unit]').html()
						};
						productsArr.push(goodsItem);
					}
				});

				this.reqUrl = R.interfaces.goods.deliveryAdd;
			}	

			param.products = JSON.stringify(productsArr);

			this.reqParam = param;

			if(!productsArr.length){
				oTip.say('请添加商品');
				return;
			}

			this.req(function(data){
				oTip.say(data.msg);
				setTimeout(function(){
					window.location = './deliveryList';
				}, 1000);
			}, function(data){
				oTip.say(data.msg);
			});

		}

	});

	var oDeliveryAddEdit = new DeliveryAddEdit();

});
