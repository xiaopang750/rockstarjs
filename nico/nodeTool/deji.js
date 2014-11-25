module.exports = function(grunt) {
    
    //template
    var template = require('art-template');
    var templateDir = '../static/template/';
    var templateBlock = {
        header: templateDir + 'header',
        footer: templateDir + 'footer',
        nav: templateDir + 'nav',
        leftNav: templateDir + 'leftNav'
    }

    grunt.initConfig({
       
        markdown: {
            all: {
              files: [
                {
                  expand: true,
                  cwd: '../doc',
                  src: '**/*.md',
                  dest: '../views',
                  ext: '.html'
                }
              ]
            },
            options: {
                preCompile: function(src, context) {

                    //## 为left-导航;

                    var re,
                        arrNav,
                        count,
                        destFileName;

                    re = /\{([\s\n]|[^}])*\}/;
                    arrNav = /\#\#/
                    count = 0;
                    arrNav = [];    

                    grunt.file.recurse('../static/doc', function(abspath, rootdir, subdir, filename){

                        count++;

                        var content = grunt.file.read(abspath);

                        var str = content.match(re)[0];

                        var data = JSON.parse(str);

                        destFileName = filename.replace('md', 'html');

                        data.link = './' + destFileName;

                        arrNav.push(data);

                    });

                    arrNav.sort(function(a, b){

                        return a['index'] - b['index'] > 0;

                    });
                                        
                    var str = src.match(re)[0];

                    var data = JSON.parse(str);

                    for(var i in data) {
                        context[i] = data[i];
                    }

                    src = src.replace(re, "");

                    var header = template(templateBlock.header, {});
                    var nav =  template(templateBlock.nav, {nav: arrNav});
                    var footer = template(templateBlock.footer, {});

                    context.header = header;
                    context.nav = nav;
                    context.footer = footer;

                    return src;

                },
                postCompile: function(src, context) {

                    var re = /\<h2.+\<\/h2\>/gi;
                    var reName = /\<[^>]+\>/gi;
                    var arr = [];

                    var result = src.match(re);

                    if(!result) return;

                    var num = result.length;

                    for (var i=0; i<num; i++) {

                       result[i] = result[i].replace(reName, '');

                       var json = {};

                       json.name = result[i];

                       arr.push( json );

                    }

                    var leftNav = template(templateBlock.leftNav, {leftNav: arr});
                    context.leftNav = leftNav;

                }
            }
        },
        connect: {
          options: {
            port: 9999,
            hostname: '127.0.0.1',
            livereload: 35729  
          },
          server: {
            options: {
              open: true, 
              base: [
                '../static'  
              ]
            }
          }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['../static/doc/**/*.md' ],
                tasks: ['markdown']
            },
            livereload: {
                options:{
                    livereload: true
                },
                files: [
                    '../static/**/*.*'
                ]
            }
        }
		      
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-markdown');

    grunt.registerTask('builder', [
        'connect:server',
        'watch',
        'less',
        'markdown' 
    ]);

};

