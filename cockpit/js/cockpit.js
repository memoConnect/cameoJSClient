var app = angular.module("cockpit", ["ngRoute", "cmAuth", "cmApi", "cmCrypt", "cmLogger"])

app.config(["cmApiProvider",

    function (cmApiProvider) {
        cmApiProvider.restApiUrl("http://localhost:9000/api/cockpit/v1/")
    }
])

app.config(function ($routeProvider) {
    $routeProvider.when('/list/:elementName', {
        templateUrl: 'cockpit.html',
        controller: 'cockpitCtrl'
    }).otherwise({redirectTo: "/list"})
});

app.controller("cockpitCtrl", [
    '$scope',
    'cmApi',
    '$routeParams',
    function ($scope, cmApi, $routeParams) {

        $scope.name = $routeParams.elementName
        $scope.list = []
        $scope.titles = []

        var filterSettings = {
            offset: 0,
            limit: 20
        }

        updateList()

        function updateList() {
            cmApi.post({
                url: $routeParams.elementName,
                data: filterSettings
            }).then(
                function (data) {
                    if (data.elements.length > 0) {
                        $scope.titles = data.titles
                        $scope.list = $scope.list.concat(data.elements)
                    }
                }
            )
        }

        function loadMore() {
            filterSettings.offset += filterSettings.limit
            updateList()
        }

        $scope.loadMore = loadMore
    }
])