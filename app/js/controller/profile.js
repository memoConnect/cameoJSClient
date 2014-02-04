'use strict';
app.controller('ProfileCtrl', ['$scope', '$cookieStore', '$location', 'Auth', 'cm', 'cmCrypt',
    function ($scope, $cookieStore, $location, Auth, cm, cmCrypt) {
        /*
        console.dir(scope)

        scope.getMail(){

        }
        */

        /*
        $scope.placeholder = {
            user: "Username"
            ,pass: "Passwort"
        };
        $scope.formData = {};
        $scope.formRes = {};

        $scope.token = $cookieStore.get("token")+" go to start"||"none";

        $scope.autologin = function(){
            cm.log.debug("autologin called")
            $scope.formData = {
                user: "Max"
                ,pass: cmCrypt.hash("moepmoep")
            };
        };

        $scope.getToken = function(){
            cm.log.debug("getToken called")
            Auth.getToken(Base64.encode($scope.formData.user + ":" + $scope.formData.pass)).
                success(function(res){
                    $scope.formRes = res.data;
                    $cookieStore.put("token",res.data.token);
                    $scope.token = res.data.token;
                    $location.path("/start");
                }).
                error(function(res){
                    $scope.formRes = res;
                })
        };
        */
}]);