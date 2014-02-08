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


var cmLanguage = angular.module('cmLanguage', ['pascalprecht.translate', 'cmNotify'])


cmLanguage.config([

    '$translateProvider', //from angular-translate

    function ($translateProvider) {    	    	
    	//tell translation service where to find language tables
        $translateProvider.useStaticFilesLoader({
       		prefix: 'languages/lang-',            //neue route BE
       		suffix: '.json'
        });

        function getBrowserLangugage(){
        	//dummy
        	return('en_US')
        }

        $translateProvider.preferredLanguage( getBrowserLangugage() );                
        // Breaks test: $translateProvider.useLocalStorage();
    }
])


cmLanguage.service('cmTranslate', ['$translate', function($translate){ return $translate }])

cmLanguage.filter('cmTranslate', ['translateFilter', function(translateFilter){ return translateFilter }])


//Does not work as intended <div cm-translate="LANG.DE_DE"></div> stays empty
cmLanguage.directive('cmTranslate', ['translateDirective', function(translateDirective){ return translateDirective[0] }])


cmLanguage.provider('cmLanguage', function(){

	var supported_languages = [],
		path_to_languages = ''

	this.setSupportedLanguages = function(languages){
		supported_languages = languages
	}

	this.setPathToLanguages = function(path){
		path_to_languages = path
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

				getLanguagePath: function(path){
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
})


cmLanguage.directive('cmLanguageSelect', [

	'cmLanguage',

	function(cmLanguage){
		return {

			restrict: 'AE',
			transclude: true,
			template: '<select ng-transclude></select>',

			link: function(scope, element, attrs ){
				var	select	= element.find('select'),
					html	= '<option value="%1" %2>%3</option>'

				cmLanguage.getSupportedLanguages().forEach(function(lang_key){					
					select.append(
						html
						.replace(/%1/, lang_key)
						.replace(/%2/, cmLanguage.getCurrentLanguage() == lang_key ? 'selected="selected"' : '')
						.replace(/%3/, cmLanguage.getLanguageName(lang_key))
					)
				})

				console.log(cmLanguage.getCurrentLanguage())
				select.val(cmLanguage.getCurrentLanguage())

				select.on('change', function(){ cmLanguage.switchLanguage(select.val()) })
			}
		}
	}
])
