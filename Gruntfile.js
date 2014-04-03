module.exports = function (grunt) {

    // cameo secrets
    var globalCameoSecrets = (function () {
        src = '../cameoSecrets/cameoJSClientSecrets.json';
        if (grunt.file.exists(src)) {
            return grunt.file.readJSON(src);
        }
        else {
            return {"phonegap": {"email": "a", "password": "b"}};
        }
    })();

    // set current target
    var currentTarget = grunt.option('target') || "default";
    // cameo build config
    var globalCameoBuildConfig = (function () {
        var buildConfig;

        var buildConfigUser = './config/cameoBuildConfig-local.json';
        if (grunt.file.exists(buildConfigUser)) {
            buildConfig = grunt.file.readJSON(buildConfigUser);
        }
        else {
            buildConfig = grunt.file.readJSON('./config/cameoBuildConfig.json');
        }

        switch (currentTarget) {
            case "test" :
                buildConfig = grunt.file.readJSON('./config/cameoBuildConfig-test.json');
                break;
            case "stage" :
                buildConfig = grunt.file.readJSON('./config/cameoBuildConfig-stage.json');
                break;
            case "dev" :
                buildConfig = grunt.file.readJSON('./config/cameoBuildConfig-dev.json');
                break;
            case "prod" :
                buildConfig = grunt.file.readJSON('./config/cameoBuildConfig-prod.json');
                break;
            default:
                break;
        }

        //check whether apiUrl should be overwritten
        var apiUrl = grunt.option('apiUrl');
        if (apiUrl) {
            buildConfig.config.apiUrl = apiUrl;
        }

        var version = grunt.option('appVersion');
        if (version) {
            buildConfig.config.version = version;

            // determine phonegapversion
            var v = version.split('.');
            if (v.length == 4) {
                buildConfig.phonegap.version = v[1] + "." + v[2] + "." + v[3];
                buildConfig.phonegap.extraName = "-" + v[0];
            } else {
                buildConfig.phonegap.version = version;
                buildConfig.phonegap.extraName = "";
            }

            console.log("phonegap name: " +  buildConfig.phonegap.baseName + buildConfig.phonegap.extraName);
            console.log("phonegap version: " + buildConfig.phonegap.version);
        } else {
            buildConfig.config.version = "no version";
        }

		buildConfig.phonegap.phonegapBaseFilename = buildConfig.phonegap.baseName + buildConfig.phonegap.extraName + '.' + buildConfig.phonegap.version;

        return buildConfig;
    })();

    // cameo test config
    var globalCameoTestConfig = (function () {
        var testConfig;

        var buildConfigUser = './config/cameoTestConfig-local.json';
        if (grunt.file.exists(buildConfigUser)) {
            testConfig = grunt.file.readJSON(buildConfigUser);
        }
        else
            testConfig = grunt.file.readJSON('./config/cameoTestConfig.json');

        switch (currentTarget) {
            case "test" :
                testConfig = grunt.file.readJSON('./config/cameoTestConfig-test.json');
                break;
            case "stage" :
                testConfig = grunt.file.readJSON('./config/cameoTestConfig-stage.json');
                break;
            case "dev" :
                testConfig = grunt.file.readJSON('./config/cameoTestConfig-dev.json');
                break;
            default:
                break;
        }

        //check whether apiUrl should be overwritten
        var wwwUrl = grunt.option('wwwUrl');
        if (wwwUrl) {
            console.log("wwwUrl: " + wwwUrl);
            testConfig.config.wwwUrl = wwwUrl;
        }

        return testConfig;
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
                    {
                        expand: true,
                        flatten: true,
                        src: 'dist/**',
                        dest: 'phonegap-build/www/'                        
                    },
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
            }, 'dev-deploy': {
                files: [
                    {
                        expand: true,
                        src: ['app/**', '!**/*.less'],
                        dest: 'dist/'
                    }
                ]
            }, 'test-config': {
                files: [
                    {
                        src: 'config/cameoBuildConfig-test.json',
                        dest: 'config/cameoBuildConfig-jenkins.json'
                    }
                ]
            }, 'cockpit': {
                files: [
                    {
                        expand: true,
                        src: 'cockpit/**',
                        dest: 'dist/'
                    }
                ]
            }, 'phonegap-target': {
                files: [
                    {
                        expand: true,
                        cwd: 'phonegap-target',
                        src: ['*','!*.zip'],
                        dest: 'dist/dl/'
                    }
                ]
            }
        },
        clean: {
            'dalek-report': ['report'],
            'dev-deploy': ['dist/app/less'],
            'dist-app': ['dist/app'],
            'dist': ['dist'],
            'phonegap-target': ['phonegap-target']
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
        dalek: {
            options: {
                reporter: ['console', 'junit'],
                "junit-reporter": {
                    "dest": "target/test-reports/dalek.xml"
                }

            }, browsers: [
                {
                    "chrome": {
                        "portRange": [6100, 6120]
                    }
                }
                ,
                {
                    "firefox": {
                        "portRange": [6500, 6620]
                    }
                }
            ], jenkins: {
                options: {
                    browser: ['phantomjs'],
                    reporter: ['console', 'junit']

                },
                src: ['test/e2e/*.dalek.js']
            }, local: {
                options: {
                    browser: ['chrome'],
                    reporter: ['console']
                }, src: ['test/e2e/*.dalek.js']
            }, localAll: {
                options: {
                    browser: ['chrome', 'firefox'],
                    reporter: ['console']
                }, src: ['test/e2e/*.dalek.js']
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
                    'phonegap-build/www/index.html': ['templates/index.tpl.html']
                }
            }
            , 'www-index': {
                'options': {
                    'data': {
                        'phonegapFiles': '',
                        'phonegapElements': ''
                    }
                },
                'files': {
                    'app/index.html': ['templates/index.tpl.html']
                }
            }
			, 'dl-index': {
			                'options': {
			                    'data': {
			                        'phonegapBaseFilename': globalCameoBuildConfig.phonegap.phonegapBaseFilename
			                    }
			                },
			                'files': {
			                    'dist/dl/index.html': ['templates/dl-index.tpl.html']
			                }
		   }, 'config-webApp': {
                'options': {
                    'data': {
                        'currentApiUrl': globalCameoBuildConfig.config.apiUrl ,
                        'currentVersion': globalCameoBuildConfig.config.version
                    }
                },
                'files': {
                    'app/base/config.js': ['templates/config-webApp.tpl.js']
                }
            }, 'config-tests': {
                'options': {
                    'data': {
                        'currentWwwUrl': globalCameoTestConfig.config.wwwUrl,
                        'accountName': globalCameoTestConfig.testData.accountName,
                        'accountPassword': globalCameoTestConfig.testData.accountPassword
                    }
                },
                'files': {
                    'test/e2e/config-e2e-tests.js': ['templates/config-e2e-tests.tpl.js']
                }
            } , 'config-phonegap': {
                'options': {
                    'data': {
                        'currentName': globalCameoBuildConfig.phonegap.baseName + globalCameoBuildConfig.phonegap.extraName,
                        'currentVersion': globalCameoBuildConfig.phonegap.version
                    }
                },
                'files': {
                    'phonegap-res/config.xml': ['templates/config-phonegap.tpl.xml']
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
                        ios: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa',
                        android: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk',
                        winphone: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.xap'
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
            files: ['app/less/*.less', 'templates/*.tpl.*' ],
            tasks: 'genAllTemplates'
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
        },
        "file-creator": {
            "dist-env-js": {
                "dist/app/base/env.js": function (fs, fd, done) {
                    fs.writeSync(fd, '');
                    done();
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
        'genAllTemplates',
        'karma:jenkins'
    ]);
    // tests e2e
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dalek');
    grunt.registerTask('tests-e2e', [
        'genAllTemplates',
        'dalek:jenkins'
    ]);
    grunt.registerTask('tests-all', [
        'genAllTemplates',
        'karma:jenkins',
        'dalek:jenkins'
    ]);
    grunt.registerTask('tests-e2e-local', [
        'genAllTemplates',
        'dalek:local'
    ]);
    grunt.registerTask('tests-e2e-localAll', [
        'genAllTemplates',
        'dalek:localAll'
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
        'clean:phonegap-target',
        'deploy',
     //   'phonegap:build',
        'copy:phonegap-resources',
        'template:phonegap-index',
		'template:dl-index',
        'compress',
        'phonegap-build:debug',
        'copy:phonegap-target'
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
    grunt.registerTask('genAllTemplates', ['template:config-tests', 'template:config-webApp', 'template:www-index', 'template:config-phonegap', 'concat:less', 'less']);
    grunt.registerTask('watcher', ['genAllTemplates', 'watch']);

    // deploy it for me babe !!
    grunt.registerTask('deploy', ['clean:dist', 'genAllTemplates', 'concat:less', 'less', 'copy:dev-deploy', 'uglify:dev-deploy', 'copy:cockpit', 'uglify:cockpit']);
};
