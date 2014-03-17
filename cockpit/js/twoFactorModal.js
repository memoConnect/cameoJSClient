angular.module("twoFactorModal", ["cmLogger", "ui.bootstrap"])

    .service("twoFactorModal", ["$modal",

        function ($modal) {

            function showTwoFactorModal() {

                var modalInstance = $modal.open({
                    templateUrl: "/cockpit/twoFactorModal.html",
                    controller: function ($rootScope, $scope, $modalInstance) {
                        $rootScope.$on('cmLogin:success', function(){
                            $modalInstance.close();
                        })
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
