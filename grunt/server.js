module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('server:fe:node', ['bgShell:node']);
    grunt.registerTask('server:fe:python', ['shell:python']);
    grunt.registerTask('server:weinre', ['bgShell:weinre']);
    grunt.registerTask('server:be:cameo', ['bgShell:cameo']);

    return {
        tasks:{
            shell: {
                'python': {
                    options: {
                        stdout: true
                    },
                    command: 'python -m SimpleHTTPServer 8000'
                }
            },

            bgShell: {
                'node': {
                    cmd: 'node resource/web-server.js',
                    bg: false
                },
                'python': {
                    cmd: 'python -m SimpleHTTPServer 8000',
                    bg: false,
                    stdout: false
                },
                'cameo': {
                    cmd: 'sbt run',
                    bg: false,
                    execOpts: {
                        cwd: '../cameoServer'
                    }
                },
                'weinre': {
                    cmd: 'weinre --boundHost ' + options.globalCameoBuildConfig.debug.weinreIp,
                    bg: false
                }
            }
        }
    }
};