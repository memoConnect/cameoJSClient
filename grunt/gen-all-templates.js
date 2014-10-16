module.exports = function(grunt, options) {

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('app:gen-all-templates', [
        'protractor:e2e:config',// protractor.js
        'template:app-files',// app.js
        'app:create-webworker',// webworker.js
        'phonegap:app-config',// phonegap-to-buildserver.js
        'protractor:config',// protractor.js
        'app:create-style-via-less',// less.js
        'cockpit:deploy'// cockpit.js
    ]);

    return {
        tasks:{
            copy: {
                'test-config': {
                    files: [
                        {
                            src: 'config/cameoBuildConfig-test.json',
                            dest: 'config/cameoBuildConfig-jenkins.json'
                        }
                    ]
                }
            }
        }
    }
};