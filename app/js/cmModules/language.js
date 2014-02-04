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
        $translateProvider.useLocalStorage();        
    }
])


cmLanguage.service('cmTranslate', ['$translate', function($translate){ return $translate }])

cmLanguage.filter('cmTranslate', ['translateFilter', function(translateFilter){ return translateFilter }])


//Does not work as intendet <div cm-translate="LANG.DE_DE"></div> stays empty
cmLanguage.directive('cmTranslate', ['translateDirective', function(translateDirective){ return translateDirective[0] }])

cmLanguage.controller('LanguageCtrl', [

	'$scope',
	'cmTranslate', 
	'cmNotify',	 
	
	function ($scope, cmTranslate, cmNotify) {
		// Make language switch available to the scope:		
		// Todo: new logger, add notify

		$scope.getLanguageName = function (lang_key){			
			lang_key = lang_key || $translate.uses()

			var translation = cmTranslate('LANG.'+lang_key.toUpperCase())

			//translation = (translation == 'LANG.'+lang_key.toUpperCase() ? undefined : translation)
			return(translation)
		}

		$scope.getCurrentLanguage = function(){
			return(cmTranslate.uses())
		}

		$scope.switchLanguage = function (lang_key) {	
			return (			
				cmTranslate.uses(lang_key)
				.then(
					function(){
						cmNotify.info(cmTranslate('LANG.SWITCH.SUCCESS', { lang : $scope.getLanguageName(lang_key) }))
					},
					function(){
						cmNotify.error(cmTranslate('LANG.SWITCH.ERROR', { lang : $scope.getLanguageName(lang_key) }))
					}
				)
			)
		}
	}
])
