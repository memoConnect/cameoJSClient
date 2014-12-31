module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('docs:to-dist', [
        'clean:docs',
        'app:packages',
        'ngdocs'
    ]);

    return {
        tasks:{
            clean: {
                'docs': ['docs','dist/docs']
            },
            ngdocs: {
                options: {
                    dest: 'dist/docs',
                    scripts: [
                        'dist/app/vendor.'+options.globalCameoBuildConfig.config.version+'.js',
                        'dist/app/cameo.'+options.globalCameoBuildConfig.config.version+'.js'
                    ],
                    /*styles: [
                        'dist/app/style.'+options.globalCameoBuildConfig.config.version+'.css'
                    ],*/
                    deferLoad: false,
                    html5Mode: false,
                    startPage: '/core',
                    title: 'cameoNet Docs',
                    image: 'dist/app/favicon.ico',
                    imageLink: 'https://www.cameonet.de',
                    titleLink: '/docs/index.html',
                    bestMatch: true
                },
                'core': {
                    src: ['core/comps/core/*.js'],
                    title: 'cmCore'
                },
                'ui': {
                    src: ['core/comps/ui/*.js'],
                    title: 'cmUi'
                },
                'conversations': {
                    src: ['core/comps/conversations/*.js'],
                    title: 'cmConversations'
                },
                'contacts': {
                    src: ['core/comps/contacts/*.js'],
                    title: 'cmContacts'
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