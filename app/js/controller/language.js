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




app.config([
    '$translateProvider',		//from angular-translate
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


app.controller('LanguageCtrl', [
	'$translate', 				//from angular-translate
	'$scope', 
	function ($translate, $scope) {
		// Make language switch available to the scope:		
		// Todo: new logger, add notify

		$scope.getLanguageName = function (lang_key){			
			lang_key = lang_key || $translate.uses()

			var translation = $translate('LANG.'+lang_key.toUpperCase())

			//translation = (translation == 'LANG.'+lang_key.toUpperCase() ? undefined : translation)
			return(translation)
		}

		$scope.getCurrentLanguage = function(){
			return($translate.uses())
		}

		$scope.switchLanguage = function (lang_key) {	
			return (			
				$translate.uses(lang_key)
				.then(
					function(){
						console.log($translate('LANG.SWITCH.SUCCESS', { lang : $scope.getLanguageName(lang_key) }))
					},
					function(){
						console.log($translate('LANG.SWITCH.ERROR', { lang : $scope.getLanguageName(lang_key) }))
					}
				)
			)
		}
	}
])
