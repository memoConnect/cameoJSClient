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
        }
    ]);
});