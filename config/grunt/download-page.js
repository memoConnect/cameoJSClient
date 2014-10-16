module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('app:create-download-page', [
        'clean:app-dl',
        'template:app-index-dl',
        'copy:app-resources-dl',
        'copy:phonegap-target'
    ]);

    return {
        tasks:{
            clean:{
                'app-dl': ['dist/dl']
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
                            'testFlightiOSURL': function () {
                                return options.globalCameoBuildConfig.iosTestFlightURL
                            }
                        }
                    },
                    'files': {
                        'dist/dl/index.html': ['resource/templates/dl/index.html']
                    }
                }
            }
        }
    }
};