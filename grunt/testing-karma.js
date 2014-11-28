module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('tests-unit', [
        'app:to-dist',
        'search:language-keys',
        'karma:jenkins'
    ]);

    return {
        tasks: {
            karma: {
                options: {
                    configFile: 'config/karma-base.conf.js'
                },
                jenkins: {
                    reporters: ['progress', 'junit'],
                    browsers: ['PhantomJS']
                },
                unit: {
                    singleRun: false,
                    autoWatch: true,
                    runnerPort: 6108,
                    browsers: ['Chrome']
                }
            }
        }
    }
};