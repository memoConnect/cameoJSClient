'use strict';

angular.module('cmRoutes').controller('FilterCtrl', [
    '$scope',
    '$http',
    '$cookieStore',
    'cmLogger',
    'cmCrypt',
    function ($scope, $http, $cookieStore, cmLogger, cmCrypt) {

        $scope.messages = [];
        $scope.messageCount = 0;
        $scope.filter = "{}";
        $scope.limit = 50;
        $scope.offset = 0;

        $scope.filters = [
            {name: "all", filter: "{}"},
            {name: "filter group (from)", filter: '{"fromGroups":["group1"]}'},
            {name: "filter group (to)", filter: '{"toGroups":["group1"]}'},
            {name: "filter date (start)", filter: '{"startDate":"1391784822"}'},
            {name: "filter date (end)", filter: '{"endDate":"1391784822"}'}
        ];

        $scope.setFilter = function () {
            $scope.filter = $scope.filterSelect.filter
        };

        $scope.getMessages = function () {

            if ($scope.messages.length > 0) {
                $scope.offset = $scope.offset + $scope.limit
            }

            var start = new Date();

            $http({
                    method: "POST",
                    url: app.cameo.restApi + "/message/filter?token=" + $cookieStore.get("token") + "&offset=" + $scope.offset + "&limit=" + $scope.limit,
                    data: $scope.filter
                }
            ).success(function (res) {
                $scope.messages = res.data;

                $scope.totalTime = ((new Date()).getMilliseconds() - start.getMilliseconds())
            }).error(function (res) {
                cmLogger.error("error", res)
            });
        };

        $scope.getMessageCount = function () {
            $http({
                method: "POST",
                url: app.cameo.restApi + "/message/filter/count?token=" + $cookieStore.get("token"),
                data: $scope.filter
            }).success(function (res) {
                $scope.messageCount = res.data;
            }).error(function (res) {
                cmLogger.errorData("error", res)
            });
        };

}]);