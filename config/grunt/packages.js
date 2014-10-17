module.exports = function(grunt, options){

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('app:js-files', [
        'clean:app-js-files',
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
            filepath = filepath.replace('app/', '');
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

            packages[packagePath.replace('app/', 'dist/app/packages/') + '/' + file] = [
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
                'app-js-files': [
                    'app/packages/**/*.js',
                    'app/vendor*.js',
                    'app/cameo*.js'
                ]
            },
            concat: {
                'options': {
                    separator: '\n'
                },
                'app-vendor': {
                    src: [
                        'app/vendor/!(angular)/*.js',
                        'app/vendor/!(angular)/**/*.js',
                        'app/vendor/angular/base/angular.js',
                        'app/vendor/angular/base/angular-*.js',
                        'app/vendor/angular/!(base)/*.js'
                    ],
                    dest: 'app/vendor.' + options.globalCameoBuildConfig.config.version + '.js'
                },
                'app-packages': {
                    options: {
                        banner: "'use strict';\n\n",
                        process: concatConvertCmFiles
                    },
                    files: concatCreateCmPackages({
                        'core': 'app/comps/core',
                        'core-cockpit': {
                            packagePath: 'app/comps/core',
                            moduleName: 'core-cockpit',
                            //                        include:'*(*api|*auth|*crypt|*logger)',
                            exclude: '!(fcty-|pack-|-module|*identity|*language|*notify|*cron|*job|*localstorage|*usermodel|*util)',
                            file: 'package-cockpit.js'
                        },
                        'conversations': 'app/comps/conversations',
                        'contacts': 'app/comps/contacts',
                        'user': 'app/comps/user',
                        'validate': 'app/comps/validate',
                        'files': 'app/comps/files',
                        'security_aspects': 'app/comps/security_aspects',
                        'ui': 'app/comps/ui',
                        'phonegap': 'app/comps/phonegap',
                        'routes': 'app/routes',
                        'widgets': 'app/widgets'
                    })
                },
                'app-cameo': {
                    src: [
                        'app/base/config.js',
                        'app/base/app.js',
                        'dist/app/packages/**/package.js'
                    ],
                    dest: 'app/cameo.' + options.globalCameoBuildConfig.config.version + '.js'
                }
            }
        }
    }
};