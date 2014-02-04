module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js'
                , 'app/js/bootstrap/*.js'
                , 'app/js/service/*.js'
                , 'app/js/bootstrap/*.js'
                , 'app/js/directives/*.js'
                , 'app/js/controller/*.js'
                , 'test/jasmine/**/*.js']
        }
    });
};