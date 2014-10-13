'use strict';

angular.module('cmCore')
.directive('cmLanguageSelect', [
    'cmLanguage',
    'cmTranslate',
    function(cmLanguage, cmTranslate){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<select ng-model="language">'+
                        '<option ng-repeat="lang_key in languages" value="{{lang_key}}">{{\'LANG.\'+lang_key.toUpperCase()|cmTranslate}}</option>'+
                      '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmLanguage.switchLanguage(scope.language)
                })
            },

            controller: function($scope){
               $scope.languages = cmLanguage.getSupportedLanguages();
               $scope.language = cmLanguage.getCurrentLanguage();
            }
        }
    }
]);