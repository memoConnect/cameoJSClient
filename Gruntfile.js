'use strict';

module.exports = function (grunt) {

//    grunt.loadNpmTasks('grunt-contrib-jasmine');
//    grunt.loadNpmTasks('grunt-contrib-connect');

    // Time how long tasks take. Can help when optimizing build times
    // https://www.npmjs.org/package/time-grunt
    require('time-grunt')(grunt);

    // set current target
    var currentTarget = grunt.option('target') || "default";

    // cameo secrets
    var globalCameoSecrets = (function () {
        var dummySrc = './config/cameoJSClientSecrets_dummy.json';
        var secretSrc = '../cameoSecrets/cameoJSClientSecrets_'+currentTarget+'.json';

        if (grunt.file.exists(secretSrc)) {
            return grunt.file.readJSON(secretSrc);
        }
        else {
            return grunt.file.readJSON(dummySrc);
        }
    })();

    // cameo build config
    var globalCameoBuildConfig = (function () {

        function extend() {
            var destination = {},
                sources = [].slice.call( arguments, 0 );
            sources.forEach(function( source ) {
                var prop;
                for ( prop in source ) {
                    if ( prop in destination && Array.isArray( destination[ prop ] ) ) {

                        // Concat Arrays
                        destination[ prop ] = destination[ prop ].concat( source[ prop ] );

                    } else if ( prop in destination && typeof destination[ prop ] === "object" ) {

                        // Merge Objects
                        destination[ prop ] = extend( destination[ prop ], source[ prop ] );

                    } else {

                        // Set new values
                        destination[ prop ] = source[ prop ];

                    }
                }
            });
            return destination;
        };

        var buildConfig = grunt.file.readJSON('./config/cameoBuildConfig.json');

        var buildConfigLocal = './config/cameoBuildConfig-local.json';
        if (grunt.file.exists(buildConfigLocal)) {
            buildConfig = extend(buildConfig,grunt.file.readJSON(buildConfigLocal));
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

        // load static data and compile vars
        buildConfig.static = JSON.parse(
            grunt.template.process(
                grunt.file.read('config/cameoBuildConfig-static.json'),
                {
                    data: {
                        'dlPath': buildConfig.path.dl,
                        'appPath': buildConfig.path.app
                    }
                }
            )
        );

        //check whether apiUrl should be overwritten
        var apiUrl = grunt.option('apiUrl');
        if (apiUrl) {
            buildConfig.config.apiUrl = apiUrl;
        }

        // for faster switch between apiUrls
        if('otherApiUrls' in buildConfig.config
         && buildConfig.config.apiUrl.indexOf('otherApiUrls') != -1
         && Object.keys(buildConfig.config.otherApiUrls).length > 0) {
            var jsonPath = buildConfig.config.apiUrl.split('.');
            buildConfig.config.apiUrl = buildConfig.config[jsonPath[0]][jsonPath[1]];
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

        if(typeof testConfig.config.stopOnError == 'undefined'){
            testConfig.config.stopOnError = false;
        }

        if(typeof testConfig.config.showConsoleError == 'undefined'){
            testConfig.config.showConsoleError = true;
        }

        var protractorDebug = grunt.option('debug');
        if (protractorDebug) {
            testConfig.config.protractorDebug = true
        }

        var platform = process.platform
        console.log("OS: " + platform)
        if (platform.match(/linux/)) {
            testConfig.config.chromeDriverPath = "../../../test/lib/ptor/chromedriver_linux"
        } else if (platform.match(/darwin/)) {
            testConfig.config.chromeDriverPath = "../../../test/lib/ptor/chromedriver_mac"
        } else if (platform.match(/win/)) {
            testConfig.config.chromeDriverPath = "../../../test/lib/ptor/chromedriver_win.exe"
        }

        return testConfig;
    })();

    // load grunt configs and passing vars
    // http://creynders.github.io/load-grunt-configs/
    var configs = require('load-grunt-configs')(grunt, {
        config : {
            src: 'grunt/**/*.js'
        },
        globalCameoSecrets: globalCameoSecrets,
        globalCameoBuildConfig: globalCameoBuildConfig,
        globalCameoTestConfig: globalCameoTestConfig
    });

    configs.pkg = grunt.file.readJSON('package.json');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig(configs);

    grunt.registerTask('default', []);
    grunt.registerTask('tests-all', ['tests-unit','tests-e2e']);
};
