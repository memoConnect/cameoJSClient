module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-coffee');

    return {
        tasks:{
            coffee: {
                compile: {
                    files: [
                        {
                            expand: true,
                            cwd: 'app/coffee/',
                            src: ['**/*.coffee'],
                            dest: 'app/coffee/',
                            ext: '.js'
                        }
                    ]
                }
            }
        }
    }
};