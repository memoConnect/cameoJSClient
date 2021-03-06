module.exports = function(grunt, options){

    var checksums = {};

    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('download-page:create', [
        'clean:app-dl',
        'copy:app-resources-dl',
        'getChecksums',
        'template:app-index-dl'
    ]);

    grunt.registerTask('getChecksums', function() {
        var done = this.async();

        var crypto = require('crypto'),
            fs = require('fs');

        // change the algo to sha1, sha256 etc according to your requirements
        var algo = 'sha1',
            shasum = crypto.createHash(algo),
            file = './dist/dl/'+options.globalCameoBuildConfig.phonegap.phonegapBaseFilename+'.apk';

        if(grunt.file.exists(file)) {
            fs.ReadStream(file)
            .on('data', function (d) {
                shasum.update(d);
            })
            .on('end', function () {
                checksums.android = shasum.digest('hex');
                done();
            });
        } else {
            checksums.android = '';
            done();
        }
    });

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
                            'checksums': function(){
                                return checksums;
                            },
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