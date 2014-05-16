define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',[
        '$scope', '$location', 'cmVersion', '$window',
        function($scope, $location, cmVersion, $window){
            $scope.cmVersion = cmVersion;
            $scope.size = $window.innerHeight+"x"+$window.innerWidth;

            $scope.goToReg = function(){
                $location.path('/registration');
            };

            var app = angular.element(document.querySelector('#cm-app')),
                frame = angular.element(document.querySelector('.view-frame'));

            app.addClass('full-height');
            frame.addClass('full-height');

            $scope.$on('$destroy', function(){
                app.removeClass('full-height');
                frame.removeClass('full-height');
            });

        }
    ]);
});