'use strict';

angular.module('cmWidgets').directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
]);