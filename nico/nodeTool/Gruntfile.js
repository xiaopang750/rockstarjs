module.exports = function(grunt) {

    grunt.initConfig({
       
        get_data: {

            all: {
                path: '../doc',
                template: '../template/index.html',
                dataDest: '../site/index.html'
            }
        },
        markdown: {
            all: {
              options: {
                template: '../template/detail.html'
              },  
              files: [
                {
                  expand: true,
                  cwd: '../doc',
                  src: '**/*.md',
                  dest: '../site/views',
                  ext: '.html'
                }
              ]
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
                '../site'  
              ]
            }
          }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['../doc/**/*.md'],
                tasks: ['markdown', 'get_data']
            },
            livereload: {
                options:{
                    livereload: true
                },
                files: [
                    '../doc/**/*.md'
                ]
            }
        }
		      
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('get-doc-data');

    grunt.registerTask('builder', [
        'connect:server',
        'watch',
        'markdown',
        'get_data' 
    ]);

    grunt.registerTask('test', [
        'get_data' 
    ]);

};

