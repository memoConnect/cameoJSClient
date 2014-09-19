module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-phonegap');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-phonegap-build');
    grunt.loadNpmTasks('grunt-phonegapsplash');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-sloc');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-testflight-jsonresult');

    // set current target
    var currentTarget = grunt.option('target') || "default";

    // cameo secrets
    var globalCameoSecrets = (function () {
        dummySrc = './config/cameoJSClientSecrets_dummy.json';
        secretSrc = '../cameoSecrets/cameoJSClientSecrets_'+currentTarget+'.json';

        if (grunt.file.exists(secretSrc)) {
            return grunt.file.readJSON(secretSrc);
        }
        else {
            return grunt.file.readJSON(dummySrc);
        }
    })();

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

            console.log("phonegap name: " + buildConfig.phonegap.baseName + buildConfig.phonegap.extraName);
            console.log("phonegap version: " + buildConfig.phonegap.version);
        } else {
            buildConfig.config.version = "0.2.6"; // default for local dev
            buildConfig.phonegap.version = "0.0.1";
        }

        if(buildConfig.config.version == '0.2.6'){
            buildConfig.config.urlBust =  (new Date()).getTime();
        } else {
            buildConfig.config.urlBust = buildConfig.config.version.replace(/\./g,'');
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
        // URL Bust for requireJS
        testConfig.config.urlBust = (new Date()).getTime();

        var protractorDebug = grunt.option('debug');
        if (protractorDebug) {
            testConfig.config.protractorDebug = true
        }

        var platform = process.platform
        console.log("OS: " + platform)
        if (platform.match(/linux/)) {
            testConfig.config.chromeDriverPath = "../test/lib/ptor/chromedriver_linux"
        } else if (platform.match(/darwin/)) {
            testConfig.config.chromeDriverPath = "../test/lib/ptor/chromedriver_mac"
        } else if (platform.match(/win/)) {
            testConfig.config.chromeDriverPath = "../test/lib/ptor/chromedriver_win.exe"
        }

        return testConfig;
    })();

    // create packages
    var concatCmTemplatesFound = [];

    var concatConvertCmFiles = function (src, filepath) {
        // templates to template cache
        if (filepath.search(/.*\.html/g) != -1) {
            var lines = src
                .replace(/(\r\n|\n|\r|\t)/gm, '')// clear system signs
                .replace(/\s{2,100}(<)/gm, '<')// clear whitespaces before html tag
                .replace(/\s{2,100}/gm, ' ')// clear whitespaces on line
                .replace(/(')/gm, "\\'");// uncomment single quotes,
            filepath = filepath.replace('app/', '');
            // add to template array for module schmusi
            concatCmTemplatesFound.push(filepath);


            return  "angular.module('" + filepath + "', []).run([\n" +
                "'$templateCache', function($templateCache) {\n" +
                "$templateCache.put('" + filepath + "'," +
                "\n'" + lines + "'" +
                ");\n" +
                "}]);";
            // module banger
        } else if (filepath.search(/.*\/-module-.*/g) != -1) {
            // add found templates to package module
            if (concatCmTemplatesFound.length > 0) {
                var templateNames = "'" + concatCmTemplatesFound.join("','") + "'";
                concatCmTemplatesFound = [];
                return src
                    .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                    .replace(/\]\)/g, ',' + templateNames + '])')
                    .replace(/(\;)$/g, '')
            } else {
                return src
                    .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                    .replace(/(\;)$/g, '')
            }
            // clear scripts use_strict, clear also angular.module(..) and last ;
        } else {
            return src
                .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                .replace(/(angular\.module\(.*\))/g, '')
                .replace(/(\;)$/g, '')
        }
    };

    var concatCreateCmPackages = function (packagesObject) {
        var packages = {},
            packagesObject = packagesObject || {};

        Object.keys(packagesObject).forEach(function (packageName) {
            var settings,
                moduleName = packageName;
            exclude = '!(-module-' + moduleName + ')',
                include = '*',
                packagePath = packagesObject[packageName],
                file = 'package.js';

            if (typeof packagePath == "object") {
                settings = packagePath;
                // override
                moduleName = settings.moduleName || moduleName;
                include = settings.include || include;
                exclude = settings.exclude || exclude;
                packagePath = settings.packagePath || packagePath;
                file = settings.file || file;
            }

            packages[packagePath.replace('app/', 'app/packages/') + '/' + file] = [
                    packagePath + '/**/*.html', // at last all templates
                    packagePath + '/-module-' + moduleName + '.js', // at first module
                    packagePath + '/**/' + exclude + include + '.js' // all directives / services / factorys etc
            ];
        });

        return packages;
    };

    // write config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // misc
        concat: {
            'options': {
                separator: '\n'
            },
            'less': {
                src: [
                    'app/less/base.less',
                    'app/less/bootstrap.less',
                    'app/less/theme-a.less',
                    'app/less/!(base|bootstrap|theme-a).less'
                ],
                dest: 'app/css/app.less'
            },
            'app-css': {
                src: [
                    'app/css/bootstrap.min.css',
                    'app/css/!(style|bootstrap).css',
                    'app/vendor/**/*.css'
                ],
                dest: 'app/css/style.css'
            },
            'app-packages': {
                options: {
                    banner: "'use strict';\n\n",
                    process: concatConvertCmFiles
                },
                files: concatCreateCmPackages({
                    'core': 'app/comps/core',
                    'core-cockpit': {
                        packagePath: 'app/comps/core',
                        moduleName: 'core-cockpit',
//                        include:'*(*api|*auth|*crypt|*logger)',
                        exclude: '!(fcty-|pack-|-module|*identity|*language|*notify|*cron|*job|*localstorage|*usermodel|*util)',
                        file: 'package-cockpit.js'
                    },
                    'conversations': 'app/comps/conversations',
                    'contacts': 'app/comps/contacts',
                    'user': 'app/comps/user',
                    'validate': 'app/comps/validate',
                    'files': 'app/comps/files',
                    'security_aspects': 'app/comps/security_aspects',
                    'ui': 'app/comps/ui',
                    'phonegap': 'app/comps/phonegap',
                    'routes': 'app/routes',
                    'widgets': 'app/widgets'
                })
            },

            'app-vendor': {
                src: [
                    'app/vendor/!(angular)/*.js',
                    'app/vendor/!(angular)/**/*.js',
                    'app/vendor/angular/base/angular.js',
                    'app/vendor/angular/base/angular-*.js',
                    'app/vendor/angular/!(base)/*.js',
                ],
                dest: 'app/vendor.js'
            },

            'app-cameo': {
                src: [
                    'app/base/config.js',
                    'app/base/app.js',
                    'app/packages/**/package.js'
                ],
                dest: 'app/cameo.js'
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

        jshint: {
            all: [
                'Gruntfile.js',
                'app/js/bootstrap/*.js',
                'app/js/service/*.js',
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
            'resources-phonegap': {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'dist/app',
                        src: ['**'],
                        dest: 'dist/phonegap/www'
                    },
                    // copy all icon and splashs to /www/res
                    {
                        expand: true,
                        cwd: 'resource/phonegap/res/',
                        src: ['**'],
                        dest: 'dist/phonegap/www/res/'
                    },
                    // add adapter javascript to /www
                    {
                        expand: true,
                        flatten: true,
                        src: 'resource/phonegap/*.js',
                        dest: 'dist/phonegap/www/'
                    }

                ]
            },
            'dev-deploy': {
                files: [
                    {
                        expand: true,
                        src: ['app/**', '!**/*.less'],
                        dest: 'dist/'
                    }
                ]
            },
            'test-config': {
                files: [
                    {
                        src: 'config/cameoBuildConfig-test.json',
                        dest: 'config/cameoBuildConfig-jenkins.json'
                    }
                ]
            },
            'cockpit': {
                files: [
                    {
                        expand: true,
                        src: 'cockpit/**',
                        dest: 'dist/'
                    }
                ]
            },
            'phonegap-target': {
                files: [
                    {
                        expand: true,
                        cwd: 'phonegap-target',
                        src: ['*', '!*.zip'],
                        dest: 'dist/dl/'
                    }
                ]
            },
            'resources-dl': {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'resource/download/',
                        src: ['**'],
                        dest: 'dist/dl/'
                    }
                ]
            }
        },
        clean: {
            'dalek-report': ['report'],
            'dev-deploy': ['dist/app/less','dist/app/comps'],
            'dist-app': ['dist/app'],
            'dist': ['dist'],
            'docs': ['docs'],
            'phonegap-target': ['phonegap-target'],
            'phonegap-build': ['dist/phonegap']
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
        protractor: {
            options: {
                configFile: "config/ptor.e2e.conf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                },
                debug: globalCameoTestConfig.config.protractorDebug
            },
            default: {
            }
        },
        // phonegap create apk local
        phonegap: {
            // https://www.npmjs.org/package/grunt-phonegap
            config: {
                root: 'dist/phonegap/www',
                config: 'dist/phonegap/www/config.xml',
                cordova: '.cordova',
                path: 'phonegap-build',
                plugins: ['./resource/phonegap/plugins/org.apache.cordova.contacts'],
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
                    return(19)
                },
                targetSdkVersion: function () {
                    return 19
                }
            }
        },
        testflight: {
            options: {
                apiToken: globalCameoSecrets.testflight.apiToken,
                teamToken: globalCameoSecrets.testflight.teamToken,
                notes: globalCameoBuildConfig.phonegap.baseName + globalCameoBuildConfig.phonegap.extraName + " " + globalCameoBuildConfig.phonegap.version,
                distributionLists: ['cameoNet-dev'],
                notify: true,
                replace: true,
                onDone: function (responseJson) {
                    globalCameoBuildConfig.iosTestFlightURL = responseJson.install_url
                }
            },

            iOS: {
                options: {
                    file: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa'
                }
            },

            android: {
                options: {
                    file: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk'
                }
            }
        },
        template: {
            'index-phonegap': {
                'options': {
                    'data': {
                        'phonegapFiles': '<script type="text/javascript" charset="utf-8" src="cordova.js"></script>'+
                                        '<script type="text/javascript" charset="utf-8" src="config.js"></script>'+
                                        (globalCameoBuildConfig.debug.weinre ? '<script src="http://'+globalCameoBuildConfig.debug.weinreIp+':8080/target/target-script-min.js#anonymous"></script>' : ''),
                        'phonegapOnload': ' onload="deviceReady()"'
                    }
                },
                'files': {
                    'dist/phonegap/www/index.html': ['templates/app/index.html']
                }
            },
            'index-www': {
                'options': {
                    'data': {
                        'phonegapFiles': globalCameoBuildConfig.debug.weinre ? '<script src="http://'+globalCameoBuildConfig.debug.weinreIp+':8080/target/target-script-min.js#anonymous"></script>' : '',
                        'phonegapOnload': ''
                    }
                },
                'files': {
                    'app/index.html': ['templates/app/index.html']
                }
            },
            'index-dl': {
                'options': {
                    'data': {
                        'phonegapBaseFilename': globalCameoBuildConfig.phonegap.phonegapBaseFilename,
                        'testFlightiOSURL': function () {
                            return globalCameoBuildConfig.iosTestFlightURL
                        }
                    }
                },
                'files': {
                    'dist/dl/index.html': ['templates/dl/index.html']
                }
            },
            'config-webApp': {
                'options': {
                    'data': {
                        'currentApiUrl': globalCameoBuildConfig.config.apiUrl,
                        'currentVersion': globalCameoBuildConfig.config.version,
                        'autoLogin': globalCameoBuildConfig.config.autoLogin,
                        'loadingBar': globalCameoBuildConfig.config.loadingBar,
                        'enableDebug': globalCameoBuildConfig.config.enableDebug
                    }
                },
                'files': {
                    'app/base/config.js': ['templates/app/config.js']
                }
            },
            'main-webApp': {
                'options': {
                    'data': {
                        'urlBust': globalCameoBuildConfig.config.urlBust
                    }
                },
                'files': {
                    'app/base/main.js': ['templates/app/main.js']
                }
            },
            'config-tests': {
                'options': {
                    'data': {
                        'currentApiUrl': globalCameoBuildConfig.config.apiUrl,
                        'currentWwwUrl': globalCameoTestConfig.config.wwwUrl,
                        'stopOnError': globalCameoTestConfig.config.stopOnError || false,
                        'testData': "this." + globalCameoTestConfig.testData.join(";\nthis.") + ";"
                    }
                },
                'files': {
                    'test/e2e/config-e2e-tests.js': ['templates/test/config-e2e.js']
                }
            },
            'config-phonegap': {
                'options': {
                    'data': {
                        'currentName': globalCameoBuildConfig.phonegap.baseName + globalCameoBuildConfig.phonegap.extraName,
                        'currentVersion': globalCameoBuildConfig.phonegap.version,
                        'currentAppId': globalCameoBuildConfig.phonegap.bundleId,
                        'logLevel' : globalCameoBuildConfig.config.logLevel || 'DEBUG',
                        'pushIpAppId': globalCameoSecrets.puship.appId,
                        'googleSenderId': globalCameoSecrets.google.senderId
                    }
                },
                'files': {
                    'dist/phonegap/www/config.xml': ['templates/phonegap/config.xml'],
                    'dist/phonegap/www/config.js': ['templates/phonegap/config.js']
                }
            },
            'config-protractor': {
                'options': {
                    'data': {
                        'chromeDriverPath': globalCameoTestConfig.config.chromeDriverPath,
                        'capabilities': "capabilities:{'browserName':'chrome'}"
                    }
                },
                'files': {
                    'config/ptor.e2e.conf.js': ['templates/test/ptor.e2e.conf.js']
                }
            },
            'config-protractor-multi': {
                'options': {
                    'data': {
                        'chromeDriverPath': globalCameoTestConfig.config.chromeDriverPath,
                        'capabilities': "multiCapabilities:[{'browserName': 'chrome'}, {'browserName': 'firefox'}]"
                    }
                },
                'files': {
                    'config/ptor.e2e.conf.js': ['templates/test/ptor.e2e.conf.js']
                }
            }
        },
        // create zip and upload to build server
        'phonegap-build': {
            debug: {
                options: {
                    archive: "phonegap-target/cameoNetApp.zip",
                    appId: globalCameoBuildConfig.phonegap.appId,
                    user: {
                        "email": globalCameoSecrets.phonegap.email,
                        "password": globalCameoSecrets.phonegap.password
                    },
                    download: {
                        ios: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa',
                        android: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk',
                        winphone: 'phonegap-target/' + globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.xap'
                    }
                }
            },
            'only-zip': {
                options: {
                    archive: "phonegap-target/cameoNetApp.zip",
                    appId: globalCameoBuildConfig.phonegap.appId
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
                cwd: 'dist/phonegap/www/',
                src: ['**/*']
            }
        },
        // splashscrenn for apps
        phonegapsplash: {
            build: {
                src: 'resource/phonegap/res/screen/splash-canevas.png',
                dest: 'resource/phonegap/gen',
                options: {
                    layouts: ['portrait'],
                    profiles: ['android', 'ios', 'windows-phone']
                }
            }
        },

        // watch
        watch: {
            files: [
                'config/*.json',
                'app/less/*.less',
                'app/base/app.js',
                'templates/**/*',
                'app/comps/**/*',
                'app/routes/**/*',
                'app/widgets/**/*'
            ],
            tasks: ['genAllTemplates', ':app:js-files']
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
        },

        ngdocs: {
            options: {
                dest: 'docs',
                scripts: [
                    'docs/grunt-scripts/cameo-package.js'
                ],
                deferLoad: false,
                html5Mode: false,
                startPage: '/core',
                title: 'CameoNET QS',
                image: 'app/favicon.ico',
                imageLink: 'https://www.cameo.io',
                titleLink: '/docs/index.html',
                bestMatch: true
            },
            core: {
                src: ['app/comps/core/*.js'],
                title: 'cmCore'
            },
            ui: {
                src: ['app/comps/ui/*.js'],
                title: 'cmUi'
            },
            conversations: {
                src: ['app/comps/conversations/*.js'],
                title: 'cmConversations'
            },
            '1-api': {
                src: ['resource/docs/api/*.ngdoc'],
                title: 'api'
            },
            '2-help': {
                src: ['resource/docs/help/*.ngdoc'],
                title: 'help'
            },
            '3-icons': {
                src: ['resource/docs/misc/*.ngdoc'],
                title: 'icons'
            }
        },

        // utils
        shell: {
            generateKeys: {
                options: {
                    stdout: false
                },
                command: 'cd test/e2e/keys && rm -f *.key && ssh-keygen -N "" -f 1.key && ssh-keygen -N "" -f 2.key && ssh-keygen -N "" -f 3.key && ssh-keygen -N "" -f 4.key && ssh-keygen -N "" -f 5.key&& rm *.key.pub'
            },
            pythonServer: {
                options: {
                    stdout: true
                },
                command: 'python -m SimpleHTTPServer 8000'
            }
        },

        bgShell: {
            'node': {
                cmd: 'node scripts/web-server.js',
                bg: false
            },
            'python': {
                cmd: 'python -m SimpleHTTPServer 8000',
                bg: false,
                stdout: false
            },
            'cameo': {
                cmd: 'sbt run',
                bg: false,
                execOpts: {
                    cwd: '../cameoServer'
                }
            },
            'weinre': {
                cmd: 'weinre --boundHost '+globalCameoBuildConfig.debug.weinreIp,
                bg: false
            },
            'logcat-cordova': {
                cmd: 'adb logcat | grep "CordovaLog"',
                bg: false
            },
            'logcat-clear': {
                cmd: 'adb logcat -c',
                bg: false
            }
        }
    });

    // tests unit
    grunt.registerTask('tests-unit', [
        'genAllTemplates',
        ':app:js-files',
        'karma:jenkins'
    ]);
    grunt.registerTask('tests-e2e', [
        'genAllTemplates',
        'shell:generateKeys',
        ':app:js-files',
        'protractor:default'
    ]);
    grunt.registerTask('tests-all', ['tests-unit','tests-e2e']);
    grunt.registerTask('tests-multi', [
        // we only need to generate templates for tests
        'template:config-tests',
        'template:config-protractor-multi',
        'protractor:default'
    ]);

    // shortcuts
    grunt.registerTask('tests-2e2', ['tests-e2e']);

    // watch
    grunt.registerTask('genAllTemplates', [
        'template:config-tests',
        'template:config-webApp',
        'template:main-webApp',
        'template:index-www',
        'template:config-phonegap',
        'template:config-protractor',
        'concat:less',
        'less',
        'concat:app-css'
    ]);
    grunt.registerTask('watcher', ['genAllTemplates', ':app:js-files', 'watch']);
    grunt.registerTask(':app:js-files', ['concat:app-vendor','concat:app-packages','concat:app-cameo']);

    // deploy it for me babe !!
    grunt.registerTask('deploy', [
        'clean:dist',
        'genAllTemplates',
        ':app:js-files',
        'copy:dev-deploy',
        'clean:dev-deploy',
        'uglify:dev-deploy',
        'copy:cockpit',
        'uglify:cockpit'
    ]);

    grunt.registerTask(':build:create-docs', ['clean:docs', ':app:js-files', 'concat:docs', 'ngdocs']);
    // deploy www without phonegap
    grunt.registerTask(':build:www', ['template:index-www']);

    grunt.registerTask(':server:web:node', ['bgShell:node']);
    grunt.registerTask(':server:web:python', ['shell:pythonServer']);
    grunt.registerTask(':server:weinre', ['bgShell:weinre']);
    grunt.registerTask(':server:cameo', ['bgShell:cameo']);

    grunt.registerTask(':utils:code-coverage', ['sloc:code-coverage']);
    grunt.registerTask(':utils:count-lines', ['sloc']);
    grunt.registerTask(':utils:logcat-cordova', ['bgShell:logcat-cordova']);
    grunt.registerTask(':utils:logcat-clear', ['bgShell:logcat-clear']);

    // phonegap to build server
    grunt.registerTask(':phonegap:to-build-server', [
        'clean:phonegap-target',
        'clean:phonegap-build',
        'deploy',
        'copy:resources-phonegap',
        'template:index-phonegap',
        'template:config-phonegap',
        'compress',
        'phonegap-build:debug',
        'copy:phonegap-target',
        'testflight:iOS',
        'template:index-dl',
        'copy:resources-dl'
    ]);
    grunt.registerTask(':phonegap:create-only-zip', [
        'clean:phonegap-target',
        'clean:phonegap-build',
        'deploy',
        'copy:resources-phonegap',
        'template:index-phonegap',
        'template:config-phonegap',
        'compress',
        'phonegap-build:only-zip'
    ]);
    grunt.registerTask("phonegap:adb-run", [
        'clean:phonegap-target',
        'clean:phonegap-build',
        'deploy',
        'copy:resources-phonegap',
        'template:index-phonegap',
        'template:config-phonegap',
        'compress',
        'phonegap:build',
        'phonegap:run'
    ])

    grunt.registerTask(':phonegap:create-splashscreens', ['phonegapsplash:build']);

};
