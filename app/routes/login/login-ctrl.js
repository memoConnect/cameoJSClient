define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',['$scope', '$modal', 'cmLogger',
        function($scope, $modal, cmLogger){

        $scope.open = function () {
            var modalInstance = $modal.open({
                template: '<div cm-login></div>',
                controller: function ($scope, $modalInstance) {

                }
            });

            modalInstance.result
            .then(
                function () {

                }, function () {
                    cmLogger.info('Modal dismissed at: ' + new Date());
                }
            );
        };
    }]);
});