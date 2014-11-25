module.exports = function() {

	//所有的相对路径是 相对于Gruntfile.js的位置

	var nowDomain = '..';
	var nowVersion = new Date().getTime();

	var config = {

		replace: {

			changePage: {

				patterns: [
					{
						match: '../statics',
			          	replacement: nowDomain + '/statics'
					},
					{
						match: '/src/',
			          	replacement: '/build/'
					},
					{
			          match: /\.css/g,
			          replacement: '.css?' + nowVersion
			        }
				],
				cwd: '../views',
				src: '**/*.*',
				dest: '../views'
			},
			complie: {	
				
				less: {
					baseUrlLess: '../statics/src/less',
					baseUrlCss: '../statics/src/css',
					file: '**/*.less',
					extName: '.css'
				},
				views: {
					files: {
						cwd: '../views',
						files: '**/*.*'
					}
					
				}
			},
			driverConfig: {

				patterns: [
					{
						match: '/example/',
			          	replacement: '/'
					},
					{
						match: '../statics/src/css/',
			          	replacement: nowDomain + '/statics/build/css/'
					},
					{
						match: '../statics/assets/',
			          	replacement: nowDomain + '/statics/assets/'
					}
				],
				src: 'seaTransport/driver/config.js',
				dest: 'seaTransport/driver'
			},
			seaConfig: {

				patterns: [
					{
			          match: '../statics/src/js',
			          replacement: nowDomain + '/statics/build/js'
			        },
			        {
			        	match: 'version',
			          	replacement: nowVersion
			        }
				],
				src: '../statics/seajs/config.js',
				dest: '../statics/seajs'
			}

		},
		transport: {	
			cwd: '../statics/src/js',
			files: '**/*.js',
			dest: 'seaTransport'
		},
		cmdConcat: {
			cwd: 'seaTransport',  
	        files: '**/*.js',  
	        dest: '../statics/build/js'
		},
		uglify: {

			taskjs: {
				cwd: '../statics/build/js',  
		        files: '**/*.js',  
		        dest: '../statics/build/js'
			},
			seajs: {
				files: '../statics/seajs/sea.js', 
		        dest: '../statics/seajs'
			}
			
		},
		cssmin: {
			cwd: '../statics/src/css',  
	        files: '**/*.css',  
	        dest: '../statics/build/css'
		},
		clean: [
			'seaTransport'
		],
		jshint: {
			options: {
				curly: true,  // if() {} while 语句要加大括号
                eqeqeq: true, // ===
                debug: false,  // 关闭debugger
                onevar: true,   //函数只能被声明一遍
                asi: false,   //结尾加;号
                newcap: true, //构造函数首字母大写
                globals: {
                    "jQuery": true,
                    "define": true,
                    "seajs": true,
                    "require": true,
                    "$": true,
                    "R": true
                }
			},
			files: [
				'../statics/src/js/main/**/*.js',
				'../statics/src/js/sub/**/*.js',
				'../statics/src/js/job/**/*.js'
			],
			errorDest: '../statics/doc/jshint.html',
			errorTemp: './tpl/jshint'
		},
		staticsDomain: nowDomain,
		nowVersion: nowVersion
		
	}

	return config;

};