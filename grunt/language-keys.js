module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-search');

    return {
        tasks:{
            search: {
                'language-keys': {
                    files: {
                        src: ['dist/app/**/*.js', 'dist/app/**/*.html']
                    },
                    options: {
                        searchString: /\b[A-Z0-9_]*[A-Z]+[A-Z0-9_]*\b(\.[A-Z0-9_]*[A-Z]+[A-Z0-9_]*\b)+/g,
                        logFormat: 'custom',
                        customLogFormatCallback: function(params) {
                            var list = []

                            for(key in params.results){
                                params.results[key]
                                .map(function(item){return item.match })
                                .forEach(function(match){
                                    if(list.indexOf(match) == -1)
                                        list.push(match)
                                })
                            }

                            grunt.file.write('build/i18n/language-keys.json', JSON.stringify(list.sort()))

                            return list.sort()
                        }
                    }
                }
            }
        }
    }
};