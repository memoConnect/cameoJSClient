module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('desktop:packages', [
        'clean:desktop-packages',
        'concat:desktop-vendor',
        'concat:desktop-packages',
        'concat:desktop-cameo'
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
                .replace(/(\\'|')/gm, "\\'");// uncomment single quotes,
            filepath = filepath.replace(/^(app|desktop|core)\//, '');
            // add to template array for module schmusi
            concatCmTemplatesFound.push(filepath);

            return "angular.module('" + filepath + "', []).run([\n" +
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

            packages['build/desktop/packages/' + packageName + '.js'] = [
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
                'desktop-packages': [
                    'build/desktop/packages/**/*.js'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'desktop-vendor': {
                    src: [
                        'core/vendor/!(angular)/*.js',
                        'core/vendor/!(angular)/**/*.js',
                        'core/vendor/angular/base/angular.js',
                        'core/vendor/angular/base/angular-*.js',
                        'core/vendor/angular/!(base|deprecated_)/*.js'
                    ],
                    dest: 'dist/desktop/vendor.' + options.globalCameoBuildConfig.config.version + '.js'
                },
                'desktop-packages': {
                    options: {
                        banner: "'use strict';\n\n",
                        process: concatConvertCmFiles
                    },
                    files: concatCreateCmPackages({
                        'core': 'core/comps/core',
                        'conversations': 'core/comps/conversations',
                        'contacts': 'core/comps/contacts',
                        'setup': 'core/comps/setup',
                        'user': 'core/comps/user',
                        'validate': 'core/comps/validate',
                        'files': 'core/comps/files',
                        'security_aspects': 'core/comps/security_aspects',
                        'ui': 'core/comps/ui',
                        'widgets': 'core/widgets',
                        'phonegap': 'core/comps/phonegap',
                        'node_webkit': 'core/comps/node_webkit',
                        'desktop_routes': 'desktop/routes',
                        'desktop_widgets': 'desktop/widgets',
                        'desktop_ui': 'desktop/comps/ui',
                        'desktop_user': 'desktop/comps/user',
                        'desktop_conversations': 'desktop/comps/conversations'
                    })
                },
                'desktop-cameo': {
                    options:{
                        banner: "'use strict';\n",
                        process: function(src) {
                            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        }
                    },
                    src: [
                        'build/desktop/base/config.js',
                        'desktop/base/app.js',
                        'build/desktop/packages/*.js'
                    ],
                    dest: 'dist/desktop/cameo.' + options.globalCameoBuildConfig.config.version + '.js'
                }
            }
        }
    }
};