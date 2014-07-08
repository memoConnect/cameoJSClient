'use strict';

angular.module('cmCore')
.provider('cmLanguage', [
    '$translateProvider',
    function($translateProvider){

        var supported_languages = [],
            path_to_languages = '',
            cache_lang_files = true;

        this.supportedLanguages = function(languages){
            supported_languages = languages;
            return(this)
        };

        this.pathToLanguages = function(path){
            path_to_languages = path;

            $translateProvider.useStaticFilesLoader({
                prefix: path+'/',
                suffix: '.json' + (cache_lang_files ? '' : '?bust=' + (new Date()).getTime())
            });

            return(this)
        };

        this.useLocalStorage = function(){
            $translateProvider.useLocalStorage();
            return(this)
        };

        this.preferredLanguage = function(lang_key){
            $translateProvider.preferredLanguage(lang_key);
            return(this)
        };

        this.cacheLangFiles = function(bool){
            cache_lang_files = bool;
            return(this)
        };

        this.translations = function(lang_key, data){
            $translateProvider.translations(lang_key, data)
        };

        this.$get = [
            'cmTranslate',
            'cmNotify',
            'cmLogger',
            function(cmTranslate, cmNotify, cmLogger){

                if(supported_languages.length == 0)
                    cmLogger.error('No supported languages found. Try cmLanguageProvider.setSupportedLanguages().', {ttl:5000})

                return {
                    getSupportedLanguages: function(){
                        return supported_languages
                    },

                    getPathToLanguage: function(path){
                        return path_to_languages
                    },

                    getLanguageName: function(lang_key){
                        lang_key = lang_key || cmTranslate.uses();
                        return cmTranslate('LANG.'+lang_key.toUpperCase())
                    },

                    switchLanguage: function(lang_key){
                        var self = this;

                        return cmTranslate.uses(lang_key)
                            .then(
                            function(){
                                cmNotify.info(cmTranslate('LANG.SWITCH.SUCCESS', { lang: self.getLanguageName(lang_key) }), {ttl: 2000})
                            },
                            function(){
                                cmNotify.error(cmTranslate('LANG.SWITCH.ERROR', { lang: self.getLanguageName(lang_key) }), {ttl: 2000})
                            }
                        )
                    },

                    getCurrentLanguage:  function(){
                        return cmTranslate.uses() || cmTranslate.preferredLanguage()
                    }
                }
            }
        ]
    }
]);