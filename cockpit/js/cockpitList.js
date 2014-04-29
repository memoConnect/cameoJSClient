var cockpitList = angular.module("cockpitList", ["ngRoute", "cmApi", "cmLogger", "twoFactorModal"])


cockpitList.controller("cockpitListCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    '$location',
    'twoFactorModal',
    function ($scope, cmApi, cmLogger, $routeParams, $location, twoFactorModal) {

        $scope.name = $routeParams.elementName
        $scope.filters = []
        $scope.list = []
        $scope.titles = []
        $scope.selectedFilter = "choose filter"

        $scope.showContent = false

        var filterSettings = {
            offset: 0,
            limit: 20,
            filter: []
        }

        function handleError(response, reTryFunction) {
            $scope.showContent = false
            if(response.data && response.data.twoFactorRequired === true) {
                twoFactorModal.show().then(
                    function () {
                        $scope.showContent = true
                        reTryFunction()
                    }
                )
            }
        }

        function updateList() {
            filterSettings.offset = 0
            cmApi.post({
                path: '/' + $routeParams.elementName,
                data: filterSettings
            }).then(
                function (data) {
                    $scope.showContent = true
                    if (data.elements.length > 0) {
                        $scope.titles = data.titles
                        $scope.filters = data.availableFilters
                        $scope.list = data.elements
                    }
                },
                function(response) {
                    console.log("asdf")
                    handleError(response, updateList)
                }
            )
        }

        $scope.loadMore = function () {
            filterSettings.offset += filterSettings.limit
            cmApi.post({
                path: '/' + $routeParams.elementName,
                data: filterSettings
            }).then(
                function (data) {
                    $scope.showContent = true
                    if (data.elements.length > 0) {
                        $scope.titles = data.titles
                        $scope.filters = data.availableFilters
                        $scope.list = $scope.list.concat(data.elements)
                    }
                },
                function(response) {
                    handleError(response, updateList)
                }
            )
        }

        $scope.editElement = function (id) {
            $location.path('/' + $scope.name + '/' + id)
        }

        $scope.createNew = function () {
            cmApi.post({
                path: '/' + $routeParams.elementName + '/new'
            }).then(
                function (data) {
                    $scope.list = $scope.list.concat(data)
                    $scope.editElement(data.id)
                },
                function(response) {
                    handleError(response, updateList)
                }
            )
        }

        $scope.deleteElement = function (id) {
            cmApi.delete({
                path: '/' + $routeParams.elementName + "/" + id
            }).then(
                function () {
                    for (var i = $scope.list.length; i--;) {
                        if ($scope.list[i].id === id) {
                            $scope.list.splice(i, 1);
                        }
                    }
                },
                function(response) {
                    handleError(response, updateList)
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
        }

        if(typeof $routeParams.filterTerm != 'undefined' && typeof $routeParams.filterName != 'undefined')  {
            $scope.selectedFilter = $routeParams.filterName
            $scope.filterTerm = $routeParams.filterTerm
            filterSettings.limit = 200
            $scope.sendFilter()
        } else {
            updateList()
        }

    }
])