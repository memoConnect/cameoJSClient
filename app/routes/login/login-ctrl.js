define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',['$scope', '$modal', 'cmLogger',
        function($scope, $modal, cmLogger){

        $scope.open = function () {

            var modalInstance = $modal.open({
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
                    cmLogger.info('Modal dismissed at: ' + new Date());
                }
            );
        };
    }]);
});