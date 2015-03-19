/**
 *description:ajaxForm表单提交加验证
 *author:fanwei
 *date:2013/11/01
 */

/*
	表单验证加提交:
	
	@param:
	boundName: 边界自定义名称,定义表单验证的有效区域,以及提交区域 默认为:form_check;
	btnName :提交按钮名称,一个提交按钮对应一个boundName 默认为:confirm_btn
	otherJude: 提交时如果还需要别的验证可加入:
				[
					function() {
	
						if(验证通过) {
							return true;
						} else {
							return false;
						}
					},
					....

					该数组只要有一个函数return false 则验证失败;
				];
	fnSumbit: 提交时如需另外提交其他参数:
			  fnSumbit: function(data) {
				 data.aaa = 222;
			  }
    sucDo: 成功;
    failDo: 失败;

    表单元素自定义属性说明:
        ischeck:是否验证当前项; true为开启, false为关闭, 不填不验证，填了验证
		name:提交到服务器的字段名; 
		tip:当前项为空的提示;
		wrong:不符合正则reg的提示;
		reg:正则表达式 .{1,60}, 默认已加上^ $;
		no_upload:  默认为false 默认提交当前该字段;为true时 不同步该字段到服务器;
					otherCheck: sys为系统验证(根据reg正则而定,self为自定义验证):otherCheck:[
						pass: function() {
							//pass为需要验证自定义验证的字段名;
							return true or false;
						}
					]


	如:form: 
	<div script-bound="form-check">
		<form>

			//input
			<div script-role="check-wrap">
				<input type="text" form_check="sys" ischeck="true" name="goodsname" tip="此项为必填" wrong="商品名称不能超过60个字" re="(.{1,60})">
			</div>
			
			//select
			<div script-role="check-wrap">
				<select name="class_id" form_check="sys" ischeck="true" tip="子类别不能为空" wrong="" re=".+">
					<option value="" id="">请选择子品类</option>
				</select>
			</div>
			
			//textarea
			<div script-role="check-wrap">
				<textarea form_check="sys" ischeck="true" name="goodsname" tip="此项为必填" wrong="商品名称不能超过60个字" re="(.{1,60})"></textarea>
			</div>

			//radio
			<div radio_group="true" name="wx_type" form_check="sys" ischeck="true">
				<input type="radio" value="1" name="wx_type" /><span class="ml_10">服务号&nbsp;&nbsp;&nbsp;</span>
				<input type="radio" value="2" name="wx_type" /><span class="ml_10">订阅号&nbsp;&nbsp;&nbsp;</span>
			</div>

			//checkbox
			<div checkbox_group="true" name="brand_class" form_check="sys" ischeck="true" tip="请至少选择一个品类">
				<input type="checkbox" class="fl mr_3 mt_3" id="1" />
				<input type="checkbox" class="fl mr_3 mt_3" id="2" />
			</div>
		</form>
	</div>	

	var oModifyPass = new ajaxForm({

		subUrl: 'http://www.baidu.com',
		btnName:'pass_btn',
		boundName: 'pass_modify',
		otherCheck:{

			reNewPassWord:[
				function(ele){

					if ( !ele.val() ) {

						return false;

					} else {

						return true;	
					}
					
				},
				function(ele){

					if ( ele.val() != oNew.val() ) {

						return false;

					} else {


						return true;
					}

				}
			]
		},
		fnSumbit: function( data ) {

			data.reNewPassWord = oRnew.val();	
		},
		sucDo: function(data) {

			alert(data.msg);

			window.location = data.data;

		},
		failDo: function(data) {

			alert(data.msg);

		}

	});

	oModifyPass.upload();

*/

