module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('phonegap:build-only', [
        'phonegap:app-prepare',
        'phonegap:build'
    ])

    grunt.registerTask('phonegap:build-n-run', [
        'phonegap:app-prepare',
        'phonegap:build',
        'phonegap:run'
    ]);


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
                    cordova: '.cordova',
                    path: 'build/phonegap-tmp',
                    plugins: [
                        'org.apache.cordova.device',
                        'org.apache.cordova.camera',
                        'org.apache.cordova.file',
                        'org.apache.cordova.file-transfer',
                        'org.apache.cordova.network-information',
                        'com.phonegap.plugins.pushplugin',
                        'https://github.com/memoConnect/cordova-plugin-contacts.git',
                        'de.appplant.cordova.plugin.hidden-statusbar-overlay',
                        'com.jamiestarke.webviewdebug',
                        'https://github.com/memoConnect/de.cameonet.cordova.crypto.git'
                    ],
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