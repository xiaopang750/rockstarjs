/**
 *description:ajaxForm表单提交加验证
 *author:fanwei
 *date:2014/09/24
 */

/*
	表单验证加提交	V0.02版本:
	新增事件委托,使新增的表单能够提交+验证;

	<input type="text" reg="email" name="haha" value="2" isCheck="yes/no/free" form-check="sys">

*/

define(function(require, exports, module) {

	var request = require('../../lib/http/request');
	var bodyParse = require('../../lib/http/bodyParse');
	require('../../../css/widget/form/ajaxForm.css');

	function AjaxForm(options) {

		/*
			@param
			oWrap: 验证边界;
			oSub: 提交按钮;
			subUrl: 提交地址;
			otherJude: 其他验证;
			fnSumbit: 提交时监听的回调函数;
			sucDo: 提交成功的回调函数;
			failDo: 提交失败的回调函数;
			noSub: 只验证不提交的回调函数;
		*/

		this.oWrap = options.oWrap || null;
		this.oSub = options.oSub || null;
		this.subUrl = options.subUrl || null;
		this.otherJude = options.otherJude || null; 
		this.fnSumbit = options.fnSumbit || null;
		this.sucDo = options.sucDo || null;
		this.failDo = options.failDo || null;
		this.noSub = options.noSub || null;


	}

	AjaxForm.prototype = {

		init: function() {

			this.events();

		},
		events: function() {

			var _this = this;

			this.oWrap.on('focus', 'input[type = text], textarea', function(e){
				_this.check( $(this), e );		
			});

			this.oWrap.on('blur', 'input[type = text], textarea', function(e){
				_this.check( $(this), e );
			});

			this.oWrap.on('click', 'input[type = radio]', function(e){
				_this.check( $(this), e );
			});

			this.oWrap.on('click', 'input[type = checkbox]', function(e){
				_this.check( $(this), e );
			});

			this.oWrap.on('change', 'select', function(e){
				_this.check( $(this), e );
			});	

		},
		check: function(oThis, e) {
			
			//isCheck yes一直验证;   no不验证;  free不填不验证,填了就验证;

			var isCheck = oThis.attr('isCheck') ? oThis.attr('isCheck') : "yes";
			var isFuncInput = oThis.attr('reg') != undefined; //如果有reg属性则为要验证的表单

			if(isFuncInput) {
					
			}

			if(isCheck == 'yes') {

			} else if(isCheck == 'free') {

			} else if(isCheck == 'no') {

			}

		},
		makeTip: function(ele) {

			var hasMaked;

			hasMaked = ele.attr('hasMaked');

			//如果没有创造过提示层，则创建一个，给元素事件的时候加，为了将来生成的元素也有tip
			if(hasMaked !== 'yes') {



				ele.attr('hasMaked', 'yes');

			} else {

				return;

			} 

		},
		makeWrapTip1: function(ele) {

			if(ele.attr('ischeck') == 'true' || ele.attr('ischeck') == 'free') {

				ele.parent().css({position:'relative'});

				var oWrongWrap = $('<span class="wrong_area" script-role="wrong_area"></span>');

				var str = 
					'<span class="wrong_content" script-role="wrong_name" script-role="wrong_name"></span>'+
					'<span class="wrrong_bot"></span>';

				oWrongWrap.html(str);
				
				ele.before(oWrongWrap);

				this.tipPosition(ele, oWrongWrap);
			}
		},
		tipPosition: function(ele, oWrongWrap) {

			var left = ele.position().left;
			var width = ele.innerWidth();
			var thisLeft = left /*+ width - oWrongWrap.innerWidth();*/
			var thisTop = ele.outerHeight(true)- 1 + ele.position().top;

			if (ele.attr('checkbox_group') || ele.attr('type') == 'checkbox') {

				thisTop = thisTop + 10;

			}

			oWrongWrap.css({
				position: 'absolute',
				left: thisLeft,
				top: thisTop,
				zIndex: 1000
			});
			
		},
		tipWrong: function(ele ,oTip, str) {

			var _this = this;

			oTip.find('[script-role = wrong_name]').html(str);

			this.tipPosition(ele, oTip);

			setTimeout(function(){

				oTip.addClass('wrong');

			},0);

			oTip.attr('iswrong','true');
			
			ele.parents('[script-role = check_wrap]').addClass('has-error');
		},
		tipRight: function(ele, oTip) {
			
			oTip.removeClass('wrong');

			oTip.attr('iswrong','false');

			ele.parents('[script-role = check_wrap]').removeClass('has-error');
		},
		checkText: function(ele) {

			var oTip,
				sTip,
				sWrong,
				re,
				str,
				_this,
				pressUrl,
				param,
				dataJson;

			_this = this;

			/* 不需要即时验证 */
			if(!ele.attr('pressUrl')) {

				ele.blur(function(){
					
					_this.inputJude($(this));

				});
			}
			else {

				var _pid = bodyParse().pid;

				/* 即时验证 */
				ele.keyup(function(){

					_this.pressInput($(this), _pid);

				});

				ele.blur(function(){

					_this.pressInput($(this), _pid);

				});

			}					

			ele.focus(function(){

				oTip = $(this).parent().find('[script-role = wrong_area]');

				_this.tipRight(ele,oTip);

			});
		},
		pressInput: function(ele, sId) {

			var _this = this;

			dataJson = {};

			oTip = ele.parent().find('[script-role = wrong_area]');		
			pressUrl = ele.attr('pressUrl');

			param = ele.attr('param');

			dataJson[param] = ele.val();

			/* 需要改 */
			dataJson['pid'] = sId;

			var oThis = ele;

			request({

				url: pressUrl,

				data: dataJson,

				sucDo: function(data) {

					_this.tipRight(ele,oTip);
				},
				noDataDo: function(msg) {

					_this.tipWrong(oThis, oTip, msg);
				}
			});
		},
		inputJude: function(ele) {

			var oTip,
				sTip,
				sWrong,
				re,
				str,
				_this;

			_this = this;

			if(!ele.attr('pressUrl')) {

				oTip = ele.parent().find('[script-role = wrong_area]');
				sTip = ele.attr('tip');
				sWrong = ele.attr('wrong');
				re = new RegExp('^' + ele.attr('re') + '$','gi');

				str = ele.val();

				if(ele.attr('ischeck') == 'true') {

					if(!ele.val()) {

						_this.tipWrong(ele, oTip, sTip);
					}
					else {	

						if(!re.test(str)) {	
							_this.tipWrong(ele, oTip, sWrong);
						}
						else {	
							_this.tipRight(ele,oTip);
						}
					}

				} else if(ele.attr('ischeck') == 'free') {

					if(str != '') {

						if(!re.test(str)) {	

							_this.tipWrong(ele, oTip, sWrong);
						}
						else {	
							_this.tipRight(ele,oTip);
						}

					}

				} else {

					if(str) {

						if(!re.test(str)) {
							_this.tipWrong(ele, oTip, sWrong);
						}
						else {
							_this.tipRight(ele,oTip);
						}
					}
				} 
			}
			else {

				var pid = bodyParse().pid;

				_this.pressInput(ele, pid);
			}

		},
		checkSelect: function(ele) {

			var _this;

			_this = this;

			ele.change(function(){

				_this.selectJude($(this));

			});		
		},
		selectJude: function(ele) {

			if(ele.attr('ischeck') == 'true' || ele.attr('ischeck') == 'free') {

				var oTip,
					sTip,
					sWrong,
					re,
					str,
					_this;

				oTip = ele.parent().find('[script-role = wrong_area]');
				sTip = ele.attr('tip');

				if(!ele.val()) {

					this.tipWrong(ele, oTip, sTip);
				}
				else {
					this.tipRight(ele,oTip);
				}
			}		
		},
		checkRadio: function(ele) {

			var _this = this;

			ele.click(function(){

				_this.radioJudge(ele);

			});


		},
		radioJudge: function(ele) {

			var aRadio = ele.find('input[type = radio]');
			var result = false;
			var oTip =  ele.parent().find('[script-role = wrong_area]');
			var sTip = ele.attr('tip');

			aRadio.each(function(i){

				if(aRadio.eq(i).attr('checked')) {	
					result = true;
				}

			});

			if(ele.attr('ischeck') == 'true' || ele.attr('ischeck') == 'free') {

				if(result) {	
					this.tipRight(ele,oTip);
				}
				else {	
					this.tipWrong(ele, oTip, sTip);
				}
			}	
		},
		checkBox: function(ele) {	
			var _this = this;

			ele.click(function(){

				_this.checkJudge(ele);

			});
		},
		checkJudge: function(ele) {

			var aCheck = ele.find('input[type = checkbox]');
			var result = false;
			var oTip =  ele.parent().find('[script-role = wrong_area]');
			var sTip = ele.attr('tip');

			aCheck.each(function(i){

				if(aCheck.eq(i).attr('checked')) {	
					result = true;
				}

			});

			if(ele.attr('ischeck') == 'true' || ele.attr('ischeck') == 'free' ) {

				if(result) {	
					this.tipRight(ele,oTip);
				}
				else {	
					this.tipWrong(aCheck.eq(0), oTip, sTip);
				}
			}
		},
		checkother: function(ele) {

			var _this = this;
			var name = ele.attr('name');
			var tip = ele.attr('tip');
			var oTip;
			var sTip = ele.attr('tip');
			var sWrong =  ele.attr('wrong');

			/* 前空 后不符合要求或者错误 */
			this.oSub.click(function(){

				oTip = ele.parent().find('[script-role = wrong_area]');

				if(!_this.otherCheck[name][0](ele)) {

					_this.tipWrong(ele, oTip, sTip);
				}
				else if(!_this.otherCheck[name][1](ele)) {

					_this.tipWrong(ele, oTip, sWrong);
				}
				else if(_this.otherCheck[name][0](ele) && _this.otherCheck[name][1](ele)) {	
					_this.tipRight(ele,oTip);
				}
			});
		},
		subMitEvent: function() {

			var _this = this;

			this.oSub.click(function(){

				_this.subMit();

			});
		},
		subMit: function() {

			var aWrong,
				result;

			aWrong = this.oWrap.find('[script-role = wrong_area]');

			result = true;

			this.map(this.arrSelect, function(i){

				this.selectJude(this.arrSelect[i]);					

			});

			this.map(this.arrInput, function(i){

				this.inputJude(this.arrInput[i]);					

			});

			this.map(this.arrRadio, function(i){

				this.radioJudge(this.arrRadio[i]);					

			});

			this.map(this.arrcheckBox, function(i){

				this.checkJudge(this.arrcheckBox[i]);					

			});


			aWrong.each(function(i){

				if(aWrong.eq(i).attr('iswrong') == 'true') {	
					result = false;
				}

			});

			if(!result) {	
				/* 系统验证 */
				return;
			}
			else {	

				/* 外部验证 */
				if(this.otherJude) {

					var judeResult = true;

					this.map(this.otherJude, function(i){

						if(!this.otherJude[i]()) {

							judeResult = false;
						}

					});

					if(!judeResult) {

						return;
					}
					else {

						/* 提交 */
						this.getAllData();
					}
				}
				else {	
					/* 提交 */
					this.getAllData();
				}
			}
		},
		map: function(arr,callBack) {

			var i,
				num;

			num = arr.length;
			
			for(i=0; i<num; i++) {
				callBack.call(this,i);
			}
		},
		getAllParam: function() {

			var _this = this;

			this.getInputData(this.arrInput);

			this.getSelectData(this.arrSelect);

			this.map(this.arrRadio, function(i){

				_this.getRadioData(_this.arrRadio[i]);

			});

			return this.param;

		},
		getAllData: function() {

			var _this = this;

			this.getAllParam();

			this.map(this.arrcheckBox, function(i){

				_this.getCheckData(_this.arrcheckBox[i]);

			});

			if(this.noSub) {

				this.noSub();

				return;
			}

			if(this.fnSumbit) {

				var newJson = this.fnSumbit(this.param);
				this.param = {};
				for(key in newJson) {

					this.param[key] = newJson[key];
				}
			}

			request({
				url: this.subUrl,
				data: this.param,
				beforeDo: function() {

					_this.loadingShow();
				},
				sucDo: function(data) {

					_this.loadingHide();

					_this.sucDo && _this.sucDo(data);
				},
				noDataDo: function(data) {

					_this.loadingHide();
					
					_this.failDo && _this.failDo(data);
				}
			});
		},
		getInputData: function(ele) {

			var _this = this;

			this.map(ele, function(i){

				if(ele[i].attr('no_upload') == 'false') return;

				if(ele[i].attr('ischeck') == 'free' && !ele[i].val()) return;

				_this.param[ele[i].attr('name')] = ele[i].val();	

			});
		},
		getSelectData: function(ele) {
			
			var _this = this;

			this.map(ele, function(i){

				if(ele[i].attr('no_upload') == 'false') return;

				if(ele[i].attr('ischeck') == 'free' && !ele[i].val()) return;

				_this.param[ele[i].attr('name')] = ele[i].get(0).children[ele[i].get(0).selectedIndex].id;	

			});
		},
		getRadioData: function(ele) {

			if(ele.attr('no_upload') == 'false') return;
			//if(ele[i].attr('ischeck') == 'free' && !ele[i].val()) return;

			var aRadio = ele.find('input[type = radio]');
			var name = ele.attr('name');
			var result = '';

			aRadio.each(function(i){

				if(aRadio.eq(i).attr('checked') == 'checked') {

					result = aRadio.eq(i).val();
				}
			});

			this.param[name] = result;

		},
		getCheckData: function(ele) {

			if(ele.attr('no_upload') == 'false') return;
			//if(ele[i].attr('ischeck') == 'free' && !ele[i].val()) return;

			var aCheck = ele.find('input[type = checkbox]');
			var name = ele.attr('name');
			var result = [];

			aCheck.each(function(i){

				if(aCheck.eq(i).attr('checked') == 'checked') {

					result.push(aCheck.eq(i).attr('id'));
				}

			});

			this.param[name] = result.join(',');
		},
		makeLoading: function(oBtn) {

			var left,
				top,
				oImage,
				offset;

			oImage = $('<img src='+ this.loaddingUrl +' width="16" height="16">');

			offset = oBtn.attr('offsetLoad') ? parseInt(oBtn.attr('offsetLoad')) : this.loadOffset;

			oBtn.css({position: 'relative'});	

			left = Math.floor((oBtn.outerWidth() - 16)/2 - offset);
			top =  Math.floor((oBtn.outerHeight() - 16)/2);

			oImage.css({
				position: 'absolute',
				left: left + 'px',
				top: top + 'px',
				zIndex : 2,
				display: 'none'
			});

			oBtn.append(oImage);

			return oImage; 	
		},
		loadingShow: function() {

			this.oSub.addClass('disabled');
			this.oSub.attr('disabled', 'disabled');

			//this.oLoading.show();
		},
		loadingHide: function() {

			this.oSub.removeClass('disabled');
			this.oSub.removeAttr('disabled');

			//this.oLoading.hide();
		},
		clear: function() {

			var _this = this;

			this.map(this.arrSelect, function(i){

				_this.arrSelect[i][0].selectedIndex = 0;					

			});

			this.oWrap.find('[form_check]').val('');

			this.map(this.arrRadio, function(i){

				_this.arrRadio.removeAttr('checked');					

			});

			this.map(this.arrcheckBox, function(i){	

				_this.arrcheckBox.removeAttr('checked');					

			});

		}

	}

	module.exports = AjaxForm;

});