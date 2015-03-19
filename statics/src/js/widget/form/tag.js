/**
 *description:标签添加
 *author:fanwei
 *date:2015/1/21
 */

 /*
	编辑的时候只提交改变的
 */
define(function(require, exports, module) {
	
	var global = require("../../driver/global");
	var oTip = require('../dom/tip');
	var template = require('../../lib/template/artTemplate');

	var Tag = R.Class.create(R.util, {

		initialize: function(opts) {
			
			opts = opts || {};
			this.oWrap = opts.oWrap || null;
			this.oTagInput = this.oWrap.find('[tag-input]');
			this.oTagListWrap = this.oWrap.find('[tag-list-wrap]');
			this.renderData = opts.renderData;
			this.dataArr = [];
			this.tagName = opts.tagName || 'skillname';
			this.tagIdName = opts.tagIdName || 'pkSkill';

			this.tpl = 
			'{{each list}}'+
				'<span class="tag-list" tag-list>'+
					'<span class="tag-name" tag-name="{{$value.name}}" tag-id="{{$value.id}}">{{$value.name}}</span>'+
					'<span class="tag-close" tag-close>x</span>'+
				'</span>'+
			'{{/each}}';

			this.removeArr = [];
			this.editArr = [];
			this.buildCode = [13, 32];
			this.max = 10;
			
		},
		start: function() {

			if(this.renderData) {
				this.renderTag(this.renderData, 'write');	
			}

			this.getHasedTagData();
			this.events();

		},
		events: function() {
			
			var _this = this;

			//create
			this.oTagInput.on('keydown', function(e){

				var oThis = $(this);
				var nowCode = e.which;
				var i,
					num;

				num = _this.buildCode.length;

				for (i=0; i<num; i++) {

					if(_this.buildCode[i] == nowCode) {
						
						var str = oThis.val().replace(/\s+/gi, '');
						
						_this.create(str);

					}

				}		

			});

			//remove
			this.oTagListWrap.on('click', '[tag-close]', function(){

				_this.remove($(this));

			});
			
		},
		remove: function(oThis) {

			var oNowList = oThis.parents('[tag-list]');
			var oNowName = oNowList.find('[tag-name]');
			var nowName = oNowName.attr('tag-name');
			var nowId = oNowName.attr('tag-id');

			if(nowId) {
				var param = {};
				param[this.tagName] = nowName;
				param[this.tagIdName] = nowId;
				param['isdelete'] = "Y";
				this.removeArr.push(param);
			}

			var i,
				num,
				newArr;

			num = this.dataArr.length;
			newArr = [];	

			for (i=0; i<num; i++) {

				if(this.dataArr[i][this.tagName] == nowName) {
					this.dataArr[i] = '';
				}
			}

			for (i=0; i<num; i++) {
				if(this.dataArr[i]) {
					newArr.push(this.dataArr[i]);
				}
			}

			this.dataArr = newArr;

			oNowList.remove();

		},
		renderTag: function(data, way) {

			var render = template.compile(this.tpl);
			var html = render(data);
			var newList = $(html);

			if(way == 'write') {
				this.oTagListWrap.html('');
				this.oTagListWrap.append(newList);
			} else if(way == 'append') {
				this.oTagListWrap.append(newList);
			}	

		},
		getHasedTagData: function() {

			var _this = this;
			var aTag = this.oTagListWrap.find('[tag-name]');
			var nowTagName;
			var nowTagId;
			var num = aTag.length;

			this.dataArr = [];
			this.editArr = [];

			for (var i=0; i<num; i++) {

				var param = {};
				nowTagName = aTag.eq(i).attr('tag-name');
				nowTagId = aTag.eq(i).attr('tag-id');
				param[_this.tagName] = nowTagName;

				if(nowTagId) {
					param[_this.tagIdName] = nowTagId;
				}
				
				if(nowTagId) {
					_this.editArr.push(param);
				} else {
					_this.dataArr.push(param);
				}

			}
			
			return this.dataArr;

		},
		judge: function(str) {
			
			//判断输入合法性
			if(!str) {
				oTip.say('请输入内容');
				return;
			}

			if(str.length > this.max) {
				oTip.say('不能超过' + this.max + '个字');
				return;
			}

			var allArr = this.dataArr.concat(this.editArr);

			//判重
			var i,
				num;

			num = allArr.length;
			
			for (i=0; i<num; i++) {

				if(allArr[i][this.tagName] == str) {

					oTip.say('已存在该技能');
					return;
				}

			}

			return true;	
		},
		create: function(str) {
			
			var result = this.judge(str);

			if(result) {

				var data = {list: [
					{
						name: str,
						id: ''
					}
				]};

				this.renderTag(data, 'append');
				this.clearInput();
				this.getHasedTagData();
			}

		},
		clearInput: function() {

			this.oTagInput.val('');

		},
		getData: function() {

			this.dataArr = this.dataArr.concat(this.removeArr);

			var arrName = [];
			var arrId = [];
			var i,
				num;

			num = this.dataArr.length;
			for (i=0; i<num; i++) {

				arrName.push(this.dataArr[i][this.tagName]);
				arrId.push(this.dataArr[i][this.tagIdName]);

			}

			return {
				all: this.dataArr,
				names: arrName,
				ids: arrId
			};	

		},
		getTagLength: function() {
			return this.oTagListWrap.find('[tag-list]').length;
		}

	});

	module.exports = Tag;

});
