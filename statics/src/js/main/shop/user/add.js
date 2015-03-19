/**
 *description:用户添加
 *author:fanwei
 *date:2015/1/25
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var oTip = require('../../../widget/dom/tip');
	var bodyParse = require('../../../util/http/bodyParse');
	var packageTpl = require('../../../tpl/shop/member/package');
	var editBoxTpl = require('../../../tpl/shop/member/editPackage');
	var Dialog = require('../../../widget/dom/dialog');
	var Calendar = require('../../../widget/form/calendar');
	var LayData = require('../../../widget/dom/layData');
    var getNowTime = require('../../../util/time/getNowTime');
    var fenye = require('../../../widget/dom/fenye');
    var jsonStr = require('../../../util/string/jsonStr');

	var Add = R.Class.create(R.util, {

		initialize: function() {
			
			this.oPageInfoWrap = $('[pageInfoWrap]');
			this.oAddForm = $('[script-bound = form-check]');
			this.oPackageWrap = $('[data-ele = data-wrap]');
			this.oPackageSave = $('[save]');
			this.oName = $('[name = username]');
			this.oSexWrap = $('[sex-wrap]');
			this.aSex = $('[name=sex]');
			this.oTel = $('[name = cellphone]');
			this.oNote = $('[name = note]');
			this.oModify = $('[unlock]');
			this.oCancel = $('[cancel]');
			this.aLock = $('[lock]');
			this.oAddPackageBtn = $('[add-package]');
			this.oPackageSex = $('[package-sex]');
			this.oPageckageBtn = $('[fast-order-btn]');

			this.maxSelect = 2;
			this.pageInfo = bodyParse();
			this.uid = this.pageInfo.uid;
			this.nowPackageId = null;
			this.showCanlendar();
			this.judge();
			this.renderEditBox();
			this.form();
			this.events();

		},
		reqFairerList: function() {

			var _this = this;
			
			this.reqUrl = R.interfaces.service.list;
			this.req(function(data){

				_this.fairerList = data.data.list;
				_this.showHairerInfo();
				

			});

		},
		reqPackageList: function() {

			var _this = this;
			var nowSex = this.oPackageSex.attr('package-sex');

			this.reqUrl = R.interfaces.member.packageInfo;
			this.reqParam = {sex: nowSex};

			this.req(function(data){

				_this.packageList = data.data.list;
				_this.showPackageInfo();

			});

		},
        relatedTime: function(comboType) {

            //选择套餐关联时间
            var oStart = $('[box-start]');
            var oEnd = $('[box-end]');
            var oTimeStart;
            var oTimeEnd;
            var sTimeStart;
            var sTimeEnd;

            /*
            * 1 为套餐
            * 2 为单次
            * */

            oTimeStart = new Date();
            oTimeEnd = new Date();

            if(comboType == 2) {

                oTimeEnd.setDate(oTimeEnd.getDate() + 1);

            } else {

                oTimeEnd.setFullYear(oTimeEnd.getFullYear() + 1);
                oTimeEnd.setDate( oTimeEnd.getDate() - 1 );
            }

            sStart = getNowTime(oTimeStart).time;
            sEnd = getNowTime(oTimeEnd).time;
            oStart.val(sStart);
            oEnd.val(sEnd);

        },
		showPackageInfo: function() {

            //选择套餐
			var _this = this;

			if(!this.oPackage) {


				this.oPackage = new LayData({
					width: '300',
					ele: '[comboname]',
					data: {list: this.packageList},
					sTpl: 
					'{{each list}}' +
						'<p class="ba-pt-10 ba-pb-10">'+
							'<a class="ba-mr-5 ba-mb-5" lay-list="data" money="{{$value.currentmoney}}" comboname="{{$value.comboname}}" id="{{$value.pkShopCombo}}" combocount="{{$value.combocount}}" combotype="{{$value.combotype}}" fairtype="{{$value.fairtype}}" href="javascript:;">'+
								'{{$value.comboname}}' +
								'&nbsp;&nbsp;&nbsp;'+
								'{{$value.currentmoney}}' +
								'元'+
							'</a>'+
						'</p>'+
					'{{/each}}',
					onClick: function(oTarget, oThis) {
						
						var oTip = _this.oPackageForm.getTip(oTarget);
                        var comboType = oThis.attr('combotype');

						_this.oPackageForm.tipRight(oTarget, oTip);
						$('[pack-count]').val(oThis.attr('combocount'));
						oTarget.val(oThis.attr('comboname'));

						_this.oPackageForm.oSub.attr('money', oThis.attr('money'));
						_this.oPackageForm.oSub.attr('pkShopCombo', oThis.attr('id'));
						_this.oPackageForm.oSub.attr('combocount', oThis.attr('combocount'));
						_this.oPackageForm.oSub.attr('combotype', oThis.attr('combotype'));
						_this.oPackageForm.oSub.attr('fairtype', oThis.attr('fairtype'));
						_this.getPackageMoney();
                        _this.relatedTime(comboType);

					}
				});

			} else {

				this.oPackage.render({list: this.packageList});

			}

		},
		showHairerInfo: function() {
			
			var _this = this;

			//理发师
			this.oFairer = new LayData({
				width: '300',
				ele: '[fairer]',
				data: {list: this.fairerList},
				sTpl: 
				'{{each list}}' +
					'<span>' +
						'<input type="checkbox" id="hairer{{$index}}" lay-list-checkbox fairername="{{$value.fairername}}" fairerid="{{$value.pkFairer}}" lay-list="data">' + 
						'<label class="ba-mr-10 ba-mb-10 ba-ml-2" for="hairer{{$index}}">' +
							'{{$value.fairername}}' +
						'</label>' +
					'</span>' +
				'{{/each}}'+
				'<div class="ba-mt-10 ba-tl"><a href="javascript:;" class="btn btn-primary" lay-close trigger-close>确定</a></div>',
				onClick: function(oTarget, oThis) {
					
					var strArr = _this.oPackageForm.oSub.attr('fairerStr') || '[]';
					var arr = JSON.parse(strArr);

					var sName;
					var sId;

					sName = oThis.attr('fairername');
					sId = oThis.attr('fairerid');

					if(oThis.attr('checked') == 'checked') {

						var num = arr.length;
						var result = false;

						for (var i=0; i<num; i++) {

							if(arr[i].pkFairer != sId) {

								result = true;
								
							}
						}

						if(result || !num) {

							var param = {};
							param.fairername = sName;
							param.pkFairer = sId;
							arr.push(param);

						}
						
					} else {

						var num = arr.length;

						for (var i=0; i<num; i++) {
							if(arr[i].pkFairer == sId) {
								arr[i] = '';
							}
						}

						var newArr = [];

						for (var i=0; i<num; i++) {
							if(arr[i] != '') {
								newArr.push(arr[i]);
							}
						}

						arr = newArr;

					}

					var arrName = [];
					var num2 = arr.length;
					for (var j=0; j<num2; j++) {
						arrName.push(arr[j].fairername);
					}

					var oFormTip = _this.oPackageForm.getTip(oTarget);
					_this.oPackageForm.tipRight(oTarget, oFormTip);
					oTarget.val(arrName.join(','));

					var i,num;
					num = arr.length;
					for (i=0; i<num; i++) {
						arr[i].rate = 1/num;
					}

					_this.oPackageForm.oSub.attr('fairerStr', JSON.stringify(arr));
					return false;

				}
			});

		},
		showCanlendar: function() {

			var _this = this;

			//显示日历
			var oCalendar = new Calendar({
				ele: '[calendar]',
				format: "yyyy-MM-dd",
				onSetDate: function(time) {

					var oTarget = $(this.inpE);
					var oTip = _this.oPackageForm.getTip(oTarget);
					_this.oPackageForm.tipRight(oTarget, oTip);

				}
			});

			var oCalendarBirthday = new Calendar({
				ele: '[birthday]',
				format: "yyyy-MM-dd"
			});

		},
		renderEditBox: function() {

			//初始化套餐编辑弹框
			this.oEditBox = new Dialog({
				boxTpl: editBoxTpl
			});
			
			this.packageForm();	

		},
		judge: function() {

			//判断是添加还是编辑
			if(this.uid) {

				this.nowWay = 'edit';
				this.nowSubUrl = R.interfaces.member.edit;
				this.getPackageInfo({pkCustomer: this.uid});
				this.reqFairerList();

			} else {
				this.nowWay = 'add';
				this.nowSubUrl = R.interfaces.member.add;
			}

		},
		events: function() {
			
			var _this = this;	


			//编辑
			this.oPackageWrap.on('click', '[edit]', function(){

				_this.nowWay = 'edit';
				_this.oPackageForm.subUrl = R.interfaces.member.editPackage;

				_this.nowEditList = $(this).parents('[list-info]');
				_this.nowData = _this.nowEditList.data('info');
				_this.nowPackageId = $(this).attr('aid');
				_this.nowData.nowWay = 'edit';

				_this.oEditBox.refreshData(_this.nowData);
				_this.oEditBox.show();
				_this.oPackageForm.reload({
					boundName: 'package-wrap',
					btnName: 'package-btn'
				});

			});

			//下单
			this.oPackageWrap.on('click', '[order]', function(){

				var nowName = _this.oPageInfoWrap.attr('nowname');
				var url = $(this).attr('href') + '&name=' + nowName;
				window.location = url;

				return false;

			});	


			//modify
			this.oModify.on('click', function(){

				_this.aLock.removeAttr('disabled');

			});

			//取消修改
			this.oCancel.on('click', function(){

				_this.aLock.attr('disabled', 'disabled');
				_this.oRegistForm.refresh();
				_this.aLock.each(function(i){

					var orgSex = _this.oSexWrap.attr('org');
					_this.aSex.eq(orgSex).attr('checked', 'checked');
					_this.aLock.eq(i).val( _this.aLock.eq(i).attr('org') );


				});

			});

			//套餐添加
			this.oAddPackageBtn.on('click', function(){
				
				var sex = $(this).attr('package-sex');

				_this.nowWay = 'add';
				_this.oPackageForm.subUrl = R.interfaces.member.savePackage;
				_this.reqPackageList();

				_this.oEditBox.refreshData({});
				_this.oEditBox.show();

				_this.oPackageForm.reload({
					boundName: 'package-wrap',
					btnName: 'package-btn'
				});

			});

			//计算价格
			$(document).on('keyup', _this.getPackageMoney);
			$(document).on('keydown', _this.getPackageMoney);

			//快速下单
			this.oPageckageBtn.on('click', function(){

				_this.fastOrder();

			});
		},
		fastOrder: function() {
			
			var url;
			var info;
			var param;
			var realData;
			var uid = this.pageInfo.uid;

			this.reqUrl = R.interfaces.member.fastOrder;
			this.reqParam = {
				pkCustomer: uid
			};

			this.req(function(data){

				realData = data.data;

				/*
					oderType: 'sinHair' 理发订单 
					orderType: 'package' 套餐订单
					pkName： 套餐名称
					spid: 店铺套餐主键
					comboid : 消费者套餐主键
					name: 消费者姓名
				*/

				info = {
					pkName: realData.comboname,
					pkCustomer: uid,
					spid: realData.pkShopcombo,
					comboid: realData.pkCustomerCombo,
					name: realData.customername
				};

				param = jsonStr(info);

				url = R.route['user/order'].url + '?' + param;

				window.location = url;

			});

		},
		refreshList: function(param) {

			//刷新列表数据
			this.nowData.combobegintime = param.combobegintime;
			this.nowData.comboendtime = param.comboendtime;
			this.nowEditList.data('info', this.nowData);

			var sStartTime = new Date( param.combobegintime.replace(/\-/gi, '\/') ).getTime();
    		var sEndTime = new Date( param.comboendtime.replace(/\-/gi, '\/') ).getTime();
    		var cha = sEndTime - sStartTime;
    		var timeLeft = parseInt(cha / 1000 / 60 / 60 / 24, 10);
			this.nowEditList.find('[timeLeft]').html(timeLeft + '天');

		},
		addList: function(data) {

			/*this.render(this.oPackageWrap, packageTpl, {data: [data]}, 'prepend');
			var oNewList = $('[list-info]').eq(0);
			oNewList.data('info', data);*/
			this.nowPackageParam.curpage = 1;
			this.oPage.refresh(this.nowPackageParam);

		},
		getPackageMoney: function() {

			var oBtn = $('[script-role = package-btn]');
			var all = oBtn.attr('money');
			var discount = $('[sale]').val() || 0;
			var nAll = parseInt(all);
			var nDiscount = !isNaN(discount) ? parseInt(discount) : 0;
			var nCha = nAll - nDiscount;
			nCha = isNaN(nCha) ? 0 : nCha;

			$('[sum]').text(nCha);

		},
		hideEdit: function(oEdit) {

			oEdit.addClass('ba-hidden');

		},
		showEdit: function(oEdit) {

			oEdit.removeClass('ba-hidden');
		},
		getPackageInfo: function(param, cb) {

			//获取套餐信息
			var _this = this;


			this.oPageInfoWrap.show();
			this.nowPackageParam = param;
			this.nowPackageParam.pagesize = 10;

			this.oPage = new fenye(R.interfaces.member.hasedPackage, packageTpl, param, '', function(data){

				var aList = $('[list-info]');
				aList.each(function(i){
					aList.eq(i).data('info', data.list[i]);
				});

				cb && cb();

			});			
		},
		packageForm: function() {

			//套餐信息表单
			var _this = this;
			
			this.oPackageForm = new ajaxForm({

				boundName: 'package-wrap',
				btnName: 'package-btn',
				otherJude: [

					function() {
						var sStart = $('[box-start]').val();
						var sEnd = $('[box-end]').val();
						var sStartTime = new Date( sStart.replace(/\-/gi, '\/') ).getTime();
						var sEndTime = new Date( sEnd.replace(/\-/gi, '\/') ).getTime();

						if(sStartTime > sEndTime) {
							oTip.say('开始时间不能大于结束时间');
							return false;
						} else {
							return true;
						}
					}

				],
				fnSumbit: function(data) {

					data.pkFairer = this.oSub.attr('pkFairer');
					data.currentmoney = this.oSub.attr('money');
					data.pkShopCombo = this.oSub.attr('pkShopCombo');
					data.totalcount = this.oSub.attr('combocount');
					data.pkCustomerCombo = this.oSub.attr('pkCustomerCombo');
					data.pkCustomer = _this.uid;
					data.isselect = 'Y';
					data.commissionpeople = this.oSub.attr('fairerstr');
					data.discount = $('[name = discount]').val() || 0;
					data.combotype = this.oSub.attr('combotype');
					data.fairtype = this.oSub.attr('fairtype');

					var nCurrentmoney = parseInt(data.currentmoney);
					var nDiscount = parseInt( data.discount );
					var nCommissionpeople = JSON.parse(data.commissionpeople).length;

					if(nCommissionpeople > _this.maxSelect) {
						oTip.say('提成人最多不能超过' + _this.maxSelect + '个');
						return false;
					}

					if(nDiscount > nCurrentmoney) {
						oTip.say('优惠金额不能大于套餐金额');
						return false;
					}

					return data;	

				},
				sucDo: function(data, oBtn, endParam) {

					_this.oEditBox.close();

					if(_this.nowWay == 'edit') {

						_this.refreshList(endParam);

					} else if(_this.nowWay == 'add') {

						_this.addList(data.data);

					}

					oTip.say(data.msg);

				},
				failDo: function(data) {

					oTip.say(data.msg);
				}

			});

			this.oPackageForm.upload();

		},
		form: function() {

			//pkShop
			//pkUser
			//用户编辑
			//用户信息表单
			var _this = this;

			this.oRegistForm = new ajaxForm({

				subUrl: this.nowSubUrl,
				fnSumbit: function(data) {

					if(_this.uid) {

						data.pkCustomer = _this.uid;
					}

					return data;	

				},
				sucDo: function(data, oBtn, param) {

					oTip.say(data.msg);

					_this.oPageInfoWrap.show();
					
					var uid = data.data;
					
					if(_this.uid) {
						//编辑
						_this.oPageInfoWrap.attr('nowname', param.username);
						_this.aLock.each(function(i){
							
							var oLock = _this.aLock.eq(i);
							var lockName = oLock.attr('lock');
							oLock.attr('org', param[lockName]);

						});
					} else {

						//添加
						/*_this.oAddForm.hide();
						_this.reqFairerList();
						_this.getPackageInfo({pkCustomer: uid});
						_this.uid = uid;*/
						window.location = R.route['user/add'].url + '?uid=' + uid;
					}

					_this.oPackageSex.attr('package-sex', param.sex);
					//window.location = data.data;

				},
				failDo: function(data) {

					oTip.say(data.msg);

				}

			});

			this.oRegistForm.upload();

		}

	});

	var oAdd = new Add();

});
