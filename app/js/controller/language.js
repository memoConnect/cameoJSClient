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
// language keys: $language_$CULTURE, en_US
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
		$scope.switchLanguage = function (langKey) {			
			$translate.uses(langKey)
			.then(
				function(){
					console.log($translate('SWITCHED_LANGUAGE_TO', { lang : langKey }))
				},
				function(){
					console.log($translate('ERROR.SWITCHED_LANGUAGE_TO', { lang : langKey }))
				}
			)
		}
	}
])
