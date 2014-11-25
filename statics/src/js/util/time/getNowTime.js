/**
 *description:获取当前客户端时间
 *author:fanwei
 *date:2014/09/05
 */
define(function(require, exports, module){
	
	var toDouble = require('./toDouble');

	function getNowTime(detail, dot) {

		var oDate,
	        y,
	        m,
	        d,
	        h,
	        m,
	        s,
	        time,
	        timer;

	    dot = dot || "-";
	    oDate = new Date();
	    y = oDate.getFullYear();
	    month = oDate.getMonth() + 1;
	    d = oDate.getDate();
	    h = oDate.getHours();
	    m = oDate.getMinutes();
	    s = oDate.getSeconds();

	    if(detail) {
	    	time = y + dot + toDouble(month) + dot + toDouble(d) + ' ' + toDouble(h) + ':' + toDouble(m) + ':' + toDouble(s);	
	    } else {
	    	time = y + dot + toDouble(month) + dot + toDouble(d);
	    }
	   	
	    timer = time.replace(/\-/gi, "/");

	    return {
	    	time: time,
	    	timer: new Date(timer).getTime()
	    };

	}

	return getNowTime;
	
});