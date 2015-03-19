/**
 *description:内容管理添加编辑
 *author:fanwei
 *date:2015/1/31
 */
define(function(require, exports, module) {
	
	var global = require("../../../driver/global");
	var Tag =  require('../../../widget/form/tag');
	var bodyParse = require('../../../util/http/bodyParse');
	var placeHolder = require('../../../widget/dom/placeholder');
	var ajaxForm = require('../../../widget/form/ajaxForm');
	var oTip = require('../../../widget/dom/tip');
	var Upload = require('../../../widget/upload/main');
	require('../../../widget/ueditor/ueditor.all');

	var AddEdit = R.Class.create(R.util, {

		initialize: function() {

			this.oTagInput = $('[tag-input]');
			this.oPhotoWrap = $('[webuploader-list-wrap]');
			this.oContentId = $('[contentId]');
			this.oLoadingWrap = $('[loading-wrap]');
			this.oLoadingText = $('[loading-text]');
			this.oLoadingPercent = $('[loading-percent]');
			this.contentId = this.oContentId.text();
			this.maxPic = 5;
			this.maxTag = 10;

			this.pageInfo = bodyParse();
			this.cid = this.pageInfo.cid;
			this.judge();
			this.initEditor();
			this.initTagWidget();
			this.showHolderTip();
			this.initUpload();
			this.events();

		},
		judge: function() {

			if(this.cid || this.contentId) {
				//编辑
				this.nowSubUrl = R.interfaces.content.edit;

			} else {
				this.nowSubUrl = R.interfaces.content.add;

			}

			this.sub();	

		},
		initUpload: function() {

			var _this = this;

			this.oUpload = new Upload({
				idName: 'pkPhoto',
				operateData: function(arr, param, nowId, oList) {

					if(param.url) {

						var isDesktop = oList.attr('desktop');

						if(!nowId && isDesktop!= 'Y') {
							arr.push(param);
						}

						if(isDesktop == 'Y') {

							param.isfirst = 'Y';

							if(nowId) {
								param[_this.oUpload.idName] = nowId;
							}
			
							arr.push(param);

						}

					}
				},
				thumbWidth: 300,
				thumbHeight: 300
			});

			this.oUpload.init();

		},
		initEditor: function() {

			if($('#editor').length) {
				this.ue = UE.getEditor('editor');
			}

		},
		initTagWidget: function() {

			//标签
			this.oTag = new Tag({
				oWrap: $('[tag-wrap]'),
				tagName: 'tagname',
				tagIdName: 'pkTag'
			});

			this.oTag.start();

		},
		showHolderTip: function() {

			//标签 placeholder

			new placeHolder(this.oTagInput);

		},
		sub: function() {

			var _this = this;

			this.oSubForm = new ajaxForm({

				subUrl: this.nowSubUrl,
				otherJude: [

					function() {
						//验证tag
						var tagLength = _this.oTag.getTagLength();

						if(tagLength) {

							return true;

						} else {

							oTip.say('请至少输入一个标签');
							return false;
						}

					}, function() {
						//验证正文
						var content = _this.ue.getContent();

						if(content) {

							return true;

						} else {

							oTip.say('正文不能为空');
							return false;
						}

					}, function() {

						var picLength = _this.oUpload.getPicLength();

						if(picLength) {

							return true;

						} else {

							oTip.say('请至少上传一张轮播图');
							return false;
						}

					}, function() {

						//验证轮播图有没有作为封面图
						var aList = $('[webuploader-list]');
						var result = false;
						aList.each(function(i){

							if(aList.eq(i).attr('desktop') == 'Y') {

								result = true;

							}

						});

						if(result) {
							return true;
						} else {
							oTip.say('请从轮播图中选择一张图片作为封面图');
							return false;
						}

					}, function() {

						//验证轮播的个数
						var nowPicLength = _this.oUpload.getPicLength();

						if(nowPicLength > _this.maxPic) {

							oTip.say('轮播图不能超过' + _this.maxPic + '张');

							return false;

						} else {

							return true;
						}

					}, function() {

						//验证标签的个数
						var nowTagLength = _this.oTag.getTagLength();

						if(nowTagLength > _this.maxTag) {

							oTip.say('标签图不能超过' + _this.maxTag + '个');

							return false;

						} else {

							return true;
						}

					}

				],
				noSub: function(data) {

					this.loadingShow();

					data.taglist = JSON.stringify(_this.oTag.getData().all);

					_this.oUpload.data = data;

					_this.oUpload.start();

					var nowUploadNum = _this.oUpload.getNum();
					
					if(!nowUploadNum) {
						data.photolist = _this.oUpload.getPicData();
						_this.subForm(data);
					}
	
				}

			});

			this.oSubForm.upload();

		},
		events: function() {
			
			var _this = this;

			//uploadEnd
			this.oUpload.onEnd = function(arr) {

				this.data.photolist = this.getPicData();
				_this.subForm(this.data);
			};

			//uploadProgress
			this.oUpload.onProgress = function(percent) {

				var percentText = percent * 100;

				_this.oLoadingWrap.show();
				_this.oLoadingText.html(percentText + '%');
				_this.oLoadingPercent.css('width', percentText + '%');

			};


			this.oPhotoWrap.on('click', '[to-face]', function(){

				_this.toFace($(this));

			});

		},
		toFace: function(oThis) {

			//作为封面图;
			var oList = oThis.parents('[webuploader-list]');
			var aList = $('[webuploader-list]');

			aList.removeAttr('desktop');
			aList.removeClass('desktop');
			oList.attr('desktop', 'Y');
			oList.addClass('desktop');

		},
		subForm: function(data) {

			var _this = this;

			//表单提交
			this.reqUrl = this.nowSubUrl;
			this.reqParam = data;
			if(this.cid) this.reqParam.pkContent = this.cid;
			this.reqParam.contentbody = this.ue.getContent();
			this.reqParam.modelPicList = this.oUpload.getModelData();
			//this.reqParam.photolist = this.judgeIsDesktopPic();

			if(this.pageInfo.pkType) {
				this.reqParam.pkType = this.pageInfo.pkType;
				this.reqParam.contenttype = this.pageInfo.contenttype;
				this.reqParam.pkContent = this.contentId;
			}

			this.req(function(data){

				//oTip.say(data.msg);
				_this.oSubForm.loadingHide();

				window.location = data.data;

			}, function(data){

				oTip.say(data.msg);
				_this.oSubForm.loadingHide();

			});

		}

	});

	var oAddEdit = new AddEdit();

});
