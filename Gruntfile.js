module.exports = function (grunt) {
    // cameo secrets
    var globalCameoSecrets = (function () {
        src = '../cameoSecrets/cameoJSClientSecrets.json';
        if (grunt.file.exists(src)) {
            jsonObj = grunt.file.readJSON(src);
            return jsonObj;
        }
        else {
            return {"phonegap": {"email": "a", "password": "b"}};
        }
    })();
    // write config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // misc
        concat: {
            options: {
                separator: '\n'
            },
            js: {
                src: ['app/js/controller/login.js', 'app/js/controller/start.js', 'app/js/controller/talks.js'],
                dest: 'app/js/controller/built.raw.js'
            },
            less: {
                src: ['app/less/base.less', 'app/less/bootstrap.less', 'app/less/!(basebootstrap).less'],
                dest: 'app/css/app.less'
            }
        },
        coffee: {
            compile: {
                files: [
                    {
                        expand: true, cwd: 'app/coffee/', src: ['**/*.coffee'], dest: 'app/coffee/', ext: '.js'
                    }
                ]
            }
        },
//        watch: {
//            coffee: {
//                files: ['app/coffee/**/*.coffee'], tasks: ['coffee'], options: {
//                    event: 'all'
//                }
//            }
//        },
        jshint: {
            all: [
                'Gruntfile.js',
                'app/js/bootstrap/*.js',
                'app/js/service/*.js',
                'app/js/bootstrap/*.js',
                'app/js/directives/*.js',
                'app/js/controller/*.js',
                'test/jasmine/**/*.js'
            ]
        },

        // contrib
        uglify: {
            options: {
                mangle: false
            },
            'dev-deploy': {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/app',
                        src: '**/*.js',
                        dest: 'dist/app'
                    }
                ]
            },
            'cockpit': {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/cockpit',
                        src: '**/*.js',
                        dest: 'dist/cockpit'
                    }
                ]
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
            },
            'dalek-report': {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'report/*.xml',
                        dest: 'target/test-reports/'
                    }
                ]
            },
            'dev-deploy': {
                files: [
                    {
                        expand: true,
                        src: 'app/**',
                        dest: 'dist/'
                    }
                ]
            } ,
            'cockpit': {
                files: [
                    {
                        expand: true,
                        src: 'cockpit/**',
                        dest: 'dist/'
                    }
                ]
            }
        },
        clean: {
            'dalek-report': ['report'],
            'dev-deploy': ['dist/app/less'],
            'dist-app': ['dist/app']
        },

        // unit tests
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

        },
        // e2e tests
        connect: {
            server: {
                options: {
                    port: 6108,
                    base: './'
                }
            }
        },
        dalek: {
            options: {
                reporter: ['console', 'junit']
            },
            browsers: [
                {
                    "chrome": {
                        "port": 5555
                    }
                }
            ],
            jenkins: {
                browser: ['phantomjs'],
                src: ['test/e2e/*.dalek.js']
            },
            local: {
                options: {
                    browser: ['chrome']
                },
                src: ['test/e2e/*.dalek.js']
            }
        },

        // phonegap create apk local
        phonegap: {
            // https://www.npmjs.org/package/grunt-phonegap
            config: {
                root: 'dist/app',
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
        // create zip and upload to build server
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
        },

        // watch
        watch: {
            files: 'app/less/*.less',
            tasks: ['concat:less', 'less']
        },
        less: {
            development: {
                options: {
                    yuicompress: true
                },
                files: {
                    'app/css/app.css': 'app/css/app.less'
                }
            }
        }
    });

    // contrib
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // tests unit
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('tests-unit', [
        'karma:jenkins'
    ]);
    // tests e2e
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dalek');
    grunt.registerTask('tests-e2e', [
        'connect',
        'dalek:jenkins',
        'copy:dalek-report',
        'clean:dalek-report'
    ]);
    grunt.registerTask('tests-e2e-local', [
        'connect',
        'dalek:local',
    ]);
    // phonegap to device
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.loadNpmTasks('grunt-template');
    grunt.registerTask('phonegap', [
        'phonegap:build',
        'copy:phonegap-resources',
        'template:phonegap-index'
    ]);
    // phonegap to build server
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('phonegap-bs', [
        'dev-deploy',
        'phonegap:build',
        'copy:phonegap-resources',
        'template:phonegap-index',
        'compress',
        'phonegap-build:debug'
    ]);
    // deploy www without phonegap
    grunt.registerTask('www', [
        'template:www-index'
    ]);
    // tests
//    grunt.registerTask('default', ['concat','uglify']);
//    grunt.registerTask('coffeeTest', 'coffee');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('coffeeTest', [
        'watch'
    ]);
    // watch
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('watcher', ['concat:less', 'less', 'watch']);

    // deploy moeps
    grunt.registerTask('dev-deploy', ['clean:dist-app', 'concat:less', 'less', 'copy:dev-deploy', 'uglify:dev-deploy', 'clean:dev-deploy','copy:cockpit','uglify:cockpit'])
};