module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');

    grunt.registerTask('cockpit:deploy-without-template', [
        'clean:cockpit-dist',
        'copy:cockpit-files'
    ]);

    grunt.registerTask('cockpit:deploy-to-dist', [
        'cockpit:deploy-without-template',
        'template:cockpit-files'
    ]);

    return {
        tasks: {
            clean: {
                'cockpit-dist': [
                    'dist/cockpit/'
                ]
            },
            copy: {
                'cockpit-files': {
                    files: [
                        {
                            expand: true,
                            cwd: 'cockpit/',
                            src: ['**'],
                            dest: 'dist/cockpit/'
                        }
                    ]
                }
            },
            template: {
                'cockpit-files': {
                    'options': {
                        'data': {
                            'currentVersion': options.globalCameoBuildConfig.config.version,
                            'basePath': options.globalCameoBuildConfig.path.cockpit,
                            'appPath': options.globalCameoBuildConfig.path.app
                        }
                    },
                    'files': {
                        'dist/cockpit/index.html': ['dist/cockpit/index.html']
                    }
                }
            }
        }
    }
};