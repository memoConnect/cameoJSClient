var cockpitList = angular.module("cockpitList", ["ngRoute", "cmApi", "cmLogger"])


cockpitList.controller("cockpitListCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    '$location',
    function ($scope, cmApi, cmLogger, $routeParams, $location) {

        $scope.name = $routeParams.elementName
        $scope.filters = []
        $scope.showAlert = false
        $scope.list = []
        $scope.titles = []
        $scope.selectedFilter = "choose filter"

        var filterSettings = {
            offset: 0,
            limit: 20,
            filter: []
        }

        updateList()

        function updateList() {
            filterSettings.offset = 0
            cmApi.post({
                url: '/' + $routeParams.elementName,
                data: filterSettings
            }).then(
                function (data) {
                    $scope.showAlert = false
                    if (data.elements.length > 0) {
                        $scope.titles = data.titles
                        $scope.filters = data.availableFilters
                        $scope.list = data.elements
                    }
                },
                function() {
                    $scope.showAlert = true
                }
            )
        }

        $scope.loadMore = function () {
            filterSettings.offset += filterSettings.limit
            cmApi.post({
                url: '/' + $routeParams.elementName,
                data: filterSettings
            }).then(
                function (data) {
                    $scope.showAlert = false
                    if (data.elements.length > 0) {
                        $scope.titles = data.titles
                        $scope.filters = data.availableFilters
                        $scope.list = $scope.list.concat(data.elements)
                    }
                },
                function() {
                   $scope.showAlert = true
                }
            )
        }

        $scope.editElement = function (id) {
            $location.url('/' + $scope.name + '/' + id)
        }

        $scope.createNew = function () {
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

        $scope.setFilter = function (newFilter) {
            $scope.selectedFilter = newFilter
        }

        $scope.sendFilter = function () {
            $scope.list = []
            filterSettings.filter = [{
                name: $scope.selectedFilter,
                term: $scope.filterTerm
            }]
            updateList()
        }

        $scope.foo = function(event) {
            if(event.keyCode == 13) {
                $scope.sendFilter()
            }
            console.log(event.keyCode)
        }

    }
])