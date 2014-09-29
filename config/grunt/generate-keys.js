module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test:generate-keys', ['shell:generateKeys']);

    return {
        tasks:{
            shell: {
                generateKeys: {
                    options: {
                        stdout: false
                    },
                    command: 'cd test/e2e/keys && rm -f *.key && ssh-keygen -N "" -f 1.key && ssh-keygen -N "" -f 2.key && ssh-keygen -N "" -f 3.key && ssh-keygen -N "" -f 4.key && ssh-keygen -N "" -f 5.key&& rm *.key.pub'
                }
            }
        }
    }
};