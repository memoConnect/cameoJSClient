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


var cmLanguage = angular.module('cmLanguage', ['pascalprecht.translate', 'cmNotify', 'cmLogger'])


cmLanguage.service('cmTranslate', ['$translate', function($translate){ return $translate }])

cmLanguage.filter('cmTranslate', ['translateFilter', function(translateFilter){ return translateFilter }])


//Does not work as intended <div cm-translate="LANG.DE_DE"></div> stays empty
cmLanguage.directive('cmTranslate', ['translateDirective', function(translateDirective){ return translateDirective[0] }])


cmLanguage.provider('cmLanguage', [

	'$translateProvider', 

	function($translateProvider){

		var supported_languages = [],
			path_to_languages = ''

		this.supportedLanguages = function(languages){
			supported_languages = languages
			return(this)
		}

		this.pathToLanguages = function(path){
			path_to_languages = path

			$translateProvider.useStaticFilesLoader({
       			prefix: path+'/lang-',            
       			suffix: '.json'
        	})

			return(this)
		}

		this.useLocalStorage = function(){
			$translateProvider.useLocalStorage()
			return(this)
		}

		this.preferredLanguage = function(lang_key){
			$translateProvider.preferredLanguage(lang_key)
			return(this)   
		}

		this.translations = function(lang_key, data){
			$translateProvider.translations(lang_key, data)
		}

		this.$get = [

			'cmTranslate',
			'cmNotify',
			'cmLogger',

			function(cmTranslate, cmNotify, cmLogger){
				
				if(supported_languages.length == 0) cmLogger.error('No supported languages found. Try cmLanguageProvider.setSupportedLanguages().')			

				return {
					getSupportedLanguages: function(){
						return	supported_languages							
					},

					getPathToLanguage: function(path){
						return	path_to_languages
					},

					getLanguageName: function(lang_key){			
						lang_key = lang_key || cmTranslate.uses()
						return	cmTranslate('LANG.'+lang_key.toUpperCase())
					},

					switchLanguage: function(lang_key){
						var self = this
						
						return 	cmTranslate.uses(lang_key)
								.then(
									function(){
										cmNotify.info(cmTranslate('LANG.SWITCH.SUCCESS', { lang : self.getLanguageName(lang_key) }))
									},
									function(){
										cmNotify.error(cmTranslate('LANG.SWITCH.ERROR', { lang : self.getLanguageName(lang_key) }))
									}
								)
					},

					getCurrentLanguage:  function(){
						return	cmTranslate.uses() || cmTranslate.preferredLanguage()
					}

				}
			}	
		]
	}
])


cmLanguage.directive('cmLanguageSelect', [

	'cmLanguage',

	function(cmLanguage){
		return {

			restrict: 'AE',
			transclude: true,
			template: '<select ng-model="language" ng-options="getLanguageName(lang_key) for lang_key in languages"><a ng-repeat="key in languages">{{languages}}</a></select>',

			link: function(scope, element, attrs ){
				element.find('select').on('change', function(){ cmLanguage.switchLanguage(scope.language) })
			},

			controller: function($scope, $element, $attrs){
				$scope.languages 			= cmLanguage.getSupportedLanguages()
				$scope.getLanguageName		= cmLanguage.getLanguageName				
				$scope.language = cmLanguage.getCurrentLanguage()
			}
		}
	}
])
