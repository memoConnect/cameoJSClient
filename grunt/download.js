module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('download-page:create', [
        'clean:app-dl',
        'copy:app-resources-dl',
        'template:app-index-dl'
    ]);

    return {
        tasks:{
            clean:{
                'app-dl': ['dist/dl/gfx']
            },
            copy: {
                'app-resources-dl': {
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
            template: {
                'app-index-dl': {
                    'options': {
                        'data': {
                            'phonegapBaseFilename': options.globalCameoBuildConfig.phonegap.phonegapBaseFilename,
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'appPath': options.globalCameoBuildConfig.path.app,
                            'dlPath': options.globalCameoBuildConfig.path.dl,
                            'appLinks': options.globalCameoBuildConfig.static.appLinks,
                            'testFlightiOSURL': function () {
                                return options.globalCameoBuildConfig.iosTestFlightURL
                            }
                        }
                    },
                    'files': {
                        'dist/dl/index.html': ['dist/dl/index.html']
                    }
                }
            }
        }
    }
};