angular.module("twoFactorModal", ["cmCore", "ui.bootstrap"])

    .service("twoFactorModal", ["$modal", "cmAuth",

        function ($modal, cmAuth) {

            function showTwoFactorModal() {

                var modalInstance = $modal.open({
                    templateUrl: "twoFactorModal.html",
                    controller: function ($rootScope, $scope, $modalInstance) {


                        $scope.requestTwoFactorKey = function() {
                           cmAuth.requestTwoFactorKey()
                        }

                        $scope.requestTwoFactorToken = function(key) {
                            cmAuth.requestTwoFactorToken(key)
                                .then(
                                    function(data) {
                                        cmAuth.storeTwoFactorToken(data)
                                        $modalInstance.close()
                                    },
                                    function() {
                                        $scope.invalidKey = true
                                    }
                                )
                        }
                    }
                });
                return modalInstance.result
            }

            return {show: showTwoFactorModal}

        }])
