/**
 *description:非双数补0
 *author:fanwei
 *date:2013/06/04
 */
 define(function(require, exports, module){
 	
 	function toDouble(num) {

 		if(num<10) {

 			return "0"+num;
 		} else {
 			return num;
 		}

 	}

 	return toDouble;	
 
 });