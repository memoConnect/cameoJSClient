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
    grunt.loadNpmTasks('grunt-phonegap');

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
        },
        phonegap: {
            config: {
                root: 'app',
                config: 'app/config.xml',
                cordova: '.cordova',
                path: 'phonegap',
                plugins: [],
                platforms: ['android'],
                maxBuffer: 200, // You may need to raise this for iOS.
                verbose: false,
                releases: 'releases',
                releaseName: function(){
                    var pkg = grunt.file.readJSON('package.json');
                    return(pkg.name + '-' + pkg.version);
                },

                // Must be set for ios to work.
                // Should return the app name.
                name: function(){
                    var pkg = grunt.file.readJSON('package.json');
                    return pkg.name;
                },

                // Add a key if you plan to use the `release:android` task
                // See http://developer.android.com/tools/publishing/app-signing.html
                key: {
                    store: 'release.keystore',
                    alias: 'release',
                    aliasPassword: function(){
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    },
                    storePassword: function(){
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    }
                },

                // Set an app icon at various sizes (optional)
                icons: {
                    android: {
                        ldpi: 'app/res/icon/android/icon-36-ldpi.png',
                        mdpi: 'app/res/icon/android/icon-48-mdpi.png',
                        hdpi: 'app/res/icon/android/icon-72-hdpi.png',
                        xhdpi: 'app/res/icon/android/icon-96-xhdpi.png'
                    },
                    wp8: {
                        app: 'app/res/icon/windows-phone/icon-62-tile.png',
                        tile: 'app/res/icon/windows-phone/icon-173-tile.png'
                    },
                    ios: {
//                        icon29: 'app/res/icon/ios/icon29.png',
//                        icon29x2: 'app/res/icon/ios/icon29x2.png',
//                        icon40: 'app/res/icon/ios/icon40.png',
//                        icon40x2: 'app/res/icon/ios/icon40x2.png',
                        icon57: 'app/res/icon/ios/icon57.png',
                        icon57x2: 'app/res/icon/ios/icon57x2.png',
                        //icon60x2: 'app/res/icon/ios/icon60x2.png',
                        icon72: 'app/res/icon/ios/icon72.png',
                        icon72x2: 'app/res/icon/ios/icon72x2.png'
                        //icon76: 'app/res/icon/ios/icon76.png',
                        //icon76x2: 'app/res/icon/ios/icon76x2.png'
                    }
                },

                // Set a splash screen at various sizes (optional)
                // Only works for Android and IOS
                screens: {
                    android: {
                        ldpi: 'app/res/screen/android/screen-ldpi-portrait.png',
                        // landscape version
                        ldpiLand: 'app/res/screen/android/screen-ldpi-landscape.png',
                        mdpi: 'app/res/screen/android/screen-mdpi-portrait.png',
                        // landscape version
                        mdpiLand: 'app/res/screen/android/screen-mdpi-landscape.png',
                        hdpi: 'app/res/screen/android/screen-hdpi-portrait.png',
                        // landscape version
                        hdpiLand: 'app/res/screen/android/screen-hdpi-landscape.png',
                        xhdpi: 'app/res/screen/android/screen-xhdpi-portrait.png',
                        // landscape version
                        xhdpiLand: 'app/res/screen/android/screen-xhdpi-landscape.png'
                    },
                    ios: {
                        // ipad landscape
                        ipadLand: 'app/res/screen/ios/screen-ipad-landscape.png',
                        ipadLandx2: 'app/res/screen/ios/screen-ipad-landscape-2x.png',
                        // ipad portrait
                        ipadPortrait: 'app/res/screen/ios/screen-ipad-portrait.png',
                        ipadPortraitx2: 'app/res/screen/ios/screen-ipad-portrait-2x.png',
                        // iphone portrait
                        iphonePortrait: 'app/res/screen/ios/screen-iphone-portrait.png',
                        iphonePortraitx2: 'app/res/screen/ios/screen-iphone-portrait-2x.png',
                        iphone568hx2: 'app/res/screen/ios/screen-iphone-568h-2x.png'
                    }
                },

                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                versionCode: function(){ return(1) },

                // Android-only options that will override the defaults set by Phonegap in the
                // generated AndroidManifest.xml
                // See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
                minSdkVersion: function(){ return(10) },
                targetSdkVersion: function(){ return(19) },

                // If you want to use the Phonegap Build service to build one or more
                // of the platforms specified above, include these options.
                // See https://build.phonegap.com/
                xremote: {
                    username: 'your_username',
                    password: 'your_password',
                    platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
                },

                // Set an explicit Android permissions list to override the automatic plugin defaults.
                // In most cases, you should omit this setting. See 'Android Permissions' in README.md for details.
                permissions: ['INTERNET', 'ACCESS_COURSE_LOCATION', '...']
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