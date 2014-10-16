module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('phonegap:adb-run', [
        'phonegap:app-prepare',
        'phonegap:build',
        'phonegap:run'
    ]);

    return {
        tasks:{
            phonegap: {
                // https://www.npmjs.org/package/grunt-phonegap
                config: {
                    root: 'build/phonegap/www',
                    config: 'build/phonegap/www/config.xml',
                    cordova: '.cordova',
                    path: 'build/phonegap-build',
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
            }
        }
    }
};