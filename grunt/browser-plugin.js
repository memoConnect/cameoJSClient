module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('util:build-browser-plugin', ['shell:build-browser-plugin']);

    return {
        tasks:{
            shell: {
                'build-browser-plugin': {
                    options: {
                        stdout: true
                    },
                    command: 'python ../kango/kango.py build ./resource/browserPlugin'
                }
            },

            bgShell: {
                'build-browser-plugin': {
                    cmd: 'python ../kango/kango.py build ./resource/browserPlugin',
                    bg: false
                }
            }
        }
    }
};