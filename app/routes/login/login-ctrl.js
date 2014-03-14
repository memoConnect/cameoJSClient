define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',['$scope', '$modal', '$location', 'cmLogger',
        function($scope, $modal, $location, cmLogger){
            $scope.showLoginRhino = true;
            $scope.showLoginScreenStart = true;

            $scope.open = function () {
                $scope.showLoginScreenStart = false;
                $scope.showLoginRhino = false;

                var modalInstance = $modal.open({
                    windowClass: 'cm-modal-with-title',
                    template: '<div cm-notify></div><div cm-login></div>',
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
                        $scope.showLoginScreenStart = true;
                        $scope.showLoginRhino = true;
//                        cmLogger.info('Modal dismissed at: ' + new Date());
                    }
                );
            };

            $scope.goToReg = function(){
                $location.path('/registration');
            };
    }]);
});