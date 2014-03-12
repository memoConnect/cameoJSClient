var cockpitList = angular.module("cockpitList", ["ngRoute", "cmApi", "cmLogger"])


cockpitList.controller("cockpitListCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    '$location',
    function ($scope, cmApi, cmLogger, $routeParams, $location) {

        $scope.name = $routeParams.elementName
        $scope.list = []
        $scope.titles = []

        console.log($routeParams)

        var filterSettings = {
            offset: 0,
            limit: 20
        }

        updateList()

        function updateList() {
            cmApi.post({
                url: '/' + $routeParams.elementName,
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

        $scope.loadMore = function () {
            filterSettings.offset += filterSettings.limit
            updateList()
        }

        $scope.editElement = function (id) {
            $location.url('/' + $scope.name + '/' + id)
        }

        $scope.createNew = function() {
            cmApi.post({
                url: '/' + $routeParams.elementName + '/new'
            }).then(
                function (data) {
                    $scope.list = $scope.list.concat(data)
                    $scope.editElement(data.id)
                }
            )
        }

        $scope.deleteElement = function (id) {

            cmApi.delete({
                url: '/' + $routeParams.elementName + "/" + id
            }).then(
                function () {
                    for (var i = $scope.list.length; i--;) {
                        if ($scope.list[i].id === id) {
                            $scope.list.splice(i, 1);
                        }
                    }
                },
                function () {
                    cmLogger.error("could not delete")
                }
            )
        }


    }
])