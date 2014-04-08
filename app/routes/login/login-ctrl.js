define([
    'app',
    'ngload!pckUser',
    'ngload!pckUi'
], function(app){

    app.register.controller('LoginCtrl',[
        '$scope', '$modal', '$location', 'cmVersion', '$window',
        function($scope, $modal, $location, cmVersion, $window){
            $scope.cmVersion = cmVersion;
            $scope.size = $window.innerHeight+"x"+$window.innerWidth;

            $scope.isModalVisible = false;

            $scope.open = function () {
                $scope.isModalVisible = true;

                var modalInstance = $modal.open({
                    windowClass: 'cm-modal-with-title',
                    template: '<div cm-login></div>',
                    controller: function ($rootScope, $scope, $modalInstance) {
                        $rootScope.$on('cmLogin:success', function(){
                            if($modalInstance != undefined)
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
            };

            $scope.goToReg = function(){
                $location.path('/registration');
            };
    }]);
});