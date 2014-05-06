'use strict';

angular.module('cmFiles').directive('cmAttachmentsPreview',[
    'cmFileTypes',
    function(cmFileTypes) {
        return {
            restrict: 'E',
            templateUrl: 'comps/files/drtv-attachments-preview.html',
            controller: function($scope){
                $scope.cmFileTypes = cmFileTypes;
            }
        }
    }
]);