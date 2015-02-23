'use strict';

angular.module('cmCore')
.directive('cmLanguageSelect', [
    'cmLanguage',
    'cmTranslate',
    function(cmLanguage, cmTranslate){
        return {
            restrict: 'A',
            transclude: true,
            scope: true,
            template: '<select ng-model="language">'+
                        '<option ng-repeat="lang_key in languages" value="{{lang_key}}" ng-selected="lang_key == language">{{\'LANG.\'+lang_key.toUpperCase()|cmTranslate}}</option>'+
                      '</select>',

            link: function(scope, element){
                element.find('select').on('change', function(){
                    cmLanguage.switchLanguage(scope.language);
                });
            },

            controller: function($scope){
                $scope.languages = cmLanguage.getSupportedLanguages();
                $scope.language = cmLanguage.getCurrentLanguage();
            }
        }
    }
]);