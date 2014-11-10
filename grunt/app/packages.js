module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('app:packages', [
        'clean:app-packages',
        'concat:app-vendor',
        'concat:app-packages',
        'concat:app-cameo'
    ]);

    // create packages
    var concatCmTemplatesFound = [];

    var concatConvertCmFiles = function (src, filepath) {
        // templates to template cache
        if (filepath.search(/.*\.html/g) != -1) {
            var lines = src
                .replace(/(\r\n|\n|\r|\t)/gm, '')// clear system signs
                .replace(/\s{2,100}(<)/gm, '<')// clear whitespaces before html tag
                .replace(/\s{2,100}/gm, ' ')// clear whitespaces on line
                .replace(/(')/gm, "\\'");// uncomment single quotes,
            filepath = filepath.replace(/^(app|desktop|core)\//, '');
            // add to template array for module schmusi
            concatCmTemplatesFound.push(filepath);

            return  "angular.module('" + filepath + "', []).run([\n" +
                "'$templateCache', function($templateCache) {\n" +
                "$templateCache.put('" + filepath + "'," +
                "\n'" + lines + "'" +
                ");\n" +
                "}]);";
            // module banger
        } else if (filepath.search(/.*\/-module-.*/g) != -1) {
            // add found templates to package module
            if (concatCmTemplatesFound.length > 0) {
                var templateNames = "'" + concatCmTemplatesFound.join("','") + "'";
                concatCmTemplatesFound = [];
                return src
                    .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                    .replace(/\]\)/g, ',' + templateNames + '])')
                    .replace(/\[,/g, '[')// remove [, fail when module has no dependencies
                    .replace(/(\;[ \s]*)$/g, '')
            } else {
                return src
                    .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                    .replace(/(\;[ \s]*)$/g, '')
            }
            // clear scripts use_strict, clear also angular.module(..) and last ; include white space
        } else {
            return src
                .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                .replace(/(angular\.module\(.*\))/g, '')
                .replace(/(\;[ \s]*)$/g, '')
        }
    };

    var concatCreateCmPackages = function (packagesObject) {
        var packages = {},
            packagesObject = packagesObject || {};

        Object.keys(packagesObject).forEach(function (packageName) {
            var settings,
                moduleName = packageName;
                exclude = '!(-module-' + moduleName + ')',
                include = '*',
                packagePath = packagesObject[packageName],
                file = 'package.js';

            if (typeof packagePath == "object") {
                settings = packagePath;
                // override
                moduleName = settings.moduleName || moduleName;
                include = settings.include || include;
                exclude = settings.exclude || exclude;
                packagePath = settings.packagePath || packagePath;
                file = settings.file || file;
            }

            packages['build/app/packages/' + packageName + '.js'] = [
                    packagePath + '/**/*.html', // at last all templates
                    packagePath + '/-module-' + moduleName + '.js', // at first module
                    packagePath + '/**/' + exclude + include + '.js' // all directives / services / factorys etc
            ];
        });

        return packages;
    };

    return {
        tasks:{
            clean: {
                'app-packages': [
                    'build/app/packages/**/*.js'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'app-vendor': {
                    src: [
                        'core/vendor/!(angular)/*.js',
                        'core/vendor/!(angular)/**/*.js',
                        'core/vendor/angular/base/angular.js',
                        'core/vendor/angular/base/angular-*.js',
                        'core/vendor/angular/!(base)/*.js'
                    ],
                    dest: 'dist/app/vendor.' + options.globalCameoBuildConfig.config.version + '.js'
                },
                'app-packages': {
                    options: {
                        banner: "'use strict';\n\n",
                        process: concatConvertCmFiles
                    },
                    files: concatCreateCmPackages({
                        'core': 'core/comps/core',
                        'conversations': 'core/comps/conversations',
                        'contacts': 'core/comps/contacts',
                        'user': 'core/comps/user',
                        'validate': 'core/comps/validate',
                        'files': 'core/comps/files',
                        'security_aspects': 'core/comps/security_aspects',
                        'ui': 'core/comps/ui',
                        'widgets': 'core/widgets',
                        'phonegap': 'core/comps/phonegap',
                        'app_routes': 'app/routes',
                        'app_widgets': 'app/widgets',
                        'app_ui': 'app/comps/ui',
                        'app_user': 'app/comps/user',
                        'app_conversations': 'app/comps/conversations',
                    })
                },
                'app-cameo': {
                    options:{
                        banner: "'use strict';\n",
                        process: function(src) {
                            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        }
                    },
                    src: [
                        'app/base/app.js',
                        'build/app/base/config.js',
                        'build/app/packages/*.js'
                    ],
                    dest: 'dist/app/cameo.' + options.globalCameoBuildConfig.config.version + '.js'
                }
            }
        }
    }
};