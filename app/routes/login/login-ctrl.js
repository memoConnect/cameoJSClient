define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',[
        '$scope',
        'cmVersion',
        'cmSystemCheck',
        'cmBoot',
        function($scope, cmVersion, cmSystemCheck, cmBoot){
            cmBoot.resolve();

            cmSystemCheck.run(true);

            $scope.cmVersion = cmVersion;

            $scope.goToReg = function(){
                $scope.goTo('/registration');
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