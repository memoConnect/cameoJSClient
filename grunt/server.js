module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bg-shell');

    grunt.registerTask('server:node', ['bgShell:node']);
    grunt.registerTask('server:python', ['shell:python']);
    grunt.registerTask('server:weinre', ['bgShell:weinre']);
    grunt.registerTask('server:cameo', ['bgShell:cameo']);
    grunt.registerTask('server:cameo:update', ['bgShell:cameo-update']);
    grunt.registerTask('util:npm-install', ['bgShell:npm-install']);
    grunt.registerTask('util:npm-update', ['bgShell:npm-update']);
    grunt.registerTask('util:npm-prune', ['bgShell:npm-prune']);

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
                'npm-install': {
                    cmd: 'npm install',
                    bg: false
                },
                'npm-update': {
                    cmd: 'npm update',
                    bg: false
                },
                'npm-prune': {
                    cmd: 'npm prune',
                    bg: false
                },
                'weinre': {
                    cmd: 'weinre --boundHost ' + options.globalCameoBuildConfig.debug.weinreIp,
                    bg: false
                }
            }
        }
    }
};