module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('tests-unit', [
        'app:to-dist',
        'search:language-keys',
        'karma:jenkins'
    ]);

    var files = [
        'test/lib/jquery/*.js',
        'dist/app/vendor*.js',
        'test/lib/angular/angular-mocks.js',
        'dist/app/cameo*.js',

        'dist/app/i18n/*.json',
        'build/i18n/language-keys.json'
    ];

    var specs = grunt.option('specs');
    if(!specs){
        files.push('test/unit/**/*.spec.js');
    } else {
        files.push(specs);
    }

    return {
        tasks: {
            karma: {
                options: {
                    files: files,
                    configFile: 'test/unit/config/karma.js',
                    preprocessors: {
                        'dist/app/i18n/*.json': ['json2js'],
                        'build/i18n/language-keys.json': ['json2js']
                    },
                    // for all i18n json strip to ->/i18n
                    ngJson2JsPreprocessor: {
                        stripPrefix: '(dist/app/)|(build/)'
                    }
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