define(function(require, exports, module) {

	var request = require('../../util/http/request');
	var bodyParse = require('../../util/http/bodyParse');

	function AjaxForm(options) {

		this.oWrap = options.boundName ? $('[script-bound = '+ options.boundName +']') : $('[script-bound = form-check]');

		this.oSub = options.btnName ? this.oWrap.find('[script-role = '+ options.btnName +']') : this.oWrap.find('[script-role = confirm-btn]');

		this.loadOffset = 0;
		
		this.otherCheck = options.otherCheck || null;

		this.subUrl = options.subUrl || '';

		this.arrSelect = [];

		this.arrInput = [];

		this.arrRadio = [];

		this.arrcheckBox = [];

		this.arrOther = [];

		this.otherJude = options.otherJude || null;

		/* return json */
		this.fnSumbit = options.fnSumbit || null;

		this.sucDo = options.sucDo || null;

		this.failDo = options.failDo || null;

		this.noSub = options.noSub || null;

		this.closeCheck = options.closeCheck ? options.closeCheck : false;

		this.loaddingUrl = options.loaddingUrl || '../../../img/lib/loading/btn_loading.gif';

		this.param = {};
	}

	AjaxForm.prototype = {

		reload: function(options) {

			options = options || {};

			this.oWrap = options.boundName ? $('[script-bound = '+ options.boundName +']') : $('[script-bound = form-check]');

			this.oSub = options.btnName ? this.oWrap.find('[script-role = '+ options.btnName +']') : this.oWrap.find('[script-role = confirm-btn]');

			this.oSub.unbind('click');

			this.getEle();
			
			this.subMitEvent();

		},
		upload: function() {

			//this.clear();

			this.getEle();

			this.subMitEvent();
		},
		getEle: function() {

			var _this = this;

			//this.oLoading = this.makeLoading(this.oSub);

			var aChildren = this.oWrap.find('*');

			aChildren.each(function(i){

				if(aChildren.eq(i).attr('form_check'))
				{	
					_this.makeWrapTip(aChildren.eq(i));

					_this.judgeType(aChildren.eq(i));
				}

			});
		},
		judgeType: function(ele) {

			if(ele.attr('form_check') == 'sys') {

				if(ele.get(0).tagName == 'SELECT') {

					this.arrSelect.push(ele);

					this.checkSelect(ele)
				}
				else if(ele.attr('radio_group')) {

					this.arrRadio.push(ele);
					
					this.checkRadio(ele);
				}
				else if(ele.attr('checkbox_group')) {

					this.arrcheckBox.push(ele);

					this.checkBox(ele);
					
				}
				else if(ele.attr('type') == 'text' || ele.attr('type') == 'password' || ele.attr('type') == 'file' || ele.get(0).tagName == 'TEXTAREA') {

					this.arrInput.push(ele);

					this.checkText(ele);
					
				}
			}
			else if(ele.attr('form_check') == 'self') {	

				if(ele.get(0).tagName == 'SELECT') {

					this.arrOther.push(ele);
				}
				else if(ele.attr('radio_group')) {

					this.arrOther.push(ele);
				}
				else if(ele.attr('checkbox_group')) {

					this.arrOther.push(ele);	
				}
				else if(ele.attr('type') == 'text' || ele.attr('type') == 'password' || ele.attr('type') == 'file' || ele.tagName == 'TEXTAREA') {

					this.arrOther.push(ele);
				}

				this.checkother(ele);

			}
			
		},
		makeWrapTip: function(ele) {

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
			
			ele.parents('[script-role = check-wrap]').addClass('has-error');
		},
		tipRight: function(ele, oTip) {
			
			oTip.removeClass('wrong');

			oTip.attr('iswrong','false');

			ele.parents('[script-role = check-wrap]').removeClass('has-error');
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

			ele.focus(function(){

				oTip = $(this).parent().find('[script-role = wrong_area]');

				_this.tipRight(ele,oTip);

			});
		},
		getTip: function(oTarget) {

			return oTarget.parent().find('[script-role = wrong_area]');

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

			if(this.closeCheck) return;

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

			if(this.closeCheck) return;

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

			var _this = this;

			if(this.closeCheck) return;

			var aRadio = ele.find('input[type = radio]');
			var result = false;
			var oTip =  ele.parent().find('[script-role = wrong_area]');
			var sTip = ele.attr('tip');

			//延迟解决label点击问题
			setTimeout(function(){

				aRadio.each(function(i){

					if(aRadio.eq(i).attr('checked')) {	
						result = true;
					}

				});

				if(ele.attr('ischeck') == 'true' || ele.attr('ischeck') == 'free') {

					if(result) {	
						_this.tipRight(ele,oTip);
					}
					else {	
						_this.tipWrong(ele, oTip, sTip);
					}
				}

			},1)	
		},
		checkBox: function(ele) {	
			var _this = this;

			ele.click(function(){

				_this.checkJudge(ele);

			});
		},
		checkJudge: function(ele) {

			if(this.closeCheck) return;
			
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

				var isDisabled = $(this).attr('disabled');

				if(isDisabled == 'disabled') return;

				_this.subMit($(this));

			});
		},
		refresh: function() {

			//刷新表单状态
			var aWrong = this.oWrap.find('[script-role = wrong_area]');
			aWrong.attr('iswrong', 'false');
			aWrong.removeClass('wrong');
			$('[script-role = check-wrap]').removeClass('has-error');

		},
		subMit: function(oThis) {

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
						this.getAllData(oThis);
					}
				}
				else {	
					/* 提交 */
					this.getAllData(oThis);
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
		getAllData: function(oThis) {

			var _this = this;

			this.getAllParam();

			this.map(this.arrcheckBox, function(i){

				_this.getCheckData(_this.arrcheckBox[i]);

			});

			if(this.noSub) {

				this.noSub(this.param);

				return;
			}

			if(this.fnSumbit) {

				var newJson = this.fnSumbit(this.param);
				if(newJson == false) {
					return;
				}
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

					_this.sucDo && _this.sucDo(data, oThis, _this.param);
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