/*
 *description:cookie
 *author:fanwei
 *date:2013/12/01
 */
define(function(require, exports, module) {

	var cookie = cookie||{};

	cookie.setCookie = function(name,value,time) {
		
		//time格式: 1sec 2min 3hour 4day 6year
		var num,
			dec,
			change,
			oDate;

		num = time.match( /\d+/ )[0];
		dec = time.substring( num.length );

		change = {

			sec: num,

			min: num * 60,

			hour: num * 60 * 60,

			day: num * 60 * 60 * 24,

			year: num * 60 * 60 * 24 * 365
		};

		if( !change[dec] && time.indexOf('-') == '-1' ) {

			if(window.console) {

				console.log('cookie.js: 没有传入时间，或传入的时间后缀不正确(1sec, 2min, 3hour, 4day 5year)');
			}
			
			return;
		}

		oDate = new Date();

		//如果传入的时间前面带-号则删除cookie;
		oDate.setSeconds( oDate.getSeconds() + (change[dec] || -1));

		document.cookie = name + '=' + value + ';expires=' + oDate.toGMTString() + ';path=/';
	};


	cookie.getCookie = function(name) {

		var arr,
			arr2,
			i,
			num;

		arr = document.cookie.split('; ');

		num = arr.length;

		for (i=0; i<num; i++) {

			arr2 = arr[i].split('=');

			if(arr2[0] === name) {

				return arr2[1];
			}
		}

		return "";
	};

	cookie.removeCookie = function(name) {

		cookie.setCookie(name, 1, '-1sec');
	};

	return cookie;

});