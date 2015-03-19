/**
 *description:json转str
 *author:fanwei
 *date:2015/03/05
 */

 /*
	{name:2, age:3}  => name=2&age=3	
 */

 define(function(require, exports, module){
 	
 	function jsonStr(json, join) {

 		join = join || '&';

 		var arr = [];
 		var str;

 		for (var attr in json) {

 			str = attr + '=' + json[attr];
 			arr.push(str)

 		}

 		return arr.join(join);

 	}

 	return jsonStr;	
 
 });