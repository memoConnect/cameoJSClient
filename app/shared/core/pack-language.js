'use strict';

// Provides:
// filter 'translate', usage: {{'MESSAGE_ID' | translate}}
// controller 'languageCtrl' for language switch
// Example:
// <div ng-controller="LanguageCtrl">
//		<a href="" ng-click="switchLang('en_US')">Englisch</a></li>
//		<a href="" ng-click="switchLang('de_DE')">German</li>
// </div>
// language files: /languages/lang-$langKey.json
// language file format:
//		{
//			"MESSAGE_ID": "Text",
//			"NAMESPACE"	: {
//				"MESSAGE_ID": "Hello {{username}}"
//			}
//		}
// language keys: $LANG_$CULTURE, en_US
// last language is stored in local storage (fallback cookie)
// Todo: new logger, add notify

angular.module('cmCore')
.service('cmTranslate', [
    '$translate', function($translate){ return $translate }
])
.filter('cmTranslate', [
    'translateFilter', function(translateFilter){ return translateFilter }
])

//Does not work as intended <div cm-translate="LANG.DE_DE"></div> stays empty
.directive('cmTranslate', [
    'translateDirective', function(translateDirective){ return translateDirective[0] }
])

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
                                cmNotify.info(cmTranslate('LANG.SWITCH.SUCCESS', { lang: self.getLanguageName(lang_key), ttl: 5000 }))
                            },
                            function(){
                                cmNotify.error(cmTranslate('LANG.SWITCH.ERROR', { lang: self.getLanguageName(lang_key), ttl: 5000 }))
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
])

.directive('cmLanguageSelect', [
    'cmLanguage',
    function(cmLanguage){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<select ng-model="language" ng-options="getLanguageName(lang_key) for lang_key in languages">'+
                      '<a ng-repeat="key in languages">{{languages}}</a>'+
                      '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmLanguage.switchLanguage(scope.language)
                })
            },

            controller: function($scope){
                $scope.languages = cmLanguage.getSupportedLanguages()
                $scope.getLanguageName = cmLanguage.getLanguageName
                $scope.language = cmLanguage.getCurrentLanguage()
            }
        }
    }
]);