/**
 *description:照相
 *author:fanwei
 *date:2015/01/12
 */
define(function(require, exports, module){
	
	var Class = require("../lib/ooClass/class");
	var Ui = require('./ui');
	var oUi = new Ui();
	
	var Camera = Class.create({

		initialize: function() {

			this.loadingDelay = 500;

		},
		getCamera: function() {

			return plus.camera.getCamera();

		},
		photo: function(suc, fail) {

			//照相
			var _this = this;
			var cmr = this.getCamera();
			cmr.captureImage( function( path ){

					oUi.uiLoading.show();

					plus.io.resolveLocalFileSystemURL( path, function ( entry ) {

						var localFile = entry.toLocalURL();

						entry.file(function(file){

							_this.read(file, function(result){

								suc && suc(result);

								_this.save(localFile, function(){

									suc && suc(result);

								});

							});

						});

					}, function ( error ) {

						fail && fail(error.message);

					});

				},
				function( error ) {

					fail && fail(error.message);
				}
			);

		},
		read: function(file, suc) {

			//把照片读成流
			var reader = new plus.io.FileReader();
			var _this = this;

			reader.onloadend = function ( e ) {
								
				var reulst = e.target.result;

				suc && suc(reulst);

				setTimeout(function(){

					oUi.uiLoading.hide();

				}, _this.loadingDelay);

			};

			reader.readAsDataURL(file);

		},
		save: function(path, suc, fail) {

			//保存照片
			plus.gallery.save(path, function(){

				suc && suc();

			}, function(error){

				fail && fail(error.message);

			});

		},
		pick: function(suc, fail) {

			var _this = this;

			//选择照片
			plus.gallery.pick(function(path){

				oUi.uiLoading.show();

				plus.io.resolveLocalFileSystemURL( path, function ( entry ) {

					entry.file(function(file){

						_this.read(file, function(reulst){

							suc && suc(reulst);
						});


					});

				});	
				

			}, function(error){

				fail && fail(error.message);

			}, {

				popover : {
					width:200,height:200
				}
			});

		}

	});

	var oCamera = new Camera();

	return oCamera;
	
});