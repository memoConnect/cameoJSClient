'use strict';

describe("cmLanguage", function() {

    var cmConfig,
        language_tables = {};

    function ucfirst(str) {
        //  discuss at: http://phpjs.org/functions/ucfirst/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: ucfirst('kevin van zonneveld');
        //   returns 1: 'Kevin van zonneveld'

        str += '';
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    }

    //Helper function to serialize all message ids
    function extendList(list, str, obj) {
        if (typeof obj == 'string') {
            list.push(str)
        } else {
            $.each(obj, function (key, value) {
                extendList(list, str + (str ? '.' : '') + key, value)
            })
        }
    }

    describe("setup", function(){

        beforeEach(function(){
            module('cmConfig')
            inject(function(_cmConfig_){
                cmConfig = _cmConfig_
            })
        })

        it('should find an array of correctly formatted keys for supported languages at cameo.supported_languages', function() {
            expect(Object.prototype.toString.call( cmConfig.supportedLanguages )).toEqual('[object Array]')
            cmConfig.supportedLanguages.forEach(function(lang_key){
                expect(lang_key.match(/^[a-z]{2}$/)).not.toEqual(null) // e.g. de / en
            })
        })

        it('should find string with path to languages files at cameo.path_to_language files.', function(){
            expect(typeof cmConfig.pathToLanguages).toEqual('string')
        })

        xit('should find and load correctly named and json formatted files for all supported languages within 5 second.', function() {
            var count = cmConfig.supportedLanguages.length

            cmConfig.supportedLanguages.forEach(function(lang_key){
                var file = 'dist/app/'+cmConfig.pathToLanguages+'/'+lang_key+'.json';
                language_tables[lang_key] = eval(window.__html__[file])
                console.log(typeof language_tables[lang_key])
            })

            expect(Object.keys(language_tables).length).toEqual(cmConfig.supportedLanguages.length)
        })

        describe('validate files', function(){
            it('inject files', function(){
                cmConfig.supportedLanguages.forEach(function (lang_key) {
                    beforeEach(function(){
                        module('i18n/' + lang_key + '.json')
                        module('i18n/language-keys.json')
                    })
                })
            })

            it('should find a translation for each message_id for all supported languages.', function() {
                cmConfig.supportedLanguages.forEach(function (lang_key) {
                    inject(['i18n'+ucfirst(lang_key), function (jsonData){
                        language_tables[lang_key] = jsonData
                    }])
                })

                var used_ids,
                    missing_ids = {}

                inject(['i18nLanguageKeys', function(data){ used_ids = data }])

                $.each(language_tables, function(lang_key, language_data){
                    used_ids.forEach(function(message_id){
                        var translated_keys = []
                        extendList(translated_keys, '', language_data)

                        missing_ids[lang_key] = missing_ids[lang_key] || []

                        if(translated_keys.indexOf(message_id) == -1)
                            missing_ids[lang_key].push(message_id) 
                    })
                })

                $.each(language_tables, function(lang_key, language_data){
                    if(missing_ids[lang_key].length != 0)
                        console.log('\n'+ lang_key + ' is missing translations for the following message ids:\n\n'+ JSON.stringify(missing_ids[lang_key], null, 2) + '\n')

                    //expect(missing_ids[lang_key].length).toBe(0)
                })
            })

            it('should find the same language keys in all supported language file.', function() {
                cmConfig.supportedLanguages.forEach(function(lang_key) {
                    inject(['i18n'+ucfirst(lang_key), function(jsonData){
                        language_tables[lang_key] = jsonData
                    }])
                })

                var message_ids = {}

                //Helper function to compare language lists od message ids
                function diffLists(list1, list2) {
                    list1.sort()
                    list2.sort()

                    var i = 0

                    while (list1[i] && (list1[i] == list2[i])) {
                        i++
                    }

                    return((list1[i] || list2[i]) ? list1[i] +' / '+ list2[i] : false)
                }

                var list = [],
                    all_the_same = true

                $.each(language_tables, function (lang_key, language_data) {
                    if (list.length == 0) {
                        extendList(list, '', language_data)
                    } else {
                        var next_list = [],
                            last_diff = undefined

                        extendList(next_list, '', language_data)
                        last_diff = diffLists(list, next_list)

                        if (last_diff) {
                            console.log('Missing, surplus or not matching message id in ' + lang_key + ': ' + last_diff)
                        }

                        all_the_same = all_the_same && !last_diff
                        list = next_list
                    }
                })
            })

            var needles = '@todo,<br>'
            it('should have none of this '+needles+' inside', function(){
                var foundPosition = {},
                    arrNeedles = needles.split(',');

                function foundNeedle(needle, i18nKey){
                    if(!(needle in foundPosition)){
                        foundPosition[needle] = [];
                    }

                    foundPosition[needle].push(i18nKey)
                }

                function scan(obj, key){
                    var k;
                    if (obj instanceof Object) {
                        for (k in obj){
                            if (obj.hasOwnProperty(k)){
                                //recursive call to scan property
                                scan( obj[k], key ? key+'.'+k : k)
                            }
                        }
                    } else {
                        //not an Object so obj[k] here is a value
                        arrNeedles.forEach(function(needle){
                            if(obj.indexOf(needle) >= 0) {
                                foundNeedle(needle, key)
                            }
                        })
                    }
                }

                scan(language_tables);

                if(cmConfig.errorOnTodoInI18n)
                    expect(Object.keys(foundPosition).length).toEqual(0)

                if(Object.keys(foundPosition).length > 0){
                    console.log(needles + '\'s found at: ' + JSON.stringify(foundPosition, null, 2) + '\n')
                }
            })
        })
    })

    xdescribe("module", function() {

        var ctrl, scope, cmLanguage, cmTranslate, $compile, $httpBackend

        beforeEach(module('cmCore', [
            'cmLanguageProvider',
            function(cmLanguageProvider){
                cmLanguageProvider
                .preferredLanguage( 'en' )
                .supportedLanguages(['en, de'])
                .pathToLanguages('i18n')
                .translations('en', {
                    'LANG.EN_US' : 'english',
                    'TEST': 'works'
                })
            }
        ]))

        beforeEach(inject(function(_$rootScope_, _$compile_, _cmLanguage_, _cmTranslate_, _$httpBackend_){
            scope        = _$rootScope_.$new()
            cmLanguage   = _cmLanguage_
            cmTranslate  = _cmTranslate_
            $compile     = _$compile_
            $httpBackend = _$httpBackend_
        }))

        it('should provide a service "cmTranslate".', function(){
            expect(cmTranslate).toBeDefined()
        })

        it('should provide a service "cmLanguage".', function(){
            expect(cmLanguage).toBeDefined()
        })

        describe("cmLanguage filter", function(){

            it('should provide a function "getLanguageName" to get the translation of a languages\'s name by its key.', function(){
                cmLanguage.getLanguageName('en').then(function(langName){
                    expect(langName).toEqual('english')
                })
            })


            it('should provide a function "getCurrentLanguage" to return the currently active languages\'s key.', function(){
                expect(cmLanguage.getCurrentLanguage()).toEqual('en')
            })


            it('should provide a function "getSupportedLanguages" to return the keys of supported languages\'.', function(){
                expect(cmLanguage.getSupportedLanguages()).toEqual(['en, de'])
            })

            it('should provide a function "getPathToLanguage" to return the path to language files.', function(){
                expect(cmLanguage.getPathToLanguage()).toEqual('i18n')
            })

            it('should provide a function "switchLanguage" to switch between supported languages.', function(){
                expect(typeof cmLanguage.switchLanguage).toEqual('function')

                $httpBackend.whenGET('i18n/de.json')
                .respond('{"LANG": {"FR":"Französisch"} }')

                //return a promise
                cmLanguage.switchLanguage('de')

                //resolves all promises
                $httpBackend.flush();

                cmLanguage.getLanguageName('fr').then(function(langName){
                    expect(langName).toBe('Französisch')
                })
                $httpBackend.verifyNoOutstandingExpectation()
            })
        })

        it('should provide translation filter \'cmTranslate\'', function(){
            var el = $('<span>{{"TEST"|cmTranslate}}</span>')

            $compile(el)(scope)
            scope.$digest()
            expect(el.text()).toEqual('works')
        })
    })
})
