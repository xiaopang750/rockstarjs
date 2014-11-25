module.exports = function(grunt) {

    var config = require('./config')();
    var lessTask = require('./task/less')();
    var replaceTask = require('./task/replace')();
    var transportTask = require('./task/transport')();
    var copyTask = require('./task/copy')();
    var concatTask = require('./task/cmd_concat')();
    var cleantTask = require('./task/clean')();
    var uglifyTask = require('./task/uglify')();
    var cssminTask = require('./task/cssmin')();
    var jshintTask = require('./task/jshint')(grunt);
    var compile = config.replace.complie;
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport: {
           '生产环境cmdTransport': transportTask 
        },
        concat_cmd: {
            '生产环境cmdConcat': concatTask
        },
        uglify: {
            '生产环境js压缩': uglifyTask.js,
            '生产环境seajs压缩': uglifyTask.seajs
        },
        cssmin: {
            '生产环境css压缩': cssminTask
        },
        clean: {
            '生产环境删除无用的目录': cleantTask
        },
        replace: {
            '生产环境替换seajs配置': replaceTask.seaConfig,
            '生产环境替换driver配置': replaceTask.driverConfig,
            '生产环境替换views路径': replaceTask.pageConfig
        },
        less: {
            '开发环境编译less': lessTask.complie
        },
        copy: {

        },
        jshint: {
            'js语法书写规范检测': jshintTask
        },
        watch: {

            options: {
                spawn: false
            },
            scripts: {
                files: [ 
                    compile.less.baseUrlLess + '/' + compile.less.file,
                    compile.views.files.cwd + '/' + compile.views.files.files
                ],
                tasks: ['less']
            },
            livereload: {
                options:{
                    livereload: true
                },
                files: [
                    compile.less.baseUrlLess + '/' + compile.less.file,
                    compile.views.files.cwd + '/' + compile.views.files.files
                ]
            }
        }
		      
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-cmd-transport");
    grunt.loadNpmTasks("grunt-cmd-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //开发环境builder页面
    grunt.registerTask('builder', [
        'watch'
    ]);

    grunt.registerTask('static', [
        'transport',
        'replace:生产环境替换seajs配置',
        'replace:生产环境替换driver配置',
        'concat_cmd',
        'cssmin',
        'clean'/*,
        'uglify:生产环境js压缩',
        'uglify:生产环境seajs压缩'*/
    ]);

    grunt.registerTask('views', [
        'replace: 生产环境替换views路径'
    ]);

    //开发环境js语法检测
    grunt.registerTask('test', [
        'jshint'
    ]);
};


