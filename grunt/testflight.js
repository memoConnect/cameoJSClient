module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-testflight-jsonresult');

    return {
        tasks:{
            testflight: {
                options: {
                    apiToken: options.globalCameoSecrets.testflight.apiToken,
                    teamToken: options.globalCameoSecrets.testflight.teamToken,
                    notes: options.globalCameoBuildConfig.phonegap.baseName + options.globalCameoBuildConfig.phonegap.extraName + " " + options.globalCameoBuildConfig.phonegap.version,
                    distributionLists: ['cameoNet-dev'],
                    notify: true,
                    replace: true,
                    onDone: function (responseJson) {
                        options.globalCameoBuildConfig.iosTestFlightURL = responseJson.install_url
                    }
                },

                iOS: {
                    options: {
                        file: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa'
                    }
                },

                android: {
                    options: {
                        file: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk'
                    }
                }
            }
        }
    }
};