seajs.config({
	base: '../statics/src/js',
	alias: {
    	'jquery': 'lib/jquery/1.7.1/jquery'

  	},
  	preload: ['jquery'],
  	map: [
    	[ /^(.*\.(?:css|js))(.*)$/i, '$1?version']
  	]
});