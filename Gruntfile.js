module.exports = function(grunt) {
    // Do grunt-related things in here
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')

       ,concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: ['app/js/controller/login.js', 'app/js/controller/start.js', 'app/js/controller/talks.js'],
                dest: 'app/js/controller/built.raw.js'
            }
        }

       ,uglify: {
            jsController:{
                files: {
                    'app/js/controller/build.min.js':'<%= concat.js.dest %>'
                }
            }
        }

       ,coffee: {
            compile: {
                files: [
                    {
                        expand: true
                       ,cwd: 'app/coffee/'
                       ,src: ['**/*.coffee']
                       ,dest: 'app/coffee/'
                       ,ext: '.js'
                    }
                ]
            }
        }

       ,watch: {
            coffee: {
                files: ['app/coffee/**/*.coffee']
               ,tasks: ['coffee']
               ,options: {
                    event: 'all'
                }
            }
        }
    });

//    grunt.registerTask('default', ['concat','uglify']);
//    grunt.registerTask('coffeeTest', 'coffee');
    grunt.registerTask('coffeeTest', 'watch');
};