angular.module("twoFactorModal", ["cmLogger", "ui.bootstrap", "cmAuth"])

    .service("twoFactorModal", ["$modal", "cmAuth",

        function ($modal, cmAuth) {

            function showTwoFactorModal() {

                var modalInstance = $modal.open({
                    templateUrl: "/cockpit/twoFactorModal.html",
                    controller: function ($rootScope, $scope, $modalInstance) {


                        $scope.requestTwoFactorKey = function() {
                           cmAuth.requestTwoFactorKey()
                        }

                        $scope.requestTwoFactorToken = function(key) {
                            cmAuth.requestTwoFactorToken(key)
                                .then(
                                    function(data) {
                                        console.log("TOKEN: " + data)
                                        cmAuth.storeTwoFactorToken(data)
                                    }
                                )
                        }
                    }
                });

                modalInstance.result
                    .then(
                    function () {

                    },
                    function () {
                        $scope.isModalVisible = false;
                    }
                );

            }

            return {show: showTwoFactorModal}

        }])
