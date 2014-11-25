/**
 *description:颜色选择组件
 *author:fanwei
 *date:2014/08/01
 */
define(function(require, exports, module){

	//不用require是因为打包原因
	var loadCss = require('../../lib/http/loadCss');
	loadCss(R.uri.css + "widget/form/color.css");

	function Color(opts) {

		opts = opts || {};
		this.zIndex = opts.zIndex || 999;
		this.wrapClassName = opts.wrapClassName || 'widget-color-wrap';
		this.dotClassName = opts.dotClassName || 'widget-color-dot';
		this.inputEle = null;
	}

	Color.prototype = {

		init: function() {

			this.createLay();

			this.createColor();

			this.aDot = $('[widget-color-dot]');

			this.events();

		},
		loadCss: function(src) {

			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var oLink = document.createElement('link');
			oLink.rel = "stylesheet";
			oLink.href = src;
			head.appendChild(oLink);

		},
		events: function() {

			var _this = this;

			$(document).on('click', '[widget-color]', function(){

				_this.inputEle = $(this);

				_this.showLay($(this));

				return false;

			});

			this.oLay.on('mouseover', '[widget-color-dot]', function(){
				
				_this.aDot.removeClass('active');

				$(this).addClass('active');

			});

			this.oLay.on('mouseleave', function(){

				_this.aDot.removeClass('active');

			});

			$(document).on('click', function(){

				var isShow = _this.oLay.is(":visible");

				if(isShow) {
					_this.oLay.hide();
				}	

			});

			this.oLay.on('click', '[widget-color-dot]', function(){

				var color = $(this).css('backgroundColor');
				var sValue;

				if(color.charAt(0) == '#') {
					sValue = color;
				} else {
					sValue = _this.RGB2Hex(color);
				}

				_this.inputEle.val( sValue );

				_this.aDot.removeClass('active');

				$(this).addClass('active');

				_this.onSelect && _this.onSelect( _this.inputEle, sValue );

			});
		},
		RGB2Hex: function(str){

			if(/^(rgb|RGB)/.test(str)){

				var aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");

				var strHex = "#";

				for(var i=0; i<aColor.length; i++){
					var hex = Number(aColor[i]).toString(16);
					if(hex === "0"){
						hex += hex;	
					}
					strHex += hex;
				}

				if(strHex.length !== 7){
					strHex = str;	
				}

				return strHex;

			}else if(reg.test(str)){

				var aNum = str.replace(/#/,"").split("");

				if(aNum.length === 6){
					return str;	
				}else if(aNum.length === 3){
					var numHex = "#";
					for(var i=0; i<aNum.length; i+=1){
						numHex += (aNum[i]+aNum[i]);
					}
					return numHex;
				}

			}else{
				return str;	
			}
		},
		createColor: function() {

			var ColorHex = [
				'00',
				'33',
				'66',
				'99',
				'CC',
				'FF'
			];

			var SpColorHex = [
				'FF0000',
				'00FF00',
				'0000FF',
				'FFFF00',
				'00FFFF',
				'FF00FF'
			];

			var colorTable=''
		    for (i=0;i<2;i++){
		        for (j=0;j<6;j++){
		            colorTable=colorTable+'<tr height=15>'
		           /* colorTable=colorTable+'<td width=15 style="background-color:#000000">'
		            if (i==0){
		                colorTable=colorTable+'<td width=15 style="cursor:pointer;background-color:#'+ColorHex[j]+ColorHex[j]+ColorHex[j]+'" widget-color-select>'
		            }
		            else{
		                colorTable=colorTable+'<td width=15 style="cursor:pointer;background-color:#'+SpColorHex[j]+'" widget-color-select>'
		            }
		            colorTable=colorTable+'<td width=15 style="background-color:#000000">'*/
		            for (k=0;k<3;k++){
		                for (l=0;l<6;l++){
		                    colorTable=colorTable+'<td width=15 widget-color-select><span class='+ this.dotClassName +' style="cursor:pointer;background-color:#'+ColorHex[k+i*3]+ColorHex[l]+ColorHex[j]+'" widget-color-dot></span>'
		                }
		            }
		        }
		    }

		    colorTable=
		    '<table cellspacing="0" cellpadding="0" border="0" class='+ this.wrapClassName +'>'
		    +colorTable+'</table>';

		    this.oLay.html(colorTable);

		},
		createLay: function() {

			this.oLay = $('<div></div>');

			this.oLay.css({
				position: 'absolute',
				left: 0,
				top: 0,
				display: 'none',
				zIndex: this.zIndex
			});

			$('body').append(this.oLay);
		},
		set: function(l, t) {

			this.oLay.css({
				left: l,
				top: t
			});
		},
		showLay: function(oThis) {

			var l = oThis.offset().left;
			var t = oThis.offset().top + oThis.outerHeight(true);
			this.set(l, t);
			this.oLay.show();
		},
		getLay: function() {

			return this.oLay;

		}
	}

	var oColor = new Color();

	oColor.init();

	module.exports = oColor;
	
});