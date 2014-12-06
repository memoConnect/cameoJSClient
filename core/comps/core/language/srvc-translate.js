'use strict';

// Provides:
// filter 'translate', usage: {{'MESSAGE_ID' | translate}}
// controller 'languageCtrl' for language switch
// Example:
// <div ng-controller="LanguageCtrl">
//		<a href="" ng-click="switchLang('en')">Englisch</a></li>
//		<a href="" ng-click="switchLang('de')">German</li>
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

angular.module('cmCore')
.service('cmTranslate', [
    '$translate',
    function($translate){
        return $translate;
    }
]);