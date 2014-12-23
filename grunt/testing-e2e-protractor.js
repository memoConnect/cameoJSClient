module.exports = function (grunt, options) {

    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('tests-e2e', [
        'tests-e2e:prepare',
        'protractor:tier1',
        'protractor:tier2',
        'protractor:tier3',
        'protractor:perf'
    ]);
    grunt.registerTask('tests-e2e:tier1', [
        'tests-e2e:prepare',
        'protractor:tier1'
    ]);
    grunt.registerTask('tests-e2e:tier2', [
        'tests-e2e:prepare',
        'protractor:tier2'
    ]);
    grunt.registerTask('tests-e2e:tier3', [
        'tests-e2e:prepare',
        'protractor:tier3'
    ]);
    grunt.registerTask('tests-e2e:perf', [
        'tests-e2e:prepare',
        'protractor:perf'
    ]);
    grunt.registerTask('tests-e2e:all', [
        'tests-e2e:prepare',
        'protractor:all'
    ]);
    grunt.registerTask('tests-e2e:prepare', [
        'test:generate-keys',
        'app:to-dist'
    ]);

    grunt.registerTask('tests-2e2', ['tests-e2e']);
    grunt.registerTask('tests-multi', [
        // we only need to generate templates for tests
        'template:config-tests',
        'template:config-protractor-multi',
        'protractor:default'
    ]);

    grunt.registerTask('protractor:config', [
        'template:config-protractor',
        'template:config-tests'
    ]);

    return {
        tasks: {
            protractor: {
                options: {
                    configFile: "test/e2e/config/protractor.js", // Default config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false, // If true, protractor will not use colors in its output.
                    args: {
                        // Arguments passed to the command
                    },
                    debug: options.globalCameoTestConfig.config.protractorDebug
                },
                "all": {
                    options: {
                        "args": {
                            "specs": [
                                "test/e2e/**/*.spec.js"
                            ]
                        }
                    }
                },
                "tier1": {
                    options: {
                        "args": {
                            "specs": [
                                "test/e2e/**/*.1.spec.js"
                            ]
                        }
                    }
                },
                "tier2": {
                    options: {
                        "args": {
                            "specs": [
                                "test/e2e/**/*.2.spec.js"
                            ]
                        }
                    }
                },
                "tier3": {
                    options: {
                        "args": {
                            "specs": [
                                "test/e2e/**/*.3.spec.js"
                            ]
                        }
                    }
                },
                "perf": {
                    options: {
                        "args": {
                            "specs": [
                                "test/e2e/performance/perf.spec.js"
                            ]
                        }
                    }
                }
            },
            template: {
                'config-protractor': {
                    'options': {
                        'data': {
                            'chromeDriverPath': options.globalCameoTestConfig.config.chromeDriverPath,
                            'capabilities': "capabilities:{'browserName':'chrome'}"
                        }
                    },
                    'files': {
                        'test/e2e/config/protractor.js': ['test/e2e/config/tmpl-protractor.js']
                    }
                },
                'config-protractor-multi': {
                    'options': {
                        'data': {
                            'chromeDriverPath': options.globalCameoTestConfig.config.chromeDriverPath,
                            'capabilities': "multiCapabilities:[{'browserName': 'chrome'}, {'browserName': 'firefox'}]"
                        }
                    },
                    'files': {
                        'test/e2e/config/protractor.js': ['test/e2e/config/tmpl-protractor.js']
                    }
                },
                'config-tests': {
                    'options': {
                        'data': {
                            'currentApiUrl': options.globalCameoBuildConfig.config.apiUrl,
                            'defaultApiVersion': options.globalCameoBuildConfig.config.defaultApiVersion,
                            'currentWwwUrl': options.globalCameoTestConfig.config.wwwUrl,
                            'stopOnError': options.globalCameoTestConfig.config.stopOnError,
                            'showConsoleError': options.globalCameoTestConfig.config.showConsoleError,
                            'testData': "this." + options.globalCameoTestConfig.testData.join(";\nthis.") + ";"
                        }
                    },
                    'files': {
                        'test/e2e/config/specs.js': ['test/e2e/config/tmpl-specs.js']
                    }
                }
            }
        }
    }
};