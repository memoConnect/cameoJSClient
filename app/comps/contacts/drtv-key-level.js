'use strict';

angular.module('cmContacts').directive('cmKeyLevel',[
    function (){
        return {
            restrict: 'E',
            template: '<cm-icons icons="cm-lock" alt="cm-unlock" count="{{count}}"></cm-icons>',
            scope: {
                keySize: '=cmData'
            },
            controller: function($scope){
                $scope.count = 0;

                if($scope.keySize >= 2048){
                    $scope.count = 2;
                }
            }
        }
    }
]);