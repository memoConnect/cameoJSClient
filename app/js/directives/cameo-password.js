'use strict';
app.directive('cameoPassword', function () {
    return  {
        restrict: 'E',
        templateUrl: 'tpl/directives/cameo-password.html',
        scope: {
            password: '=parentItem'
        },
        controller  :   function($scope, $element, $attrs){
            $scope.showConfirmPWStatus = false;
            $scope.pwConfirmStatusText = '';

            $scope.showPWConfirmStatus = function(msg){
                $scope.showConfirmPWStatus = true;
                if(angular.isDefined(msg)){
                    $scope.pwConfirmStatusText = msg;
                }
            }

            $scope.checkPWStrength = function(){
                var pw = $scope.pw;

                /**
                 * @TODO add pw strength checker
                 *
                 */

                $scope.pwStrength = pw;
            };

            $scope.confirmPW = function(){
                if($scope.pw == $scope.pwConfirm){
                    $scope.showPWConfirmStatus('Password Confirmed');
                    setPassword($scope.pw);
                } else {
                    $scope.showPWConfirmStatus('Password Not Confirmed');
                }
            };

            /**
             * Wrapper Function to inject Password in extern Controller
             */
            function setPassword(pw){
                if(angular.isDefined(pw)){
                    $scope.password = pw;
                }
            };
        }
    }
});