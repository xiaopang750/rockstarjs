/**
 *description:返回字符串字符长度
 *author:fanwei
 *date:2013/09/16
 */
define(function(require, exports, module){
	
	function getCharLen(str) {

		var i,
			num,
			re,
			count,
			nowstr,
			isChinese;

		num = str.length;
		count = 0;
		re = /[\u4e00-\u9fa5]/;
		
		for ( i=0; i<num; i++) {

			nowstr = str.charAt(i);
			isChinese = re.test(nowstr);

			if( isChinese ) {
				count += 2;
			} else {
				count++;
			}

		}	

		return count;

	}

	return getCharLen;

});