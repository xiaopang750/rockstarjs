/**
 *description:返回m-n的随机数
 *author:fanwei
 *date:2013/06/04
 */
define(function(require, exports, module){
	
	function rnd(m ,n) {

		return parseInt(Math.random() * ( (m + 1) -n) + n);

	}

	return rnd;

});