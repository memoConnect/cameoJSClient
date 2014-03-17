var cockpitEdit = angular.module("cockpitEdit", ["ngRoute", "cmApi", "cmLogger"])


cockpitEdit.controller("cockpitEditCtrl", [
    '$scope',
    'cmApi',
    'cmLogger',
    '$routeParams',
    function ($scope, cmApi, cmLogger, $routeParams) {
        $scope.elementName = $routeParams.elementName
        $scope.elementNameId = $routeParams.id
        $scope.elementNameAttributes = {}
        $scope.elementAttributeUpdates = {}
        $scope.formData = {}

        cmApi.get({
            url: '/' + $scope.elementName + '/' + $scope.elementNameId
        }).then(
            function (data) {
                if (data.attributes.length > 0) {
                    $scope.elementNameAttributes = data.attributes
                    angular.forEach($scope.elementNameAttributes, function (elementAttributes) {
                        angular.forEach(elementAttributes, function (elementAttributeValue, elementAttributeKey) {
                            $scope.formData[elementAttributeKey] = elementAttributeValue
                        })
                    })
                }
            },
            function () {
                cmLogger.error("verdammter Dreckwurschtkram :(")
            }
        )

        /*
        this function is used to store changes back to backend
         */
        $scope.sendElement = function () {

            //get changes from formData
            angular.forEach($scope.elementNameAttributes, function (elementAttributes) {
                angular.forEach(elementAttributes, function (elementAttributeValue, elementAttributeKey) {
                    if (elementAttributes[elementAttributeKey] != $scope.formData[elementAttributeKey])
                        $scope.elementAttributeUpdates[elementAttributeKey] = $scope.formData[elementAttributeKey]
                })
            })


//            angular.forEach($scope.elementAttributeUpdates, function (elementAttributeValue, elementAttributeKey) {
//                cmLogger.debug(elementAttributeKey)
//                cmLogger.debug(elementAttributeValue)
//            })


        }
    }
])