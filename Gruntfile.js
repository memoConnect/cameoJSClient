module.exports = function(grunt) {
    // Do grunt-related things in here

    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: ['app/js/controller/login.js', 'app/js/controller/start.js', 'app/js/controller/talks.js'],
                dest: 'app/js/controller/built.js'
            }
        },

        min: {
            dist: {
                src: ['<config:concat.dist.dest>'],
                dest: 'app/js/controller/build.min.js'
            }
        }
    });

    grunt.registerTask('default', 'concat');
};