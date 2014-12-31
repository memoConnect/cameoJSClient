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

                'ios': {
                    options: {
                        file: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.ipa'
                    }
                },

                'ios-manually': {
                    options: {
                        file: 'dist/dl/cameoNet-stage-0.4.6.224.ipa'
                    }
                },

                'android': {
                    options: {
                        file: 'dist/dl/' + options.globalCameoBuildConfig.phonegap.phonegapBaseFilename + '.apk'
                    }
                }
            }
        }
    }
};