module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('phonegap:build-only', [
        'phonegap:app-prepare',
        'phonegap:app-config-local',
        'phonegap:build'
    ]);

    grunt.registerTask('phonegap:build-n-run', [
        'phonegap:app-prepare',
        'phonegap:app-config-local',
        'phonegap:build',
        'phonegap:run'
    ]);

    function genPlugins(useRepo){
        var plugins = options.globalCameoPhonegapConfig.plugins,
            array = [];

        plugins.forEach(function(plugin){
            array.push(useRepo && 'repo' in plugin ? plugin.repo : plugin.name);
        });

        return array;
    }

    return {
        tasks:{
            copy: {
                'resources-phonegap-local': {
                    files: [
                        {
                            expand: true,
                            cwd: 'resource/phonegap/res/',
                            src: ['**'],
                            dest: 'build/phonegap-tmp/res/'
                        }
                    ]
                }
            },
            phonegap: {
                // https://www.npmjs.org/package/grunt-phonegap
                config: {
                    root: 'build/phonegap/www',
                    config: 'build/phonegap/www/config.xml',
                    cordova: 'resource/phonegap/.cordova',
                    path: 'build/phonegap-tmp',
                    plugins: genPlugins(true),
                    platforms: [
                        'android'
//                        'ios'
                    ],

                    maxBuffer: 1000, // You may need to raise this for iOS.
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
            }
        }
    }
};