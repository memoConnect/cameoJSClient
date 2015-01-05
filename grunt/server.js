module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('server:node', ['bgShell:node']);
    grunt.registerTask('server:python', ['shell:python']);
    grunt.registerTask('server:weinre', ['bgShell:weinre']);
    grunt.registerTask('server:cameo', ['bgShell:cameo']);
    grunt.registerTask('server:cameo:update', ['bgShell:cameo-update']);

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
                'cameo-update': {
                    cmd: 'git pull',
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