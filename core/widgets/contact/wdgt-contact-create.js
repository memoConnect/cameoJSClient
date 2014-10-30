'use strict';

/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams

angular.module('cmWidgets')
.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
]);