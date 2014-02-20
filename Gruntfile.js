module.exports = function (grunt) {
    // Do grunt-related things in here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-selenium-launcher');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: './'
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'), concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: ['app/js/controller/login.js', 'app/js/controller/start.js', 'app/js/controller/talks.js'],
                dest: 'app/js/controller/built.raw.js'
            }
        }, uglify: {
            jsController: {
                files: {
                    'app/js/controller/build.min.js': '<%= concat.js.dest %>'
                }
            }
        }, coffee: {
            compile: {
                files: [
                    {
                        expand: true, cwd: 'app/coffee/', src: ['**/*.coffee'], dest: 'app/coffee/', ext: '.js'
                    }
                ]
            }
        }, watch: {
            coffee: {
                files: ['app/coffee/**/*.coffee'], tasks: ['coffee'], options: {
                    event: 'all'
                }
            }
        }, jshint: {
            all: ['Gruntfile.js'
                , 'app/js/bootstrap/*.js'
                , 'app/js/service/*.js'
                , 'app/js/bootstrap/*.js'
                , 'app/js/directives/*.js'
                , 'app/js/controller/*.js'
                , 'test/jasmine/**/*.js']
        },
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
                runnerPort: 9999,
                browsers: ['Chrome']
            }

        },

        protractor: {
            options: {
                // The address of a running selenium server.
                // seleniumAddress: 'http://localhost:4444' ,

                // Capabilities to be passed to the webdriver instance.
                capabilities: {
                    'browserName': 'firefox'
                },

                baseUrl: 'http://localhost:1337',

                // Spec patterns are relative to the current working directly when
                // protractor is called.
                specs: ['test/e2e/*.spec.js'],

                // Override the timeout for webdriver to 20 seconds.
                allScriptsTimeout: 20000,

                webdriverLoglevel: 'DEBUG',

                // Options to be passed to Jasmine-node.
                jasmineNodeOpts: {
                    showColors: true, defaultTimeoutInterval: 30000, isVerbose: false, includeStackTrace: true
                }

            }

        },
        shell: {
            runProtractor: {
                command: './node_modules/protractor/bin/protractor config/ptor.e2e.conf.js',
                options: {
                    async: false
                }
            },
            runSelenium: {
                command: './node_modules/protractor/bin/webdriver-manager start',
                options: {
                    async: true
                }
            }
        }
    });


//    grunt.registerTask('default', ['concat','uglify']);
//    grunt.registerTask('coffeeTest', 'coffee');
    grunt.registerTask('coffeeTest', 'watch');

    /*var driver = new require("selenium-webdriver").Builder()
     .usingServer(process.env.SELENIUM_HUB)
     .withCapabilities(webdriver.Capabilities.firefox())
     .build()*/

    grunt.registerTask('teste2e', ['connect', 'shell:runSelenium', 'shell:runProtractor']);
};