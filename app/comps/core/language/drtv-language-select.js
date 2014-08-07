'use strict';

angular.module('cmCore')
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