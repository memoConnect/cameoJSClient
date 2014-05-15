var cockpitMain = angular.module("cockpitMain", ["ngRoute", "cmCore", "twoFactorModal"])


cockpitMain.controller("cockpitMainCtrl", [
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
                path: '/lists',
                exp_ok: 'lists'
            }).then(
                function (lists) {
                    $scope.authorized = true
                    $scope.lists = lists
                },
                function (response) {
                    if (response.data && response.data.twoFactorRequired === true) {
                        twoFactorModal.show().then(
                            function () {
                                $scope.showContent = true
                                getListing()
                            }
                        )
                    }
                }
            )
        }

    }
])