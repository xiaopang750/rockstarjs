module.exports = function() {

	var config = require('../config')();

	//多余文件的清除
	var clean = config.clean;

	return clean;

};