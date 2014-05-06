'use strict';

angular.module('cmConversations').directive('cmMessageFile', [
    'cmFileFactory',
    'cmLogger',
    '$timeout',
    function (cmFileFactory, cmLogger, $timeout) {
        return {
            restrict: 'E',
            require: '^cmMessage',
            templateUrl: 'comps/conversations/drtv-message-file.html',
            controller: function ($scope, $element, $attrs) {
                console.log($scope.file)
                // exists fileModl
                if(typeof $scope.file == 'object'){

                    if($scope.file.state == 'new'){
                        // todo: upload
                    }
                // file from api
                } else if(typeof $scope.file == 'string'){
                    // todo: download
                    // $scope.file = cmFileFactory.create()
                }

                $timeout(function(){
                    $scope.file.loaded = true;
                    $scope.$apply();
                },1000)
            }
        }
    }
])