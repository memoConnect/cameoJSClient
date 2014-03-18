var cockpitEdit = angular.module("cockpitMain", ["ngRoute", "cmApi", "cmLogger", "cmAuth", "twoFactorModal"])


cockpitEdit.controller("cockpitMainCtrl", [
    '$scope',
    'cmApi',
    'cmAuth',
    'cmLogger',
    '$routeParams',
    'twoFactorModal',
    function ($scope, cmApi, cmAuth, cmLogger, $routeParams, twoFactorModal) {

        $scope.lists = []
        $scope.authorized = false

        getListing()

        function getListing() {

            cmApi.get({
                url: '/lists',
                exp_ok: 'lists'
            }).then(
                function (lists) {
                    $scope.authorized = true
                    $scope.lists = lists
                }
            )
        }

    }
])