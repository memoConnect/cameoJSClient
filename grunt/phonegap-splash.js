module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-phonegapsplash');

    grunt.registerTask('phonegap:create-splashscreens', [
        'phonegapsplash:build'
    ]);

    return {
        tasks:{
            // splashscrenn for apps
            phonegapsplash: {
                build: {
                    src: 'resource/phonegap/res/screens/splash-canevas.png',
                    dest: 'build/phonegapsplash/',
                    options: {
                        layouts: ['portrait'],
                        profiles: ['android', 'ios', 'windows-phone']
                    }
                }
            }
        }
    }
};