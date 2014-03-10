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

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');

    var globalCameoSecrets = (function() {
        src = '../cameoSecrets/cameoJSClientSecrets.json';
        if (grunt.file.exists(src)) {
            jsonObj = grunt.file.readJSON(src);
            return jsonObj;
        }
        else {
            return {"phonegap": {"email": "a", "password": "b"}};
        }
    })();

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
                // https://www.npmjs.org/package/grunt-phonegap
                config: {
                    root: 'app',
                    config: 'phonegap-res/config.xml',
                    path: 'phonegap-build',
                    plugins: [
                        './phonegap-res/plugins/org.apache.cordova.console',
                        './phonegap-res/plugins/org.apache.cordova.device',
                        './phonegap-res/plugins/org.apache.cordova.network-information',
                        './phonegap-res/plugins/org.apache.cordova.splashscreen',
                        './phonegap-res/plugins/org.apache.cordova.contacts'
                    ],
                    platforms: ['android'],
                    maxBuffer: 200, // You may need to raise this for iOS.
                    verbose: true,
                    releases: 'releases',

                    releaseName: function () {
                        var pkg = grunt.file.readJSON('package.json');
                        return(pkg.name + '-' + pkg.version);
                    },
                    name: function () {
                        var pkg = grunt.file.readJSON('package.json');
                        return pkg.name;
                    },
                    versionCode: function () {
                        return(1)
                    },
                    minSdkVersion: function () {
                        return(10)
                    },
                    targetSdkVersion: function () {
                        return(19)
                    },

                    // relative to /phonegap-res
                    icons: {
                        android: {
                            ldpi: 'phonegap-res/res/icon/android/icon-36-ldpi.png',
                            mdpi: 'phonegap-res/res/icon/android/icon-48-mdpi.png',
                            hdpi: 'phonegap-res/res/icon/android/icon-72-hdpi.png',
                            xhdpi: 'phonegap-res/res/icon/android/icon-96-xhdpi.png'
                        }
                    },

                    // Set a splash screen at various sizes (optional)
                    // Only works for Android and IOS
                    screens: {
                        android: {
                            ldpi: 'phonegap-res/res/screen/android/screen-ldpi-portrait.png',
                            ldpiLand: 'phonegap-res/res/screen/android/screen-ldpi-landscape.png',
                            mdpi: 'phonegap-res/res/screen/android/screen-mdpi-portrait.png',
                            mdpiLand: 'phonegap-res/res/screen/android/screen-mdpi-landscape.png',
                            hdpi: 'phonegap-res/res/screen/android/screen-hdpi-portrait.png',
                            hdpiLand: 'phonegap-res/res/screen/android/screen-hdpi-landscape.png',
                            xhdpi: 'phonegap-res/res/screen/android/screen-xhdpi-portrait.png',
                            xhdpiLand: 'phonegap-res/res/screen/android/screen-xhdpi-landscape.png'
                        }
                    }
                }
            },

            template: {
                'phonegap-index': {
                    'options': {
                        'data': {
                            'phonegapFiles': //                            '<script src="cordova.js"></script>' +
                                '<script src="phonegap.js"></script>' +
                                    '<script src="phonegap-adapter.js"></script>',
                            'phonegapElements': '<div class="well">' +
                                '<p id="networkState"></p>' +
                                '<p id="contactsNumber"></p>' +
                                '</div>' +
                                '<button class="btn btn-primary" onclick="loadContacts()">get contacts</button>'
                        }
                    },
                    'files': {
                        'phonegap-build/www/index.html': ['templates/index.html.tpl']
                    }
                },
                'www-index': {
                    'options': {
                        'data': {
                            'phonegapFiles': '',
                            'phonegapElements': ''
                        }
                    },
                    'files': {
                        'app/index.html': ['templates/index.html.tpl']
                    }
                }
            },

            copy: {
                'phonegap-resources': {
                    files: [
                        // copy all icon and splashs to /www/res
                        {
                            expand: true,
                            cwd: 'phonegap-res/res/',
                            src: ['**'],
                            dest: 'phonegap-build/www/res/'
                        },
                        // add adapter javascript to /www
                        {
                            expand: true,
                            flatten: true,
                            src: 'phonegap-res/*.js',
                            dest: 'phonegap-build/www/'
                        }
                    ]
                }
            },
            "phonegap-build": {
                debug: {
                    options: {
                        archive: "phonegap-target/cameoNetApp.zip",
                        "appId": "810861",
                        "user": {
                            "email": globalCameoSecrets.phonegap.email,
                            "password": globalCameoSecrets.phonegap.password
                        },
                        download: {
                            ios: 'phonegap-target/cameoNet.ipa',
                            android: 'phonegap-target/cameoNet.apk',
                            winphone: 'phonegap-target/cameoNet.xap'
                        }
                    }
                }
            },
            compress: {
                main: {
                    options: {
                        archive: 'phonegap-target/cameoNetApp.zip',
                        mode: 'zip'
                    },
                    expand: true,
                    cwd: 'phonegap-build/www/',
                    src: ['**/*']
                }
            }
        }
    )
    ;


//    grunt.registerTask('default', ['concat','uglify']);
//    grunt.registerTask('coffeeTest', 'coffee');
    grunt.registerTask('coffeeTest', 'watch');

    /*var driver = new require("selenium-webdriver").Builder()
     .usingServer(process.env.SELENIUM_HUB)
     .withCapabilities(webdriver.Capabilities.firefox())
     .build()*/

    grunt.registerTask('teste2e', ['connect', 'shell:runSelenium', 'shell:runProtractor']);

    /**
     * copy /app to /phonegap-build
     *
     * $ grunt phonegap
     * ----
     * $ adb connect 192.168.178.46:5555 // connect devices
     * $ adb devices // should show list 192.168.178.46:5555 device / if unauthorized then verify with usb connection
     * $ cd phonegap-build // change in dir
     * $ phonegap run android
     */
    grunt.registerTask('phonegap', [
        'phonegap:build',
        'copy:phonegap-resources',
        'template:phonegap-index',
    ]);

    grunt.registerTask('phonegap-bs', [
        'phonegap:build',
        'copy:phonegap-resources',
        'template:phonegap-index',
        'compress',
        'phonegap-build:debug'
    ]);

    grunt.registerTask('www', ['template:www-index']);
}
;
