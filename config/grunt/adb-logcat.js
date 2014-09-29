module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('utils:logcat-cordova', [
        'bgShell:logcat-cordova'
    ]);
    grunt.registerTask('utils:logcat-clear', [
        'bgShell:logcat-clear'
    ]);
    grunt.registerTask('utils:firefox-remote-debugging', [
        'bgShell:firefox-remote-debugging'
    ]);

    return {
        tasks:{
            bgShell: {
                'logcat-cordova': {
                    cmd: 'adb logcat | grep "CordovaLog"',
                    bg: false
                },
                'logcat-clear': {
                    cmd: 'adb logcat -c',
                    bg: false
                },
                'firefox-remote-debugging': {
                    cmd: 'adb forward tcp:6000 tcp:6000',
                    bg: false
                }
            }
        }
    }
};