/**
 *description:上传主逻辑
 *author:fanwei
 *date:2015/1/30
 */

 /*
	编辑的时候只提交改变的
 */
define(function(require, exports, module) {
	
	var global = require("../../driver/global");
	var template = require('../../lib/template/artTemplate');
	var Dialog = require("../../widget/dom/dialog");
	var oTip = require('../dom/tip');
	require('./webuploader');

	var Upload = R.Class.create(R.util, {

		initialize: function(opts) {

			opts = opts || {};

			this.allPercent = {};
			this.maxFileSize = opts.maxFileSize || 1 * 1024 * 1024;
			this.thumbWidth = opts.thumbWidth || 125;
			this.thumbHeight = opts.thumbHeight || 125;
			this.serverUrl = opts.serverUrl || R.interfaces.global.upload;
			this.oUploadBtn = opts.oUploadBtn || $('[uploadBtn]');
			this.accept = opts.accept || {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,png',
				mimeTypes: 'image/*'
			};
			this.onStart = opts.onStart || null;
			this.onEnd = opts.onEnd || null;
			this.onProgress = opts.onProgress || null;
			this.urlName = opts.urlName || 'url';
			this.shortUrlName = opts.shortUrlName || 'shorturl';
			this.idName = opts.idName || 'pkAttachment';
			this.operateData = opts.operateData || null;
			this.removeArr = [];

			this.viewTpl = opts.viewTpl || 
			'<span class="webuploader-view-list" webuploader-list>'+
				'<div class="webuploader-view-list-toolbar-wrap" webuploader-view-list-toolbar-wrap>' +
					'<div class="webuploader-view-list-toolbar-shadow"></div>' +
					'<div class="webuploader-view-list-toolbar">'+
						'<div class="tool-detail">' +
							'<span class="fa fa-desktop ba-mr-10" title="作为封面图" to-face></span>' +
							'<span class="fa fa-trash-o ba-font-16" upload-remove title="删除"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<img src="{{src}}" width="100%">' +
			'</span>';
			this.nowSum = 0;
			this.nowDone = 0;
			this.picArr = [];
			this.oViewWrap = $('[webuploader-list-wrap]');
			this.initRemoveBox();

		},
		initRemoveBox: function() {

			this.oRemovBox = new Dialog({
				content: '确认删除么?'
			});
		},
		init: function() {

			this.uploader = WebUploader.create({
			    swf: R.uri.jsPath + 'widget/upload/Uploader.swf',
			    server: this.serverUrl,
			    pick: this.oUploadBtn,
			    resize: false,
			    thumb: {
			    	width: this.thumbWidth,
			    	height: this.thumbHeight
			    },
			    accept : this.accept,
				fileSingleSizeLimit: this.maxFileSize
			});	

			this.events();

		},
		events: function() {

			var _this = this;

			this.uploader.onFileQueued = function(file){

				_this.uploader.makeThumb(file, function(error, src){
					
					if(error) {
						oTip.say('不能预览');
						return;
					}

					_this.addFile(src, file);

				});

			};

			this.uploader.onUploadProgress = function(file, percent) {

				_this.allPercent[file.id][1] = percent;

				_this.updateTotalProgress();
			};

			this.oRemovBox.onConfirm = function() {

				_this.removeFile(_this.nowRemove);

				this.close();

			};

			//error
			this.uploader.onError = function(code) {

				var tipStr;

				switch(code) {
					case 'F_DUPLICATE':
						tipStr = '您已上传过该图片';
					break;

					case 'F_EXCEED_SIZE':
						tipStr = '单张图片不能超过' + _this.maxFileSize/1024/1024 + 'M';
					break;

				}
								
				oTip.say(tipStr);

			};

			//ToolBar
			this.oViewWrap.on('mouseenter', '[webuploader-list]', function(){

				_this.showToolBar($(this));

			});

			this.oViewWrap.on('mouseleave', '[webuploader-list]', function(){

				_this.hideToolBar($(this));

			});


			//remove
			this.oViewWrap.on('click', '[upload-remove]', function(){

				_this.nowRemove = $(this);

				_this.oRemovBox.show();

			});

			//allFinish
			this.uploader.onUploadSuccess = function(file, response){

				_this.nowDone ++;

				var info = response.data;
				
				_this.picArr.push(info);

				file.nowList.attr({
					url:info.url,
					thumb: info.thumb,
					orgWidth: info.orgWidth,
					orgHeight: info.orgHeight
				});

				if(_this.nowDone == _this.nowSum) {
					_this.onEnd && _this.onEnd(_this.picArr);
				}
			};

			//start
			this.uploader.onUploadStart = function(file){
				this.options.formData = {
					thumb: file.thumb
				};
			};

			//ready
			this.oUploadBtn.show();

		},
		updateTotalProgress: function() {

			//计算总进度
			var total,
				loaded,
				percent;

			total = 0;
			loaded = 0;

			$.each(this.allPercent, function(name, value){

				total += value[0]; //size
				loaded += value[0] * value[1] //size * percent;

			});	

			percent = total ? loaded / total : 0;

			this.onProgress && this.onProgress(percent);

		},
		start: function() {

			this.nowDone = 0;
			this.uploader.upload();
			this.picArr = [];
			this.onStart && this.onStart();

		},
		showToolBar: function(oList) {

			var oBar = oList.find('[webuploader-view-list-toolbar-wrap]');
			oBar.stop().animate({top: 0});

		},
		hideToolBar: function(oList) {

			var oBar = oList.find('[webuploader-view-list-toolbar-wrap]');
			oBar.stop().animate({top: '-30px'});

		},
		removeFile: function(oBtn) {

			var oList = oBtn.parents('[webuploader-list]');
			var nowId = oList.attr('pk');
			var nowUrl = oList.attr('url');
			var nowShortUrl = oList.attr('thumb');
			var nowFile = oList.data('file');
			
			if(nowId) {
				var param = {};
				param[this.urlName] = nowUrl;
				param[this.shortUrlName] = nowShortUrl;
				param[this.idName] = nowId;
				param['isdelete'] = 'Y';
				this.removeArr.push(param);
			}

			if(nowFile) {
				this.uploader.removeFile(nowFile);
				delete this.allPercent[nowFile.id];
				this.nowSum --;
			}

			oList.remove();

		},
		addFile: function(src, file) {
			
			var render = template.compile(this.viewTpl);
			var data = {
				src: src
			};
			var html = render(data);
			var oNewList = $(html);
			oNewList.data('file', file);
			file.thumb = src;		
			this.oViewWrap.append(oNewList);
			file.nowList = oNewList;
			this.nowSum ++;
			this.allPercent[file.id] = [file.size, 0];
		},
		getNum: function() {

			//获取文件数
			return this.uploader.getStats().queueNum;

		},
		reset: function() {
			this.uploader.reset();
		},
		getPicData: function() {

			var _this = this;

			//方便批量更新数据
			var arr = [];
			var aList = this.oViewWrap.find('[webuploader-list]');
			var nowId;
			var oList;
			aList.each(function(i){

				oList = aList.eq(i);
				nowId = oList.attr('pk');
				var param = {};
				param[_this.urlName] = oList.attr('url');
				param[_this.shortUrlName] = oList.attr('thumb');
				//图片宽高信息,用于app端的比例计算
				param['shortwidth'] = _this.thumbWidth;
				param['shortheight'] = _this.thumbHeight;
				param['width'] = oList.attr('orgWidth');
				param['height'] = oList.attr('orgHeight');

				if(_this.operateData) {

					_this.operateData(arr, param, nowId, oList);

				} else {

					if(!nowId && param[_this.urlName]) {
						arr.push(param);
					}
				}

			});

			arr = arr.concat(this.removeArr);

			return JSON.stringify(arr);
		},
		getModelData: function() {

			//获取用于生成静态页的数据
			var _this = this;
			var arr = [];
			var aList = this.oViewWrap.find('[webuploader-list]');
			aList.each(function(i){

				oList = aList.eq(i);
				var param = {};
				param[_this.urlName] = oList.attr('url');
				param[_this.shortUrlName] = oList.attr('thumb');
				arr.push(param);

			});

			return JSON.stringify(arr);

		},
		getPicLength: function() {
			return this.oViewWrap.find('[webuploader-list]').length;
		}

	});

	module.exports = Upload;

});
