var cockpitEdit = angular.module("cockpitMain", ["ngRoute", "cmApi", "cmLogger", "cmAuth"])


cockpitEdit.controller("cockpitMainCtrl", [
    '$scope',
    'cmApi',
    'cmAuth',
    'cmLogger',
    '$routeParams',
    function ($scope, cmApi, cmAuth, cmLogger, $routeParams) {

        $scope.lists = []
        $scope.getTwoFactor = false

        getListing()

        function getListing() {

            cmApi.get({
                url: '/lists',
                exp_ok: 'lists'
            }).then(
                function (lists)  {
                    $scope.lists = lists
                },
                function(data, data1) {
                    console.log(data1)
//                    if (data.twoFactorRequired) {
                        $scope.getTwoFactor = true
//                    }
                }
            )
        }

        function requestTwoFactorKey() {
            cmAuth.requestTwoFactorKey()
        }

        function confirmTwoFactorKey(key) {
            cmAuth.requestTwoFactorToken(key)
        }
    }
])