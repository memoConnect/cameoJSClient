module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('build:create-docs', [
        'clean:docs',
        'app:packages',
        'ngdocs'
    ]);

    return {
        tasks:{
            clean: {
                'docs': ['docs']
            },
            ngdocs: {
                options: {
                    dest: 'docs',
                    scripts: [
                        'app/vendor.'+options.globalCameoBuildConfig.config.version+'.js',
                        'app/cameo.'+options.globalCameoBuildConfig.config.version+'.js'
                    ],
                    deferLoad: false,
                    html5Mode: false,
                    startPage: '/core',
                    title: 'CameoNET QS',
                    image: 'app/favicon.ico',
                    imageLink: 'https://www.cameo.io',
                    titleLink: '/docs/index.html',
                    bestMatch: true
                },
                core: {
                    src: ['app/comps/core/*.js'],
                    title: 'cmCore'
                },
                ui: {
                    src: ['app/comps/ui/*.js'],
                    title: 'cmUi'
                },
                conversations: {
                    src: ['app/comps/conversations/*.js'],
                    title: 'cmConversations'
                },
                '1-api': {
                    src: ['resource/docs/api/*.ngdoc'],
                    title: 'api'
                },
                '2-help': {
                    src: ['resource/docs/help/*.ngdoc'],
                    title: 'help'
                },
                '3-icons': {
                    src: ['resource/docs/misc/*.ngdoc'],
                    title: 'icons'
                }
            }
        }
    }
};